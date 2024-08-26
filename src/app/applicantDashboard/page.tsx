import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { applicationOrdersTable } from "@/db/schema";
// import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
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

  return (
    <div className="max-w-xl md:mx-auto p-10 text-black text-center  m-10 rounded-md  shadow-[8px_8px_0_0_#FE3D02] border-black border-2">
      <div className="">
        <h1 className="text-4xl mb-10">Welcome {user.firstName}</h1>

        {orders.map((order, index) => (
          <div key={index} className="flex gap-4 p-4 items-center">
            <h1>Application #{index + 1}</h1>
            <Link href="/applications">
              <Button>Continue</Button>
            </Link>
          </div>
        ))}
        <div className="flex pt-8 justify-center">
          <Link href="/payment">
            <Button>Click to purchase a Application submission</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
