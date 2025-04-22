"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const ToasterProvider = () => {
  const { theme = "system" } = useTheme();

  return <Sonner theme={theme} />;
};

export default ToasterProvider;
