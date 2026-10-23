import * as React from "react";
import { useEffect, useRef } from "react";

import * as Constants from "../constants";

import useSWR, { SWRConfig } from "swr";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import { styled, alpha, useTheme } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";

import StyledDialogTarotForm from "../components/StyledDialogTarotForm";

import StyledBottomAppBar from "../components/StyledBottomAppBar";

import StyledDialogPromptForm from "../components/StyledDialogPromptForm";
import StyledJournal from "../components/StyledJournal";
import StyledResponseList from "../components/StyledResponseList";

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

const scrollToBottom = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
// #endregion Helper Styled Components

function Story() {
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
    fragment: "",
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

  const savedStory = [{ prompt: "No prompt", fragment: "\n", text: "" }];
  const [hand, setHand] = React.useState([]);
  const [genStory, setGenStory] = React.useState([
    { prompt: "no new prompt", fragment: "\nno fragment", text: "no text" },
  ]);
  const [prompting, setPrompting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  // #endregion useSWR, useState, useSession

  //===============================
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //console.log(open);
    setState({ ...state, [anchor]: open });
  };
  const promptForm = {
    name: "",
    prompt: "",
    fragment: "",
  };

  //#endregion function props and variables

  // #region useSWR, useState, useSession

  const [waffling, setWaffling] = React.useState({
    sentiment: "",
  });

  //=============================
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

  var deckIndex = 0;
  const getDeckIndex = () => {
    deckIndex++;
    if (deckIndex > 21) {
      deckIndex = 0;
    }
    return deckIndex;
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
      const { data, prompt, fragment, orientation, deckIndex } =
        await res.json();

      setPrompting(false);

      setResult({
        username: "unsaved",
        prompt: prompt,
        fragment: fragment,
        text: data,
        deckIndex: deckIndex,
        orientation: orientation,
      });

      savedStory.push({ prompt: prompt, fragment: fragment, text: data });
      setGenStory((arr) => [
        ...arr,
        { prompt: prompt, fragment: fragment, text: data },
      ]);
      console.log(savedStory);
    } catch (error) {
      setPrompting(false);
      handleClick(TransitionRight);
    }
  };

  const responsesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom(responsesEndRef);
  }, [genStory]);

  const postResponse = async (database) => {
    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(database),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/gestalt");
    } catch (error) {
      setMessage("Failed to prompt system");
    }
  };
  // #endregion function Methods

  // #region function rendering
  return (
    <>
      return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={2}>
          <Container component="main" sx={{ mt: 12, mb: 4 }} maxWidth="xl">
            <Typography
              color={theme.palette.primary.main}
              variant="h2"
              component="h1"
              //gutterB2ottom
            >
              {/* <Box sx={{ textAlign: "center" }}> */}
              {`Hello Humans!, Lets write a story together.`}
              {/* </Box> */}
            </Typography>
            <Typography
              color={"common.white"}
              variant="overline"
              component="h2"
              gutterBottom
              style={{ whiteSpace: "pre-line" }}
            >
              {/* <Box sx={{ textAlign: "center" }}> */}
              {`Rules:
              (1) Every two minutes, I will continue the a story from a previous snippet. | (2) Grey text is the previous snippet
              (3) White text is the next chapter! | (4) The Prompt bar at the bottom lets you interject into the story
              (5) Also reloading the pages starts the chain over!
              `}
              {/* </Box> */}
            </Typography>
            <Typography
              color={theme.palette.secondary.dark}
              variant="overline"
              component="h3"
              gutterBottom
              style={{ whiteSpace: "pre-line" }}
            >
              {/* <Box sx={{ textAlign: "center" }}> */}
              {`Instructions:
              (1) The Game is simple - Keep each others stories alive
              `}
              {/* </Box> */}
            </Typography>
          </Container>
        </Paper>

        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
          }}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Container component="main" sx={{ mb: 12 }} maxWidth="xl">
            <Drawer
              anchor="right"
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              <AppBar position="sticky">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="close menu"
                    onClick={toggleDrawer("right", false)}
                    sx={{ mr: 2 }}
                  >
                    <ArrowBackIosNewRoundedIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Journal
                  </Typography>
                  <Button
                    aria-label="add"
                    onClick={handleClickOpen}
                    color="secondary"
                  >
                    <AddIcon />
                    Add to Journal
                  </Button>
                </Toolbar>
              </AppBar>

              <Box
                sx={{
                  width: "100%",
                  margin: "0 auto",
                }}
                alignItems="center"
                justifyContent="center"
                display="flex"
                role="presentation"
                //onClick={toggleDrawer("right", false)}
                //onKeyDown={toggleDrawer("right", false)}
              >
                <Container sx={{ mt: 4, ml: 1, mr: 1 }} maxWidth="xl">
                  <StyledResponseList
                    setPrompting={setPrompting}
                    prompting={prompting}
                    setWaffling={setWaffling}
                    setResult={setResult}
                    //postWaffling={""}
                    postResponse={postResponse}
                    waffling={waffling}
                    notSaved={result}
                    result={setResult.text} //responseData}
                  />
                </Container>
              </Box>
            </Drawer>
            <StyledJournal
              postData={postData}
              storyData={genStory}
              savedStory={savedStory}
              setPrompting={setPrompting}
              prompting={prompting}
              deckIndex={getDeckIndex()} //responseData.length % 22}
              toggleDrawer={toggleDrawer}
            />
          </Container>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <StyledDialogPromptForm
            deckIndex={getDeckIndex()} //responseData.length % 22}
            setPrompting={setPrompting}
            promptForm={promptForm}
            form={form}
            result={result}
            setWaffling={setWaffling}
            setForm={setForm}
            postData={postData}
            setResult={setResult}
            handleClose={handleClose}
          />
        </Dialog>

        <StyledBottomAppBar />
        {/* <Container maxWidth="xl">
          <StyledResponseList
            setPrompting={setPrompting}
            prompting={prompting}
            setWaffling={setWaffling}
            setResult={setResult}
            //postWaffling={""}
            postResponse={postResponse}
            waffling={waffling}
            notSaved={result}
            result={setResult.text} //responseData}
          />
        </Container> */}
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
      </Box>
      );
    </>
  );
  // #endregion function rendering
}

export default Story;
