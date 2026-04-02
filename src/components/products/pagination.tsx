import Link from "next/link";

import { createCatalogHref } from "@/lib/utils/query-params";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  q: string;
  category: string;
}

function getPageWindow(currentPage: number, totalPages: number) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function Pagination({
  currentPage,
  totalPages,
  q,
  category,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageWindow(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="surface-panel mt-10 flex flex-col gap-5 rounded-[30px] p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="eyebrow text-muted-foreground">Page navigation</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={createCatalogHref({
            page: Math.max(1, currentPage - 1),
            q,
            category,
          })}
          aria-disabled={currentPage === 1}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent aria-disabled:pointer-events-none aria-disabled:opacity-45"
        >
          Previous
        </Link>

        {pages.map((page) => {
          const isCurrentPage = page === currentPage;

          return (
            <Link
              key={page}
              href={createCatalogHref({ page, q, category })}
              aria-current={isCurrentPage ? "page" : undefined}
              className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border px-4 text-sm font-medium leading-none transition ${
                isCurrentPage
                  ? "border-accent bg-accent text-white"
                  : "border-border text-foreground hover:border-accent/40 hover:text-accent"
              }`}
            >
              {page}
            </Link>
          );
        })}

        <Link
          href={createCatalogHref({
            page: Math.min(totalPages, currentPage + 1),
            q,
            category,
          })}
          aria-disabled={currentPage === totalPages}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent aria-disabled:pointer-events-none aria-disabled:opacity-45"
        >
          Next
        </Link>
      </div>
    </nav>
  );
}
