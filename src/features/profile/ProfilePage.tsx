import type { JSX } from "react";
import { PageContainer } from "../../shared/components";
import { useTranslation } from "../../shared";
import { Grid } from "@mui/material";
import useProfile from "./hooks/useProfile.hook";
import { UpdateProfileForm } from "./components/UpdateProfileForm";
import { UpdateUserPassword } from "./components/UpdateUserPassword";

export function ProfilePage(): JSX.Element {
  const { t: translate } = useTranslation("profile");
  const { user, loadingUpdateUserProfile, onValidation, onUpdateUser } =
    useProfile();

  return (
    <PageContainer title={translate("title")} subtitle={translate("subtitle")}>
      <Grid container direction={"column"} spacing={3}>
        <UpdateProfileForm
          user={user}
          loading={loadingUpdateUserProfile}
          onValidation={onValidation}
          onUpdateUser={onUpdateUser}
        />
        <UpdateUserPassword
          user={user}
          loading={loadingUpdateUserProfile}
          onUpdatePassword={onUpdateUser}
        />
      </Grid>
    </PageContainer>
  );
}
