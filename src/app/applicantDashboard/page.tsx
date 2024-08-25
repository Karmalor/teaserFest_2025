import { db } from "@/db";
import { applicationOrdersTable } from "@/db/schema";
// import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const orders = await db
    .select()
    .from(applicationOrdersTable)
    .where(eq(applicationOrdersTable.buyerId, user!.id));

  console.log(orders);

  return <div>Applicants!</div>;
};

export default page;
