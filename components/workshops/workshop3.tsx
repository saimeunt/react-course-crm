import { type ReactNode } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createRandomCustomer } from "@/components/workshops/workshop1";

const CustomerCard = () => {
  const customer = createRandomCustomer();
  const fullName = `${customer.firstName} ${customer.lastName}`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>{fullName}</span>
            <Avatar>
              <AvatarImage
                src={customer.profileUrl}
                alt={`${fullName} profile`}
              />
              <AvatarFallback>
                {customer.firstName.at(0)}
                {customer.lastName.at(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardTitle>
        <CardDescription>{customer.email}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Delete</Button>
        <Button>Show full profile</Button>
      </CardFooter>
    </Card>
  );
};

const CustomersList = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 xl:grid-cols-3">
    {children}
  </div>
);

const Workshop3 = () => (
  <div className="flex flex-col px-4 lg:px-6 gap-6">
    <CustomersList>
      <CustomerCard />
      <CustomerCard />
      <CustomerCard />
    </CustomersList>
  </div>
);

export default Workshop3;
