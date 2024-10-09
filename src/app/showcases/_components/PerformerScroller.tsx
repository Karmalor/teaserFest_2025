import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Emma Vaudville",
    art: "https://utfs.io/f/443ed477-5441-48d1-85f2-a1a56caffb52-1ut6k.jpeg",
  },
  {
    artist: "Elle Dorado",
    art: "https://utfs.io/f/7f2a31ac-96ef-43f1-9d76-a57e6d935812-a9vxam.jpeg",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://utfs.io/f/ed50063a-5999-4ed1-a492-1ab744148537-teaeb0.webp",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];
const PerformerScroller = () => {
  return (
    <ScrollArea className="whitespace-nowrap rounded-md border border-black">
      <div className="flex w-max space-x-4 p-4 mb-2">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] h-[250px] w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default PerformerScroller;
