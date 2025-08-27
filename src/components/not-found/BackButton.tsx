"use client";

import { Button } from "@/components/ui/button";

export default function BackButton() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        if (typeof window !== "undefined") window.history.back();
      }}
    >
      Go Back
    </Button>
  );
}
