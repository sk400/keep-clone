import ClearBin from "@/components/ClearBin";
import Notes from "@/components/shared/Notes";
import { fetchNotes } from "@/lib/actions/Note.actions";
import { currentUser } from "@clerk/nextjs";
import { TryRounded } from "@mui/icons-material";
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
import React from "react";

export const revalidate = "force-cache";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const deletedNotes = await fetchNotes({
    userId: user.id,
    deleted: true,
  });

  let message = "Your bin is empty.";

  return (
    <Box>
      {deletedNotes?.length !== 0 && (
        <Box
          sx={{
            mb: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            color="black"
            textAlign="left"
            fontWeight="bold"
          >
            Your notes in bin
          </Typography>
          <ClearBin />
        </Box>
      )}
      <Notes notes={deletedNotes} message={message} />
    </Box>
  );
};

export default Page;
