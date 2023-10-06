"use server";

import connectToDB from "../connectToDB";
import Note from "../models/Note.model";

export const fetchAllNotes = async (userId: string) => {
  try {
    connectToDB();

    const notes = await Note.find({ userId });

    return notes;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch all notes.", error.message);
  }
};
