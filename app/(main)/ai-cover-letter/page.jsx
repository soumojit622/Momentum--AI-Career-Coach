import { getCoverLetters } from "@/actions/cover-letter";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">My Cover Letters</h1>
        <Link href="/ai-cover-letter/new">
          <RainbowButton className="flex items-center md:px-3 md:py-2 rounded-lg text-black hover:opacity-80">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </RainbowButton>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
