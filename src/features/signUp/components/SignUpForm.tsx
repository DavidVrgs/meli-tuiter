import type { JSX } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "../../../shared";
import type { SignUpPayload } from "../../../shared/interfaces/auth";
import { TextInput } from "../../../shared/components";
import useSignUp from "../hooks/useSignUp.hook";
import styles from "../SignUp.styles";
import { Form } from "react-final-form";

function SignUpForm(): JSX.Element {
  const { t: translate } = useTranslation("signup");
  const { error, loading, onSubmit, onValidation } = useSignUp();
  return (
    <Paper style={styles.paper}>
      {!!error && <Alert severity="error">{error}</Alert>}
      <Form<SignUpPayload>
        onSubmit={onSubmit}
        validate={onValidation}
        render={({ handleSubmit }) => (
          <Grid container direction="column" spacing={2}>
            <TextInput
              name="name"
              label={translate("form.inputs.full_name")}
              required
              fullWidth
              disabled={loading}
            />

            <TextInput
              name="email"
              label="Email"
              required
              fullWidth
              disabled={loading}
            />

            <TextInput
              sx={{ marginBottom: "10px" }}
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
              disabled={loading}
            />

            <Button
              sx={styles.button}
              variant="contained"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              {translate("actions.create")}
            </Button>

            <Grid container sx={styles.already_account} justifyContent="center">
              <Typography>{translate("messages.already_account")}</Typography>
              <Link to="/login">
                <Typography sx={styles.login}>
                  {translate("actions.login")}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        )}
      />
    </Paper>
  );
}

export default SignUpForm;
