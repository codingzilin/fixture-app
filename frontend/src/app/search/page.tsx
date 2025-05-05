import React from "react";
import FixtureSearch from "../components/FixtureSearch";
import Link from "next/link";

export default function Searchpage() {
  return (
    <div className='max-w-4xl mx-auto px-4'>
      <Link
        href='/'
        className='inline-block mb-6 text-blue-600 hover:text-blue-800'
      >
        Back to Upload
      </Link>
      <FixtureSearch />
    </div>
  );
}
