"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { formatCurrency } from "@/lib/formatters";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  console.log(getItemQuantity(id));

  return (
    <Card className="w-[300px] flex overflow-hidden flex-col rounded-sm">
      <CardHeader className="p-0 object-contain">
        <div className="">
          <Image
            src={imgUrl}
            width={400}
            height={300}
            alt={name}
            className="mb-4 mx-auto h-[300px] object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(price)}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="w-full">
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
                <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
                <h1>{quantity} in cart</h1>
                <Button onClick={() => increaseItemQuantity(id)}>+</Button>
              </div>
            </div>
            // <Button className="mx-auto w-full">View Cart</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default StoreItem;
