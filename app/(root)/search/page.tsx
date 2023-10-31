import SearchpageNote from "@/components/shared/SearchpageNote";
import { searchNotes } from "@/lib/actions/Note.actions";
import { currentUser } from "@clerk/nextjs";
import { Grid, Typography } from "@mui/material";

interface Props {
  searchParams: { [key: string]: string };
}

const Page = async ({ searchParams }: Props) => {
  const user = await currentUser();

  if (!user) return null;

  const searchedNotes = await searchNotes({
    userId: user.id,
    searchTerm: searchParams.query ?? "",
  });

  const message = `You have not any notes related to ${searchParams.query} `;

  if (searchedNotes?.length < 1) {
    return (
      <Typography variant="h6" color="black" textAlign="center">
        {message}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {searchedNotes?.map((note) => (
        <Grid item key={note._id} xs={12} sm={6} md={4} lg={3}>
          <SearchpageNote note={JSON.parse(JSON.stringify(note))} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Page;
