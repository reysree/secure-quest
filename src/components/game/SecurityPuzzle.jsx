"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export function SecurityPuzzle({
  data,
  globalErrorCount,
  onComplete = () => {},
}) {
  const { toast } = useToast();

  // Local state to track user answers and errors
  const [selections, setSelections] = useState({});
  const [localErrorCount, setLocalErrorCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [onOmen, setOnOmen] = useState(false);

  // Helper: Build an array of { id, answer } from selections.
  const buildAnswersArray = () =>
    Object.keys(selections).map((id) => ({ id, answer: selections[id] }));

  // On mount and whenever we need to refresh the set, pick questions:
  useEffect(() => {
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
          console.log(
            "The first set of random questions are : ",
            result.indices
          );
          console.log("What does the data contain : ", data);
          const indicesAsStrings = result.indices.map((id) => String(id));
          const newQuestions = data.emails.filter((q) =>
            indicesAsStrings.includes(q.id)
          );
          setQuestions(newQuestions);
          if (result.feedback !== "") {
            setFeedback(result.feedback);
            setOnOmen(true);
          }

          setSelections({});
          console.log("The questions are : ", questions);
        } catch (parseError) {
          throw parseError;
        }
      } catch (error) {
        console.error("Error calling analysis API:", error);
      }
      // Reset selections when new questions are loaded.
      //setLocalErrorCount(0);
    }
    fetchQuestions();
  }, []);

  // useEffect(() => {
  //   setSelections({});
  // }, [globalErrorCount, data.emails]);
  // Handlers for selection and drag-and-drop remain the same:
  const handleSelection = (id, isPhishing) => {
    setSelections((prev) => ({
      ...prev,
      [id]: isPhishing,
    }));
  };

  // When the user clicks "Submit Analysis":
  const checkAnswers = async () => {
    const isCorrect = questions.every((q) => selections[q.id] === q.isPhishing);
    const wrongCount = questions.filter(
      (q) => selections[q.id] !== q.isPhishing
    ).length;
    if (wrongCount === 0) {
      // All correct
      onComplete(true, localErrorCount);
    } else {
      // Increase local error count and show toast
      setLocalErrorCount(wrongCount);
      toast({ title: "Incorrect classification" });

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
        setSelections({});
        setQuestions(newQuestions);
        if (result.feedback !== "") {
          setFeedback(result.feedback);
          setOnOmen(true);
        }
      } catch (error) {
        console.error("Error calling analysis API:", error);
        toast({
          title: "Error analyzing your answers",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="relative">
      {onOmen && (
        <div
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50"
          onClick={() => setOnOmen(false)}
        >
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
        </div>
      )}
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
    </div>
  );
}
