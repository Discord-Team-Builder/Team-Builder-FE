"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getStatus } from "@/api/APICall";

export default function useAuthorised() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null indicates loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getStatus();
        if (response.statusCode === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false)
          throw new Error("Not logged in");
        }
      } catch (error) {
        setIsLoggedIn(false);
        toast.error("You are not logged in");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {isLoggedIn, loading};
}
