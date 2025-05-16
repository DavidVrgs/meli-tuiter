import { Box, CircularProgress } from "@mui/material";

export function AppLoading() {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: "1000",
        height: "100vh",
        width: "100%",
        background: "white",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}
