"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { LuPlay, LuX } from "react-icons/lu";
import VideoModal from "@/components/modals/videoModal";
import { Suspense, useState } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

export default function Home() {
  const { user } = useUser();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <div
          className={`w-full h-full bg-[#FFF0F0] flex flex-col ${
            modal && "blur-lg"
          }`}
        >
          {user ? (
            <div className="flex justify-center">
              <Link
                href="/applicantDashboard"
                className="md:absolute flex top-[600px] md:top-[520px] md:right-24 mt-8 mx-4 md:mx-0 right-0 border-[#FE3D02] border-2  px-6 z-30 bg-[#FFF0F0] justify-center rounded-sm"
              >
                <h1 className="text-black cursor-pointer hover:text-red-600">
                  {user && `Apply Now, ${user?.firstName}`}
                </h1>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link
                href="/sign-in"
                className="md:absolute flex top-[600px] md:top-[520px] md:right-24 mt-8 mx-4 md:mx-0 right-0 border-[#FE3D02] border-2  px-6 z-30 bg-[#FFF0F0] justify-center rounded-sm"
              >
                <h1 className="text-black cursor-pointer hover:text-red-600">
                  Apply to Perform Now
                </h1>
              </Link>
            </div>
          )}
          <div className="md:flex justify-between  bg-[#FFF0F0] w-full">
            <div
              className="pt-4 md:pt-0 pb-4
          z-20 relative md:mr-24 pointer-events-none"
            >
              <Image
                src="/TeaserFest Vintage Logo 2025_v9.png"
                alt="hi"
                width={1100}
                height={300}
              />
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={toggleModal}>
                <div className="md:absolute right-24 top-28 mx-4 -m-36 md:m-0">
                  <VideoModal />
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-center absolute w-full bottom-4 z-50 pointer-events-none">
            <div className="flex flex-col justify-center items-center">
              <h1 style={{ textShadow: "#FFF0F0 1px 1px 0px" }}>
                - Tickets on sale soon! -
              </h1>

              <h1 style={{ textShadow: "#FFF0F0 1px 1px 0px" }}>
                - January 16th-19th, 2025 -
              </h1>
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
                  playbackId="00OrmNcvbtZY75bM800Ae00t3dGqyDG00DRsdab4NO6f45s"
                  metadataVideoTitle="TeaserFest 2025 Promo"
                  metadataViewerUserId={user?.primaryEmailAddress?.emailAddress}
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
      </Suspense>
    </>
  );
}
