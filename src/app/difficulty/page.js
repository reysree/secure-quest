"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ShieldAlert, ShieldOff } from "lucide-react";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function DifficultySelection() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login"); // Redirect if not logged in
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const difficulties = [
    {
      level: "easy",
      title: "Rookie Agent",
      icon: Shield,
      description:
        "Learn the basics of data privacy and security through foundational challenges.",
      scenarios: [
        "Classify sensitive vs non-sensitive data",
        "Basic encryption exercises",
        "Identify common security threats",
      ],
    },
    {
      level: "medium",
      title: "Security Specialist",
      icon: ShieldAlert,
      description:
        "Face more complex scenarios requiring deeper understanding of compliance.",
      scenarios: [
        "Advanced breach analysis",
        "Complex encryption challenges",
        "Regulatory compliance scenarios",
      ],
    },
    {
      level: "hard",
      title: "Chief Privacy Officer",
      icon: ShieldOff,
      description:
        "Master high-stakes situations with expert-level challenges.",
      scenarios: [
        "Critical incident response",
        "Advanced system security",
        "Cross-border data compliance",
      ],
    },
  ];

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    router.push(`/mysteryroom/${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Choose Your Challenge Level
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {difficulties.map((difficulty) => {
            const Icon = difficulty.icon;
            return (
              <Card
                key={difficulty.level}
                className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                  selectedDifficulty === difficulty.level
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleDifficultySelect("easy")} //Hardcoded easy for prototype.
              >
                <div className="text-center mb-4">
                  <Icon className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <h2 className="text-2xl font-semibold">{difficulty.title}</h2>
                </div>

                <p className="text-muted-foreground mb-4">
                  {difficulty.description}
                </p>

                <div className="space-y-2">
                  <h3 className="font-semibold">Scenarios include:</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {difficulty.scenarios.map((scenario, index) => (
                      <li key={index}>{scenario}</li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full mt-6"
                  variant={
                    selectedDifficulty === difficulty.level
                      ? "default"
                      : "outline"
                  }
                >
                  Select {difficulty.title}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
