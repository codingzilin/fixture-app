import React from "react";
import FixtureSearch from "../components/FixtureSearch";
import { HexagonBackground } from "@/components/animate-ui/backgrounds/hexagon";
import { FlipButton } from "@/components/animate-ui/buttons/flip";
import Link from "next/link";

export default function SearchPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <HexagonBackground className='fixed inset-0 flex items-center justify-center rounded-xl' />
      <div className='relative max-w-4xl mx-auto px-4'>
        <Link href='/'>
          <FlipButton
            frontText='Back to Upload'
            backText='Click to Return'
            className='mb-6'
          />
        </Link>
        <FixtureSearch />
      </div>
    </div>
  );
}
