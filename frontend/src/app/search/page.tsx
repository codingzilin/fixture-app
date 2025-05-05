"use client";
import React from "react";
import FixtureSearch from "../components/FixtureSearch";
import Link from "next/link";
import dynamic from "next/dynamic";

const HexagonBackground = dynamic(
  () =>
    import("@/components/animate-ui/backgrounds/hexagon").then(
      (mod) => mod.HexagonBackground
    ),
  { ssr: false }
);

const FlipButton = dynamic(
  () =>
    import("@/components/animate-ui/buttons/flip").then(
      (mod) => mod.FlipButton
    ),
  { ssr: false }
);

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
