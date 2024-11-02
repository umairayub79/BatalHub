"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className="flex justify-center items-center space-x-2" aria-label="Pagination">
      {/* Previous Page Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Current Page Indicator */}
      <div aria-label="Current page indicator" className="text-center text-xl px-4 font-medium">
       {totalPages} /  <strong>{currentPage}</strong> 
      </div>

      {/* Next Page Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </nav>
  );
}
