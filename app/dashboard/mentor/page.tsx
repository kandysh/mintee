"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Moon,
  Sun,
  ChevronDown,
  Settings,
  Trash2,
  MapPin,
  Globe,
  Send,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PreferenceForm } from "@/components/shared/preference-form";

export default function MentorDashboardPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [showPreferencesSidebar, setShowPreferencesSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "mentees" | "pending" | "delegated"
  >("mentees");
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [selectedMentorToDelegateId, setSelectedMentorToDelegateId] = useState<
    number | null
  >(null);

  const [mentees, setMentees] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Product Designer",
      location: "San Francisco, USA",
      languages: ["English", "French"],
      learningGoals: ["Leadership", "Career Growth"],
      matchScore: 92,
      expertise: ["Design", "UX/UI"],
    },
    {
      id: 2,
      name: "Marcus Chen",
      title: "Junior Developer",
      location: "Remote",
      languages: ["English", "Mandarin"],
      learningGoals: ["Technical Skills", "System Design"],
      matchScore: 89,
      expertise: ["Engineering", "Backend"],
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      title: "Business Analyst",
      location: "Austin, USA",
      languages: ["English", "Spanish"],
      learningGoals: ["Project Management", "Strategy"],
      matchScore: 85,
      expertise: ["Business", "Analytics"],
    },
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      title: "Business Analyst",
      message: "Wants to learn about leadership",
    },
    {
      id: 2,
      name: "David Park",
      title: "Developer",
      message: "Interested in career growth",
    },
  ]);

  const [delegatedRequests, setDelegatedRequests] = useState([
    {
      id: 1,
      name: "Jamie Lee",
      title: "UX Designer",
      message: "Seeking design mentorship",
      delegatedTo: "Alex Kim",
      status: "pending" as const,
    },
    {
      id: 2,
      name: "Chris Murphy",
      title: "Data Analyst",
      message: "Looking for analytics guidance",
      delegatedTo: "Sam Patel",
      status: "accepted" as const,
    },
  ]);

  const otherMentors = [
    { id: 1, name: "Alex Kim", expertise: ["Design", "Product"] },
    { id: 2, name: "Sam Patel", expertise: ["Analytics", "Data"] },
    { id: 3, name: "Jordan Lee", expertise: ["Engineering", "Backend"] },
    { id: 4, name: "Casey Johnson", expertise: ["Leadership", "Strategy"] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    setIsHydrated(true);
    const stored = localStorage.getItem("selectedRole");
    if (stored) setSelectedRole(stored);

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const currentTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(currentTheme);
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleRoleChange = (role: string) => {
    window.location.href =
      role === "mentor" ? "/dashboard/mentor" : "/dashboard/mentee";
  };

  const removeMentee = (id: number) => {
    setMentees(mentees.filter((m) => m.id !== id));
  };

  const handleDelegateRequest = (requestId: number) => {
    setSelectedMentorToDelegateId(requestId);
    setShowDelegateModal(true);
  };

  const completeDelegation = (mentorId: number) => {
    if (selectedMentorToDelegateId !== null) {
      const selectedMentor = otherMentors.find((m) => m.id === mentorId);
      const request = pendingRequests.find(
        (r) => r.id === selectedMentorToDelegateId,
      );
      if (selectedMentor && request) {
        setDelegatedRequests([
          ...delegatedRequests,
          {
            ...request,
            delegatedTo: selectedMentor.name,
            status: "pending" as const,
          },
        ]);
        setPendingRequests(
          pendingRequests.filter((r) => r.id !== selectedMentorToDelegateId),
        );
      }
    }
    setShowDelegateModal(false);
    setSelectedMentorToDelegateId(null);
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-serif font-bold text-gradient">
              MentorHub
            </h1>
          </Link>
          <div className="flex items-center justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 20 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-lg border border-border bg-card hover:bg-card/80 transition-all"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            {selectedRole === "both" && (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-card/80 transition-all font-medium text-sm"
                >
                  Switch Role
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
                <div className="absolute right-0 top-full mt-2 w-40 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block z-50">
                  <button
                    onClick={() => handleRoleChange("mentor")}
                    className="w-full text-left px-4 py-3 hover:bg-primary/10 hover:text-primary transition-all text-sm font-medium"
                  >
                    Mentor
                  </button>
                  <button
                    onClick={() => handleRoleChange("mentee")}
                    className="w-full text-left px-4 py-3 hover:bg-primary/10 hover:text-primary transition-all text-sm font-medium border-t border-border"
                  >
                    Mentee
                  </button>
                </div>
              </div>
            )}

            <Link href="/profile">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-card/80 transition-all font-medium text-sm"
              >
                Profile
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto py-10 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">
                Mentor Dashboard
              </h1>
              <p className="text-base text-muted-foreground">
                Guide and grow your mentees
              </p>
            </div>
            <motion.button
              onClick={() => setShowPreferencesSidebar(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Settings className="w-5 h-5" />
              Edit Preferences
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex gap-1 border-b border-border">
            {[
              { id: "mentees", label: `Active Mentees`, count: mentees.length },
              {
                id: "pending",
                label: `Pending Requests`,
                count: pendingRequests.length,
              },
              {
                id: "delegated",
                label: `Delegated`,
                count: delegatedRequests.length,
              },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-5 py-3.5 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ y: -1 }}
              >
                {tab.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab.id
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {activeTab === "mentees" && (
          <motion.div variants={itemVariants}>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {mentees.map((mentee) => (
                <motion.div
                  key={mentee.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-lg bg-card border border-border hover:border-primary/40 transition-all flex flex-col h-full"
                >
                  {/* Header with name and match score */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-bold text-foreground truncate">
                        {mentee.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium truncate">
                        {mentee.title}
                      </p>
                    </div>
                    <div className="ml-3 flex-shrink-0 text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap border border-primary/20">
                      {mentee.matchScore}%
                    </div>
                  </div>

                  {/* Location and languages */}
                  <div className="space-y-2 mb-4 pb-3 border-b border-border/50">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        {mentee.location}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {mentee.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Learning goals and expertise */}
                  <div className="mb-4 flex-grow space-y-2">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                        Goals
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {mentee.learningGoals.map((goal) => (
                          <span
                            key={goal}
                            className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                          >
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {mentee.expertise.map((exp) => (
                          <span
                            key={exp}
                            className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium text-sm"
                    >
                      <MessageSquare className="w-4 h-4 inline mr-1.5" />
                      Message
                    </motion.button>
                    <motion.button
                      onClick={() => removeMentee(mentee.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all font-medium text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeTab === "pending" && (
          <motion.div variants={itemVariants}>
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {pendingRequests.map((request) => (
                <motion.div
                  key={request.id}
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="flex-grow mb-4">
                    <h3 className="font-serif font-bold text-lg mb-1">
                      {request.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium mb-3">
                      {request.title}
                    </p>
                    <p className="text-sm text-foreground">{request.message}</p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all"
                    >
                      Approve
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelegateRequest(request.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-2.5 border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Delegate
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeTab === "delegated" && (
          <motion.div variants={itemVariants}>
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {delegatedRequests.map((request) => (
                <motion.div
                  key={request.id}
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-card border border-border hover:border-secondary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-lg mb-1">
                        {request.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {request.title}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        request.status === "accepted"
                          ? "bg-secondary/10 text-secondary border-secondary/20"
                          : "bg-accent/10 text-accent border-accent/20"
                      }`}
                    >
                      {request.status === "accepted" ? "Accepted" : "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-4">
                    {request.message}
                  </p>
                  <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                      Delegated To
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {request.delegatedTo}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {showDelegateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowDelegateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card border border-border rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-serif font-bold mb-2">
              Delegate Request
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Select a mentor to delegate this request to
            </p>

            <div className="space-y-3 mb-6">
              {otherMentors.map((mentor) => (
                <motion.button
                  key={mentor.id}
                  onClick={() => completeDelegation(mentor.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 rounded-lg border border-border bg-muted/50 hover:border-primary hover:bg-primary/10 transition-all text-left"
                >
                  <p className="font-semibold mb-1">{mentor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {mentor.expertise.join(", ")}
                  </p>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => setShowDelegateModal(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-all font-medium"
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {showPreferencesSidebar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setShowPreferencesSidebar(false)}
        >
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold">
                  Edit Preferences
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowPreferencesSidebar(false)}
                  className="p-2 hover:bg-card rounded-lg transition-all text-xl font-light"
                >
                  ✕
                </motion.button>
              </div>

              <PreferenceForm
                role="mentor"
                onSave={() => setShowPreferencesSidebar(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
