import CreateNote from "@/components/forms/CreateNote";
import { fetchNotes } from "@/lib/actions/Note.actions";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Box, Typography } from "@mui/material";
import Notes from "@/components/shared/Notes";

export const revalidate = "force-cache";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  const homePageNotes = await fetchNotes({ userId: user.id });

  const pinnedNotes = await fetchNotes({ userId: user.id, pinned: true });

  // console.log(pinnedNotes);

  let message = "You haven't captured your ideas yet.";

  return (
    <Box
      sx={{
        p: { sm: "20px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box>
        <CreateNote />
      </Box>

      <Box
        sx={{
          py: "80px",
          width: "100%",
        }}
      >
        {pinnedNotes?.length === 0 && homePageNotes?.length === 0 && (
          <Typography variant="h6" color="black" textAlign="center">
            {message}
          </Typography>
        )}

        {pinnedNotes?.length !== 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="overline" display="block" gutterBottom>
              Pinned
            </Typography>
            <Notes notes={pinnedNotes} />
          </Box>
        )}

        {homePageNotes?.length !== 0 && (
          <Box>
            <Typography variant="overline" display="block" gutterBottom>
              Others
            </Typography>
            <Notes notes={homePageNotes} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
