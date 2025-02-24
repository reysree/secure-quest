"use client";
import { useState } from "react";
import { signUp } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, firstname, lastname);
      setMessage("Signup successful!");
      router.push("/"); // Redirect after signup
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="FirstName"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="LastName"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </Button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
