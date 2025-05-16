import type { JSX } from "react";
import { useTranslation } from "../../shared";
import { PageContainer } from "../../shared/components";
import useFavorite from "../../shared/hooks/useFavorite";
import { FavoriteUsers } from "./components/FavoriteUsers";

export function FavoriteUserPage(): JSX.Element {
  const { t: translate } = useTranslation("favorite_users");
  const { removeFavoriteUser, favoriteUsers } = useFavorite({});
  return (
    <PageContainer title={translate("title")}>
      <FavoriteUsers
        favoriteUsers={favoriteUsers}
        removeFavoriteUser={removeFavoriteUser}
      />
    </PageContainer>
  );
}
