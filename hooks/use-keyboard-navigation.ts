"use client";

import { useState, useEffect, useCallback } from "react";

interface UseKeyboardNavigationProps {
  itemCount: number;
  isOpen: boolean;
  onSelect: (index: number) => void;
  onEscape: () => void;
}

export function useKeyboardNavigation({
  itemCount,
  isOpen,
  onSelect,
  onEscape,
}: UseKeyboardNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex(prev => (prev < itemCount - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : itemCount - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex !== -1) {
          onSelect(focusedIndex);
        }
        break;
      case "Escape":
        e.preventDefault();
        onEscape();
        break;
    }
  }, [isOpen, itemCount, focusedIndex, onSelect, onEscape]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { focusedIndex, setFocusedIndex };
}