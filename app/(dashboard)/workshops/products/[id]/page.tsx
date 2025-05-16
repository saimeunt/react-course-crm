import { prisma } from "@/lib/prisma";
// import { fetchProducts } from "@/lib/fetch-data";
import { notFound } from "next/navigation";

const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
  /* const [{ id }, products] = await Promise.all([params, fetchProducts()]);
  const product = products.find((product) => product.id === Number(id)); */
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  if (!product) {
    notFound();
  }
  return (
    <div className="flex flex-col px-4 lg:px-6 gap-6">
      <div className="lg:px-16 px-4 space-y-8">
        <h2 className="text-center text-xl">{product.name} page</h2>
      </div>
    </div>
  );
};

export default Product;
