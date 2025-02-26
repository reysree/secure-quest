"use client";
import { useState } from "react";
import { signUp } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Sign up and get user data
      const userData = await signUp(email, password, firstname, lastname);

      // Set user in Redux store
      dispatch(setUser(userData));

      // Show success message
      toast({
        title: "Account created successfully!",
        description: "Welcome to SecureQuest",
      });

      // Redirect to home page
      router.push("/");
    } catch (error) {
      setMessage(error.message);
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/login")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>
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
    </div>
  );
}
