
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShowcasePage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold">Component Showcase</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accordion</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Alert</h2>
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Avatar</h2>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Badge</h2>
        <div className="flex space-x-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Button</h2>
        <div className="flex space-x-2">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Card</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Date Picker</h2>
        <DatePicker />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Input</h2>
        <Input type="email" placeholder="Email" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">
            Change your password here.
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
