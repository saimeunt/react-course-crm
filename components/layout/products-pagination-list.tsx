import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { range, chunk } from "lodash";

const ProductsPagination = ({
  currentPage,
  pagesChunk,
}: {
  currentPage: number;
  pagesChunk: number[];
}) => (
  <Pagination>
    <PaginationContent>
      {pagesChunk.map((page) => (
        <PaginationItem key={page}>
          <PaginationLink
            isActive={page === currentPage}
            href={`/workshops/products/${page}`}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
    </PaginationContent>
  </Pagination>
);

const ProductsPaginationList = ({
  currentPage,
  lastProductId,
}: {
  currentPage?: number;
  lastProductId: number;
}) => {
  const pages = range(1, lastProductId + 1);
  return chunk(pages, 20).map((pagesChunk, index) => (
    <ProductsPagination
      key={index}
      currentPage={currentPage ?? 0}
      pagesChunk={pagesChunk}
    />
  ));
};

export default ProductsPaginationList;
