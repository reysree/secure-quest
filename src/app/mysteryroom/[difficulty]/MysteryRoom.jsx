"use client";
import React, { useState } from "react";
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

// 3D interactive objects
import Scroll from "@/components/Scroll";
import Door from "@/components/Door";
import Computer from "@/components/Computer";
import Board from "@/components/Board";
import Safe from "@/components/Safe";
import TvScreen from "@/components/TvScreen";

// Puzzle components – ensure these are correctly imported from your files
//import { SortingPuzzle } from "@/components/game/SortingPuzzle";
import { DecryptionPuzzle } from "@/components/game/DecryptionPuzzle";
import { SecurityPuzzle } from "@/components/game/SecurityPuzzle";
import { SortingPuzzle } from "@/components/game/SortingPuzzle";

// Puzzle definitions
import { puzzles } from "@/lib/puzzles";

// The Room component creates the static 3D environment
function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Back Wall */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#666" side={2} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#666" side={2} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#666" side={2} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Front Wall (pushed far back) */}
      <mesh position={[0, 0, 30]} rotation={[0, 0, Math.PI]}>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color="#666" side={2} />
      </mesh>
    </group>
  );
}

// Helper to render the appropriate puzzle component based on type
function renderPuzzleComponent(puzzle, onComplete) {
  console.log("The puzzle type is : ", puzzle.type);
  switch (puzzle.type) {
    case "sorting":
      return <SortingPuzzle data={puzzle.data} onComplete={onComplete} />;
    case "decryption":
      return <DecryptionPuzzle data={puzzle.data} onComplete={onComplete} />;
    case "security":
      return <SecurityPuzzle data={puzzle.data} onComplete={onComplete} />;
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

  // When the scroll is clicked, open the overlay
  const handleScrollClick = () => {
    setOverlayOpen(true);
  };

  // When an interactive object is clicked, assign the puzzle based on its index
  const handleObjectClick = (index) => {
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

  // Callback for when a puzzle is completed
  const handlePuzzleComplete = (correct) => {
    if (correct) {
      toast({ title: "Correct!", description: "Task completed successfully" });
      setCompletedPuzzles((prev) => ({ ...prev, [activePuzzleIndex]: true }));
      setDialogOpen(false);
    } else {
      toast({
        title: "Incorrect",
        description: "Task incomplete. Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      {/* Assume game has started; the 3D room fills the screen */}
      <div className="relative w-screen h-screen">
        <Canvas
          shadows
          camera={{ position: [0, 2, 12], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
          <Room />

          {/* Interactive objects mapped to puzzle indices */}
          <Scroll onClick={handleScrollClick} />
          <Door
            onClick={() => handleObjectClick(5)}
            position={[10, -0.5, 0]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          <Computer
            onClick={() => handleObjectClick(2)}
            position={[0, -1, -9.95]}
          />
          <Board
            onClick={() => handleObjectClick(0)}
            position={[-9.8, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <Safe
            onClick={() => handleObjectClick(1)}
            position={[5, -1.6, -9.95]}
          />
          <TvScreen
            onClick={() => handleObjectClick(8)}
            position={[10, 0, -4]} // adjust these values as needed for your scene
          />
        </Canvas>
        <Dialog open={overlayOpen} onOpenChange={setOverlayOpen}>
          <DialogContent
            onPointerDownOutside={(e) => e.preventDefault()}
            className="bg-black/80 p-8 rounded-md"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src="/path/to/your/image.jpg"
                alt="Secret Info"
                className="mb-4 max-w-full"
              />
              <Button onClick={() => setOverlayOpen(false)}>Skip</Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Dialog box to render the puzzle */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
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
                </div>
                <DialogFooter>
                  <Button onClick={() => handlePuzzleComplete(false)}>
                    Complete
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
