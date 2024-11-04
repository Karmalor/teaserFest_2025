import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import React from "react";
import PurchaseModal from "./_components/PurchaseModal";

const page = () => {
  const passData = [
    {
      id: 303,
      name: "Weekend GA",
      price: 15000,
      description: "*seating at all venues not guaranteed",
      content: [
        [
          "This package includes general admission to the following Teaser Festival showcases: ",
          <br />,
          <br />,
          "- Queen of the Striptease",
          <br />,
          "- VarieTEASE",
          <br />,
          "- Sensualite",
          <br />,
          "- Locals Only",
        ],
      ],
      imgUrl:
        "https://utfs.io/f/443ed477-5441-48d1-85f2-a1a56caffb52-1ut6k.jpeg",
    },
    {
      id: 202,
      name: "Weekend VIP",
      price: 35000,
      description: "*description",
      content: [
        [
          "This package includes VIP admission to all of the events listed in the GA Weekend Pass column:",
          <br />,
          <br />,
          "- Queen of the Striptease",
          <br />,
          "- VarieTEASE",
          <br />,
          "- Sensualite",
          <br />,
          "- Locals Only",
          <br />,
          <br />,

          `PLUS:`,
          <br />,

          `- The Fetish Showcase`,
          <br />,
          `- The Queen's Tea Brunch`,
          <br />,
          `- The Performer Pool Party`,
        ],
      ],
      imgUrl:
        "https://utfs.io/f/443ed477-5441-48d1-85f2-a1a56caffb52-1ut6k.jpeg",
    },
    {
      id: 311,
      name: "VIP Baller",
      price: 50000,
      description: "Card Description",
      content: [
        [
          "This package includes VIP admission to ALL Teaser Festival Events:",
          <br />,
          <br />,
          "- Queen of the Striptease",
          <br />,
          "- VarieTEASE",
          <br />,
          "- Sensualite",
          <br />,
          "- Locals Only",
          <br />,
          <br />,

          `PLUS:`,
          <br />,

          `- The Fetish Showcase`,
          <br />,
          `- The Queen's Tea Brunch`,
          <br />,
          `- The Performer Pool Party`,
          <br />,
          <br />,
          "PLUS:",
          <br />,
          "- Front row reserved table seating",
          <br />,
          "- Table Service",
          <br />,
          "- Complimentary Bottle of Bubbles for the table at Queen of the Striptease and Varietease",
          <br />,
          "- Meet & Greet Access with Performers",
          <br />,
          "- Performer only VIP party access",
        ],
      ],
      imgUrl:
        "https://utfs.io/f/443ed477-5441-48d1-85f2-a1a56caffb52-1ut6k.jpeg",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-4 my-24">
      {passData.map((item) => (
        <Card className="max-w-[400px] mx-2">
          <CardHeader>
            <CardTitle className="text-center text-2xl">{item.name}</CardTitle>
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
  );
};

export default page;
