import type { JSX } from "react";

import { Grid, Typography } from "@mui/material";
import styles from "../Auth.styles";
import { useTranslation } from "../../../shared";
import LoginForm from "../components/LoginForm";

function LoginPage(): JSX.Element {
  const { t: translate } = useTranslation("auth.login");
  return (
    <Grid
      container
      sx={styles.container}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Typography variant="h4">{translate("welcome")}</Typography>
      <Typography>{translate("description")}</Typography>

      <Grid size={{ md: 4, sm: 12 }}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default LoginPage;
