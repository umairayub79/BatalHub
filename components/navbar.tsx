"use client";

import Link from "next/link";
import { BookOpen, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsModal } from "./settings-modal";
import { useState } from "react";

export function Navbar() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-2">
          <div className="flex w-full items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="hover:bg-primary/10"
              aria-label="Open settings"
            >
              <Settings className="h-5 w-5" />
            </Button>

            <Link 
              href="/" 
              className="flex items-center gap-2 transition-colors hover:text-primary absolute left-1/2 -translate-x-1/2"
            >
              <span className="font-bold text-xl">بلوچی بتل</span>
            </Link>

            <Link href="/browse">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/10"
                aria-label="Search proverbs"
              >
                <Search className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </>
  );
}