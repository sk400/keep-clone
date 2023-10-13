"use client";

import { Grid, Typography } from "@mui/material";
import { Action, NoteType } from "@/typings";

import Note from "./Note";

import { experimental_useOptimistic as useOptimistic } from "react";

interface Props {
  notes: NoteType[];
  message?: string;
  setPinnedNote: (action: Action) => void;
}

const Notes = ({ notes, message, setPinnedNote }: Props) => {
  const [optimisticNotes, setOptimisticNote] = useOptimistic(
    notes,
    (state: NoteType[], { id, note, type }: Action) => {
      if (type === "add") {
        return [...state, note];
      } else {
        return state.filter((item) => item._id !== id);
      }
    }
  );

  if (notes?.length < 1) {
    return (
      <Typography variant="h6" color="black" textAlign="center">
        {message}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {optimisticNotes?.map((note, index) => (
        <Grid item key={note._id} xs={12} sm={6} md={4} lg={3}>
          <Note
            note={JSON.parse(JSON.stringify(note))}
            setOptimisticNote={setOptimisticNote}
            setPinnedNote={setPinnedNote}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Notes;
