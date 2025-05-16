"use client";

import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { range } from "lodash";
import { addDays, subDays, format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type Order } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

const chartConfig = {
  orders: {
    label: "Orders",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type TimeRange = "90d" | "30d" | "7d";

const ChartAreaInteractive = ({ orders }: { orders: Order[] }) => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState<TimeRange>("90d");

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const chartData = range(-89, 1).map((offset) => {
    const date = format(addDays(new Date(), offset), "yyyy-MM-dd");
    const dateOrders = orders.filter(
      ({ createdAt }) => format(new Date(createdAt), "yyyy-MM-dd") === date,
    );
    return {
      date,
      revenue: dateOrders.reduce(
        (previousValue, { totalPrice }) => previousValue + totalPrice,
        0,
      ),
    };
  });
  const filteredData = chartData.filter((item) => {
    const daysToSubtract = {
      "90d": 90,
      "30d": 30,
      "7d": 7,
    };
    return (
      new Date(item.date) >= subDays(new Date(), daysToSubtract[timeRange])
    );
  });

  const filterCaptions = {
    "90d": "last 3 months",
    "30d": "last month",
    "7d": "last 7 days",
  };

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Cumulated revenue for the {filterCaptions[timeRange]}
          </span>
          <span className="@[540px]/card:hidden inline-block first-letter:uppercase">
            {filterCaptions[timeRange]}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRange)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            {Object.keys(filterCaptions).map((key) => (
              <ToggleGroupItem key={key} value={key}>
                <span className="inline-block first-letter:uppercase">
                  {filterCaptions[key as TimeRange]}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRange)}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder={filterCaptions["90d"]} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Object.keys(filterCaptions).map((key) => (
                <SelectItem key={key} value={key} className="rounded-lg">
                  <span className="inline-block first-letter:uppercase">
                    {filterCaptions[key as TimeRange]}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => format(new Date(value), "MMM d")}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => format(new Date(value), "MMM d")}
                  formatter={(value) =>
                    `$${formatNumber(Number(value), { notation: "compact" })}`
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartAreaInteractive;
