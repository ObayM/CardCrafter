import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/navbar'
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CardCrafter",
  description: "Craft Flashcards With Ease",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}</body>
    </html>
    </ClerkProvider>
  );
}
