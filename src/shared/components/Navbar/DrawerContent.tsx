import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Home from "@mui/icons-material/Home";
import Add from "@mui/icons-material/Add";
import Person from "@mui/icons-material/Person";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../contexts";

interface DrawerContentProp {
  handleDrawerToggle: () => void;
  getButtonStyle: (path: string) => Record<string, string>;
}

export function DrawerContent({
  handleDrawerToggle,
  getButtonStyle,
}: Readonly<DrawerContentProp>) {
  const { t: translate } = useTranslation("navbar");
  const navigate = useNavigate();
  return (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem
          onClick={() => navigate("/feed")}
          sx={getButtonStyle("/feed")}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={translate("actions.feed")} />
        </ListItem>
        <ListItem
          onClick={() => navigate("/post/create")}
          sx={getButtonStyle("/post/create")}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={translate("actions.create_post")} />
        </ListItem>
        <ListItem
          onClick={() => navigate("/profile")}
          sx={getButtonStyle("/profile")}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={translate("actions.profile")} />
        </ListItem>
        <ListItem
          onClick={() => navigate("/favorite_users")}
          sx={getButtonStyle("/favorite_users")}
        >
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary={translate("actions.favorite_users")} />
        </ListItem>
      </List>
    </Box>
  );
}
