"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { date } from "drizzle-orm/mysql-core";
import React, { useState } from "react";

const Schedulebar = () => {
  const [dateSelected, setDateSelected] = useState("january17");
  const [showcaseSelected, setShowcaseSelected] = useState("varieTEASE");

  console.log(dateSelected);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-around md:mx-64">
        <button
          className={`${dateSelected === "january16" && "underline"}`}
          onClick={() => setDateSelected("january16")}
        >
          January 16
        </button>
        <button
          className={`${dateSelected === "january17" && "underline"}`}
          onClick={() => setDateSelected("january17")}
        >
          January 17
        </button>
        <button
          className={`${dateSelected === "january18" && "underline"}`}
          onClick={() => setDateSelected("january18")}
        >
          January 18
        </button>
        <button
          className={`${dateSelected === "january19" && "underline"}`}
          onClick={() => setDateSelected("january19")}
        >
          January 19
        </button>
      </div>
      <div className="flex justify-center mx-16 md:mx-48">
        <Separator className="mt-4" />
      </div>
      <div className="mt-4 flex flex-col md:flex-row md:justify-around md:mx-64">
        <button
          className={`${showcaseSelected === "QOTS" && "underline"}`}
          onClick={() => setShowcaseSelected("QOTS")}
        >
          Queen of the Striptease
        </button>

        <button
          className={`${showcaseSelected === "varieTEASE" && "underline"}`}
          onClick={() => setShowcaseSelected("varieTEASE")}
        >
          VarieTEASE
        </button>
      </div>
    </div>
  );
};

export default Schedulebar;
