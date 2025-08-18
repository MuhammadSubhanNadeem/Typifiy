import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader({ className }) {
  return (
    <>
      <Loader2
        className={`relative animate-spin text-muted-foreground z-50 pointer-events-none ${className}`}
      />
    </>
  );
}
