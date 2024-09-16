"use client";

import ShowcaseSelector from "@/components/shared/ShowcaseSelector";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import MuxPlayer from "@mux/mux-player-react/lazy";
import Image from "next/image";
import React, { useState } from "react";
import { LuX } from "react-icons/lu";

const VideoArchive = () => {
  const user = useUser();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className="flex">
        <Input
          className="w-[480px] ml-16 mt-24 border-black"
          placeholder="Search..."
        />
      </div>
      {/* 2024 */}
      <div className="w-auto h-[260px] flex flex-col m-12">
        <h1 className="">2024</h1>
        <div className="m-4">
          <ShowcaseSelector />
        </div>
        <div className="flex flex-row overflow-scroll gap-4 mx-4 w-full ">
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
        </div>
      </div>
      {/* 2023 */}
      <div className="w-auto h-[200px] flex flex-col m-12">
        <h1 className="">2023</h1>
        <div className="flex flex-row overflow-scroll gap-4 mx-4 w-full ">
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
        </div>
      </div>
      {/* 2020 */}
      <div className="w-auto h-[200px] flex flex-col m-12">
        <h1 className="">2020</h1>
        <div className="flex flex-row overflow-scroll gap-4 mx-4 w-full ">
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
          <div
            onClick={toggleModal}
            className="w-[300px] h-auto aspect-video cursor-pointer shrink-0"
          >
            <Image
              src={"/vid_placeholder_thumbnail.png"}
              alt="video thumbnail"
              width={300}
              height={100}
              className="rounded-lg -z-10 grayscale opacity-50 hover:opacity-100"
            />
          </div>
        </div>
      </div>

      {modal && (
        <div>
          <div className="fixed w-full h-full z-40">
            <div
              onClick={toggleModal}
              className="left-0 right-0 top-0 bottom-0 fixed z-20"
            ></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full md:w-[80%]">
              <MuxPlayer
                theme="classic"
                streamType="on-demand"
                playbackId="VcdX65P6IlzEZyS6SUNcqGry1GZUm8padHHKpQ1CgdU"
                metadataVideoTitle="TeaserFest 2025 Promo"
                // metadataViewerUserId={user?.primaryEmailAddress?.emailAddress}
                primaryColor="#FE3D02"
                accentColor="#FFF0F0"
                thumbnailTime={4}
                style={{
                  aspectRatio: 16 / 9,
                }}
              />
              <button
                onClick={toggleModal}
                className="absolute top-2 left-2 opacity-30 hover:opacity-100"
              >
                <LuX size={24} color="#FFF0F0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoArchive;
