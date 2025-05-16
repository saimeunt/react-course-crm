import Link from "next/link";

const Workshop10 = () => {
  return (
    <div className="flex flex-col px-4 lg:px-6 gap-6">
      <div className="lg:px-16 px-4 space-y-8">
        <div className="flex justify-center">
          <Link
            href="/workshops/products"
            className="underline underline-offset-4"
          >
            Go to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Workshop10;
