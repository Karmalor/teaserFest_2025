import { db } from "@/db";
import { SelectTicketOrders, ticketOrders } from "@/db/schema";
import { eq, sql, sum } from "drizzle-orm";
import React from "react";

async function getSalesData() {
  const data = await db
    .select({
      _sum: sum(ticketOrders.pricePaidInCents).mapWith(Number),
    })
    .from(ticketOrders);

  await wait(2000);

  return {
    amount: data[0]?._sum / 100,
  };
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

const AdminTicketingPage = async () => {
  const { ...data } = await getSalesData();

  console.log("Hi hi", data.amount);

  return (
    <div className="flex  m-16">
      <h1>Total Sales: {data.amount}</h1>
    </div>
  );
};

export default AdminTicketingPage;
