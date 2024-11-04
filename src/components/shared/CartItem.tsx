import { useShoppingCart } from "@/context/ShoppingCartContext";
import Image from "next/image";
import React from "react";
import storeItems from "../../db/items.json";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "../ui/button";
import { LuMinus, LuPlus } from "react-icons/lu";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart, decreaseItemQuantity, increaseItemQuantity } =
    useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item === null) return null;

  return (
    <li key={id} className="flex py-6 ">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={item!.imgUrl}
          alt="Product Image"
          width={100}
          height={100}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-center">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item?.name}</h3>
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
                <p className="text-gray-500">QTY: {quantity}</p>
                <button>
                  <LuPlus onClick={() => increaseItemQuantity(id)} />
                </button>
              </div>
              <p className="text-gray-500">
                {formatCurrency(item!.price / 100)}
              </p>
            </div>
            <div className="flex gap-4">
              <p className="text-gray-500">
                {formatCurrency((item!.price * quantity) / 100)}
              </p>

              <button
                //   onClick={() => removeItem(entry.id)}
                className="font-medium text-primary hover:text-primary/80 text-red-700"
                onClick={() => removeFromCart(item!.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
