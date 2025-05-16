import { Box, Grid, IconButton, Typography } from "@mui/material";
import type { JSX, ReactNode } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
export interface PageContainer {
  children: ReactNode;
  title: string;
  subtitle?: string;
  goBack?: boolean;
}
import { useNavigate } from "react-router-dom";

export function PageContainer({
  title,
  subtitle,
  children,
  goBack,
}: Readonly<PageContainer>): JSX.Element {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        padding: "5px",
        marginBottom: {
          xs: "40px", // para xs (mobile)
        },
      }}
    >
      <Box maxWidth="640px" width="100%">
        <Box marginY={4}>
          <Grid container alignItems="center" spacing={2}>
            {goBack && (
              <IconButton
                aria-label="goBack"
                size="small"
                color="default"
                onClick={() => navigate(-1)}
              >
                <ArrowBack />
              </IconButton>
            )}
            <Typography variant="h3">{title}</Typography>
          </Grid>
          {subtitle && (
            <Typography variant="body1" color="textDisabled">
              {subtitle}
            </Typography>
          )}
        </Box>

        {children}
      </Box>
    </Box>
  );
}
