import type { JSX } from "react";
import { PaperCard, TextInput } from "../../../shared/components";
import type { User, UserPayload } from "../../../shared/interfaces/auth";
import { Form } from "react-final-form";
import { Box, Button, Grid } from "@mui/material";
import { useTranslation } from "../../../shared";

export interface UpdateUserPasswordProp {
  user: User | null;
  loading: boolean;
  onUpdatePassword: (payload: UserPayload) => void;
}

export function UpdateUserPassword({
  user,
  loading,
  onUpdatePassword,
}: Readonly<UpdateUserPasswordProp>): JSX.Element {
  const { t: translate } = useTranslation("profile");

  return (
    <PaperCard title={translate("cards.change_password")}>
      <Form<UserPayload>
        onSubmit={onUpdatePassword}
        initialValues={{
          avatar_url: user?.avatar_url,
          name: user?.name,
        }}
        render={({ handleSubmit }) => (
          <>
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{ marginTop: "15px" }}
            >
              <TextInput
                name="password"
                label={translate("form.inputs.password")}
                required
                type="password"
                fullWidth
                disabled={loading}
              />
            </Grid>
            <Box marginTop="20px" marginBottom="25px">
              <Button
                variant="outlined"
                onClick={handleSubmit}
                loading={loading}
                disabled={loading}
              >
                {translate("form.actions.update_password")}
              </Button>
            </Box>
          </>
        )}
      />
    </PaperCard>
  );
}
