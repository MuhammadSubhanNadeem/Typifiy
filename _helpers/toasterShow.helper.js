"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToasterShow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error"); // only read once
  const success = searchParams.get("success");

  useEffect(() => {
    if (error) {
      // small delay to ensure hydration + Toaster is ready
      setTimeout(() => toast.error(error), 50);

      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");

      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");

      router.replace(newUrl, { scroll: false });
    }
    if (success) {
      setTimeout(() => toast.success(success), 50);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("success");

      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");

      router.replace(newUrl, { scroll: false });
    }
  }, [error, success]);

  return null;
}
