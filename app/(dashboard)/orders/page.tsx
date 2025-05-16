import { type Metadata } from "next";
import OrdersTable from "@/components/orders/orders-table";
import { columns } from "@/components/orders/columns";
import { fetchOrders, fetchCustomers, fetchProducts } from "@/lib/fetch-data";

export const metadata: Metadata = {
  title: "CRM - Orders",
  description: "Simple CRM",
};

const Orders = async () => {
  const [orders, customers, products] = await Promise.all([
    fetchOrders(),
    fetchCustomers(),
    fetchProducts(),
  ]);
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <OrdersTable
        columns={columns}
        data={orders}
        customers={customers}
        products={products}
      />
    </div>
  );
};

export default Orders;
