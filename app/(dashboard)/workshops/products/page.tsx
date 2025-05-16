// import { range } from "lodash";
// import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductsPaginationList from "@/components/layout/products-pagination-list";

const Products = async () => {
  const lastProduct = await prisma.product.findFirst({
    select: { id: true },
    orderBy: { id: "desc" },
  });
  const lastProductId = lastProduct?.id ?? 0;
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <ProductsPaginationList lastProductId={lastProductId} />
      {/* <div className="grid grid-cols-3 gap-4 px-4 lg:px-6 xl:grid-cols-5">
        {range(1, lastProductId + 1).map((productId) => (
          <Link
            key={productId}
            href={`/workshops/products/${productId}`}
            className="underline underline-offset-4"
          >
            Product #{productId}
          </Link>
        ))}
      </div> */}
      <div className="flex flex-col px-4 lg:px-6 gap-6">
        <div className="lg:px-16 px-4 space-y-8">
          <h2 className="text-center text-xl">Products page</h2>
        </div>
      </div>
    </div>
  );
};

export default Products;
