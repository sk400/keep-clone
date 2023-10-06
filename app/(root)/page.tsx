import { fetchAllNotes } from "@/lib/actions/Note.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Box, Typography } from "@mui/material";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <Box>
      <UserButton afterSignOutUrl="/" />
      <Typography variant="h6">Let's begin</Typography>
    </Box>
  );
}
