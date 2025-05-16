import { type Metadata } from "next";
import { range } from "lodash";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { fetchOrders } from "@/lib/fetch-data";
import Workshop3 from "@/components/workshops/workshop3";
import Workshop4 from "@/components/workshops/workshop4";
import Workshop5 from "@/components/workshops/workshop5";
import Workshop6 from "@/components/workshops/workshop6";
import Workshop7 from "@/components/workshops/workshop7";
import Workshop8 from "@/components/workshops/workshop8";
import Workshop9 from "@/components/workshops/workshop9";
import Workshop10 from "@/components/workshops/workshop10";
import Workshop11, { CounterProvider } from "@/components/workshops/workshop11";
import Workshop12 from "@/components/workshops/workshop12";

const workshops = range(3, 13);

const WorkshopsPagination = ({
  currentWorkshop,
}: {
  currentWorkshop: number;
}) => (
  <Pagination>
    <PaginationContent>
      <PaginationItem
        className={cn({ invisible: currentWorkshop <= workshops.at(0)! })}
      >
        <PaginationPrevious
          href={`/workshops?workshop=${currentWorkshop <= workshops.at(0)! ? workshops.at(0)! : currentWorkshop - 1}`}
        />
      </PaginationItem>
      {workshops.map((workshop) => (
        <PaginationItem key={workshop}>
          <PaginationLink
            isActive={workshop === currentWorkshop}
            href={`/workshops?workshop=${workshop}`}
          >
            {workshop}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem
        className={cn({ invisible: currentWorkshop >= workshops.at(-1)! })}
      >
        <PaginationNext
          href={`/workshops?workshop=${currentWorkshop >= workshops.at(-1)! ? workshops.at(-1)! : currentWorkshop + 1}`}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export const metadata: Metadata = {
  title: "CRM - Workshops",
  description: "Simple CRM",
};

const Workshops = async ({
  searchParams,
}: {
  searchParams: Promise<{ workshop?: string; form?: string }>;
}) => {
  const [{ workshop, form }, orders] = await Promise.all([
    searchParams,
    fetchOrders(),
  ]);
  const currentWorkshop = workshop ? Number(workshop) : workshops.at(0)!;
  return (
    <CounterProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <WorkshopsPagination currentWorkshop={currentWorkshop} />
        {currentWorkshop === 3 && <Workshop3 />}
        {currentWorkshop === 4 && <Workshop4 />}
        {currentWorkshop === 5 && <Workshop5 />}
        {currentWorkshop === 6 && <Workshop6 />}
        {currentWorkshop === 7 && <Workshop7 />}
        {currentWorkshop === 8 && (
          <Workshop8
            user={orders[12]!.customer}
            orders={orders.slice(0, 12).map((order, index) => ({
              ...order,
              customer: {
                ...order.customer,
                deletedAt: index % 4 === 0 ? new Date() : null,
              },
            }))}
          />
        )}
        {currentWorkshop === 9 && <Workshop9 form={form} />}
        {currentWorkshop === 10 && <Workshop10 />}
        {currentWorkshop === 11 && <Workshop11 />}
        {currentWorkshop === 12 && <Workshop12 />}
      </div>
    </CounterProvider>
  );
};

export default Workshops;
