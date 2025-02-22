"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DecryptionPuzzle({ data, onComplete }) {
  const [userInput, setUserInput] = useState("");

  const checkAnswer = () => {
    const isCorrect =
      userInput.trim().toUpperCase() === data.solution.toUpperCase();
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Encrypted Message:</h4>
        <p className="text-lg font-mono">{data.encryptedMessage}</p>
        <p className="text-sm text-muted-foreground mt-2">Hint: {data.hint}</p>
      </Card>
      <div className="p-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter decrypted message"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={checkAnswer} disabled={!userInput}>
          Submit Decryption
        </Button>
      </div>
    </div>
  );
}
