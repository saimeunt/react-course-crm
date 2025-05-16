"use client";
import Link from "next/link";
import { format } from "date-fns";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreVertical, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGlobalContext from "@/components/global-context/hook";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { type Order, orderStatuses } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import CustomerCell from "@/components/lib/customer-cell";

const OrderProductsCell = ({ order }: { order: Order }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button variant="link">{order.products.length}</Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="space-y-4">
        {order.products.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={product.imageUrl} />
              <AvatarFallback>{product.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="-space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">{product.name}</span>
                <span>-</span>
                <span className="text-sm">{formatPrice(product.price)}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Quantity: {quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </HoverCardContent>
  </HoverCard>
);

const OrderActionsCell = ({ order }: { order: Order }) => {
  const { openUpsertOrderDialog, openDeleteOrdersDialog } = useGlobalContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openUpsertOrderDialog(order)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => openDeleteOrdersDialog([order.id])}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "IN_PROGRESS"
            ? "outline"
            : row.original.status === "COMPLETED"
              ? "default"
              : "destructive"
        }
      >
        {orderStatuses[row.original.status]}
      </Badge>
    ),
  },
  {
    accessorKey: "customer.fullName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link
        href={
          row.original.customer.deletedAt
            ? `/orders/${row.original.id}`
            : `/customers/${row.original.customer.id}`
        }
      >
        <CustomerCell customer={row.original.customer} />
      </Link>
    ),
  },
  {
    accessorKey: "products.length",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Products
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => <OrderProductsCell order={row.original} />,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total price
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{formatPrice(row.original.totalPrice)}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created at
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{format(row.original.createdAt, "yyyy-MM-dd")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <OrderActionsCell order={row.original} />,
  },
];
