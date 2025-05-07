"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useAuthorised() {
  const router = useRouter();
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      toast.error("You need to be logged in to access this page.");
      router.push("/login");
    }
    router.push("/dashboard");
    

  }, [router]);
}