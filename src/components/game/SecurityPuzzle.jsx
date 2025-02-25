"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export function SecurityPuzzle({
  data,
  globalErrorCount,
  onComplete = () => {},
}) {
  const { toast } = useToast();

  // Local state to track user answers and errors
  const [selections, setSelections] = useState({});
  const [localErrorCount, setLocalErrorCount] = useState(globalErrorCount);
  const [questions, setQuestions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [onOmen, setOnOmen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showNewQuestions, setShowNewQuestions] = useState(true);

  // Helper: Build an array of { id, answer } from selections.
  const buildAnswersArray = () =>
    Object.keys(selections).map((id) => ({ id, answer: selections[id] }));

  async function fetchQuestions() {
    try {
      const response = await fetch("/api/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          errorCount: globalErrorCount,
          answersArray: [], // initially empty
        }),
      });
      let result;
      try {
        result = await response.json();
        const indicesAsStrings = result.indices.map((id) => String(id));
        const newQuestions = data.emails.filter((q) =>
          indicesAsStrings.includes(q.id)
        );
        setLoading(false);
        setQuestions(newQuestions);
        setSelections({});
      } catch (parseError) {
        throw parseError;
      }
    } catch (error) {
      console.error("Error calling analysis API:", error);
    }
  }

  // On mount and whenever we need to refresh the set, pick questions:
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handlers for selection and drag-and-drop remain the same:
  const handleSelection = (id, isPhishing) => {
    setSelections((prev) => ({
      ...prev,
      [id]: isPhishing,
    }));
  };

  const handleRetakeChallenge = () => {
    setOnOmen(false);
    setShowNewQuestions(true);
  };

  // When the user clicks "Submit Analysis":
  const checkAnswers = async () => {
    const wrongCount = questions.filter(
      (q) => selections[q.id] !== q.isPhishing
    ).length;
    if (wrongCount === 0) {
      // All correct
      onComplete(true, localErrorCount);
      return;
    }
    // Increase local error count and show toast
    toast({
      title: "Incorrect Answers",
      variant: "destructive",
    });
    setLocalErrorCount(wrongCount);
    // Build the answers array from current selections
    const answersArray = buildAnswersArray();
    try {
      // Call the OpenAI API route to analyze performance and get new indices
      const response = await fetch("/api/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          errorCount: wrongCount,
          answersArray,
        }),
      });
      const result = await response.json();
      const indicesAsStrings = result.indices.map((id) => String(id));
      const newQuestions = data.emails.filter((q) =>
        indicesAsStrings.includes(q.id)
      );
      if (result.feedback !== "") {
        setFeedback(result.feedback);
        setOnOmen(true);
        setShowNewQuestions(false); // Hide questions when showing feedback
      }
      setSelections({});
      setQuestions(newQuestions);
    } catch (error) {
      console.error("Error calling analysis API:", error);
      toast({
        title: "Error analyzing your answers",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="flex flex-col space-y-3 min-h-[150px]">
          <Skeleton className="w-full h-[100px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
      {onOmen && (
        <div className="bg-black/80 flex flex-col items-center justify-center z-50">
          <Image
            src="/valorant-omen.gif"
            alt="Feedback"
            width={300}
            height={300}
            className="rounded-lg"
          />
          <p className="text-white bg-blue-600 rounded-lg text-xl mt-4 p-4">
            Feedback: {feedback}
          </p>
          <Button
            onClick={handleRetakeChallenge}
            className="mt-4 text-white bg-red-500"
          >
            Retake Challenge
          </Button>
        </div>
      )}
      {showNewQuestions && (
        <div className="space-y-6">
          <div className="grid gap-4">
            {questions.map((q) => (
              <Card key={q.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{q.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        From: {q.sender}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={
                          selections[q.id] === false ? "default" : "outline"
                        }
                        onClick={() => handleSelection(q.id, false)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Legitimate
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          selections[q.id] === true ? "destructive" : "outline"
                        }
                        onClick={() => handleSelection(q.id, true)}
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Phishing
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm p-3 bg-muted rounded-md">{q.content}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              onClick={checkAnswers}
              disabled={Object.keys(selections).length !== questions.length}
            >
              Submit Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
