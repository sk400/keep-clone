"use client";

import { deleteAllNotes } from "@/lib/actions/Note.actions";
import { useAuth } from "@clerk/nextjs";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ClearBin = () => {
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();

  const clearBin = async () => {
    await deleteAllNotes(userId!);
  };

  return (
    <Box>
      <Tooltip
        title="Empty bin"
        placement="bottom"
        sx={{
          width: "50px",
          height: "50px",
        }}
      >
        <IconButton onClick={() => setOpen(true)}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
              width: "250px",
              height: "200px",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              color="black"
              textAlign="left"
              fontWeight="medium"
              lineHeight="27px"
            >
              Are you sure, you want to delete all the notes in bin permanently?
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={5}
            >
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1,
                }}
                onClick={() => setOpen(false)}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{
                  px: 4,
                  py: 1,
                }}
                onClick={clearBin}
              >
                Yes
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default ClearBin;
