import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  IconButton,
  Drawer,
} from "@mui/material";
import Home from "@mui/icons-material/Home";
import Add from "@mui/icons-material/Add";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Menu from "@mui/icons-material/Menu";
import styles from "./Navbar.styles";
import { useAuth, useTranslation } from "../../contexts";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import { DrawerContent } from "./DrawerContent";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t: translate } = useTranslation("navbar");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const getButtonStyle = useCallback(
    (path: string) =>
      pathname === path ? styles.activeButton : styles.navButton,
    [pathname]
  );

  if (!isAuthenticated || !user) return null;

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              <Menu />
            </IconButton>
            <Typography sx={styles.logoText}>MeLi Tuiter</Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              startIcon={<Home />}
              sx={getButtonStyle("/feed")}
              onClick={() => navigate("/feed")}
            >
              {translate("actions.feed")}
            </Button>
            <Button
              startIcon={<Add />}
              sx={getButtonStyle("/post/create")}
              onClick={() => navigate("/post/create")}
            >
              {translate("actions.create_post")}
            </Button>
            <Button
              startIcon={<Person />}
              sx={getButtonStyle("/profile")}
              onClick={() => navigate("/profile")}
            >
              {translate("actions.profile")}
            </Button>
            <Button
              startIcon={<PersonAdd />}
              sx={getButtonStyle("/favorite_users")}
              onClick={() => navigate("/favorite_users")}
            >
              {translate("actions.favorite_users")}
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" } }}
            />
            <Avatar alt={user.name} src={user.avatar_url} sx={styles.avatar} />
            <Typography sx={styles.userName}>{user.name}</Typography>
            <IconButton onClick={() => logout()}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        <DrawerContent
          handleDrawerToggle={handleDrawerToggle}
          getButtonStyle={getButtonStyle}
        />
      </Drawer>
    </>
  );
}
