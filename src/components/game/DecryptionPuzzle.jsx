"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";

export function SecurityPuzzle({ data, onComplete }) {
  const [selections, setSelections] = useState({});

  const handleSelection = (id, isPhishing) => {
    setSelections((prev) => ({
      ...prev,
      [id]: isPhishing,
    }));
  };

  const checkAnswers = () => {
    const isCorrect = data.emails.every(
      (email) => selections[email.id] === email.isPhishing
    );
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {data.emails.map((email) => (
          <Card key={email.id} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{email.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    From: {email.sender}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={
                      selections[email.id] === false ? "default" : "outline"
                    }
                    onClick={() => handleSelection(email.id, false)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Legitimate
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      selections[email.id] === true ? "destructive" : "outline"
                    }
                    onClick={() => handleSelection(email.id, true)}
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Phishing
                  </Button>
                </div>
              </div>
              <p className="text-sm p-3 bg-muted rounded-md">{email.content}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={checkAnswers}
          disabled={Object.keys(selections).length !== data.emails.length}
        >
          Submit Analysis
        </Button>
      </div>
    </div>
  );
}
