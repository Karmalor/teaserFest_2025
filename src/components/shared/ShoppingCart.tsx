"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { on } from "events";
import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "@/lib/formatters";
import storeItems from "../../db/items.json";
import Link from "next/link";

type ShoppingCartProps = {
  isOpen: boolean;
  cartQuantity: number;
};

const ShoppingCart = ({ isOpen, cartQuantity }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();

  console.log(cartItems);

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="sm:max-w-lg w-[90vw] bg-[#FFF0F0]">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartQuantity === 0 ? (
                <h1 className="py-6">You do not have any items</h1>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                Total{" "}
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const item = storeItems.find((i) => i.id === cartItem.id);
                    return total + (item!.price / 100 || 0) * cartItem.quantity;
                  }, 0)
                )}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout
            </p>

            <div className="mt-6">
              <Link href={"/checkout"}>
                <Button
                  onClick={closeCart}
                  className="w-full bg-black text-white"
                >
                  Pay now
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              {/* <Button className="w-full mt-4">Continue shopping</Button> */}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;