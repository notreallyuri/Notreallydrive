"use client";

import { LayoutGrid, Rows2 } from "lucide-react";
import { useViewStore } from "@/store/view";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

export function ViewToggle() {
  const { setView, view } = useViewStore();

  return (
    <>
      <div className="inline-flex justify-between gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setView("grid")}
          className={cn("cursor-pointer", view === "grid" ? "bg-muted" : "")}
        >
          <LayoutGrid />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setView("list")}
          className={cn("cursor-pointer", view === "list" ? "bg-muted" : "")}
        >
          <Rows2 />
        </Button>
      </div>
    </>
  );
}
