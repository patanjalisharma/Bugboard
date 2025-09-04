"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
  { label: "Profile", href: "/profile" },
  
];

const NavItems = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            pathName === href && "text-white font-bold",
            "whitespace-nowrap"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;