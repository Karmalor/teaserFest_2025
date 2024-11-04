"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { useState } from "react";

type PurchaseModalProps = {
  id: number;
  price: number;
};

export default function PurchaseModal({ id, price }: PurchaseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
    openCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  function handleClick(event: any) {
    increaseItemQuantity(id);
    setIsOpen(true);
  }

  return (
    <>
      {quantity == 0 ? (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="mx-auto w-full"
                onClick={() => increaseItemQuantity(id)}
              >
                {formatCurrency(price / 100)} - Purchase Pass
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#FFF0F0]">
              <AlertDialogHeader>
                <AlertDialogTitle>Added to cart</AlertDialogTitle>
                <AlertDialogDescription>
                  {quantity === 0 ? (
                    <div className="flex flex-col gap-2">
                      <Button
                        className="mx-auto w-full"
                        onClick={() => increaseItemQuantity(id)}
                      >
                        + Add to Cart
                      </Button>
                      <div className="w-full flex justify-center items-center gap-4">
                        <Button disabled>-</Button>
                        <h1>{quantity} in cart</h1>
                        <Button disabled>+</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link href="/">
                        <Button className="mx-auto w-full">View Cart</Button>
                      </Link>
                      <div className="w-full flex justify-center items-center gap-4">
                        <Button onClick={() => decreaseItemQuantity(id)}>
                          -
                        </Button>
                        <h1>{quantity} in cart</h1>
                        <Button onClick={() => increaseItemQuantity(id)}>
                          +
                        </Button>
                      </div>
                    </div>
                    // <Button className="mx-auto w-full">View Cart</Button>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <Link href="/checkout">Continue to checkout</Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <Button className="mx-auto w-full" onClick={openCart}>
          View Cart
        </Button>
      )}
    </>
  );
}
