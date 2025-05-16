"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageIcon, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { upsertProductFormSchema, productSchema } from "@/lib/types";
import { fileToBase64, formatPrice } from "@/lib/utils";
import { createProduct } from "@/components/workshops/actions";

const ProductForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  return (
    <form
      ref={formRef}
      onSubmit={async (event) => {
        event.preventDefault();
        const validatedFields = upsertProductFormSchema.safeParse({
          name: nameRef.current?.value,
          description: descriptionRef.current?.value,
          price: Number(priceRef.current?.value),
          imageUrl: await fileToBase64(
            imageRef.current?.files?.[0] ?? new File([], ""),
          ),
        });
        if (!validatedFields.success) {
          alert(
            validatedFields.error.errors
              .map(({ path, message }) => `${path.join("/")}: ${message}`)
              .join("\n"),
          );
        } else {
          const response = await fetch("/api/products", {
            method: "PUT",
            body: JSON.stringify(validatedFields.data),
          });
          const result = await response.json();
          if (response.status !== 200) {
            alert(result.error);
            return;
          }
          alert(`Product #${result.data.id} created!`);
          formRef.current?.reset();
        }
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" ref={nameRef} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" ref={descriptionRef} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          min={upsertProductFormSchema.shape.price.minValue ?? undefined}
          max={upsertProductFormSchema.shape.price.maxValue ?? undefined}
          step="0.01"
          ref={priceRef}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input id="image" type="file" required ref={imageRef} />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

const ProductFormControlled = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const validatedFields = upsertProductFormSchema.safeParse({
          name,
          description,
          price: Number(Number(price).toFixed(2)),
          imageUrl: await fileToBase64(image!),
        });
        if (!validatedFields.success) {
          alert(
            validatedFields.error.errors
              .map(({ path, message }) => `${path.join("/")}: ${message}`)
              .join("\n"),
          );
        } else {
          alert("Product created!");
          setName("");
          setDescription("");
          setPrice("");
          setImage(null);
          const form = event.target as HTMLFormElement;
          form.reset();
        }
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          min={upsertProductFormSchema.shape.price.minValue ?? undefined}
          max={upsertProductFormSchema.shape.price.maxValue ?? undefined}
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="space-y-2 grow">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            onChange={(event) =>
              event.target.files?.[0] && setImage(event.target.files?.[0])
            }
            required
          />
        </div>
        {image ? (
          <Image
            width={64}
            height={64}
            className="size-16"
            src={URL.createObjectURL(image)}
            alt="image"
          />
        ) : (
          <ImageIcon className="size-16" />
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

const ProductFormServerAction = () => {
  const [imageUrl, setImageUrl] = useState("");
  return (
    <form action={createProduct} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min={upsertProductFormSchema.shape.price.minValue ?? undefined}
          max={upsertProductFormSchema.shape.price.maxValue ?? undefined}
          step="0.01"
          required
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="space-y-2 grow">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            onChange={(event) =>
              event.target.files?.[0] &&
              setImageUrl(URL.createObjectURL(event.target.files?.[0]))
            }
            required
          />
        </div>
        {imageUrl ? (
          <Image
            width={64}
            height={64}
            className="size-16"
            src={imageUrl}
            alt="image"
          />
        ) : (
          <ImageIcon className="size-16" />
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

const ProductFormValidated = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof upsertProductFormSchema>>({
    resolver: zodResolver(upsertProductFormSchema),
    defaultValues: { name: "", description: "", price: 1, imageUrl: "" },
  });
  const onSubmit = async ({
    name,
    price,
  }: z.infer<typeof upsertProductFormSchema>) => {
    setLoading(true);
    await createProduct(new FormData(formRef.current!));
    toast("Product created!", {
      description: `${name} (${formatPrice(price)}) created.`,
    });
    setLoading(false);
    form.reset();
    formRef.current?.reset();
  };
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  name="name"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  name="description"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  name="price"
                  type="number"
                  min={productSchema.shape.price.minValue ?? undefined}
                  max={productSchema.shape.price.maxValue ?? undefined}
                  step="0.01"
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <div className="space-y-2 grow">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      name="image"
                      type="file"
                      onChange={(event) =>
                        event.target.files?.[0] &&
                        field.onChange(
                          URL.createObjectURL(event.target.files?.[0]),
                        )
                      }
                    />
                  </FormControl>
                </div>
                {field.value ? (
                  <Image
                    width={64}
                    height={64}
                    className="size-16"
                    src={field.value}
                    alt="image"
                  />
                ) : (
                  <ImageIcon className="size-16" />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <RotateCw className="mr-2 size-4 animate-spin" />}
            {loading ? "Creating…" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const Workshop9 = ({ form = "product-form" }: { form?: string }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col px-4 lg:px-6 gap-6">
      <div className="lg:px-16 px-4 space-y-8">
        <Tabs defaultValue={form}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="product-form"
              onClick={() => router.push("/workshops?workshop=9")}
            >
              Product Form
            </TabsTrigger>
            <TabsTrigger
              value="product-form-controlled"
              onClick={() =>
                router.push(
                  "/workshops?workshop=9&form=product-form-controlled",
                )
              }
            >
              Product Form Controlled
            </TabsTrigger>
            <TabsTrigger
              value="product-form-server-action"
              onClick={() =>
                router.push(
                  "/workshops?workshop=9&form=product-form-server-action",
                )
              }
            >
              Product Form Server Action
            </TabsTrigger>
            <TabsTrigger
              value="product-form-validated"
              onClick={() =>
                router.push("/workshops?workshop=9&form=product-form-validated")
              }
            >
              Product Form Validated
            </TabsTrigger>
          </TabsList>
          <TabsContent value="product-form" className="pt-4">
            <ProductForm />
          </TabsContent>
          <TabsContent value="product-form-controlled" className="pt-4">
            <ProductFormControlled />
          </TabsContent>
          <TabsContent value="product-form-server-action" className="pt-4">
            <ProductFormServerAction />
          </TabsContent>
          <TabsContent value="product-form-validated" className="pt-4">
            <ProductFormValidated />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Workshop9;
