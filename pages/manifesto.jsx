import * as React from "react";

import Typewriter from "typewriter-effect";

import * as Constants from "../constants";

import { styled, alpha, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Manifesto() {
  const theme = useTheme();
  const string = () => {
    return (
      <Typography variant="h3" component="h2" gutterBottom>
        Manifesto
      </Typography>
    );
  };
  return (
    <Box
      bgcolor={"rgba(0,0,0,1)"}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="span" maxWidth="xl">
        <Typography
          sx={{ mt: 8 }}
          color="text.primary"
          variant="h2"
          component="h2"
          gutterBottom
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2500)
                .typeString("Here we lay bare our statments")
                .typeString(
                  ' <span style="color: #4cbce6; "> #______________</span>'
                )
                .pauseFor(2500)
                .deleteAll()
                .typeString(
                  ' <span style="color: #4cbce6; font-style: italic">No.</span>'
                )
                .pauseFor(2500)
                .deleteAll()
                .typeString("Here we lay bare our ")
                .typeString('<span style="color: #FFFF41;">Truths,</span>')
                .pauseFor(1500)
                .deleteChars(7)
                .typeString('<span style="color: #008018;">Axioms,</span>')
                .pauseFor(1500)
                .deleteChars(7)
                .typeString('<span style="color: #FFA52C;">Mantras,</span>')
                .pauseFor(1500)
                .deleteChars(8)
                .typeString(
                  '<span style="color: #4cbce6; font-style: italic">Manifestos.</span>'
                )
                .pauseFor(2500)
                .deleteAll()
                .pauseFor(3000)
                .typeString('<span style="color: #4cbce6;"># </span>')
                .typeString("Once more through struggle, we are ")
                .typeString(
                  '<span style="color: #4cbce6; font-style: italic">re-learning </span>'
                )
                .typeString("to be ")
                .typeString(
                  '<span style="color: #4cbce6; font-style: italic">human together.</span>'
                )
                .pauseFor(2500)
                .deleteChars(58)
                .typeString(
                  '<span style="color: #4cbce6; font-style: italic">we are human.</span>'
                )
                .start();
            }}
          />
        </Typography>
      </Container>
    </Box>
  );
}

export default Manifesto;
