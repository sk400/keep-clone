"use server";

import { NoteType } from "@/typings";
import connectToDB from "../connectToDB";
import Label from "../models/Label.model";
import Note from "../models/Note.model";
import { revalidatePath } from "next/cache";

const revalidatePaths = (paths: string[]) => {
  for (const path of paths) {
    revalidatePath(path);
  }
};

interface DataType {
  userId: string;
  pinned?: true;
  deleted?: true;
  archived?: true;
  searchTerm?: string;
}

export const fetchNotes = async ({
  userId,
  pinned,
  archived,
  deleted,
  searchTerm,
}: DataType) => {
  try {
    connectToDB();

    let query = {
      userId,
      pinned: pinned ?? false,
      archived: archived ?? false,
      deleted: deleted ?? false,
    };

    let notes = await Note.find(query);

    if (searchTerm && searchTerm.length > 0) {
      notes = notes.filter(
        (note) =>
          note.title.includes(searchTerm) || note.content.includes(searchTerm)
      );
    }

    return notes;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch all notes.", error.message);
  }
};

export const searchNotes = async ({
  userId,
  searchTerm,
}: {
  userId: string;
  searchTerm: string;
}) => {
  try {
    connectToDB();

    let notes = await Note.find({ userId });

    if (searchTerm && searchTerm.length > 0) {
      notes = notes.filter(
        (note) =>
          note.title.includes(searchTerm) || note.content.includes(searchTerm)
      );
    }

    return notes;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch searched notes.", error.message);
  }
};

interface NoteData {
  title: string;
  content: string;
  userId: string;
  path: string;
  labelId?: string;
}

// fetch pinned notes

export const addNote = async ({
  title,
  content,
  userId,
  path,
  labelId,
}: NoteData) => {
  try {
    connectToDB();

    await Note.create({
      title,
      content,
      userId,
      label: labelId && labelId,
    });

    revalidatePath(path);
    console.log("Note added successfully.");
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to add the note.", error.message);
  }
};

interface UpdateNote {
  noteId: string;
  update: {
    pinned?: boolean;
    archived?: boolean;
    deleted?: boolean;
  };
}

export const updateNote = async ({
  noteId,
  update: { pinned, archived, deleted },
}: UpdateNote) => {
  try {
    connectToDB();
    const note = await Note.findById(noteId);

    if (!note) {
      throw new Error("Note not found");
    }

    note.pinned = pinned ?? false;
    note.archived = archived ?? false;
    note.deleted = deleted ?? false;

    await note.save();

    const paths: string[] = ["/", "/bin", "/archive"];

    revalidatePaths(paths);
    console.log("Successfuly update the note");
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to update the note.", error.message);
  }
};

export const deleteAllNotes = async (userId: string) => {
  try {
    connectToDB();
    await Note.deleteMany({ userId, deleted: true });

    revalidatePath("/bin");
    console.log("Bin cleared successfully.");
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to delete the notes.", error.message);
  }
};

interface LabelNoteData {
  userId: string;
  labelId: string;
}

export const fetchLabelNotes = async ({ userId, labelId }: LabelNoteData) => {
  try {
    connectToDB();

    const query = Note.find({
      userId,
      label: labelId,
      archived: false,
      deleted: false,
    });
    // .select("_id userId title content label pinned deleted archived")
    // .populate({
    //   path: "label",
    //   model: Label,
    //   // select: "_id name userId",
    // });

    const labelNotes: NoteType[] = await query.exec();

    return labelNotes;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch the label notes.", error.message);
  }
};
