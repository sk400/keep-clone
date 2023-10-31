"use client";

import { Box, IconButton, InputBase, Stack, Typography } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { addNote } from "@/lib/actions/Note.actions";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { experimental_useOptimistic as useOptimistic } from "react";
import { Action, NoteType } from "@/typings";
import Notes from "../shared/Notes";

interface Props {
  labelId?: string;
  notes: NoteType[];
  pinnedNotes?: NoteType[];
}

const CreateNote = ({ labelId, notes, pinnedNotes }: Props) => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });
  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    notes,
    (state: NoteType[], newNote: NoteType) => [...state, newNote]
  );

  const [pinNotes, setPinnedNote] = useOptimistic(
    pinnedNotes ?? [],
    (state: NoteType[], { id, note, type }: Action) => {
      switch (type) {
        case "add":
          return [...state, note];
        case "remove":
          return state.filter((item) => item._id !== id);
        default:
          return state;
      }
    }
  );

  let message = "You haven't captured your ideas yet.";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNoteData({ ...noteData, [name]: value });
  };

  const handleClick = async () => {
    if (noteData.title.length !== 0 && noteData.content.length !== 0) {
      const newNote = {
        _id: "hjnfnhnhbbtahh",
        title: noteData.title,
        content: noteData.content,
        userId: userId!,
        pinned: false,
        archived: false,
        deleted: false,
      };

      addOptimisticNote(newNote);
      setNoteData({
        title: "",
        content: "",
      });

      await addNote({
        title: noteData.title,
        content: noteData.content,
        userId: userId!,
        path: pathname,
        labelId: labelId && labelId,
      });
    } else {
      //   feedback by toast
    }
  };

  return (
    <Box>
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
          mb: 10,
          mx: "auto",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            bottom: 5,
            right: 5,
            zIndex: 2,
          }}
          disabled={
            noteData.title.length === 0 && noteData.content.length === 0
          }
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

      <Box className="py-20 w-full">
        {pinNotes?.length === 0 && optimisticNotes?.length === 0 && (
          <Typography variant="h6" color="black" textAlign="center">
            {message}
          </Typography>
        )}

        {pinNotes?.length !== 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="overline" display="block" gutterBottom>
              Pinned
            </Typography>
            <Notes
              notes={JSON.parse(JSON.stringify(pinNotes))}
              setPinnedNote={setPinnedNote}
            />
          </Box>
        )}
        {optimisticNotes?.length !== 0 && (
          <Box>
            <Typography variant="overline" display="block" gutterBottom>
              Others
            </Typography>
            <Notes
              notes={JSON.parse(JSON.stringify(optimisticNotes))}
              setPinnedNote={setPinnedNote}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CreateNote;
