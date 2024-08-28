"use client";

import React from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>
        <LuArrowLeft />
      </button>
    </div>
  );
};

export default BackButton;
