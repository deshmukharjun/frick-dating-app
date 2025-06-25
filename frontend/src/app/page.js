// app/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/matches"); // instantly redirects
  }, [router]);

  return null;
}
