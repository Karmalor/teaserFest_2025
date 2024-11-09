"use client";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import React, { useEffect } from "react";

const TicketReceipt = ({ checkoutSuccess }: { checkoutSuccess: string }) => {
  const { emptyCart } = useShoppingCart();

  console.log("checkuy", checkoutSuccess);

  useEffect(() => {
    if (checkoutSuccess === "complete") {
      emptyCart();
    }
  }, []);

  return <></>;
};

export default TicketReceipt;
