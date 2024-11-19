"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect, useState } from "react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { getWeekendPassTypes } from "@/lib/actions/ticket.actions";
import { usePathname } from "next/navigation";
import { SelectWeekendPassType } from "@/db/schema";

// Define the type for passData items
interface PassDataItem {
  id: string;
  priceInCents: number;
}

type ShoppingCartProps = {
  isOpen: boolean;
  cartQuantity: number;
};

const ShoppingCart = ({ isOpen, cartQuantity }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [passData, setPassData] = useState<SelectWeekendPassType[]>([]);
  const pathname = usePathname();

  // Fetch pass data
  useEffect(() => {
    const fetchPassData = async () => {
      try {
        const result = await getWeekendPassTypes();
        setPassData(result || []);
      } catch (error) {
        console.error("Failed to fetch pass data:", error);
      }
    };

    fetchPassData();
  }, []);

  // Close the cart and optionally refresh if on the checkout page
  const handleCloseCart = () => {
    closeCart();
    if (pathname === "/checkout") {
      window.location.reload();
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, cartItem) => {
    const item = passData.find((i) => i.id === cartItem.id);
    return total + ((item?.priceInCents || 0) / 100) * cartItem.quantity;
  }, 0);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseCart();
      }}
      modal={false}
    >
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
                cartItems.map((item) => (
                  <CartItem key={item.id} {...item} passData={passData} />
                ))
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>

            <div className="mt-6">
              <Link href="/checkout">
                <Button
                  onClick={handleCloseCart}
                  className="w-full bg-black text-white"
                >
                  Pay now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
