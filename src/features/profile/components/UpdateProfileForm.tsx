import type { JSX } from "react";
import { PaperCard, TextInput } from "../../../shared/components";
import type { User, UserPayload } from "../../../shared/interfaces/auth";
import { Form } from "react-final-form";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "../../../shared";
import type { ValidationErrors } from "final-form";

export interface UpdateProfileFormProp {
  user: User | null;
  loading: boolean;
  onUpdateUser: (payload: UserPayload) => void;
  onValidation: (payload: UserPayload) => ValidationErrors;
}

export function UpdateProfileForm({
  user,
  loading,
  onUpdateUser,
  onValidation,
}: Readonly<UpdateProfileFormProp>): JSX.Element {
  const { t: translate } = useTranslation("profile.form");

  return (
    <PaperCard>
      <Form<UserPayload>
        onSubmit={onUpdateUser}
        validate={onValidation}
        initialValues={{
          avatar_url: user?.avatar_url,
          email: user?.email,
          name: user?.name,
        }}
        render={({ handleSubmit }) => (
          <>
            <Grid container spacing={3} alignItems="center">
              <Avatar alt={user?.name} src={user?.avatar_url} />
              <Grid container direction="column" size={{ md: 10, xs: 12 }}>
                <TextInput
                  name="avatar_url"
                  label={translate("inputs.profile_picture")}
                  required
                  fullWidth
                  disabled={loading}
                />
                <Typography variant="body2">
                  {translate("messages.profile_picture")}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{ marginTop: "15px" }}
            >
              <TextInput
                name="name"
                label={translate("inputs.name")}
                required
                fullWidth
                disabled={loading}
              />
              <TextInput
                name="email"
                label={translate("inputs.email")}
                required
                fullWidth
                disabled
              />
            </Grid>
            <Box marginTop="40px">
              <Button
                variant="contained"
                onClick={handleSubmit}
                loading={loading}
                disabled={loading}
              >
                {translate("actions.save_changes")}
              </Button>
            </Box>
          </>
        )}
      />
    </PaperCard>
  );
}
