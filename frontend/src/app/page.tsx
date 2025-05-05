import Link from "next/link";
import FileUpload from "./components/FileUpload";
import { TypingText } from "@/components/animate-ui/text/typing";
import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";
import { LuFileSearch } from "react-icons/lu";

export default function Home() {
  return (
    <div className='min-h-screen py-12 relative'>
      <StarsBackground className='fixed inset-0 -z-10' />
      <div className='max-w-4xl mx-auto px-4 relative z-10'>
        <TypingText
          className='text-4xl font-bold text-white text-center mb-8 font-mono flex justify-center'
          text='Fixtures Platform'
        />

        <FileUpload />

        <div className='mt-8 text-center'>
          <Link
            href='/search'
            className='inline-flex items-center gap-2 bg-gray-600 text-white font-mono px-6 py-3 rounded-lg hover:bg-gray-500 transition-colors'
          >
            <LuFileSearch />
            Go to Search
          </Link>
        </div>
      </div>
    </div>
  );
}
