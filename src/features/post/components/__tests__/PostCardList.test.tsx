import { render, screen } from "@testing-library/react";
import { PostCardList } from "../PostCardList";
import { posts } from "../../../../shared/mocks/post";
import { expect, describe, test } from "vitest";
import AppProvider from "../../../../shared/providers/AppProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
describe("PostList", () => {
  const postCardListFactory = (data = posts) => {
    const queryClient = createTestQueryClient();
    render(
      <AppProvider lang={"es"}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <PostCardList posts={data} />
          </MemoryRouter>
        </QueryClientProvider>
      </AppProvider>
    );
  };

  test("should render the post list", () => {
    postCardListFactory();
    const postItemsCount = screen.getByTestId("feed-list").childNodes.length;
    expect(postItemsCount).toBe(2);
  });
});
