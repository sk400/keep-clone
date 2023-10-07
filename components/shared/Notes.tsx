import { Grid, Typography } from "@mui/material";
import { NoteType } from "@/typings";

import Note from "./Note";

interface Props {
  notes: NoteType[];
  message?: string;
}

const Notes = ({ notes, message }: Props) => {
  if (notes?.length < 1 && message) {
    return (
      <Typography variant="h6" color="black" textAlign="center">
        {message}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {notes?.map((note, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Note note={JSON.parse(JSON.stringify(note))} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Notes;
