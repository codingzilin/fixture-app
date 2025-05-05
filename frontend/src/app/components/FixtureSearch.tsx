"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TextRoll = dynamic(
  () =>
    import("../../../components/motion-primitives/text-roll").then(
      (mod) => mod.TextRoll
    ),
  { ssr: false }
);

interface Fixture {
  _id: string;
  fixture_mid: string;
  season: number;
  competition_name: string;
  fixture_datetime: string;
  fixture_round: number;
  home_team: string;
  away_team: string;
}

export default function FixtureSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchFixtures(debouncedSearchTerm);
    } else {
      setFixtures([]);
    }
  }, [debouncedSearchTerm]);

  const searchFixtures = async (term: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/fixtures/search?q=${encodeURIComponent(term)}`
      );
      const data = await response.json();
      setFixtures(data.fixtures);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <TextRoll
        className='text-4xl font-bold font-mono text-black dark:text-white'
        variants={{
          enter: {
            initial: { rotateX: 0, filter: "blur(0px)" },
            animate: { rotateX: 90, filter: "blur(2px)" },
          },
          exit: {
            initial: { rotateX: 90, filter: "blur(2px)" },
            animate: { rotateX: 0, filter: "blur(0px)" },
          },
        }}
      >
        Fixture Search
      </TextRoll>

      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search for a team...'
        className='w-full p-5 border font-mono border-gray-500 bg-white rounded-lg mt-12 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      {loading && <div>Loading...</div>}

      <div className='space-y-4'>
        {fixtures.map((fixture) => (
          <Popover key={fixture._id}>
            <PopoverTrigger asChild>
              <div className='p-4 border border-gray-400 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer'>
                <div className='font-semibold font-mono'>
                  {fixture.home_team} vs {fixture.away_team}
                </div>
                <div className='text-sm text-gray-600 font-mono'>
                  {new Date(fixture.fixture_datetime).toLocaleDateString()} -{" "}
                  {fixture.competition_name}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <div className='space-y-2 font-mono'>
                <h2 className='text-xl font-bold mb-2'>Fixture Details</h2>
                <p>
                  <strong>Competition:</strong> {fixture.competition_name}
                </p>
                <p>
                  <strong>Season:</strong> {fixture.season}
                </p>
                <p>
                  <strong>Round:</strong> {fixture.fixture_round}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(fixture.fixture_datetime).toLocaleString()}
                </p>
                <p>
                  <strong>Home Team:</strong> {fixture.home_team}
                </p>
                <p>
                  <strong>Away Team:</strong> {fixture.away_team}
                </p>
                <p>
                  <strong>Fixture ID:</strong> {fixture.fixture_mid}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
