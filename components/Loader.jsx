import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <>
      <Loader2 className="absolute h-full w-full animate-spin text-muted-foreground z-50 pointer-events-none" />
    </>
  );
}
