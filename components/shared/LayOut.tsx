"use client";

import React, { useState } from "react";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Drawer,
  Input,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, CSSObject } from "@mui/material/styles";
import { UserButton } from "@clerk/nextjs";
import {
  ArchiveOutlined,
  CreateOutlined,
  DeleteOutline,
  LightbulbOutlined,
  Router,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

const openedMixin = (theme: any): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: "100%",

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MdDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const XsDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: theme.spacing(30), // Set the temporary drawer width here
  },
}));

const LayOut = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [openXsDrawer, setOpenXsDrawer] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "0.5px solid",
          borderColor: "#D8D8D8",
        }}
      >
        <Toolbar>
          {/* Xs, sm screen menu button */}
          <IconButton
            aria-label="open drawer"
            onClick={() => setOpenXsDrawer(!openXsDrawer)}
            edge="start"
            sx={{
              marginRight: 1,
              display: { xs: "block", sm: "block", md: "none" },
              color: "black",
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Md screen menu button */}
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 1,
              display: { xs: "none", sm: "none", md: "block" },
              color: "black",
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Appbar icon and profile photo stack */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <img
                alt="logo"
                src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                style={{
                  width: "40px",
                }}
              />
              <Typography fontSize="24px" color="gray" fontWeight="">
                Keep
              </Typography>
            </Stack>
            <UserButton afterSignOutUrl="/sign-in" />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* xtra small and small screen drawer */}

      <XsDrawer
        variant="temporary"
        open={openXsDrawer}
        onClose={() => setOpenXsDrawer(false)}
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
        }}
        anchor="left"
      >
        {" "}
        <DrawerHeader />
        <Divider />
        <List>
          {/* Notes */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
            onClick={() => {
              setOpenXsDrawer(false);
              router.push("/");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                }}
              >
                <LightbulbOutlined />
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItemButton>
          </ListItem>

          {/* Archive */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
            onClick={() => {
              setOpenXsDrawer(false);
              router.push("/");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                }}
              >
                <ArchiveOutlined />
              </ListItemIcon>
              <ListItemText primary="Archive" />
            </ListItemButton>
          </ListItem>
          {/* Bin */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
            onClick={() => {
              setOpenXsDrawer(false);
              router.push("/bin");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                }}
              >
                <DeleteOutline />
              </ListItemIcon>
              <ListItemText primary="Bin" />
            </ListItemButton>
          </ListItem>
          {/* Edit label */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
            onClick={() => {
              setOpenXsDrawer(false);
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                }}
              >
                <CreateOutlined />
              </ListItemIcon>
              <ListItemText primary="Edit label" />
            </ListItemButton>
          </ListItem>
        </List>
      </XsDrawer>

      {/* Md screen drawer */}

      <MdDrawer variant="permanent" open={open}>
        <DrawerHeader />

        <Divider />
        <List>
          {/* Notes */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
            onClick={() => router.push("/")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                }}
              >
                <LightbulbOutlined />
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItemButton>
          </ListItem>
          {/* Archive */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
            onClick={() => router.push("/archive")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                }}
              >
                <ArchiveOutlined />
              </ListItemIcon>
              <ListItemText primary="Archive" />
            </ListItemButton>
          </ListItem>
          {/* Bin */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
            onClick={() => router.push("/bin")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                }}
              >
                <DeleteOutline />
              </ListItemIcon>
              <ListItemText primary="Bin" />
            </ListItemButton>
          </ListItem>
          {/* Edit label */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                }}
              >
                <CreateOutlined />
              </ListItemIcon>
              <ListItemText primary="Edit label" />
            </ListItemButton>
          </ListItem>
        </List>
      </MdDrawer>

      {children}
    </Box>
  );
};

export default LayOut;
