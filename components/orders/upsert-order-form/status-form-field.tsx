import { z } from "zod";
import { type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  upsertOrderFormSchema,
  orderStatusKeys,
  orderStatuses,
} from "@/lib/types";

const StatusFormField = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof upsertOrderFormSchema>>;
}) => (
  <FormField
    control={form.control}
    name="status"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Status</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {orderStatusKeys.map((orderStatus) => (
              <SelectItem key={orderStatus} value={orderStatus}>
                {orderStatuses[orderStatus]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default StatusFormField;
