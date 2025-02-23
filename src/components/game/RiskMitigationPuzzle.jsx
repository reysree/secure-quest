"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RiskMitigationPuzzle({ data, onComplete }) {
  const { scenarios, mitigations } = data;

  // State to store the assigned mitigation for each scenario (by scenario id)
  const [assignments, setAssignments] = useState({});

  // Handler for when a mitigation card is dragged
  const handleDragStart = (e, mitigationId) => {
    e.dataTransfer.setData("mitigationId", mitigationId);
  };

  // Handler for when a scenario drop zone receives a drop
  const handleDrop = (e, scenarioId) => {
    e.preventDefault();
    const mitigationId = e.dataTransfer.getData("mitigationId");
    setAssignments((prev) => ({ ...prev, [scenarioId]: mitigationId }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswers = () => {
    const isCorrect = scenarios.every(
      (scenario) => assignments[scenario.id] === scenario.correctMitigation
    );
    onComplete(isCorrect);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Risk Mitigation Challenge</h2>
      <p className="text-muted-foreground">
        Drag the appropriate mitigation measure onto each risk scenario.
      </p>
      {/* Flex container for side-by-side layout */}
      <div className="flex flex-row gap-8">
        {/* Left Column: Risk scenarios */}
        <div className="flex-1 space-y-4">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="border p-4 rounded-md">
              <p className="font-semibold">{scenario.description}</p>
              <div
                onDrop={(e) => handleDrop(e, scenario.id)}
                onDragOver={handleDragOver}
                className="mt-2 h-12 border-dashed border rounded-md flex items-center justify-center"
              >
                {assignments[scenario.id] ? (
                  <span className="text-sm font-medium">
                    {
                      mitigations.find((m) => m.id === assignments[scenario.id])
                        ?.text
                    }
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Drop mitigation here
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Right Column: Draggable mitigation measures */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold mb-4">
            Available Mitigation Measures
          </h3>
          <div className="flex flex-col gap-4">
            {mitigations.map((mitigation) => (
              <div
                key={mitigation.id}
                draggable
                onDragStart={(e) => handleDragStart(e, mitigation.id)}
                className="p-2 border rounded-md cursor-move hover:bg-accent transition-colors"
              >
                {mitigation.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={checkAnswers}>Submit</Button>
      </div>
    </Card>
  );
}
