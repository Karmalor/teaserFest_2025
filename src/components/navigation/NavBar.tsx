"use client";

import React from "react";
import BackButton from "./BackButton";
import HomeButton from "./HomeButton";
import { LuMail, LuShoppingCart } from "react-icons/lu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ShoppingCart from "../shared/ShoppingCart";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

const NavBar = () => {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <div className="flex items-center justify-between m-4 z-50 ">
      <div className="flex items-center justify-between gap-2 m-4 z-50 ">
        <BackButton />
        <HomeButton />
      </div>
      <div className="flex items-center justify-between gap-4 m-4 z-50 ">
        <a href="mailto: info@teaserfest.com">
          <LuMail />
        </a>
        <SignedIn>
          <button className="flex" onClick={openCart}>
            {cartQuantity == 0 ? (
              <LuShoppingCart />
            ) : (
              <>
                <LuShoppingCart className="mr-1" />
                <div className="flex text-xs items-baseline content-end">
                  {cartQuantity}
                </div>
              </>
            )}
          </button>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <button className="flex" onClick={openCart}>
            {cartQuantity == 0 ? (
              <LuShoppingCart />
            ) : (
              <>
                <LuShoppingCart className="mr-1" />
                <div className="flex text-xs items-baseline content-end">
                  {cartQuantity}
                </div>
              </>
            )}
          </button>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default NavBar;
