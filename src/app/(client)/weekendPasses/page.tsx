"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import PurchaseModal from "./_components/PurchaseModal";
import Marquee from "react-fast-marquee";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { getWeekendPassTypes } from "@/lib/actions/ticket.actions";
import { SelectWeekendPassType } from "@/db/schema";

const WeekendPassesPage = () => {
  const [passData, setPassData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getWeekendPassTypes(); //   if (!result) return;
      setPassData(result || []);
      if (result) {
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("Fetched", passData[0].content ?? null);
  }, [passData]);

  return (
    <div
      className="w-full
            relative
            overflow-hidden
            block
            z-10
      bg-[url('https://utfs.io/f/DUm6U8TUOYo64BRqfKidBVXmUF3OwH08zeWxkvjfTsuiDtC1')]
            bg-cover
            bg-no-repeat
            bg-center

            before:content-['']
            before:absolute
            before:top-1/2
            before:h-1/2
            before:inset-0
            before:block
            before:bg-gradient-to-b
            before:from-[rgb(0_0_0/.5)_50%]
            before:to-[#FFF0F0]
            before:opacity-100
            before:z-[-5]"
    >
      {/* <Image
        src={
          "https://utfs.io/f/DUm6U8TUOYo64BRqfKidBVXmUF3OwH08zeWxkvjfTsuiDtC1"
        }
        width={10000}
        height={1000}
        alt="bg"
        className="absolute -z-10"
      /> */}
      <Marquee speed={75} className="">
        <h1 className="text-9xl text-white px-8">Weekend Passes!</h1>
        <h1 className="text-9xl text-white px-8">Weekend Passes!</h1>
      </Marquee>
      <Separator className="w-3/4 mx-auto mt-8 bg-white" />
      <div className="w-3/4 md:w-1/2 mx-auto mt-8">
        <p className="text-xl text-white">
          The full festival experience. Enjoy events across the full run of the
          festival weekend. Meet the performers, enjoy the city, and take in
          everything that modern burlesque has to offer!
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-center my-4 mx-2 mb-16 z-50">
        {passData.map((item, i) => (
          <Card
            key={i}
            className="min-w-[350px] max-w-[400px] mx-auto my-2 lg:mx-2"
          >
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {<div dangerouslySetInnerHTML={{ __html: item.content }} />}
            </CardContent>
            <CardDescription className="ml-6 mb-4">
              {item.description}
            </CardDescription>
            <CardFooter>
              <PurchaseModal price={item.priceInCents} id={item.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeekendPassesPage;
