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
import Scroll from "@/components/Scroll";
import Door from "@/components/Door";
import Computer from "@/components/Computer";
import Board from "@/components/Board";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { puzzles } from "@/lib/puzzles";

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

export default function MysteryRoom({ difficulty }) {
  const [open, setOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const availablePuzzles = puzzles[difficulty] || [];
  const { toast } = useToast();

  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Training Started",
      description: "Complete the challenges before time runs out!",
    });
  };

  const handleScrollClick = () => {
    setOpen(true);
  };

  const handleBoxClick = () => {
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent p-8">
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
        <div className="relative w-screen h-screen">
          <Canvas
            shadows
            camera={{ position: [0, 2, 12], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
            <Room />

            {/* Scroll object */}
            <Scroll onClick={handleScrollClick} />

            {/* Door attached to the right wall.
            Position: x=10 (flush with right wall), y adjusted for vertical alignment.
            Rotation: rotated -90° around Y so its face is flush with the wall. */}
            <Door position={[10, -0.5, 0]} rotation={[0, -Math.PI / 2, 0]} />

            {/* Computer attached to the back wall.
            Position: z near -10 (flush with the back wall), with y adjusted for proper height. */}
            <Computer position={[0, -1, -9.95]} rotation={[0, 0, 0]} />

            <Board
              position={[-9.8, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
              onClick={handleBoxClick}
            />
          </Canvas>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Secret Scroll</DialogTitle>
                <DialogDescription>
                  This is some secret information about finance and data
                  privacy. Keep it confidential!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Task 1</DialogTitle>
                <DialogDescription>
                  This is some secret information about finance and data
                  privacy. Keep it confidential!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
