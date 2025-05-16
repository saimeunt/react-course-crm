import { notFound } from "next/navigation";
import EditOrder from "@/components/orders/edit-order";
import { fetchCustomers, fetchOrder, fetchProducts } from "@/lib/fetch-data";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await fetchOrder(Number(id));
  if (!order) {
    notFound();
  }
  return {
    title: `CRM - Edit Order#${order.id}`,
    description: "Simple CRM",
  };
};

const Order = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [order, customers, products] = await Promise.all([
    fetchOrder(Number(id)),
    fetchCustomers(),
    fetchProducts(),
  ]);
  if (!order) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <EditOrder order={order} customers={customers} products={products} />
    </div>
  );
};

export default Order;
