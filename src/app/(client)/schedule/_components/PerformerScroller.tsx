import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface Artwork {
  artist: string;
  art: string;
}

const PerformerScroller = ({ pastPhotos }: { pastPhotos: string[] }) => {
  return (
    <ScrollArea className="whitespace-nowrap rounded-md border border-black">
      <div className="flex gap-2 w-max p-4 mb-2">
        {pastPhotos &&
          pastPhotos.map((item) => (
            // <figure key={artwork.artist} className="shrink-0">
            <>
              <Dialog>
                <DialogTrigger className="w-full">
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={item}
                      alt={`Photo by `}
                      className="aspect-[3/4] h-[250px] w-fit object-cover rounded-lg"
                      width={300}
                      height={400}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-none max-w-[750px] max-h-screen border-none">
                  <div className="overflow-hidden rounded-md mx-auto max-w-screen">
                    <Image
                      src={item}
                      alt={`Photo by Darrell Miller`}
                      className="object-cover rounded-lg"
                      width={2000}
                      height={2000}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {/* {artwork.artist} */}
                </span>
              </figcaption>
            </>
            // </figure>
          ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default PerformerScroller;
