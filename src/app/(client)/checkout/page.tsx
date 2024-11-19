"use client";

import { useShoppingCart } from "@/context/ShoppingCartContext";
import { CheckoutForm } from "./_components/CheckoutForm";
import { useEffect, useState } from "react";
import { getWeekendPassTypes } from "@/lib/actions/ticket.actions";
import { SelectWeekendPassType } from "@/db/schema";

interface Product {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string | null;
      images: (string | null)[];
    };
  };
  quantity: number;
}

const CheckoutPage = () => {
  const { cartItems } = useShoppingCart();
  const [passData, setPassData] = useState<SelectWeekendPassType[]>([]);
  const [productArray, setProductArray] = useState<Product[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true); // Manage loading state

  // Fetch pass data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWeekendPassTypes();
        setPassData(result || []);
      } catch (error) {
        console.error("Failed to fetch pass data:", error);
      }
    };
    fetchData();
  }, []);

  // Populate productArray only when passData and cartItems are available
  useEffect(() => {
    if (!cartItems.length || !passData.length) return;

    const productos = cartItems
      .map((element) => {
        const item = passData.find((i) => i.id === element.id);
        return item
          ? {
              price_data: {
                currency: "usd",
                unit_amount: item.priceInCents,
                product_data: {
                  name: item.name,
                  images: [item.imgUrl],
                },
              },
              quantity: element.quantity,
            }
          : {
              price_data: {
                currency: "",
                unit_amount: null,
                product_data: {
                  name: null,
                  images: [null],
                },
              },
            };
      })
      .filter((product): product is Product => product !== null); // Type guard

    setProductArray(productos);
    setIsDataLoading(false); // Mark data as loaded once `productArray` is populated
  }, [passData, cartItems]);

  // Calculate amount only after `productArray` is ready
  const amount = productArray.reduce(
    (total, item) => total + item.price_data.unit_amount * item.quantity,
    0
  );

  const appFee = Math.floor(amount * 0.03);

  // Avoid rendering CheckoutForm until `productArray` is ready
  if (isDataLoading)
    return <div className="w-max mx-auto my-24">Loading...</div>;

  return (
    <main>
      <div className="max-w-screen-lg mx-auto my-8">
        <CheckoutForm
          priceId="price_1PoHtNFGdjlk58ObGlvpsQVx"
          amount={amount}
          quantity={1}
          imgUrl={productArray[0]?.price_data?.product_data?.images[0] || ""}
          productsArray={productArray as []}
          appFee={appFee}
        />
      </div>
    </main>
  );
};

export default CheckoutPage;
