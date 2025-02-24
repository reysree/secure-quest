import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/redux/redux-provider";

const inter = Inter({ subsets: ["latin"] });

// ✅ Dynamic Metadata Function
export function generateMetadata() {
  return {
    title: "SecureQuest - Compliance Training Game",
    description: "Interactive compliance training through gamified scenarios",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ReduxProvider>
          {/* ✅ Pass store to Provider */}
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
