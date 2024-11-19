import { useShoppingCart } from "@/context/ShoppingCartContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import storeItems from "../../db/items.json";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "../ui/button";
import { LuMinus, LuPlus, LuX } from "react-icons/lu";
import { getWeekendPassTypes } from "@/lib/actions/ticket.actions";

type CartItemProps = {
  id: string;
  quantity: number;
  passData: [];
};

const CartItem = ({ id, quantity, passData }: CartItemProps) => {
  const { removeFromCart, decreaseItemQuantity, increaseItemQuantity } =
    useShoppingCart();
  // const [passData, setPassData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getWeekendPassTypes(); //   if (!result) return;
  //     setPassData(result || []);
  //     if (result) {
  //     }
  //   };
  //   fetchData();
  // }, []);
  const cartItem = passData.find((i) => i.id === id);
  if (cartItem === null) return null;

  return (
    <li key={id} className="flex py-6 ">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 flex items-center">
        <Image
          src={cartItem?.imgUrl || "/TeaserFest Vintage Logo 2025_v9.png"}
          alt="Product Image"
          width={300}
          height={300}
          className="object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-center">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{cartItem?.name}</h3>
            {/* <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              description
            </p> */}
          </div>

          <div className="flex flex-1 items-start justify-between text-sm">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <button>
                  <LuMinus onClick={() => decreaseItemQuantity(id)} />
                </button>
                <p className="text-gray-500">qty: {quantity}</p>
                <button>
                  <LuPlus onClick={() => increaseItemQuantity(id)} />
                </button>
              </div>
              <p className="text-gray-500">
                {formatCurrency(cartItem?.priceInCents / 100)}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-500">
                {formatCurrency((cartItem?.priceInCents * quantity) / 100)}
              </p>
              <div className="flex items-center">
                <div className="flex items-start justify-end text-end">
                  <button
                    //   onClick={() => removeItem(entry.id)}
                    className="font-medium text-primary hover:text-primary/80 text-red-700 hidden md:flex"
                    onClick={() => removeFromCart(id)}
                  >
                    <LuX size={18} className="content-end" />
                    Remove
                  </button>
                </div>
                <button
                  //   onClick={() => removeItem(entry.id)}
                  className="font-medium text-primary hover:text-primary/80 text-red-700 flex md:hidden"
                  onClick={() => removeFromCart(id)}
                >
                  <LuX />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
