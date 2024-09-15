"use client";

import React from "react";
import { LuArrowLeft, LuHome } from "react-icons/lu";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/")}>
        <LuHome />
      </button>
    </div>
  );
};

export default HomeButton;