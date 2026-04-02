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
      className="mt-10 border-t border-border pt-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            className="inline-flex min-h-[44px] items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground aria-disabled:pointer-events-none aria-disabled:opacity-45"
          >
            Back
          </Link>

          {pages.map((page) => {
            const isCurrentPage = page === currentPage;

            return (
              <Link
                key={page}
                href={createCatalogHref({ page, q, category })}
                aria-current={isCurrentPage ? "page" : undefined}
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center border px-4 text-sm font-medium leading-none transition ${
                  isCurrentPage
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground"
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
            className="inline-flex min-h-[44px] items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground aria-disabled:pointer-events-none aria-disabled:opacity-45"
          >
            Next
          </Link>
        </div>
      </div>
    </nav>
  );
}
