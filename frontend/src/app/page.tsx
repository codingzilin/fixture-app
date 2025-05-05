import Link from "next/link";
import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className='text-4xl font-bold text-center mb-8 font-mono'>
          Fixtures Platform
        </h1>

        <FileUpload />

        <div className='mt-8 text-center'>
          <Link
            href='/search'
            className='inline-block bg-blue-600 text-white font-mono px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Go to Search Page
          </Link>
        </div>
      </div>
    </div>
  );
}
