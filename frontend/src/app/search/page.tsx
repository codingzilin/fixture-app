import React from "react";
import FixtureSearch from "../components/FixtureSearch";
import Link from "next/link";

export default function Searchpage() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4'>
        <Link
          href='/'
          className='inline-block mb-6 font-mono text-blue-600 hover:text-blue-800'
        >
          Back to Upload
        </Link>
        <FixtureSearch />
      </div>
    </div>
  );
}
