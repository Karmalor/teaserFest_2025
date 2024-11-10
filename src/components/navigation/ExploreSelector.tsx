import React, { useState } from "react";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";

const ExploreSelector = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      <DropdownMenu
        modal={false}
        open={menuOpen}
        onOpenChange={() => setMenuOpen(false)}
      >
        <DropdownMenuTrigger
          className="bg-none"
          onClick={() => setMenuOpen(true)}
        >
          Explore
        </DropdownMenuTrigger>
        <DropdownMenuContent className="items-start bg-[#FFF0F0] rounded-none border-none">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem>
            <Link
              href={"/weekendPasses"}
              onClick={() => setMenuOpen(false)}
              className={`${pathname == "/weekendPasses" && "underline underline-offset-4"} text-lg hover:underline underline-offset-4`}
            >
              Weekend Passes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={"/showcases"}
              onClick={() => setMenuOpen(false)}
              className={`${pathname == "/showcases" && "underline underline-offset-4"} text-lg hover:underline underline-offset-4`}
            >
              Showcase Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={"/schedule"}
              onClick={() => setMenuOpen(false)}
              className={`${pathname == "/schedule" && "underline underline-offset-4"} text-lg hover:underline underline-offset-4`}
            >
              Festival Schedule
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExploreSelector;
