import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      px={2}
    >
      <Typography variant="h2" fontWeight="bold" color="primary">
        404
      </Typography>
      <Typography variant="h5" mb={2}>
        Página no encontrada
      </Typography>
      <Typography variant="body1" mb={4}>
        Lo sentimos, la página que buscas no existe
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/feed")}
      >
        Volver al inicio
      </Button>
    </Box>
  );
}
