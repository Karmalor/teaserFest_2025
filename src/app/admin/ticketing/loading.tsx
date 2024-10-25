import React from "react";
import { LuLoader2 } from "react-icons/lu";

const TicketingLoading = () => {
  return (
    <div className="flex justify-center">
      <LuLoader2 className="size-24 animate-spin" />
    </div>
  );
};

export default TicketingLoading;
