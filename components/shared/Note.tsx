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

interface Props {
  note: NoteType;
  setOptimisticNote: (action: Action) => void;
  setPinnedNote: (action: Action) => void;
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

  const handleClick = async ({
    update: { pinned, archived, deleted },
    pinState,
  }: UpdateNote) => {
    if (!pinState) {
      setOptimisticNote({
        id: note._id,
        note,
        type: "remove",
      });
    } else {
      if (pinState === "pin") {
        setPinnedNote({
          id: note._id,
          note,
          type: "add",
        });
        setOptimisticNote({
          id: note._id,
          note,
          type: "remove",
        });
      } else if (pinState === "unpin") {
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
      }
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
            <Box>
              {note.pinned ? (
                <IconButton
                  onClick={() =>
                    handleClick({
                      update: {
                        pinned: false,
                      },
                      pinState: "unpin",
                    })
                  }
                >
                  <PushPin />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() =>
                    handleClick({
                      update: {
                        pinned: true,
                      },
                      pinState: "pin",
                    })
                  }
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
