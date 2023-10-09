"use client";

import React, { useEffect, useState } from "react";
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
  Drawer,
  Input,
  Modal,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, CSSObject } from "@mui/material/styles";
import { UserButton, useAuth } from "@clerk/nextjs";
import {
  Add,
  ArchiveOutlined,
  CloseOutlined,
  CreateOutlined,
  Delete,
  DeleteOutline,
  LabelOutlined,
  LabelRounded,
  LightbulbOutlined,
  Router,
} from "@mui/icons-material";

import { useRouter } from "next/navigation";
import {
  createLabel,
  deleteLabel,
  fetchLabels,
  updateLabel,
} from "@/lib/actions/Label.actions";
import { Label } from "@/typings";
import Link from "next/link";

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

const LayOut = ({
  children,
  labels,
}: {
  children: React.ReactNode;
  labels: Label[];
}) => {
  const [open, setOpen] = useState(false);
  const [openXsDrawer, setOpenXsDrawer] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [labelName, setLabelName] = useState("");
  const [newLabelName, setNewLabelName] = useState("");
  const [labelId, setLabelId] = useState("");

  const router = useRouter();
  const { userId } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleCreateLabel = async () => {
    await createLabel({ name: labelName, userId: userId! });
    setLabelName("");
  };

  const handleDeleteLabel = async () => {
    const isAgreed = confirm(
      "Are you really want to delete the label? You can not get the label back."
    );

    if (isAgreed) {
      await deleteLabel(labelId);
    }
  };

  const editLabel = async () => {
    await updateLabel(labelId!, newLabelName);
    setLabelId("");
    setNewLabelName("");
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
          <Link href="/" prefetch={true}>
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
                // router.push("/");
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
          </Link>

          {/* Archive */}
          <Link href="/archive" prefetch={true}>
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
                // router.push("/");
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
          </Link>
          {/* Bin */}
          <Link href="/bin" prefetch={true}>
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
                // router.push("/bin");
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
          </Link>

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
              setOpenModal(!openModal);
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

          {labels?.length !== 0 &&
            labels?.map((label) => (
              <Link
                href={`/labels/${label?._id}`}
                style={{ textDecoration: "none", color: "black" }}
                key={label?._id}
              >
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    "&:hover": {
                      backgroundColor: "#feefc3",
                    },
                  }}
                  onClick={() => setOpenXsDrawer(false)}
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
                      <LabelOutlined />
                    </ListItemIcon>
                    <ListItemText primary={label?.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        </List>
      </XsDrawer>

      {/* Md screen drawer */}

      <MdDrawer variant="permanent" open={open}>
        <DrawerHeader />

        <Divider />
        <List>
          {/* Notes */}
          <Link href="/" prefetch={true}>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                "&:hover": {
                  backgroundColor: "#feefc3",
                },
              }}
              // onClick={() => router.push("/")}
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
          </Link>
          {/* Archive */}
          <Link href="/archive" prefetch={true}>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                "&:hover": {
                  backgroundColor: "#feefc3",
                },
              }}
              // onClick={() => router.push("/archive")}
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
          </Link>

          {/* Bin */}
          <Link href="/bin" prefetch={true}>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                "&:hover": {
                  backgroundColor: "#feefc3",
                },
              }}
              // onClick={() => router.push("/bin")}
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
          </Link>
          {/* Edit label */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#feefc3",
              },
            }}
            onClick={() => setOpenModal(!openModal)}
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
          {labels?.length !== 0 &&
            labels?.map((label) => (
              <Link
                href={`/labels/${label?._id}`}
                style={{ textDecoration: "none", color: "black" }}
                key={label?._id}
              >
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
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <LabelOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={label?.name}
                      sx={{
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        </List>
      </MdDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Paper
            sx={{
              maxWidth: "250px",
              height: "250px",
              p: 2,
              position: "relative",
            }}
            square
          >
            <Typography variant="subtitle2" gutterBottom>
              Edit labels
            </Typography>

            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                position: "absolute",
                top: 1,
                right: 1,
                zIndex: 5,
              }}
            >
              <CloseOutlined />
            </IconButton>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Input
                placeholder="Create a new label"
                type="text"
                value={labelName}
                onChange={(e) => setLabelName(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  handleCreateLabel();
                  setOpenModal(false);
                }}
              >
                <Add />
              </IconButton>
            </Stack>
            <List
              sx={{
                height: "150px",
                overflowY: "auto",
              }}
            >
              {labels?.map((label) => (
                <ListItem disablePadding key={label?._id}>
                  <ListItemButton
                    onClick={() => {
                      setLabelId(label?._id);
                      setOpenEditModal(true);
                    }}
                  >
                    <ListItemIcon>
                      <LabelRounded />
                    </ListItemIcon>
                    <ListItemText primary={label?.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {/* Rename label modal */}
            <Modal
              open={openEditModal}
              onClose={() => setOpenEditModal(false)}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  position: "relative",
                }}
              >
                <Paper
                  sx={{
                    maxWidth: "250px",
                    height: "250px",
                    p: 2,
                    position: "relative",
                  }}
                  square
                >
                  <Typography variant="subtitle2" gutterBottom>
                    New name for label
                  </Typography>

                  <IconButton
                    onClick={() => setOpenEditModal(false)}
                    sx={{
                      position: "absolute",
                      top: 1,
                      right: 1,
                      zIndex: 5,
                    }}
                  >
                    <CloseOutlined />
                  </IconButton>

                  <Stack direction="row" alignItems="center" spacing={1} my={2}>
                    <Input
                      placeholder="New name"
                      type="text"
                      value={newLabelName}
                      onChange={(e) => setNewLabelName(e.target.value)}
                    />
                    <IconButton
                      onClick={() => {
                        editLabel();
                        setOpenEditModal(false);
                        setOpenModal(false);
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Stack>
                  <Tooltip
                    title="Delete label"
                    placement="bottom"
                    sx={{
                      position: "absolute",
                      bottom: 3,
                      right: 3,

                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        handleDeleteLabel();
                        setOpenEditModal(false);
                        setOpenModal(false);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Paper>
              </Box>
            </Modal>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default LayOut;
