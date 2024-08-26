"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

const backButton = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <LuArrowLeft />
    </button>
  );
};

export default backButton;
