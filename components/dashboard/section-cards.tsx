import { TrendingDown, TrendingUp } from "lucide-react";
import { subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPercent, formatPrice, formatNumber } from "@/lib/utils";
import { type Order, type Customer } from "@/lib/types";

const SectionCard = ({
  title,
  percent,
  kpi,
  trendUp,
  trendDown,
  description,
}: {
  title: string;
  percent: number;
  kpi: string;
  trendUp: string;
  trendDown: string;
  description: string;
}) => (
  <Card className="@container/card">
    <CardHeader>
      <CardDescription>{title}</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        {kpi}
      </CardTitle>
      <CardAction>
        <Badge variant="outline">
          {percent > 0 ? <TrendingUp /> : <TrendingDown />}
          {formatPercent(percent, "always")}
        </Badge>
      </CardAction>
    </CardHeader>
    <CardFooter className="flex-col items-start gap-1.5 text-sm">
      <div className="line-clamp-1 flex gap-2 font-medium">
        {percent > 0 ? (
          <>
            {trendUp}
            <TrendingUp className="size-4" />
          </>
        ) : (
          <>
            {trendDown}
            <TrendingDown className="size-4" />
          </>
        )}
      </div>
      <div className="text-muted-foreground">{description}</div>
    </CardFooter>
  </Card>
);

const SectionCards = ({
  orders,
  customers,
}: {
  orders: Order[];
  customers: Customer[];
}) => {
  const currentMonthOrders = orders.filter(
    ({ createdAt, status }) =>
      status !== "CANCELLED" && createdAt >= subDays(new Date(), 30),
  );
  const monthlyRevenue = currentMonthOrders.reduce(
    (previousValue, { totalPrice }) => previousValue + totalPrice,
    0,
  );
  const lastMonthOrders = orders.filter(
    ({ createdAt, status }) =>
      status !== "CANCELLED" &&
      createdAt >= subDays(new Date(), 60) &&
      createdAt <= subDays(new Date(), 30),
  );
  const lastMonthRevenue = lastMonthOrders.reduce(
    (previousValue, { totalPrice }) => previousValue + totalPrice,
    0,
  );
  const currentMonthNewCustomers = customers.filter(
    ({ createdAt }) => createdAt >= subDays(new Date(), 30),
  );
  const lastMonthNewCustomers = customers.filter(
    ({ createdAt }) =>
      createdAt >= subDays(new Date(), 60) &&
      createdAt <= subDays(new Date(), 30),
  );
  const newCustomersPercent =
    (currentMonthNewCustomers.length - lastMonthNewCustomers.length) /
    lastMonthNewCustomers.length;
  const currentMonthActiveCustomers = customers.filter(({ id }) =>
    currentMonthOrders.map(({ customerId }) => customerId).includes(id),
  );
  const lastMonthActiveCustomers = customers.filter(({ id }) =>
    lastMonthOrders.map(({ customerId }) => customerId).includes(id),
  );
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <SectionCard
        title="Monthly Revenue"
        percent={(monthlyRevenue - lastMonthRevenue) / lastMonthRevenue}
        kpi={formatPrice(monthlyRevenue)}
        trendUp="Trending up this month"
        trendDown="Trending down this month"
        description="Total revenue for the last month"
      />
      <SectionCard
        title="New Customers"
        percent={newCustomersPercent}
        kpi={formatNumber(currentMonthNewCustomers.length)}
        trendUp={`Up ${formatPercent(
          newCustomersPercent,
          "never",
        )} this period`}
        trendDown={`Down ${formatPercent(
          newCustomersPercent,
          "never",
        )} this period`}
        description="Acquired clients in the last month"
      />
      <SectionCard
        title="Active Customers"
        percent={
          (currentMonthActiveCustomers.length -
            lastMonthActiveCustomers.length) /
          lastMonthActiveCustomers.length
        }
        kpi={formatNumber(currentMonthActiveCustomers.length)}
        trendUp="Strong user retention"
        trendDown="Churn rate increased"
        description="Returning customers"
      />
    </div>
  );
};

export default SectionCards;
