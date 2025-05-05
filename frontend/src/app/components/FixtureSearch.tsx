"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";

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
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);

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
      <h1 className='text-3xl font-bold mb-6'>Fixture Search</h1>

      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search for a team...'
        className='w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      {loading && <div>Loading...</div>}

      <div className='space-y-4'>
        {fixtures.map((fixture) => (
          <div
            key={fixture._id}
            onClick={() => setSelectedFixture(fixture)}
            className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer'
          >
            <div className='font-semibold'>
              {fixture.home_team} vs {fixture.away_team}
            </div>
            <div className='text-sm text-gray-600'>
              {new Date(fixture.fixture_datetime).toLocaleDateString()} -{" "}
              {fixture.competition_name}
            </div>
          </div>
        ))}
      </div>

      {selectedFixture && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full'>
            <h2 className='text-2xl font-bold font-mono mb-4'>
              Fixture Details
            </h2>
            <div className='space-y-2 font-mono'>
              <p>
                <strong>Competition:</strong> {selectedFixture.competition_name}
              </p>
              <p>
                <strong>Season:</strong> {selectedFixture.season}
              </p>
              <p>
                <strong>Round:</strong> {selectedFixture.fixture_round}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedFixture.fixture_datetime).toLocaleString()}
              </p>
              <p>
                <strong>Home Team:</strong> {selectedFixture.home_team}
              </p>
              <p>
                <strong>Away Team:</strong> {selectedFixture.away_team}
              </p>
              <p>
                <strong>Fixture ID:</strong> {selectedFixture.fixture_mid}
              </p>
            </div>
            <Button
              onClick={() => setSelectedFixture(null)}
              className='mt-6 w-full font-mono bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700'
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
