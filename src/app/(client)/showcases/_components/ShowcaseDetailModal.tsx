import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectShowcase } from "@/db/schema";
import Image from "next/image";
import React from "react";
import PerformerScroller from "../../schedule/_components/PerformerScroller";
import ShowcaseTicketsButton from "@/components/shared/ShowcaseTicketsButton";

const ShowcaseDetailModal = ({
  title,
  description,
  id,
  imageUrl,
  location,
  startDate,
  pastPhotos,
}: SelectShowcase) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button asChild size="lg" className="w-full">
          <h1>Learn More</h1>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#FFF0F0] max-w-screen-lg overflow-y-scroll max-h-screen">
        <DialogHeader className="flex md:flex-row gap-4 justify-center items-center">
          <div className="md:w-1/2">
            <DialogTitle className="text-3xl">{title}</DialogTitle>
            <br />
            <DialogDescription>
              {new Date(startDate as string).toLocaleDateString("en-us", {
                dateStyle: "full",
              })}
            </DialogDescription>
            <DialogDescription>{location}</DialogDescription>
            <br />
            <DialogDescription className="text-black text-left">
              {description}
            </DialogDescription>
            <div className="mt-4">
              <ShowcaseTicketsButton />
            </div>

            <br />
            <div className="pr-4 max-w-[350px] sm:max-w-[600px]">
              {pastPhotos && <PerformerScroller pastPhotos={pastPhotos} />}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full  max-w-[350px] md:max-w-[800px] pr-4 md:pr-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  width={500}
                  height={500}
                  alt={title}
                  className="object-cover aspect-square rounded-md hidden sm:block"
                />
              ) : (
                <div className="bg-gray-300 w-full h-full" />
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShowcaseDetailModal;
