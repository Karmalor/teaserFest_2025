import { Table } from "@/components/ui/table";
import storeItems from "../../../db/items.json";

import React from "react";
import StoreItem from "./_components/StoreItem";

const store = () => {
  return (
    <div className="m-4">
      <h1>Store</h1>
      <div className="flex justify-center gap-4">
        {storeItems.map((item) => (
          <div key={item.id} className="">
            <StoreItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default store;
