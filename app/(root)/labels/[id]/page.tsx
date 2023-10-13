import CreateNote from "@/components/forms/CreateNote";
import Notes from "@/components/shared/Notes";
import { fetchLabelNotes, fetchNotes } from "@/lib/actions/Note.actions";
import { currentUser } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";

interface Params {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Params) => {
  const labelId = params.id;

  const user = await currentUser();

  if (!user) return null;

  const labelNotes = await fetchLabelNotes({ userId: user.id, labelId });

  // console.log(labelNotes);

  let message = "You have not any notes in this label.";

  return (
    <Box>
      <Box>
        <CreateNote
          notes={JSON.parse(JSON.stringify(labelNotes))}
          labelId={labelId}
        />
      </Box>

      {/* {labelNotes?.length === 0 && (
        <Typography variant="h6" color="black" textAlign="center" mt={10}>
          {message}
        </Typography>
      )}

      {labelNotes?.length !== 0 && (
        <Box
          sx={{
            width: "100%",
            mt: "56px",
          }}
        >
          <Notes notes={labelNotes} message={message} />
        </Box>
      )} */}
    </Box>
  );
};

export default Page;
