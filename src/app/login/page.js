"use client";
import { useState } from "react";
import { login } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  //const [noLogin, setNoLogin] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userdata = await login(email, password);
      dispatch(setUser(userdata));
      setMessage("Login successful!");
      router.push("/"); // Redirect after login
    } catch (error) {
      setMessage(error.message);
      toast({
        title: "Login Credentials not Found",
        description: "sign up to login",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
        <Button type="submit" className="bg-green-500 text-white p-2 rounded">
          Log In
        </Button>
        <div className="flex">
          <Link href="/signup">
            <Button className="bg-blue-500 text-white rounded">Sign Up</Button>
          </Link>
          <Link href="/password">
            <Button className="bg-red-500 text-white ml-2 rounded">
              Forgot password
            </Button>
          </Link>
        </div>
      </form>
      {/* {message && <p className="mt-2">{message}</p>} */}
    </div>
  );
}
