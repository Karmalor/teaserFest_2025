import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ShowcaseCardProps = {
  uuid: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
};

const ShowcaseCard = ({
  title,
  description,
  uuid,
  imageUrl,
}: ShowcaseCardProps) => {
  return (
    <Card className="flex overflow-hidden flex-col rounded-sm">
      <div className="relative flex items-center justify-center w-full h-auto aspect-video">
        {imageUrl && (
          <div className="">
            <Image
              src={imageUrl}
              width={500}
              height={500}
              alt={title}
              className="object-cover aspect-square"
            />
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Tickets</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/showcases/${uuid}/detail`}>Get Tickets</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShowcaseCard;

export function ShowcaseCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col rounded-sm animate-pulse">
      <div className="relative flex items-center justify-center w-full h-auto aspect-square bg-gray-300"></div>
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
        </CardTitle>
        <CardDescription>
          <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" disabled className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
