"use server";

import connectToDB from "../connectToDB";
import Label from "../models/Label.model";
import { revalidatePath } from "next/cache";
import Note from "../models/Note.model";

const revalidatePaths = (paths: string[]) => {
  for (const path of paths) {
    revalidatePath(path, "layout");
  }
};

interface LabelType {
  name: string;
  userId: string;
}

export const createLabel = async ({ name, userId }: LabelType) => {
  try {
    connectToDB();
    await Label.create({
      name,
      userId,
    });

    const paths: string[] = ["/", "/bin", "/archive"];
    revalidatePaths(paths);

    console.log("Label created successfully");
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to create the label.", error.message);
  }
};

export const fetchLabels = async (userId: string) => {
  try {
    connectToDB();
    const labels = await Label.find({ userId });
    return labels;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch the labels.", error.message);
  }
};

export const updateLabel = async (labelId: string, newLabelName: string) => {
  try {
    connectToDB();
    const label = await Label.findById(labelId);

    if (!label) {
      throw new Error("Label not found");
    }

    await Label.findByIdAndUpdate(labelId, { name: newLabelName });
    const paths: string[] = ["/", "/bin", "/archive"];
    revalidatePaths(paths);
    console.log("Label updated successfully.");
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to update the label.", error.message);
  }
};

export const deleteLabel = async (labelId: string) => {
  try {
    connectToDB();
    const label = await Label.findById(labelId);

    if (!label) {
      throw new Error("Label not found");
    }

    await Label.findByIdAndDelete(labelId);

    // await Note.deleteMany({ label: labelId });
    const paths: string[] = ["/", "/bin", "/archive"];
    revalidatePaths(paths);

    for (const path of paths) {
      revalidatePath(path, "page");
    }

    console.log("Label deleted successfully.");
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to delete the label.", error.message);
  }
};
