import { Box, List, ListItem } from "@mui/material";
import React from "react";

const SidebarItems = () => {
  return (
    <Box>
      <List>
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
              {item?.icon}
            </ListItemIcon>
            <ListItemText primary={item?.name} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SidebarItems;
