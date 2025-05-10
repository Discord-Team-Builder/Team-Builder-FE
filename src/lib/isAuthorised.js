"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getStatus } from "@/api/APICall";

export default function useAuthorised(redirect = true) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null indicates loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getStatus();
        if (response?.isLoggedIn === true) {
          setIsLoggedIn(true);
        } else {
          throw new Error("Not logged in");
        }
      } catch (error) {
        setIsLoggedIn(false);
        toast.error("You are not logged in");
        if (redirect) router.replace("/login");
      }
    };

    checkAuth();
  }, [router, redirect]);

  return isLoggedIn;
}
