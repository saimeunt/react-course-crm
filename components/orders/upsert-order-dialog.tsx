import { useState } from "react";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGlobalContext from "@/components/global-context/hook";
import UpsertDialogForm from "@/components/orders/upsert-order-form";
import { type Customer, type Product } from "@/lib/types";

const UpsertOrderDialog = ({
  customers,
  products,
}: {
  customers: Customer[];
  products: Product[];
}) => {
  const {
    upsertOrderDialogOpen,
    upsertOrderDialogOrder,
    closeUpsertOrderDialog,
  } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  return (
    <Dialog
      open={upsertOrderDialogOpen}
      onOpenChange={(open) => !open && closeUpsertOrderDialog()}
    >
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>
            {upsertOrderDialogOrder ? "Edit" : "Create"} order
          </DialogTitle>
          <DialogDescription>
            {upsertOrderDialogOrder
              ? "Edit this order."
              : "Create a new order."}
          </DialogDescription>
        </DialogHeader>
        <UpsertDialogForm
          order={upsertOrderDialogOrder}
          customers={customers}
          products={products}
          setLoading={setLoading}
        />
        <DialogFooter>
          <Button type="submit" form="upsert-order-form" disabled={loading}>
            {loading && <RotateCw className="mr-2 size-4 animate-spin" />}
            {upsertOrderDialogOrder
              ? loading
                ? "Editing…"
                : "Edit"
              : loading
                ? "Creating…"
                : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertOrderDialog;
