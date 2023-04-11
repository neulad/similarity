import { cn } from "@/lib/utils";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className={cn("pt-20")}>{children}</section>;
}
