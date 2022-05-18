import * as React from "react";

import * as Constants from "../constants";

import useSWR, { SWRConfig } from "swr";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";

import { styled, alpha, useTheme } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";

import StyledDialogTarotForm from "../components/StyledDialogTarotForm";

import StyledBottomAppBar from "../components/StyledBottomAppBar";

import StyledTarotDrawList from "../components/StyledTarotDrawList";

import { Divider, Paper } from "@mui/material";

// #region Helper Styled Components
const StyledFab = styled(Fab)({
  position: "sticky",
  zIndex: 1,
  //bottom: 82,
  top: 25,
  left: "100%",
  marginTop: -25,
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};
// #endregion Helper Styled Components

function Tarot() {
  // #region function props and variables

  const theme = useTheme();

  const contentType = "application/json";
  // #endregion function props and variables

  // #region useSWR, useState, useSession
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState({
    username: "",
    prompt: "",
    text: "",
    orientation: Constants.UPRIGHT,
  });
  const [form, setForm] = React.useState({
    deckIndex: 0,
    orientation: Constants.UPRIGHT,
    story: Constants.TAROT,
    username: "",
    userPrompt: "",
    userFragment: "",
  });

  const [hand, setHand] = React.useState([]);
  const [prompting, setPrompting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  // #endregion useSWR, useState, useSession

  // #region function Methods
  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setSnackbar(true);
    console.log(snackbar);
  };

  const handleCloseSnackBar = () => {
    setSnackbar(false);
    //setSentitmentbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setQuestion = async (form) => {
    console.log(form);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    setResult({
      username: "unsaved",
      prompt: form.userPrompt,
      text: "",
      deckIndex: form.deckIndex,
      orientation: form.orientation,
    });
    await delay(2000);
    setPrompting(false);
  };
  //for dialogue--------------------------------------------
  const postData = async (form) => {
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      const { data, prompt, orientation, deckIndex } = await res.json();

      setPrompting(false);

      setResult({
        username: "unsaved",
        prompt: prompt,
        text: data,
        deckIndex: deckIndex,
        orientation: orientation,
      });
    } catch (error) {
      setPrompting(false);
      handleClick(TransitionRight);
    }
  };
  // #endregion function Methods

  // #region function rendering
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={2}>
          <Container component="main" sx={{ mt: 8, mb: 4 }} maxWidth="xl">
            <Typography
              color={theme.palette.primary.main}
              variant="h2"
              component="h1"
              gutterBottom
            >
              AI Tarot Reading
            </Typography>
            <Typography
              color={theme.palette.secondary.dark}
              variant="overline"
              component="h2"
              gutterBottom
            >
              {
                "Tarot Reading based from Ada, The Gestalt Journal's Symbiotic Intelligence (SI)"
              }
            </Typography>
          </Container>
        </Paper>
        <Container component="main" sx={{ mb: 12 }} maxWidth="xl">
          <StyledFab
            variant="extended"
            color="secondary"
            aria-label="add"
            onClick={handleClickOpen}
          >
            <AddIcon />
            Query Deck
          </StyledFab>
          <Divider sx={{ mt: 4, mb: 4 }} component="div" />
          <StyledTarotDrawList
            hand={hand}
            postData={postData}
            setHand={setHand}
            setPrompting={setPrompting}
            prompting={prompting}
            setResult={setResult}
            deckQuestionData={result}
          />
        </Container>

        <Dialog open={open} onClose={handleClose}>
          <StyledDialogTarotForm
            setQuestion={setQuestion}
            setPrompting={setPrompting}
            setForm={setForm}
            form={form}
            postData={postData}
            setResult={setResult}
            handleClose={handleClose}
          />
        </Dialog>
        <StyledBottomAppBar bottom={true} />
      </Box>
      <Snackbar
        open={snackbar}
        onClose={handleCloseSnackBar}
        TransitionComponent={transition}
        message="I love snacks"
        key={transition ? transition.name : ""}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {"An error occured - Reload Page"}
        </Alert>
      </Snackbar>
    </>
  );
  // #endregion function rendering
}

export default Tarot;
