import { render, screen } from "@testing-library/react";
import { FavoriteUsers } from "../FavoriteUsers";
import { users } from "../../../../shared/mocks/users";
import { expect, describe, test } from "vitest";

describe("FavoriteUserList", () => {
  const favoriteUserFactory = (data = users) => {
    render(
      <FavoriteUsers favoriteUsers={data} removeFavoriteUser={() => {}} />
    );
  };

  test("should render the post list", () => {
    favoriteUserFactory();
    const usersItemCount =
      screen.getByTestId("favorite-user-list").childNodes.length;
    expect(usersItemCount).toBe(2);
  });
});
