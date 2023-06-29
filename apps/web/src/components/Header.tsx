"use client";

import { Container, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <Container>
      <Link href="/dashboard">
        <Button
          variant="contained"
          sx={{
            marginTop: 4,
          }}
        >
          Seed event
        </Button>
      </Link>
    </Container>
  );
};

export default Header;
