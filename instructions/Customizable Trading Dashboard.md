# Project Context — Trading Blotter Workspace

> Read this file before suggesting any code. It defines the architecture, constraints, and patterns for this codebase. Do not deviate from these decisions without a comment explaining why.

---

## What this is

A **workspace engine for trading data** — not a dashboard. Think Bloomberg Terminal meets VS Code. Users compose their own layout from panels, save it, and come back to it. The layout is user-owned data, not app structure.

Built on: **Vite + React 19 + TypeScript**

---

## Core mental models

### 1. Panels are first-class entities
A panel is a registered type that knows:
- What data it needs
- Which filters it responds to
- How to serialise its own config

Panels are not components wired together in JSX. They are entries in a registry resolved at runtime by the workspace engine.

### 2. Layout is user-owned data
The layout (which panels exist, their positions, sizes, tab groupings) is a JSON blob owned by the user and persisted to the backend. It is not hardcoded in JSX. It is not React state. It lives in `layoutStore` (Zustand) and is saved via a REST mutation.

### 3. Filters are a cross-cutting concern
Filters (instrument, desk, trader, date range) are global. They live in `filterStore` (Zustand), are initialised from URL search params on mount, and are kept in sync with the URL. Panels subscribe to only the filter slices they care about.

### 4. Live data is a stream, not a fetch
Trade data arrives over a single shared WebSocket. It is not fetched via TanStack Query. TanStack Query is for request/response (loading saved layouts, initial SSRM data). The WebSocket is managed by `wsStore` as a singleton.

---

## Tech stack — do not substitute without a comment

| Concern | Library | Notes |
|---|---|---|
| Build | Vite | — |
| UI | React 19 | Use `use()` hook where applicable |
| Types | TypeScript strict mode | No `any`, no `as unknown as X` |
| Routing | TanStack Router v1 | File-based routes, typed search params |
| Server state | TanStack Query v5 | Request/response only, not WS |
| Client state | Zustand v5 | Slices pattern, `useShallow` for selectors |
| Workspace layout | **Dockview** (`dockview-react`) | Free-form dock, NOT react-resizable-panels |
| Data grid | AG Grid v33 | Server-Side Row Model (SSRM) only |
| HTTP client | `ky` | Thin wrapper in `src/services/httpClient.ts` |
| Validation | Zod | All external data shapes, route search params |

---

## Folder structure

```
src/
  workspace/         # Dockview initialisation, layout bootstrap
  panels/
    registry.ts      # THE source of truth: type string → component
    blotter/         # BlotterPanel + its ConfigPanel
    chart/           # ChartPanel + its ConfigPanel
    ai-html/         # AiHtmlPanel (sandboxed iframe)
    order-book/      # OrderBookPanel
  store/
    filterStore.ts   # Global filter state (instrument, desk, trader, dateRange)
    layoutStore.ts   # pendingLayout, isDirty, actions
    wsStore.ts       # WS singleton, connection status, delta buffer
  hooks/
    useWorkspace.ts  # TanStack Query — fetch saved layout
    useTrades.ts     # TanStack Query — SSRM initial data source
    useSaveLayout.ts # TanStack Query useMutation — POST layout
  services/
    httpClient.ts    # ky wrapper with auth headers + 401 redirect
    wsManager.ts     # WS class: connect, reconnect, heartbeat, message routing
  components/        # Shared UI from internal asset library
  routes/            # TanStack Router file-based routes
```

---

## State ownership — strictly enforced

| State | Owner | Why |
|---|---|---|
| Active filter values | `filterStore` (Zustand) + URL params | Cross-panel, survives refresh |
| Unsaved layout changes | `layoutStore` (Zustand) | Drives isDirty / Save button |
| Saved workspace config | TanStack Query cache | Fetched from BE, cached |
| WebSocket connection | `wsStore` (Zustand) | Singleton lifecycle |
| Live trade deltas | `wsStore` → AG Grid transaction API | Not TQ, not React state |
| Per-panel UI state | Local `useState` inside panel | No need to hoist |

**Never put live WS data into TanStack Query. Never create per-panel WebSocket connections.**

---

## Panel registry pattern

```ts
// src/panels/registry.ts
import { BlotterPanel } from './blotter/BlotterPanel'
import { ChartPanel } from './chart/ChartPanel'
import { AiHtmlPanel } from './ai-html/AiHtmlPanel'
import { OrderBookPanel } from './order-book/OrderBookPanel'

export const PANEL_COMPONENTS = {
  blotter: BlotterPanel,
  chart: ChartPanel,
  'ai-html': AiHtmlPanel,
  'order-book': OrderBookPanel,
} satisfies Record<string, React.ComponentType<PanelProps>>
```

Adding a new panel type = new folder + one line here. No other files change.

---

## Dockview integration rules

- Initialise in `src/workspace/WorkspaceEngine.tsx`
- Pass `PANEL_COMPONENTS` as the `components` prop to `<DockviewReact />`
- On `onReady`: call `api.fromJSON(savedLayout)` to hydrate from BE
- On `onDidLayoutChange`: write to `layoutStore.pendingLayout`, set `isDirty = true`
- Save action: call `useSaveLayout` mutation with `api.toJSON()`
- Reset action: re-fetch saved layout → `api.fromJSON(savedLayout)`
- Every panel render must be wrapped in a React `ErrorBoundary`

---

## AG Grid rules

- **Always use Server-Side Row Model (SSRM)** — never client-side for this grid
- Live updates via `gridApi.applyServerSideTransaction({ update: [...rows] })`
- Transactions are called from `wsStore` batch flush — **never directly from a WS message handler**
- Batch window is **16ms (one animation frame)** — accumulate deltas, flush once per frame
- Use `gridApi.getState()` / `applyState()` to serialise column config into panel config
- Column state is part of panel config — it round-trips through Dockview's `toJSON`

---

## WebSocket rules

```
ONE WebSocket connection for the entire app.
Never create a WS connection inside a panel or component.
```

- `wsManager.ts` owns the raw WebSocket instance
- `wsStore` holds connection state and exposes it to the app
- Message routing: `wsManager` receives all messages and dispatches to the correct store slice
- Reconnect: exponential backoff with jitter, max 30s interval
- Heartbeat: ping every 30s, disconnect after 2 missed pongs
- Filter subscriptions sent over same socket: `{ type: 'SUBSCRIBE', filters: {...} }`
- On disconnect: show stale data banner, queue outbound messages

---

## Filter store pattern

```ts
// src/store/filterStore.ts
interface FilterState {
  instrument: string | null
  desk: string | null
  trader: string | null
  dateRange: { from: string; to: string } | null
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void
}
```

- Initialised from URL search params on app boot
- Every filter change updates both Zustand and URL (`router.navigate` with `replace: true`)
- Panel subscriptions use `useShallow` to avoid unnecessary re-renders:
  ```ts
  const { instrument, desk } = useFilterStore(useShallow(s => ({ instrument: s.instrument, desk: s.desk })))
  ```

---

## Security rules — non-negotiable

### AI-generated HTML panels
```tsx
// CORRECT
<iframe sandbox="allow-scripts" srcdoc={sanitizedHtml} />

// NEVER DO THIS
<div dangerouslySetInnerHTML={{ __html: llmOutput }} />
```

The `sandbox` attribute blocks: parent DOM access, localStorage, cookies, navigation, form submission, popups. HTML must also be sanitised server-side before storage. Never trust client-side sandboxing alone.

### General
- All external data validated with Zod before use
- No raw `fetch` in components — always use `httpClient`
- Auth headers injected in `httpClient`, never hardcoded
- 401 responses redirect to `/login?redirect=<current>`

---

## BE contracts (agreed, do not change shape without BE alignment)

### REST
```
GET  /workspaces/:id          → WorkspaceLayout JSON
POST /workspaces/:id/layout   → body: WorkspaceLayout JSON
```

### WebSocket — inbound deltas from server
```ts
{ type: 'TRADE_UPDATE'; payload: { id: string } & Partial<Trade> }
{ type: 'TRADE_NEW';    payload: Trade }
{ type: 'TRADE_DELETE'; payload: { id: string } }
```

### WebSocket — outbound from client
```ts
{ type: 'SUBSCRIBE';   filters: Partial<FilterState> }
{ type: 'UNSUBSCRIBE'; filters: Partial<FilterState> }
{ type: 'PING' }
```

---

## What to avoid — common mistakes to reject

- `react-resizable-panels` — wrong category, no free-form dock
- `golden-layout` — replaced by Dockview, worse React DX
- Per-panel WebSocket connections — one connection only
- Passing WS data through TanStack Query — it's not request/response
- Putting live trade data in React state — bypasses the batch buffer
- `dangerouslySetInnerHTML` for any AI or user-generated content
- Client-side row model in AG Grid — will block main thread at 20K rows
- Storing layout in component state — loses it on remount, can't persist
- Context API for filter state — cascading re-renders across panel tree
- `any` type — strict mode enforced, use proper generics or Zod inference

---

## Performance constraints

- 20,000+ rows in the blotter grid
- High-frequency WS updates (up to ~50 ticks/sec)
- Workspace open all day — memory leaks and subscription accumulation are real risks
- Always unsubscribe from `wsStore` and `filterStore` in panel cleanup
- Use `useShallow` for all multi-key Zustand selectors
- AG Grid transactions batched to one per animation frame (16ms)
- Filter subscription changes sent server-side — do not filter deltas client-side
