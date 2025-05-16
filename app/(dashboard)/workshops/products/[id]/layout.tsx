import { type ReactNode } from "react";
import { prisma } from "@/lib/prisma";
import ProductsPaginationList from "@/components/layout/products-pagination-list";

const ProductsLayout = async ({
  params,
  children,
}: {
  params: Promise<{ id?: string }>;
  children: ReactNode;
}) => {
  const [{ id }, lastProduct] = await Promise.all([
    params,
    prisma.product.findFirst({
      select: { id: true },
      orderBy: { id: "desc" },
    }),
  ]);
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <ProductsPaginationList
        currentPage={Number(id)}
        lastProductId={lastProduct?.id ?? 0}
      />
      {children}
    </div>
  );
};

export default ProductsLayout;
