"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Brain, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter">SecureQuest</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master data privacy and financial compliance through an immersive
            escape room experience. Solve puzzles, prevent breaches, and become
            a security champion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">
                Security Challenges
              </h2>
              <p className="text-muted-foreground">
                Face real-world security scenarios and learn to protect
                sensitive data
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
              <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">
                Interactive Learning
              </h2>
              <p className="text-muted-foreground">
                Learn by doing through engaging puzzles and challenges
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Compete & Excel</h2>
              <p className="text-muted-foreground">
                Track your progress and compete on the global leaderboard
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/difficulty">
              <Button size="lg" className="text-lg px-8">
                Start Training
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
