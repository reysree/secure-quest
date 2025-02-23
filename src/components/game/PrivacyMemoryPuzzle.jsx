"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PrivacyMemoryPuzzle({ data, onComplete }) {
  const completedRef = useRef(false); // Prevent multiple calls
  // Generate card objects: each pair produces two cards (one for term, one for definition)
  const generateCards = () => {
    return data.pairs.flatMap((pair) => [
      {
        uniqueId: pair.id + "-term",
        pairId: pair.id,
        content: pair.term,
        type: "term",
      },
      {
        uniqueId: pair.id + "-def",
        pairId: pair.id,
        content: pair.definition,
        type: "definition",
      },
    ]);
  };

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices of currently flipped cards
  const [matched, setMatched] = useState({}); // key: pairId, value: true if matched
  const [disabled, setDisabled] = useState(false);

  // On mount, generate and shuffle cards
  useEffect(() => {
    const generatedCards = generateCards();
    // Simple shuffle
    setCards(generatedCards.sort(() => Math.random() - 0.5));
  }, [data]);

  const handleCardClick = (index) => {
    if (disabled) return;
    if (flipped.includes(index) || matched[cards[index].pairId]) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setTimeout(() => {
        const [firstIdx, secondIdx] = newFlipped;
        if (cards[firstIdx].pairId === cards[secondIdx].pairId) {
          setMatched((prev) => ({ ...prev, [cards[firstIdx].pairId]: true }));
        }
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  // Check if all pairs are matched and then call onComplete(true)
  useEffect(() => {
    if (
      Object.keys(matched).length === data.pairs.length &&
      !completedRef.current
    ) {
      completedRef.current = true; // Set flag to prevent re-execution
      onComplete(true);
    }
  }, [matched, data.pairs.length, onComplete]);

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Privacy Memory Challenge</h2>
      <p className="text-muted-foreground">
        Click a card to reveal its content, then try to match each term with its
        definition.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.uniqueId}
            onClick={() => handleCardClick(index)}
            className={`border p-4 rounded-md cursor-pointer text-center transition-colors ${
              flipped.includes(index) || matched[card.pairId]
                ? "bg-white text-black"
                : "bg-gray-200 text-black"
            }`}
          >
            {flipped.includes(index) || matched[card.pairId]
              ? card.content
              : "?"}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            // Reset the puzzle if needed
            setMatched({});
            setFlipped([]);
            setCards([...cards].sort(() => Math.random() - 0.5));
          }}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}
