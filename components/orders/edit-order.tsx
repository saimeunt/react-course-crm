"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import UpsertOrderForm from "@/components/orders/upsert-order-form";
import { type Order, type Customer, type Product } from "@/lib/types";

const EditOrder = ({
  order,
  customers,
  products,
}: {
  order: Order;
  customers: Customer[];
  products: Product[];
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="lg:px-16 px-4 space-y-4">
      <UpsertOrderForm
        order={order}
        customers={customers}
        products={products}
        setLoading={setLoading}
      />
      <div className="flex justify-end">
        <Button form="upsert-order-form" type="submit" disabled={loading}>
          {loading && <RotateCw className="mr-2 size-4 animate-spin" />}
          {loading ? "Editing…" : "Edit"}
        </Button>
      </div>
    </div>
  );
};

export default EditOrder;
