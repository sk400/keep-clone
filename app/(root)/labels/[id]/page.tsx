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

  const generalNotes = labelNotes.filter(
    (note) =>
      note.pinned === false && note.archived === false && note.deleted === false
  );

  const pinnedNotes = labelNotes.filter((note) => note.pinned === true);

  return (
    <Box>
      <Box>
        <CreateNote
          notes={JSON.parse(JSON.stringify(generalNotes))}
          labelId={labelId}
          pinnedNotes={JSON.parse(JSON.stringify(pinnedNotes))}
        />
      </Box>
    </Box>
  );
};

export default Page;
