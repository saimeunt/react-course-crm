"use client";
import { useState } from "react";
import { format } from "date-fns";
import { CircleUser } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type Order,
  orderStatuses,
  orderStatusesBadgeVariants,
} from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const UserMenu = ({ user: { firstName } }: { user: { firstName: string } }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? (
    <div className="flex items-center justify-between">
      <span>Welcome {firstName}!</span>
      <Button onClick={() => setIsLoggedIn(false)}>Logout</Button>
    </div>
  ) : (
    <div className="flex justify-end">
      <Button onClick={() => setIsLoggedIn(true)}>Login</Button>
    </div>
  );
};

const OrdersTable = ({ orders }: { orders: Order[] }) => (
  <Table>
    <TableCaption>A list of your recent orders.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Products</TableHead>
        <TableHead>Created at</TableHead>
        <TableHead className="text-right">Total price</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {orders.map((order) => (
        <TableRow key={order.id}>
          <TableCell>{order.id}</TableCell>
          <TableCell>
            <Badge
              /*variant={
                order.status === "IN_PROGRESS"
                  ? "outline"
                  : order.status === "COMPLETED"
                    ? "default"
                    : "destructive"
              }*/
              variant={orderStatusesBadgeVariants[order.status]}
            >
              {orderStatuses[order.status]}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              {order.customer.deletedAt ? (
                <>
                  <CircleUser
                    className="size-8"
                    stroke="var(--color-destructive)"
                  />
                  <span className="text-destructive">Deleted customer</span>
                </>
              ) : (
                <>
                  <Avatar>
                    <AvatarImage
                      src={order.customer.profileUrl}
                      alt={`${order.customer.fullName} profile`}
                    />
                    <AvatarFallback>
                      {order.customer.firstName.at(0)}
                      {order.customer.lastName.at(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{order.customer.fullName}</span>
                </>
              )}
            </div>
          </TableCell>
          <TableCell>{order.products.length}</TableCell>
          <TableCell>{format(order.createdAt, "yyyy-MM-dd")}</TableCell>
          <TableCell className="text-right">
            {formatPrice(order.totalPrice)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={5}>Total</TableCell>
        <TableCell className="text-right">
          {formatPrice(
            orders.reduce(
              (previousValue, { totalPrice }) => previousValue + totalPrice,
              0,
            ),
          )}
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

const Workshop8 = ({
  user,
  orders,
}: {
  user: { firstName: string };
  orders: Order[];
}) => (
  <div className="flex flex-col px-4 lg:px-6 gap-6">
    <UserMenu user={user} />
    <OrdersTable orders={orders} />
  </div>
);

export default Workshop8;
