import { type Metadata } from "next";
import ChartAreaInteractive from "@/components/dashboard/chart-area-interactive";
import SectionCards from "@/components/dashboard/section-cards";
import { fetchCustomers, fetchOrders } from "@/lib/fetch-data";

export const metadata: Metadata = {
  title: "CRM - Dashboard",
  description: "Simple CRM",
};

const Dashboard = async () => {
  const [orders, customers] = await Promise.all([
    fetchOrders(),
    fetchCustomers(),
  ]);
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards orders={orders} customers={customers} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
