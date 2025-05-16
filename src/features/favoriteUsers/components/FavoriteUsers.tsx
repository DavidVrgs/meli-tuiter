import type { JSX } from "react";
import { PaperCard } from "../../../shared/components";
import type { FavoriteUser } from "../../../shared/interfaces/user";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import PersonRemove from "@mui/icons-material/PersonRemove";

export interface FavoriteUsersProp {
  favoriteUsers: FavoriteUser[];
  removeFavoriteUser: (index: number) => void;
}

export function FavoriteUsers({
  favoriteUsers,
  removeFavoriteUser,
}: Readonly<FavoriteUsersProp>): JSX.Element {
  return (
    <PaperCard>
      <Grid container spacing={2} data-testid="favorite-user-list">
        {favoriteUsers.map((user, index) => (
          <Grid key={`favorite-user-card-${user.author}`} size={12}>
            <Paper style={{ padding: "10px", background: "#f9fafb" }}>
              <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar alt={user?.author} src={user?.avatar_url} />
                  <Typography variant="h4">{user.author}</Typography>
                </Box>
                <Box>
                  <IconButton
                    aria-label="removeFavorite"
                    size="small"
                    color="error"
                    onClick={() => removeFavoriteUser(index)}
                  >
                    <PersonRemove />
                  </IconButton>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </PaperCard>
  );
}
