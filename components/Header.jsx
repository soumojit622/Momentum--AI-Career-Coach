import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RainbowButton } from "./ui/rainbow-button";
import { ShimmerButton } from "./ui/shimmer-button";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Momentum Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
          <span className="text-xl sm:text-2xl font-semibold text-primary">
            Momentum
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            {/* Dashboard Link */}
            <Link href="/dashboard">
              <ShimmerButton className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black p-2 rounded-lg hover:opacity-80 transition-all duration-300">
                <LayoutDashboard className="h-4 w-4 text-white" />
                <span className="text-white text-sm">Industry Insights</span>
              </ShimmerButton>
              <ShimmerButton className="md:hidden w-10 h-10 p-0 flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </ShimmerButton>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <RainbowButton className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-2 rounded-lg text-black hover:opacity-80">
                  <StarsIcon className="h-3 w-3" />
                  <span className="hidden sm:inline-block text-xs md:text-sm">
                    Growth Tools
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </RainbowButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-gradient-to-r from-gray-800 via-gray-900 to-black border border-gray-700 rounded-lg shadow-lg"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/resume"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-900 transition-all duration-200 text-white"
                  >
                    <FileText className="h-5 w-5 text-blue-500" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-900 transition-all duration-200 text-white"
                  >
                    <PenBox className="h-5 w-5 text-green-500" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/interview"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-900 transition-all duration-200 text-white"
                  >
                    <GraduationCap className="h-5 w-5 text-yellow-500" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          {/* Sign In Button */}
          <SignedOut>
            <SignInButton>
              <ShimmerButton className="px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black p-2 rounded-lg hover:opacity-80 transition-all duration-300">
                <UserPlus className="h-3.5 w-3.5 md:h-4 text-white" />
                <span className="text-white text-xs md:text-sm">Sign In</span>
              </ShimmerButton>
            </SignInButton>
          </SignedOut>

          {/* User Menu */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
