import { type Dispatch, type SetStateAction, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import useGlobalContext from "@/components/global-context/hook";
import {
  upsertOrderFormSchema,
  type OrderStatus,
  type Order,
  type Customer,
  type Product,
} from "@/lib/types";
import { upsertOrder } from "@/components/orders/actions";
import CustomerFormField from "@/components/orders/upsert-order-form/customer-form-field";
import StatusFormField from "@/components/orders/upsert-order-form/status-form-field";
import ProductsFormField from "@/components/orders/upsert-order-form/products-form-field";

const UpsertOrderForm = ({
  order,
  customers,
  products,
  setLoading,
}: {
  order: Order | null;
  customers: Customer[];
  products: Product[];
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { closeUpsertOrderDialog } = useGlobalContext();
  const form = useForm<z.infer<typeof upsertOrderFormSchema>>({
    resolver: zodResolver(upsertOrderFormSchema),
    defaultValues: {
      customerId: 0,
      status: "IN_PROGRESS" as OrderStatus,
      products: [],
    },
  });
  useEffect(() => form.reset(order ?? undefined), [order, form]);
  const onSubmit = async ({
    customerId,
    status,
    products,
  }: z.infer<typeof upsertOrderFormSchema>) => {
    setLoading(true);
    const { message, description } = await upsertOrder({
      id: order?.id ?? 0,
      customerId,
      status,
      products,
    });
    toast(message, { description });
    setLoading(false);
    closeUpsertOrderDialog();
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        id="upsert-order-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <CustomerFormField form={form} customers={customers} />
        <StatusFormField form={form} />
        <ProductsFormField form={form} products={products} />
      </form>
    </Form>
  );
};

export default UpsertOrderForm;
