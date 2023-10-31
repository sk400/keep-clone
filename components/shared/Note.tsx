"use client";

import { Action, NoteType } from "@/typings";
import { useState } from "react";
import {
  Archive,
  ArchiveOutlined,
  Delete,
  DeleteOutline,
  PushPin,
  PushPinOutlined,
} from "@mui/icons-material";

import { Box, IconButton, Paper, Typography } from "@mui/material";
import { updateNote } from "@/lib/actions/Note.actions";
import { usePathname } from "next/navigation";

interface Props {
  note: NoteType;
  setOptimisticNote: (action: Action) => void;
  setPinnedNote?: (action: Action) => void;
}

interface UpdateNote {
  update: {
    pinned?: boolean;
    archived?: boolean;
    deleted?: boolean;
  };
  pinState?: "pin" | "unpin";
}

const Note = ({ note, setOptimisticNote, setPinnedNote }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // console.log(note.pinned);

  const handleClick = async ({
    update: { pinned, archived, deleted },
    pinState,
  }: UpdateNote) => {
    switch (pinState) {
      case "pin":
        setOptimisticNote({
          id: note._id,
          note,
          type: "remove",
        });
        setPinnedNote &&
          setPinnedNote({
            id: note._id,
            note,
            type: "add",
          });
        break;
      case "unpin":
        setPinnedNote &&
          setPinnedNote({
            id: note._id,
            note,
            type: "remove",
          });
        setOptimisticNote({
          id: note._id,
          note,
          type: "add",
        });

        break;
      default:
        setOptimisticNote({
          id: note._id,
          note,
          type: "remove",
        });
        break;
    }

    await updateNote({
      noteId: note?._id,
      update: { pinned, archived, deleted },
    });
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer transition duration-200"
    >
      <Paper
        elevation={3}
        sx={{
          minHeight: 150,
          padding: 3,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              overflowWrap: "anywhere",
              whiteSpace: "pre-line",
              height: "2.4rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "18px",
              fontWeight: "bold",
            }}
            paragraph
          >
            {note.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflowWrap: "anywhere",
              whiteSpace: "pre-line",
              height: "5rem",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              fontWeight: "regular",
            }}
            paragraph
          >
            {note?.content}
          </Typography>
          {/* Add label here */}
          {/* {label && (
            <Button
              sx={{
                px: 1,
                py: "3px",
                backgroundColor: "#ebebeb",
                color: "black",
                textTransform: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {label?.name}
            </Button>
          )} */}
        </Box>
        {isHovered && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              zIndex: 5,
              padding: 1,
            }}
          >
            <Box
              sx={{
                display:
                  pathname === "/" || pathname.includes("/labels") === true
                    ? "block"
                    : "none",
              }}
            >
              {note.pinned ? (
                <IconButton
                  key={1}
                  onClick={() => {
                    handleClick({
                      update: {
                        pinned: false,
                      },
                      pinState: "unpin",
                    });
                    // console.log("pinned");
                  }}
                >
                  <PushPin />
                </IconButton>
              ) : (
                <IconButton
                  key={2}
                  onClick={() => {
                    // console.log("unpinned");
                    handleClick({
                      update: {
                        pinned: true,
                      },
                      pinState: "pin",
                    });
                  }}
                >
                  <PushPinOutlined />
                </IconButton>
              )}
            </Box>
            <Box mt="auto" className="space-x-2">
              {note?.deleted ? (
                <IconButton
                  onClick={() => {
                    handleClick({
                      update: {
                        deleted: false,
                      },
                    });
                  }}
                >
                  <Delete />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    handleClick({
                      update: {
                        deleted: true,
                      },
                    });
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              )}

              {note?.archived ? (
                <IconButton
                  onClick={() => {
                    handleClick({
                      update: {
                        archived: false,
                      },
                    });
                  }}
                >
                  <Archive />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    handleClick({
                      update: {
                        archived: true,
                      },
                    });
                  }}
                >
                  <ArchiveOutlined />
                </IconButton>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Note;
