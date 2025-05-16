import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { customerSubSchema } from "@/lib/types";
import { CircleUser } from "lucide-react";

const CustomerCell = ({
  customer,
}: {
  customer: z.infer<typeof customerSubSchema>;
}) => (
  <div className="flex items-center gap-2">
    {customer.deletedAt ? (
      <>
        <CircleUser className="size-8" stroke="var(--color-destructive)" />
        <span className="text-destructive">Deleted customer</span>
      </>
    ) : (
      <>
        <Avatar>
          <AvatarImage
            src={customer.profileUrl}
            alt={`${customer.fullName} profile`}
          />
          <AvatarFallback>
            {customer.firstName.at(0)}
            {customer.lastName.at(0)}
          </AvatarFallback>
        </Avatar>
        <span>{customer.fullName}</span>
      </>
    )}
  </div>
);

export default CustomerCell;
