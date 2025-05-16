import { z } from "zod";
import { type UseFormReturn } from "react-hook-form";
import { Trash } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  orderProductSchema,
  ORDER_MAX_PRODUCTS,
  upsertOrderFormSchema,
  type Product,
} from "@/lib/types";

const ProductsFormField = ({
  form,
  products,
}: {
  form: UseFormReturn<z.infer<typeof upsertOrderFormSchema>>;
  products: Product[];
}) => (
  <FormField
    control={form.control}
    name="products"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Products</FormLabel>
        {field.value.map((orderProduct, index) => (
          <div key={orderProduct.productId} className="flex items-center gap-2">
            <Select
              onValueChange={(value) => {
                field.onChange([
                  ...field.value.slice(0, index),
                  {
                    ...field.value[index],
                    productId: Number(value),
                  },
                  ...field.value.slice(index + 1),
                ]);
              }}
              value={orderProduct.productId.toString()}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {products
                  .filter(({ id }) => {
                    const productIds = field.value
                      .filter(
                        ({ productId }) => productId !== orderProduct.productId,
                      )
                      .map(({ productId }) => productId);
                    return !productIds.includes(id);
                  })
                  .map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage
                            src={product.imageUrl}
                            alt={`${product.name} image`}
                          />
                          <AvatarFallback>
                            {product.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{product.name}</span>
                        <span className="text-muted-foreground">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              min={orderProductSchema.shape.quantity.minValue ?? undefined}
              max={orderProductSchema.shape.quantity.maxValue ?? undefined}
              value={orderProduct.quantity}
              onChange={(event) => {
                field.onChange([
                  ...field.value.slice(0, index),
                  {
                    ...field.value[index],
                    quantity: Number(event.target.value),
                  },
                  ...field.value.slice(index + 1),
                ]);
              }}
              className="w-18"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => {
                field.onChange([
                  ...field.value.slice(0, index),
                  ...field.value.slice(index + 1),
                ]);
              }}
            >
              <Trash />
            </Button>
          </div>
        ))}
        {field.value.length < ORDER_MAX_PRODUCTS && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const [product] = products.filter(({ id }) => {
                const productIds = field.value.map(
                  ({ productId }) => productId,
                );
                return !productIds.includes(id);
              });
              field.onChange([
                ...field.value,
                { productId: product?.id ?? 0, quantity: 1 },
              ]);
            }}
          >
            Add product
          </Button>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default ProductsFormField;
