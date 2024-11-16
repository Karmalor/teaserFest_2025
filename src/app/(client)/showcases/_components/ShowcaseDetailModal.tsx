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

const ShowcaseDetailModal = ({
  title,
  description,
  id,
  imageUrl,
  location,
  startDate,
}: SelectShowcase) => {
  return (
    <Dialog open={true}>
      <DialogTrigger className="w-full">
        <Button asChild size="lg" className="w-full">
          <h1>Learn More</h1>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#FFF0F0] max-w-screen-lg">
        <DialogHeader className="flex flex-row">
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
          <div className="w-1/2">
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={500}
                height={500}
                alt={title}
                className="object-cover aspect-square"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full" />
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShowcaseDetailModal;
