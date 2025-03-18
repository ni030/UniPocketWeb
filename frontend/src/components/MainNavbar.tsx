import { NavLink } from "react-router";
import { SidebarTrigger } from "./ui/sidebar";
import { UniversityIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export const MainNavbar = () => {
  return (
    <nav className="h-16 fixed inset-0 bg-white flex items-center px-2 pr-5 z-50">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center shrink-0 gap-4">
          <SidebarTrigger />
          <NavLink to="/" className="mb-1">
            <div className="flex items-center gap-1">
              <UniversityIcon className="size-5 stroke-rose-800" />
              <h1 className="text-xl leading-3 mt-1 font-semibold text-rose-800 tracking-tight">
                UniPocket
              </h1>
            </div>
          </NavLink>
        </div>

        {/* Auth Side */}
        <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        </div>
      </div>
    </nav>
  );
};
