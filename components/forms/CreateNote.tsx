"use client";

import { Box, IconButton, InputBase, Stack } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { addNote } from "@/lib/actions/Note.actions";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

interface Props {
  labelId?: string;
}

const CreateNote = ({ labelId }: Props) => {
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });
  const { userId } = useAuth();
  const pathname = usePathname();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNoteData({ ...noteData, [name]: value });
  };

  const handleClick = async () => {
    if (noteData.title.length !== 0 && noteData.content.length !== 0) {
      await addNote({
        title: noteData.title,
        content: noteData.content,
        userId: userId!,
        path: pathname,
        labelId: labelId && labelId,
      });
      setNoteData({
        title: "",
        content: "",
      });
    } else {
      //   feedback by toast
    }
  };

  return (
    <Box
      className="prompt"
      sx={{
        width: { sm: "480px" },
        maxWidth: "500px",
        height: "200px",
        borderRadius: "0.375rem",
        position: "relative",
        px: "24px",
        py: "18px",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          bottom: 5,
          right: 5,
          zIndex: 2,
        }}
        disabled={noteData.title.length === 0 && noteData.content.length === 0}
        onClick={() => handleClick()}
      >
        <AddCircleRounded
          className="amber-500"
          sx={{
            width: "30px",
            height: "30px",
          }}
        />
      </IconButton>
      <Stack direction="column" spacing={1}>
        <InputBase
          placeholder="Title"
          type="text"
          className="font-bold"
          name="title"
          sx={{
            fontWeight: "bold",
          }}
          multiline
          onChange={handleChange}
          value={noteData?.title}
        />
        <InputBase
          placeholder="Take a note..."
          type="text"
          name="content"
          multiline
          onChange={handleChange}
          value={noteData?.content}
        />
      </Stack>
    </Box>
  );
};

export default CreateNote;
