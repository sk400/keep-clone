import CreateNote from "@/components/forms/CreateNote";
import { fetchNotes } from "@/lib/actions/Note.actions";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Box } from "@mui/material";

export const revalidate = "force-cache";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  const homePageNotes = await fetchNotes({
    userId: user.id,
  });

  const pinnedNotes = await fetchNotes({
    userId: user.id,
    pinned: true,
  });

  return (
    <Box
      sx={{
        p: { sm: "20px" },
        width: "100%",
      }}
    >
      <Box>
        <CreateNote
          notes={JSON.parse(JSON.stringify(homePageNotes))}
          pinnedNotes={JSON.parse(JSON.stringify(pinnedNotes))}
        />
      </Box>
    </Box>
  );
}
