import React from "react";

import EarningTable from "../../components/EarningTable";

const columns = [
  "SL",
  "Order ID",
  "User Name",
  "Shop Name",
  "Item",
  "Quantity",
  "Order Price",
  "Admin Revenue",
  "Percentage",
  "Order Date",
  "Status",
  "Action",
];

const Earning = () => {
  return (
    <section className="mt-10">
      <EarningTable columns={columns} />
    </section>
  );
};

export default Earning;
