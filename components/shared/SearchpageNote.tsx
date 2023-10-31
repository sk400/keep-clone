"use client";

import { NoteType } from "@/typings";
import {
  Archive,
  ArchiveOutlined,
  Delete,
  DeleteOutline,
  PushPin,
  PushPinOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  note: NoteType;
};

const SearchpageNote = ({ note }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Paper
        elevation={3}
        sx={{
          minHeight: 150,
          padding: 3,
          position: "relative",
          cursor: "pointer",
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
            // sx={{
            //   display:
            //     pathname === "/" || pathname.includes("/labels") === true
            //       ? "block"
            //       : "none",
            // }}
            >
              {note.pinned ? (
                <IconButton key={1}>
                  <PushPin />
                </IconButton>
              ) : (
                <IconButton key={2}>
                  <PushPinOutlined />
                </IconButton>
              )}
            </Box>
            <Box mt="auto" className="space-x-2">
              {note?.deleted ? (
                <IconButton>
                  <Delete />
                </IconButton>
              ) : (
                <IconButton>
                  <DeleteOutline />
                </IconButton>
              )}

              {note?.archived ? (
                <IconButton>
                  <Archive />
                </IconButton>
              ) : (
                <IconButton>
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

export default SearchpageNote;
