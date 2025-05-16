import type { JSX } from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "../../../shared";
import styles from "../Auth.styles";
import SignUpForm from "../components/SignUpForm";

function SignUpPage(): JSX.Element {
  const { t: translate } = useTranslation("auth.signup");

  return (
    <Grid
      container
      sx={styles.container}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Typography variant="h4">{translate("title")}</Typography>
      <Typography>{translate("description")}</Typography>

      <Grid size={{ md: 4, sm: 12 }}>
        <SignUpForm />
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
