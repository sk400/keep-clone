import Notes from "@/components/shared/Notes";
import { fetchNotes } from "@/lib/actions/Note.actions";
import { currentUser } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";

export const revalidate = "force-cache";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const archivedNotes = await fetchNotes({ userId: user.id, archived: true });

  // console.log(archivedNotes);

  let message = "You haven't any archived notes.";

  return (
    <Box className="relative">
      {archivedNotes?.length !== 0 && (
        <Box className=" ">
          <Typography
            variant="h5"
            color="black"
            textAlign="left"
            fontWeight="bold"
            sx={{ mb: 5 }}
          >
            Your archived notes.
          </Typography>
        </Box>
      )}
      <Notes notes={archivedNotes} message={message} />
    </Box>
  );
};

export default Page;
