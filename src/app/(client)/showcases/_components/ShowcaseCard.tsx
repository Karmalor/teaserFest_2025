import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import { SelectShowcase } from "@/db/schema";
import ShowcaseDetailModal from "./ShowcaseDetailModal";

const ShowcaseCard = ({ showcase }: { showcase: SelectShowcase }) => {
  return (
    <Card className="flex overflow-hidden flex-col rounded-sm">
      <div className="relative flex items-center justify-center w-full h-auto aspect-video">
        {showcase.imageUrl && (
          <div className="">
            {showcase.imageUrl ? (
              <Image
                src={showcase.imageUrl}
                width={500}
                height={500}
                alt={showcase.title}
                className="object-cover aspect-square"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full" />
            )}
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{showcase.title}</CardTitle>

        {showcase.startDate ? (
          <>
            <CardDescription>
              {new Date(showcase.startDate).toLocaleDateString("en-us", {
                dateStyle: "full",
              })}
            </CardDescription>
            <CardDescription>at {showcase.location}</CardDescription>
          </>
        ) : (
          <CardDescription>at {showcase.location}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{showcase.description}</p>
      </CardContent>
      <CardFooter className="w-full">
        {/* <Button asChild size="lg" className="w-full">
          <Link href={`/showcases/${id}/detail`}>Get Tickets</Link>
        </Button> */}
        <ShowcaseDetailModal {...showcase} />
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
