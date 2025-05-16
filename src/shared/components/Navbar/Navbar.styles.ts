const styles = {
  logoBox: {
    backgroundColor: "#EEF4FF",
    padding: "4px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
  },
  logoText: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  logoLetter: {
    fontWeight: "bold",
    color: "#1D4ED8",
  },
  activeButton: {
    backgroundColor: "#EEF4FF",
    color: "#1D4ED8",
    borderRadius: 2,
    fontWeight: 500,
    textTransform: "none",
    px: 2,
    "&:hover": {
      backgroundColor: "#E0E7FF",
    },
  },
  navButton: {
    textTransform: "none",
    color: "#374151",
  },
  avatar: {
    width: 32,
    height: 32,
  },
  userName: {
    fontWeight: 500,
  },
};

export default styles;
