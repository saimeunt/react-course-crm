import { z } from "zod";
import { type UseFormReturn } from "react-hook-form";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { upsertOrderFormSchema, type Customer } from "@/lib/types";

const CustomerComboboxContent = ({ customer }: { customer?: Customer }) =>
  customer ? (
    <div className="flex items-center gap-2">
      <Avatar className="size-6">
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
      <span className="text-muted-foreground">
        {"<"}
        {customer.email}
        {">"}
      </span>
    </div>
  ) : (
    "Select customer"
  );

const CustomerFormField = ({
  form,
  customers,
}: {
  form: UseFormReturn<z.infer<typeof upsertOrderFormSchema>>;
  customers: Customer[];
}) => (
  <FormField
    control={form.control}
    name="customerId"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Customer</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "justify-between",
                  !field.value && "text-muted-foreground",
                )}
              >
                <CustomerComboboxContent
                  customer={customers.find(
                    (customer) => customer.id === field.value,
                  )}
                />
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[590px] p-0">
            <Command>
              <CommandInput placeholder="Search customer…" className="h-9" />
              <CommandList>
                <CommandEmpty>No customer found.</CommandEmpty>
                <CommandGroup>
                  {customers.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      value={customer.fullName}
                      onSelect={() => field.onChange(customer.id)}
                    >
                      <CustomerComboboxContent customer={customer} />
                      <Check
                        className={cn(
                          "ml-auto",
                          customer.id === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default CustomerFormField;
