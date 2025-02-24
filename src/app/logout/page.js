"use client";
import { useEffect } from "react";
import { logout } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/userSlice";
import { toast } from "@/hooks/use-toast";

export default function LogoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        dispatch(clearUser()); // ✅ Remove user from Redux
        localStorage.removeItem("user"); // ✅ Remove user from localStorage
        toast({
          title: "Logged out",
          description: "You have been signed out.",
        });
        router.push("/"); // ✅ Redirect to login
      } catch (error) {
        console.error("Logout Error:", error);
        toast({
          title: "Logout Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    handleLogout();
  }, [router, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Logging Out...</h2>
      <p className="text-muted-foreground">You will be redirected shortly.</p>
    </div>
  );
}
