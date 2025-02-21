"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { puzzles } from "@/lib/puzzles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, HelpCircle, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SortingPuzzle } from "@/components/game/SecurityPuzzle";
import { DecryptionPuzzle } from "@/components/game/DecryptionPuzzle";
import { SecurityPuzzle } from "@/components/game/SecurityPuzzle";

export function GameClient({ difficulty }) {
  const router = useRouter();
  const { toast } = useToast();
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);

  const availablePuzzles = puzzles[difficulty] || [];

  useEffect(() => {
    if (gameStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            toast({
              title: "Time's up!",
              description: "Your training session has ended.",
              variant: "destructive",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, timeRemaining, toast]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Training Started",
      description: "Complete the challenges before time runs out!",
    });
  };

  const handlePuzzleComplete = (correct) => {
    if (correct) {
      toast({
        title: "Correct!",
        description: "Moving to next challenge...",
      });
      setScore((prev) => prev + availablePuzzles[currentPuzzle].points);

      if (currentPuzzle + 1 >= availablePuzzles.length) {
        router.push(`/results?score=${score}&difficulty=${difficulty}`);
      } else {
        setCurrentPuzzle((prev) => prev + 1);
      }
    } else {
      toast({
        title: "Incorrect",
        description: "Try again or use a hint for help.",
        variant: "destructive",
      });
    }
  };

  const useHint = () => {
    if (hintsRemaining > 0) {
      setHintsRemaining((prev) => prev - 1);
      toast({
        title: "Hint Used",
        description:
          currentPuzzleData.data.hint ||
          "Look for patterns in the data and consider security best practices.",
      });
    }
  };

  const currentPuzzleData = availablePuzzles[currentPuzzle];

  if (!currentPuzzleData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">No puzzles available</h1>
          <p className="text-muted-foreground">
            Please select a different difficulty level or try again later.
          </p>
        </div>
      </div>
    );
  }

  const renderPuzzle = () => {
    switch (currentPuzzleData.type) {
      case "sorting":
        return (
          <SortingPuzzle
            data={currentPuzzleData.data}
            onComplete={handlePuzzleComplete}
          />
        );
      case "decryption":
        return (
          <DecryptionPuzzle
            data={currentPuzzleData.data}
            onComplete={handlePuzzleComplete}
          />
        );
      case "security":
        return (
          <SecurityPuzzle
            data={currentPuzzleData.data}
            onComplete={handlePuzzleComplete}
          />
        );
      default:
        return (
          <div className="text-center text-muted-foreground">
            Puzzle type not implemented: {currentPuzzleData.type}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent p-8">
      <div className="max-w-4xl mx-auto">
        {!gameStarted ? (
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Ready to Begin?</h1>
            <p className="text-muted-foreground mb-6">
              You'll have 10 minutes to complete all challenges. Good luck!
            </p>
            <Button onClick={startGame} size="lg">
              Start Training
            </Button>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <Timer className="w-6 h-6" />
                <span className="text-xl font-mono">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Trophy className="w-6 h-6" />
                <span className="text-xl">Score: {score}</span>
              </div>
            </div>

            <Progress
              value={(currentPuzzle / availablePuzzles.length) * 100}
              className="mb-8"
            />

            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {currentPuzzleData.title}
                </h2>
                <div className="text-sm text-muted-foreground">
                  Hints remaining: {hintsRemaining}
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                {currentPuzzleData.description}
              </p>

              <div className="mb-6">{renderPuzzle()}</div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={useHint}
                  disabled={hintsRemaining === 0}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Use Hint ({hintsRemaining} left)
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
