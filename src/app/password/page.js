"use client";
import { useState } from "react";
import { resetPassword } from "@/firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(email);
      setMessage(response.message);
      toast({
        title: "Email Sent",
        description: "Check your email for the password reset link.",
      });
    } catch (error) {
      setMessage(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Reset Password
        </Button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
