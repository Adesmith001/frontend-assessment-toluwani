import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ExplorerControls } from "@/components/products/explorer-controls";

const replaceMock = vi.fn();
let currentSearchParams = "";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(currentSearchParams),
}));

describe("ExplorerControls", () => {
  beforeEach(() => {
    currentSearchParams = "";
    replaceMock.mockReset();
    vi.useFakeTimers();
  });

  it("waits for the debounce window before syncing the search query to the URL", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <ExplorerControls
        categories={[]}
        initialQuery=""
        initialCategory=""
      />,
    );

    await user.type(
      screen.getByRole("searchbox", { name: "Search products" }),
      "phone",
    );

    expect(replaceMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(350);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/?q=phone", { scroll: false });
    });
  });

  it("resets pagination when the category changes", async () => {
    currentSearchParams = "page=3&q=phone";
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

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

    await user.selectOptions(screen.getByRole("combobox", { name: "Category" }), [
      "smartphones",
    ]);

    expect(replaceMock).toHaveBeenCalledWith("/?q=phone&category=smartphones", {
      scroll: false,
    });
  });
});
