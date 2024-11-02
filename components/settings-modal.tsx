"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fontFamilies = [
  { value: "system", label: "System Default" },
  { value: "var(--font-balochi)", label: "Balochi Nastalik" },
  { value: "var(--font-amiri)", label: "Amiri" },
  { value: "var(--font-ibm-plex-sans-arabic)", label: "IBM Plex Sans Arabic" },
];

const colorAccents = [
  { value: "slate", label: "پُر" },
  { value: "blue", label: "سبز" },
  { value: "violet", label: "جَمو" },
  { value: "rose", label: "گُل سُہر" },
];

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [fontFamily, setFontFamily] = useState("system");
  const [fontSize, setFontSize] = useState(16);
  const [accent, setAccent] = useState("slate");

  useEffect(() => {
    setMounted(true);

    // Load settings from local storage
    const savedFontFamily = localStorage.getItem("fontFamily") || "system";
    const savedFontSize = parseInt(localStorage.getItem("fontSize") || "16");
    const savedAccent = localStorage.getItem("accent") || "slate";
    const savedTheme = localStorage.getItem("theme") || "system";

    setFontFamily(savedFontFamily);
    setFontSize(savedFontSize);
    setAccent(savedAccent);
    setTheme(savedTheme);
    document.documentElement.style.setProperty(
      "--font-family",
      savedFontFamily
    );
    document.body.style.fontFamily = `var(--font-family)`;
    document.documentElement.style.fontSize = `${savedFontSize}px`;
    document.documentElement.setAttribute("data-accent", savedAccent);
  }, [setTheme]);

  if (!mounted) return null;

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    document.documentElement.style.setProperty("--font-family", value);
    document.body.style.fontFamily = `var(--font-family)`;
    localStorage.setItem("fontFamily", value);
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
    localStorage.setItem("fontSize", value[0].toString());
  };

  const handleAccentChange = (value: string) => {
    setAccent(value);
    document.documentElement.setAttribute("data-accent", value);
    localStorage.setItem("accent", value);
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    localStorage.setItem("theme", value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl">رد ءُ بند</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 w-full">
          <div className="space-y-2">
            <Label>دْروشُم</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger>
                <SelectValue placeholder="دْروشُم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">رُژنائیں دروشم</SelectItem>
                <SelectItem value="dark">سیاہیں دروشم</SelectItem>
                <SelectItem value="system">سسٹم</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>نبشتہئے شکل</Label>
            <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
              <SelectTrigger>
                <SelectValue placeholder="نبشتہئے شکل" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>نبشتہئے کساس ({fontSize}px)</Label>
            <Slider
              value={[fontSize]}
              onValueChange={handleFontSizeChange}
              min={12}
              max={24}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>تھیم</Label>
            <Select value={accent} onValueChange={handleAccentChange}>
              <SelectTrigger>
                <SelectValue placeholder="تھیم" />
              </SelectTrigger>
              <SelectContent>
                {colorAccents.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    {color.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
