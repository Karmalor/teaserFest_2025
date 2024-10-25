export const dynamic = "force-dynamic";

import { Protect } from "@clerk/nextjs";
import React from "react";

const TicketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Protect
      condition={(has) =>
        has({ role: "org:admin" }) || has({ role: "org:billing_manager" })
      }
      fallback={
        <p className="flex items-center justify-center mt-16">
          You are not allowed to see this section.
        </p>
      }
    >
      <div className="mx-4">{children}</div>
    </Protect>
  );
};

export default TicketingLayout;
