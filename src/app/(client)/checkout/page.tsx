"use client";

import { useShoppingCart } from "@/context/ShoppingCartContext";
import { CheckoutForm } from "./_components/CheckoutForm";
import { formatCurrency } from "@/lib/formatters";
import storeItems from "../../../db/items.json";

const CheckoutPage = () => {
  // Here you would be getting the basked etc.
  // We're hard-coding the oruce for simplicity
  const priceId = "price_1PoHtNFGdjlk58ObGlvpsQVx";

  const { cartItems } = useShoppingCart();

  const amount = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return Number(total + (item?.price || 0) * cartItem.quantity);
  }, 0);

  // const amount2 = storeItems[0].price * cartItems[0].quantity * 100;
  // if (!amount || !cartItems) return;

  console.log("Amount", amount);

  let productos = [];

  for (let element of cartItems) {
    let item = storeItems.find((i) => i.id === element.id);
    productos.push({
      price_data: {
        currency: "usd",
        unit_amount: item!.price,
        product_data: {
          name: item!.name,
          images: [item!.imgUrl],
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 100,
        },
      },
      quantity: element.quantity,
    });
  }

  const appFee = Math.floor(amount * 0.03);

  console.log("appFee", appFee);

  //   const products = storeItems.map((item) => ({
  //     price_data: {
  //       currency: "usd",
  //       unit_amount: `${storeItems[0].price * cartItems[0].quantity * 100}`,
  //       product_data: {
  //         name: item.name,
  //         images: [item.imgUrl],
  //       },
  //     },
  //     quantity: cartItems[0].quantity,
  //   }));

  return (
    <main>
      <div className="max-w-screen-lg mx-auto my-8">
        <CheckoutForm
          priceId={priceId}
          amount={amount}
          quantity={1}
          imgUrl={storeItems[0].imgUrl}
          productsArray={productos as []}
          appFee={appFee}
        />
      </div>
    </main>
  );
};

export default CheckoutPage;
