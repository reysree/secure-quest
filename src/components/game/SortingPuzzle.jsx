"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert } from "lucide-react";

export function SortingPuzzle({ data, onComplete }) {
  const [categorizedItems, setCategorizedItems] = useState({
    sensitive: [],
    "non-sensitive": [],
  });

  const [remainingItems, setRemainingItems] = useState(data.items);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const item = remainingItems.find((item) => item.id === id);
    console.log("The items in the categroized items are : ", categorizedItems);

    if (item) {
      setCategorizedItems((prev) => ({
        ...prev,
        [category]: [...prev[category], item.text],
      }));
      setRemainingItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const onHandleReset = () => {
    setCategorizedItems({
      sensitive: [],
      "non-sensitive": [],
    });
    setRemainingItems(data.items);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswer = () => {
    const isCorrect = data.items.every((item) => {
      const category = item.category;
      return categorizedItems[category]?.includes(item.text);
    });
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="p-4 border-2 border-dashed"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "sensitive")}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold">Sensitive Data</h3>
          </div>
          <div className="min-h-[200px] space-y-2">
            {categorizedItems.sensitive.map((text, index) => (
              <div key={index} className="p-2 bg-muted rounded-md">
                {text}
              </div>
            ))}
          </div>
        </Card>

        <Card
          className="p-4 border-2 border-dashed"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "non-sensitive")}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Non-Sensitive Data</h3>
          </div>
          <div className="min-h-[200px] space-y-2">
            {categorizedItems["non-sensitive"].map((text, index) => (
              <div key={index} className="p-2 bg-muted rounded-md">
                {text}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-semibold mb-3">Remaining Items:</h4>
        <div className="flex flex-wrap gap-2">
          {remainingItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="p-2 bg-card rounded-md cursor-move hover:bg-accent transition-colors"
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-start">
          <Button className="bg-red-600 text-white" onClick={onHandleReset}>
            Reset
          </Button>
        </div>
        <div className="flex justify-end">
          <Button onClick={checkAnswer} disabled={remainingItems.length > 0}>
            Check Classification
          </Button>
        </div>
      </div>
    </div>
  );
}
