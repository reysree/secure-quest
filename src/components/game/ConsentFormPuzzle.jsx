// components/game/ConsentFormPuzzle.jsx
"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ConsentFormPuzzle({ data, onComplete }) {
  // Create a state object where every field is initially enabled (true)
  const [selectedFields, setSelectedFields] = useState(
    data.fields.reduce((acc, field) => {
      acc[field.id] = true;
      return acc;
    }, {})
  );

  const toggleField = (id) => {
    setSelectedFields((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Check if only required fields are enabled.
  // For required fields, the value must be true.
  // For non-required fields, the value must be false.
  const checkAnswer = () => {
    const isCorrect = data.fields.every((field) => {
      return field.required
        ? selectedFields[field.id] === true
        : selectedFields[field.id] === false;
    });
    onComplete(isCorrect);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Consent Form Optimization</h2>
      <p className="text-muted-foreground">
        For this registration, only your Full Name and Email Address are
        required. Please disable any additional data fields.
      </p>
      <div className="space-y-2">
        {data.fields.map((field) => (
          <div key={field.id} className="flex items-center justify-between">
            <span>{field.label}</span>
            <button
              onClick={() => toggleField(field.id)}
              className={`px-2 py-1 border rounded transition-colors ${
                selectedFields[field.id]
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {selectedFields[field.id] ? "Enabled" : "Disabled"}
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={checkAnswer}>Submit</Button>
      </div>
    </Card>
  );
}
