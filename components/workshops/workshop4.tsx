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
import {
  type Customer,
  createRandomCustomer,
} from "@/components/workshops/workshop1";

const CustomerCard = ({
  customer: { firstName, lastName, email, profileUrl },
}: {
  customer: Customer;
}) => {
  const fullName = `${firstName} ${lastName}`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>{fullName}</span>
            <Avatar>
              <AvatarImage src={profileUrl} alt={`${fullName} profile`} />
              <AvatarFallback>
                {firstName.at(0)}
                {lastName.at(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Delete</Button>
        <Button>Show full profile</Button>
      </CardFooter>
    </Card>
  );
};

const CustomerCardWithTopLevelProps = ({
  firstName,
  lastName,
  email,
  profileUrl,
}: {
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>
        <div className="flex items-center justify-between">
          <span>
            {firstName} {lastName}
          </span>
          <Avatar>
            <AvatarImage
              src={profileUrl}
              alt={`${firstName} ${lastName} profile`}
            />
            <AvatarFallback>
              {firstName.at(0)}
              {lastName.at(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardTitle>
      <CardDescription>{email}</CardDescription>
    </CardHeader>
    <CardFooter className="flex justify-between">
      <Button variant="destructive">Delete</Button>
      <Button>Show full profile</Button>
    </CardFooter>
  </Card>
);

const CustomersList = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 xl:grid-cols-3">
    {children}
  </div>
);

const Workshop4 = () => {
  const { firstName, lastName, email, profileUrl } = createRandomCustomer();
  const customer = createRandomCustomer();
  const customerWithFullName = {
    ...customer,
    fullName: `${customer.firstName} ${customer.lastName}`,
  };
  /* const array = [1, 2, 3] as const;
  const array2 = [...array, 4, 5, 6, ...array] as const;
  const obj = { field1: "abc" } as const;
  const obj2 = { ...obj, field2: "def" } as const; */
  return (
    <div className="flex flex-col px-4 lg:px-6 gap-6">
      <CustomersList>
        <CustomerCard customer={createRandomCustomer()} />
        <CustomerCard customer={createRandomCustomer()} />
        <CustomerCard customer={customerWithFullName} />
        <CustomerCardWithTopLevelProps
          firstName={firstName}
          lastName={lastName}
          email={email}
          profileUrl={profileUrl}
        />
        <CustomerCardWithTopLevelProps {...createRandomCustomer()} />
        <CustomerCardWithTopLevelProps {...customerWithFullName} />
      </CustomersList>
    </div>
  );
};

export default Workshop4;
