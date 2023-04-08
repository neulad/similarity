"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useTheme } from "next-themes";
import { FC } from "react";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";
import { Laptop, Moon, Sun } from "lucide-react";
import { Icons } from "@/components/Icons";

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = ({}) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Sun
            className={cn(
              "rotate-0",
              "scale-100",
              "transition-all",
              "hover:text-sate-900",
              "dark:-rotate-90",
              "dark:scale-0",
              "dark:text-slate-400",
              "dark:hover:text-slate-100"
            )}
          />
          <Moon
            className={cn(
              "absolute",
              "rotate-90",
              "scale-0",
              "transition-all",
              "hover:text-slate-900",
              "dark:rotate-0",
              "dark:scale-100",
              "dark:text-slate-400",
              "dark:hover:text-slate-100"
            )}
          />
          <span className={cn("sr-only")}>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icons.Sun className={cn("mr-2", "h-4", "w-4")} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icons.Moon className={cn("mr-2", "h-4", "w-4")} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icons.Laptop className={cn("mr-2", "h-4", "w-4")} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
