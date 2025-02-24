"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// 3D interactive objects
import Door from "@/components/Door";
import Computer from "@/components/Computer";
import Board from "@/components/Clock";
import Safe from "@/components/Safe";
import Star from "@/components/Star";
import LightSwitch from "@/components/LightSwitch";
import Cupboard from "@/components/CupBoard";

// Puzzle components – ensure these are correctly imported from your files
//import { SortingPuzzle } from "@/components/game/SortingPuzzle";
import { DecryptionPuzzle } from "@/components/game/DecryptionPuzzle";
import { SecurityPuzzle } from "@/components/game/SecurityPuzzle";
import { SortingPuzzle } from "@/components/game/SortingPuzzle";
import { RiskMitigationPuzzle } from "@/components/game/RiskMitigationPuzzle";
import { PrivacyMemoryPuzzle } from "@/components/game/PrivacyMemoryPuzzle";

// Puzzle definitions
import { puzzles } from "@/lib/puzzles";
import Flowerpot from "@/components/FlowerPot";
import CoffeeMachine from "@/components/CoffeeMachine";
import Oven from "@/components/Oven";
import Dustbin from "@/components/Dustbin";
import XeroxMachine from "@/components/XeroxMachine";
import Table from "@/components/Table";
import CeilingFan from "@/components/CeilingFan";
import Clock from "@/components/Clock";
import Chat from "@/components/Chat";
import { Label } from "@radix-ui/react-label";

// The Room component creates the static 3D environment
function Room({ isBright }) {
  // Use the isBright state to determine room colors.
  const floorColor = isBright ? "#f4d03f" : "#444"; // cream vs dark gray
  const wallColor = isBright ? "#fdebd0" : "#666"; // white vs medium gray
  const ceilingColor = isBright ? "#fdfefe" : "#555"; // white vs dark gray

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      {/* Back Wall */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color={wallColor} side={2} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color={wallColor} side={2} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color={wallColor} side={2} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={ceilingColor} />
      </mesh>
      {/* Front Wall (pushed far back) */}
      <mesh position={[0, 0, 30]} rotation={[0, 0, Math.PI]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color={wallColor} side={2} />
      </mesh>
    </group>
  );
}

// Helper to render the appropriate puzzle component based on type
function renderPuzzleComponent(puzzle, onComplete) {
  //console.log("The puzzle seleceted is : ", puzzle.type);
  //console.log("The puzzle data being sent is : ", puzzle.data);
  switch (puzzle.type) {
    case "sorting":
      return <SortingPuzzle data={puzzle.data} onComplete={onComplete} />;
    case "decryption":
      return <DecryptionPuzzle data={puzzle.data} onComplete={onComplete} />;
    case "security":
      return <SecurityPuzzle data={puzzle.data} onComplete={onComplete} />;
    case "risk-mitigation":
      return (
        <RiskMitigationPuzzle data={puzzle.data} onComplete={onComplete} />
      );
    case "memory":
      return <PrivacyMemoryPuzzle data={puzzle.data} onComplete={onComplete} />;
    default:
      return <div>Unknown puzzle type</div>;
  }
}

export default function MysteryRoom({ difficulty }) {
  const { toast } = useToast();
  // Get puzzles for the selected difficulty level
  const availablePuzzles = puzzles[difficulty] || [];

  // State to track which puzzle (object) is active
  const [activePuzzleIndex, setActivePuzzleIndex] = useState(null);
  // State to control dialog visibility
  const [dialogOpen, setDialogOpen] = useState(false);
  // Track completed puzzles by index (so the object won’t reopen its dialog)
  const [completedPuzzles, setCompletedPuzzles] = useState({});

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [taskTimer, setTaskTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  // Record elapsed time for each task (object keyed by puzzle index).
  const [taskTimes, setTaskTimes] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [isBright, setIsBright] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const riddles = [
    {
      riddle: `Without light, secrets hide;
Press the red switch, let brightness guide.`,
      hint: "Press the red switch to turn on the light and unlock the tasks.",
    },
    {
      riddle: `I’m ever-ticking, yet I never flee,
My hands sweep silently for all to see.
I mark each moment with endless grace—
What device measures time in its place?`,
      hint: "Look for the object that keeps track of time.",
    },
    {
      riddle: `Within my circuits, vast knowledge is stored,
Keys unlock secrets, though I’m not adored.
I process data in a digital flight—
Which device brings wisdom to light?`,
      hint: "Seek the object that resembles a modern scribe",
    },
    {
      riddle: `I may look like a simple box with just two shelves,
But within my humble frame, secrets and treasures dwell.
Unlock my quiet exterior to reveal what I guard—
What am I?`,
      hint: "Don’t be fooled by my plain appearance; sometimes the safest vaults come in the most unassuming forms.",
    },
    {
      riddle: `Behind wooden doors, mysteries wait in a row,
Shelves hide the clues that you need to know.
Open me carefully, the answers are stored—
Which container reveals what’s truly in hoard?`,
      hint: "Look for the storage that conceals hidden insights.",
    },
    {
      riddle: `Congratulations you have completed all the tasks. Open the door to go further`,
      hint: "Next Level",
    },
  ];

  const toggleBrightness = () => {
    if (!isBright) {
      setIsBright(true);
      setCurrentRiddle((prev) => prev + 1);
      setTimeout(() => {
        handleScrollClick();
      }, 1000);
    }
  };

  // When the scroll is clicked, open the overlay
  const handleScrollClick = () => {
    setOverlayOpen(true);
  };

  const handleHint = () => {
    setOverlayOpen(true);
  };

  // When an interactive object is clicked, assign the puzzle based on its index

  const handleDoorOpen = () => {
    if (currentPuzzle == availablePuzzles.length) {
      // toast({
      //   title: "Congratulations!",
      //   description:
      //     "You have completed all the tasks in the room and are ready to move to the next level",
      //   className: "bg-green-500 text-black",
      // });
      const total_time = Object.values(taskTimes).reduce(
        (acc, time) => acc + time,
        0
      );
      //console.log("The total time taken is : ", totalTime);
      setTotalTime(total_time);
      setDoorOpen(true);
    } else {
      toast({
        title: "Can't Escape",
        description: "Please complete all the tasks in the room to exit",
        variant: "destructive",
      });
    }
  };

  const handleObjectClick = (index) => {
    // Only allow clicking on the object whose index equals the currentPuzzle index
    if (index !== currentPuzzle || isBright == false) {
      //toast({ title: "Please complete previous tasks first" });
      return;
    }
    // If puzzle already completed, show a message
    if (completedPuzzles[index]) {
      toast({ title: "Puzzle already completed" });
      return;
    }
    if (index < availablePuzzles.length) {
      setActivePuzzleIndex(index);
      setDialogOpen(true);
    } else {
      toast({ title: "No puzzle assigned to this object" });
    }
  };

  useEffect(() => {
    if (dialogOpen && activePuzzleIndex !== null) {
      // Start a timer that updates every second.
      const id = setInterval(() => {
        setTaskTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      // Reset timer when dialog closes.
      setTaskTimer(0);
    }
    // Cleanup when unmounting.
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [dialogOpen, activePuzzleIndex]);

  const startGame = () => {
    setGameStarted(true);
    handleScrollClick();
    toast({
      title: "Training Started",
    });
  };

  // Callback for when a puzzle is completed
  const handlePuzzleComplete = (correct) => {
    if (correct) {
      toast({ title: "Correct!", description: "Task completed successfully" });
      console.log("The time taken for this puzzle is : ", taskTimer);
      // Save the elapsed time for this puzzle.
      setTaskTimes((prev) => ({ ...prev, [activePuzzleIndex]: taskTimer }));
      setCompletedPuzzles((prev) => ({ ...prev, [activePuzzleIndex]: true }));
      setScore((prev) => prev + availablePuzzles[currentPuzzle].points);
      setCurrentPuzzle((prev) => prev + 1);
      setDialogOpen(false);
      setCurrentRiddle((prev) => prev + 1);
      setTimeout(() => {
        handleScrollClick();
      }, 1000);
    } else {
      toast({
        title: "Incorrect",
        description: "Task incomplete. Please try again.",
        variant: "destructive",
      });
      // The timer continues if incorrect.
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      {!gameStarted ? (
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Ready to Begin?</h1>
            <p className="text-muted-foreground mb-6">
              Solve all the challenges.
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Important Instructions:
              </h2>
              <br />
              <br />
              <ol className="text-left inline-block text-base">
                <li className="mb-2">
                  Follow the riddles to understand what to do next.
                </li>
                <li className="mb-2">
                  You can ask Cypher if you need any assistance with the topics.
                </li>
                <li className="mb-2">
                  The more time you take to solve the problem, the fewer points
                  you score.
                </li>
                <li className="mb-2">
                  Each time you submit with a wrong answer, some points are
                  deducted.
                </li>
                <li className="mb-2">
                  Viewing the resources for each task will not deduct any
                  points.
                </li>
              </ol>
            </div>
            <Button onClick={startGame} size="lg">
              Start Gaming
            </Button>
          </Card>
        </div>
      ) : (
        <div className="relative w-screen h-screen">
          <Progress
            value={(currentPuzzle / availablePuzzles.length) * 100}
            className="fixed h-4"
          />
          <Canvas
            shadows
            camera={{ position: [0, 2, 12], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
            <Room isBright={isBright} />
            <Door
              onClick={handleDoorOpen}
              position={[10, -0.5, 0]}
              rotation={[0, -Math.PI / 2, 0]}
            />
            <Computer
              onClick={() => handleObjectClick(1)}
              position={[0.4, 0.2, -9.95]}
            />
            <Clock
              onClick={() => handleObjectClick(0)}
              position={[5, 1.5, -5]}
              rotation={[0, Math.PI / 90, 0]}
            />
            <Safe
              onClick={() => handleObjectClick(2)}
              position={[8, -1.7, -9.9]}
            />
            <LightSwitch
              onClick={toggleBrightness}
              isOn={isBright}
              position={[10, 1, 1]} // adjust position to be beside the door
              rotation={[0, -Math.PI / 2, 0]}
            />
            <Cupboard
              onClick={() => handleObjectClick(3)}
              position={[-9, 0, 2]} // Adjust position to attach to a wall or as desired
              rotation={[0, Math.PI / 2, 0]}
            />
            <Flowerpot
              position={[-6.4, -1, 0]} // Adjust position to attach to a wall or as desired
              rotation={[0, Math.PI / 2, 0]}
            />
            <Flowerpot
              position={[-6.4, -1, 1]} // Adjust position to attach to a wall or as desired
              rotation={[0, Math.PI / 2, 0]}
            />
            <Flowerpot
              position={[-6.4, -1, 2]} // Adjust position to attach to a wall or as desired
              rotation={[0, Math.PI / 2, 0]}
            />
            <CoffeeMachine
              position={[-6.8, 0, 4]} // Adjust position to attach to a wall or as desired
              rotation={[0, Math.PI / 2, 0]}
              //onClick={handleScrollClick}
            />
            <Oven
              position={[2.4, -1, -3]} // Adjust position to attach to a wall or as desired
              rotation={[0, Math.PI / 90, 0]}
            />
            <Dustbin
              position={[-0.8, -1.5, -4.8]} // Adjust position to attach to a wall or as desired
              rotation={[0, Math.PI / 2, 0]}
            />
            <XeroxMachine
              position={[-6.4, -1.3, -3.3]} // Adjust position to attach to a wall or as desired
              rotation={[0, Math.PI / 4, 0]}
            />
            <Table position={[-2.7, -1, -2.2]} rotation={[0, 0, 0]} />
            <CeilingFan position={[-1, 2, 0]} />
          </Canvas>
          {overlayOpen && (
            <div
              className="fixed inset-0 bg-black/80 flex flex-row items-center justify-center z-50"
              onClick={() => setOverlayOpen(false)} // Close when clicked
            >
              <Image
                src="/anime-cypher-spray-cypher-removebg.png"
                alt="Secret Info"
                width={400}
                height={100}
                className="rounded-lg"
              />
              <div className="flex flex-col items-center justify-center pl-8">
                <Label className="text-3xl font-bold text-white">
                  {riddles[currentRiddle].riddle}
                </Label>
                <Label className="text-2xl text-white italic pt-3">
                  {riddles[currentRiddle].hint}
                </Label>
                <Label className="text-2xl text-white italic pt-3">
                  Score : {score}
                </Label>
              </div>
            </div>
          )}
          {doorOpen && (
            <div
              className="fixed inset-0 bg-black/80 flex flex-row items-center justify-center z-50"
              onClick={() => setDoorOpen(false)} // Close when clicked
            >
              <Image
                src="/cypher-level-complete.png"
                alt="Level Completed"
                width={400}
                height={100}
                className="rounded-lg"
              />
              <div className="flex flex-col items-center justify-center pl-8">
                <Label className="text-3xl font-bold text-white">
                  Congratulations! on clearing this level. You have done well.
                </Label>
                <Label className="text-2xl text-white italic pt-3">
                  Total Points Scored : {score}
                </Label>
                <Label className="text-2xl text-white italic pt-3">
                  Time Taken : {totalTime} seconds
                </Label>
              </div>
            </div>
          )}

          {/* Dialog box to render the puzzle */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              className="bg-black/80 p-8 rounded-md max-h-[80vh] overflow-y-auto max-w-[90vh]"
            >
              {activePuzzleIndex !== null && (
                <>
                  <DialogHeader>
                    <DialogTitle>
                      {availablePuzzles[activePuzzleIndex].title}
                    </DialogTitle>
                    <DialogDescription>
                      {availablePuzzles[activePuzzleIndex].description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="my-4">
                    {renderPuzzleComponent(
                      availablePuzzles[activePuzzleIndex],
                      handlePuzzleComplete
                    )}
                    {/* <p>{taskTimer}</p> */}
                  </div>
                  {/* <DialogFooter>
                    <Button onClick={() => handlePuzzleComplete(false)}>
                      Complete
                    </Button>
                  </DialogFooter> */}
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
      <Chat></Chat>

      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={handleHint}
          className="fixed bottom-4 left-4 bg-blue-500 text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
        >
          ?
        </button>
      </div>
    </div>
  );
}
