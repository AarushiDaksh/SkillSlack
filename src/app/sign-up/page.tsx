"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; 

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="p-4">
      {/* Header bar with back & user buttons */}
      <div className="flex justify-between items-center mb-6">
     
        <Button variant="outline" onClick={() => router.push("/")}>
          ← Go Back
        </Button>

        {/* Clerk User Button */}
        <UserButton afterSignOutUrl="/" />
      </div>
  </div>
  );
}
