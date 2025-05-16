import type { JSX } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "../../../shared";
import type { LoginPayload } from "../../../shared/interfaces/auth";
import { TextInput } from "../../../shared/components";
import useLogin from "../hooks/useLogin.hook";
import styles from "../Auth.styles";
import { Form } from "react-final-form";

function LoginForm(): JSX.Element {
  const { t: translate } = useTranslation("auth.login");
  const { error, loading, onSubmit, onValidation } = useLogin();
  return (
    <Paper style={styles.paper}>
      {!!error && <Alert severity="error">{error}</Alert>}
      <Form<LoginPayload>
        onSubmit={onSubmit}
        validate={onValidation}
        render={({ handleSubmit }) => (
          <Grid container direction="column" spacing={2}>
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
              {translate("actions.login")}
            </Button>

            <Grid container sx={styles.no_account} justifyContent="center">
              <Typography>{translate("messages.no_account")}</Typography>
              <Link to="/signup">
                <Typography sx={styles.signup}>
                  {translate("actions.signup")}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        )}
      />
    </Paper>
  );
}

export default LoginForm;
