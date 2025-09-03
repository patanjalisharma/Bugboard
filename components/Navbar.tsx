"use client";
import Link from "next/link";
import NavItems from "./NavItems";
import {  Bug, Menu, X } from "lucide-react";
import { useState } from "react";


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
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;