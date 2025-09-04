"use client";
import Link from "next/link";
import NavItems from "./NavItems";
import {  Bug, Menu, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from "./ui/button";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-ghostwhite px-4 py-4 sm:px-14 w-full max-w-7xl mx-auto sticky top-0 ">
      <div className="flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-1 cursor-pointer font-semibold text-lg text-white">
          <Bug className="h-8 w-8" />
          BugBoard
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-8">
          <NavItems />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign In
                </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Link href="/issues/new">
          <Button variant={"outline"} className=" cursor-pointer rounded-3xl py-2 hover:bg-gray-300">
            <PlusIcon/>
            New
          </Button>
        </Link>
          
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4">
          <NavItems />
          <Link href="/issues/new">
          <Button variant={"outline"} className=" cursor-pointer rounded-3xl py-2 hover:bg-gray-300">
            <PlusIcon/>
            New
          </Button>
        </Link>
           <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign In
                </button>
            </SignInButton>
            
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;