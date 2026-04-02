import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ExplorerControls } from "@/components/products/explorer-controls";

const replaceMock = vi.fn();
let currentSearchParams = "";
const searchParamsMock = {
  get: (key: string) => new URLSearchParams(currentSearchParams).get(key),
  toString: () => currentSearchParams,
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: (href: string) => {
      replaceMock(href, { scroll: false });
      const queryString = href.includes("?") ? href.split("?")[1] ?? "" : "";
      currentSearchParams = queryString;
    },
  }),
  usePathname: () => "/",
  useSearchParams: () => searchParamsMock,
}));

describe("ExplorerControls", () => {
  beforeEach(() => {
    currentSearchParams = "";
    replaceMock.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("waits for the debounce window before syncing the search query to the URL", async () => {
    render(
      <ExplorerControls
        categories={[]}
        initialQuery=""
        initialCategory=""
      />,
    );

    fireEvent.change(screen.getByRole("searchbox", { name: "Search products" }), {
      target: { value: "phone" },
    });

    expect(replaceMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(replaceMock).toHaveBeenCalledWith("/?q=phone", { scroll: false });
  });

  it("resets pagination when the category changes", async () => {
    currentSearchParams = "page=3&q=phone";

    render(
      <ExplorerControls
        categories={[
          {
            slug: "smartphones",
            name: "Smartphones",
            url: "https://dummyjson.com/products/category/smartphones",
          },
        ]}
        initialQuery="phone"
        initialCategory=""
      />,
    );

    fireEvent.change(screen.getByRole("combobox", { name: "Category" }), {
      target: { value: "smartphones" },
    });

    expect(replaceMock).toHaveBeenCalledWith("/?q=phone&category=smartphones", {
      scroll: false,
    });
  });
});
