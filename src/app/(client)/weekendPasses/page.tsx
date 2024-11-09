import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import PurchaseModal from "./_components/PurchaseModal";
import Marquee from "react-fast-marquee";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const page = () => {
  const passData = [
    {
      key: 1,
      id: 303,
      name: "Weekend GA",
      price: 15000,
      description: "*seating at all venues not guaranteed",
      content: [
        // [
        //   "This package includes general admission to the following Teaser Festival showcases: ",
        //   <br />,
        //   <br />,
        //   "- Queen of the Striptease",
        //   <br />,
        //   "- VarieTEASE",
        //   <br />,
        //   "- Sensualite",
        //   <br />,
        //   "- Locals Only",
        // ],
      ],
      imgUrl:
        "https://utfs.io/f/443ed477-5441-48d1-85f2-a1a56caffb52-1ut6k.jpeg",
    },
    {
      key: 2,
      id: 202,
      name: "Weekend VIP",
      price: 35000,
      description: "*description",
      content: [
        // [
        //   "This package includes VIP admission to all of the events listed in the GA Weekend Pass column:",
        //   <br />,
        //   <br />,
        //   "- Queen of the Striptease",
        //   <br />,
        //   "- VarieTEASE",
        //   <br />,
        //   "- Sensualite",
        //   <br />,
        //   "- Locals Only",
        //   <br />,
        //   <br />,
        //   `PLUS:`,
        //   <br />,
        //   `- The Fetish Showcase`,
        //   <br />,
        //   `- The Queen's Tea Brunch`,
        //   <br />,
        //   `- The Performer Pool Party`,
        // ],
      ],
      imgUrl:
        "https://utfs.io/f/443ed477-5441-48d1-85f2-a1a56caffb52-1ut6k.jpeg",
    },
    {
      key: 3,
      id: 311,
      name: "VIP Baller",
      price: 50000,
      description: "Card Description",
      content: [
        // [
        //   "This package includes VIP admission to ALL Teaser Festival Events:",
        //   <br />,
        //   <br />,
        //   "- Queen of the Striptease",
        //   <br />,
        //   "- VarieTEASE",
        //   <br />,
        //   "- Sensualite",
        //   <br />,
        //   "- Locals Only",
        //   <br />,
        //   <br />,
        //   `PLUS:`,
        //   <br />,
        //   `- The Fetish Showcase`,
        //   <br />,
        //   `- The Queen's Tea Brunch`,
        //   <br />,
        //   `- The Performer Pool Party`,
        //   <br />,
        //   <br />,
        //   "PLUS:",
        //   <br />,
        //   "- Front row reserved table seating",
        //   <br />,
        //   "- Table Service",
        //   <br />,
        //   "- Complimentary Bottle of Bubbles for the table at Queen of the Striptease and Varietease",
        //   <br />,
        //   "- Meet & Greet Access with Performers",
        //   <br />,
        //   "- Performer-only VIP party access",
        // ],
      ],
      imgUrl:
        "https://utfs.io/f/443ed477-5441-48d1-85f2-a1a56caffb52-1ut6k.jpeg",
    },
  ];

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
          <Card key={i} className="max-w-[400px] mx-auto my-2 lg:mx-2">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.content}</p>
            </CardContent>
            <CardDescription className="ml-6 mb-4">
              {item.description}
            </CardDescription>
            <CardFooter>
              <PurchaseModal price={item.price} id={item.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
