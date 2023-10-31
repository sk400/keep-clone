"use client";

import { Search } from "@mui/icons-material";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

const Searchbar = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        router.push(`/search?query=${searchTerm}`);
      }

      if (!searchTerm && pathname === "/search") {
        router.push("/");
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, pathname]);

  return (
    <Box>
      <Paper
        sx={{
          boxShadow: "none",
          display: "flex",
          items: "center",
          ml: { xs: 1, sm: 0, md: 0, lg: 0 },
        }}
      >
        <Search
          sx={{
            color: "gray",
            mt: "3px",
          }}
        />
        <InputBase
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          spellCheck={"false"}
        />
      </Paper>
    </Box>
  );
};

export default Searchbar;
