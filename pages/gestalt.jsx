import * as React from "react";
import { useEffect, useRef } from "react";

import * as Constants from "../constants";

import { getSession, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import useSWR, { SWRConfig } from "swr";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { styled, alpha, useTheme } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import StyledDialogPromptForm from "../components/StyledDialogPromptForm";
import StyledJournal from "../components/StyledJournal";
import StyledResponseList from "../components/StyledResponseList";
import StyledBottomAppBar from "../components/StyledBottomAppBar";

import dbConnect from "../lib/dbConnect";

import Response from "../models/Response";
import { Divider, Paper } from "@mui/material";

// #region Helper Styled Components
const StyledFab = styled(Fab)({
  position: "fixed",
  top: 90,
  zIndex: 1,
  right: 16,
  //marginTop: -65,
  //marginLeft: "-2%",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

// #endregion Helper Styled Components

// #region Helper Methods
const useResponsesAPI = () => {
  const { data, error } = useSWR("api_responses");
  //console.log({ data });
  return {
    responseData: data,
    responseError: !data & error,
  };
};

const handleUserNameSplit = (name) => {
  const nameArray = name.split(" ");

  return nameArray[0];
};

const scrollToBottom = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};

const testAiTextGen = async () => {
  try {
    const res = await fetch("/api/aitextgen", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first: "famous", last: "clark" }),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status);
    }
    const { data } = await res.json();
    console.log({ data: data });
  } catch (error) {
    console.log("error");
    //setMessage("Failed to prompt system");
  }
};

// #endregion Helper Methods

function GestaltDash(props) {
  // #region function props and variables
  const theme = useTheme();
  const router = useRouter();

  const contentType = "application/json";

  const promptForm = {
    name: "",
    prompt: "",
    fragment: "",
  };

  //#endregion function props and variables

  // #region useSWR, useState, useSession
  const { data: session } = useSession();
  const { responseData, responseError } = useResponsesAPI();

  const responsesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom(responsesEndRef);
  }, [session]);

  useEffect(() => {
    scrollToBottom(responsesEndRef);
  }, [responseData]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [open, setOpen] = React.useState(false);
  const [waffling, setWaffling] = React.useState({
    sentiment: "",
  });
  const [result, setResult] = React.useState({
    username: "",
    prompt: "",
    fragment: "",
    text: "",
    orientation: Constants.UPRIGHT,
  });
  const [message, setMessage] = React.useState("");
  //const [value, setValue] = React.useState("Controlled");

  const [form, setForm] = React.useState({
    deckIndex: 0,
    orientation: Constants.UPRIGHT,
    story: Constants.STORY,
    username: promptForm.name,
    userPrompt: promptForm.prompt,
    userFragment: promptForm.fragment,
  });

  const [prompting, setPrompting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  // #endregion useSWR, useState, useSession

  // #region Session and data - error | loading | authentication checks
  //if (typeof window === "undefined") return null;

  // if (!session) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flexDirection: "column",
  //         minHeight: "100vh",
  //       }}
  //     >
  //       <Paper elevation={2}>
  //         <Container component="main" sx={{ mt: 12, mb: 12 }} maxWidth="xl">
  //           <Typography
  //             color={theme.palette.primary.main}
  //             variant="h2"
  //             component="h1"
  //             gutterBottom
  //           >
  //             The Gestalt Game
  //           </Typography>
  //           <Typography
  //             color={theme.palette.secondary.dark}
  //             variant="overline"
  //             component="h2"
  //             gutterBottom
  //           >
  //             {
  //               "A Feminist, Western Techno-Occultist, Generative Game Inspired by Pamela (Pixie) Colman Smith's Tarot Illustrations"
  //             }
  //           </Typography>
  //         </Container>
  //       </Paper>
  //       <Container component="main" sx={{ mt: 8, mb: 12 }} maxWidth="xl">
  //         <Divider variant="fullwidth" />

  //         <Box alignItems="center" sx={{ mt: 6 }}>
  //           <Box display={"flex"}>
  //             <NewReleasesRoundedIcon
  //               color="warning"
  //               fontSize="large"
  //               sx={{
  //                 position: "relative",
  //                 margin: "0 auto",
  //               }}
  //             />
  //           </Box>
  //           <Typography
  //             align="center"
  //             color={"common.white"}
  //             variant="h4"
  //             component="h3"
  //             gutterBottom
  //           >
  //             <Box sx={{ mr: 1, display: "inline" }}>
  //               {"To use this route, please login | "}
  //             </Box>

  //             <Box
  //               sx={{
  //                 display: "inline",
  //                 fontStyle: "italic",
  //                 color: `${theme.palette.secondary.main}`,
  //               }}
  //             >
  //               {"top right corner"}
  //             </Box>
  //           </Typography>
  //           {/* <Button onClick={testAiTextGen}>test</Button> */}
  //         </Box>
  //       </Container>
  //       <StyledBottomAppBar />
  //     </Box>
  //   );
  // }

  if (responseError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container component="main" sx={{ mt: 8, mb: 12 }} maxWidth="lg">
          <Typography
            color={theme.palette.error.main}
            variant="h2"
            component="h1"
            gutterBottom
          >
            The Gestalt Game
          </Typography>
          <Typography
            color={theme.palette.secondary.dark}
            variant="h5"
            component="h2"
            gutterBottom
          >
            {
              "A Feminist, Western Techno-Occultist, Generative Game Inspired by Pamela (Pixie) Colman Smith's Tarot Illustrations"
            }
          </Typography>
          <Divider variant="fullwidth" />

          <Typography
            sx={{ mt: 6 }}
            color={theme.palette.error.main}
            variant="h4"
            component="h3"
            gutterBottom
          >
            {"An Error Occured, Please Reload the Page."}
          </Typography>
        </Container>
        <StyledBottomAppBar />
      </Box>
    );
  }

  if (!responseData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container component="main" sx={{ mt: 8, mb: 12 }} maxWidth="lg">
          <Typography
            color={theme.palette.primary.main}
            variant="h2"
            component="h1"
            gutterBottom
          >
            The Gestalt Game
          </Typography>
          <Typography
            color={theme.palette.secondary.dark}
            variant="h5"
            component="h2"
            gutterBottom
          >
            {
              "A Feminist, Western Techno-Occultist, Generative Game Inspired by Pamela (Pixie) Colman Smith's Tarot Illustrations"
            }
          </Typography>
          <Divider variant="fullwidth" />

          <Typography
            sx={{ mt: 6 }}
            color={theme.palette.primary.dark}
            variant="h4"
            component="h3"
            gutterBottom
          >
            {"Loading In The Occult Magic."}
          </Typography>
        </Container>
        <StyledBottomAppBar />
      </Box>
    );
  }

  // #endregion Session and data - error | loading | authentication checks

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

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //for dialogue--------------------------------------------

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        username: handleUserNameSplit(session.user.name),
        prompt: prompt,
        fragment: fragment,
        text: data,
        deckIndex: deckIndex,
        orientation: orientation,
      });
    } catch (error) {
      setPrompting(false);
      handleClick(TransitionRight);
      //setMessage("Failed to prompt system");
    }
  };

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

  const postWaffling = async (database) => {
    //console.log(database);
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(database),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      const { data, prompt } = await res.json();
      const waffling = data;

      setWaffling({
        sentiment: waffling,
      });
      setPrompting(false);
      //router.push("/gestalt");
    } catch (error) {
      setPrompting(false);
      handleClick(TransitionRight);
      //setMessage("Failed to prompt system");
    }
  };

  // #endregion function Methods

  // #region function rendering
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
            {`Hello Human,`}
            {/* </Box> */}
          </Typography>
          <Typography
            color={"common.white"}
            variant="overline"
            component="h2"
            gutterBottom
          >
            {/* <Box sx={{ textAlign: "center" }}> */}
            {`I am Ada, the proprietress of this techno-magica space and your guide.`}
            {/* </Box> */}
          </Typography>
          <Typography
            color={theme.palette.secondary.dark}
            variant="overline"
            component="h3"
            gutterBottom
          >
            {/* <Box sx={{ textAlign: "center" }}> */}
            {
              "Welcome to This Feminist, Western Techno-Occultist, Generative Journal Derived from Pamela (Pixie) Colman Smith's Tarot Illustrations."
            }
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
                  postWaffling={postWaffling}
                  postResponse={postResponse}
                  waffling={waffling}
                  notSaved={result}
                  result={responseData}
                />
              </Container>
            </Box>
          </Drawer>
          <StyledJournal
            deckIndex={responseData.length % 22}
            toggleDrawer={toggleDrawer}
          />
        </Container>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <StyledDialogPromptForm
          deckIndex={responseData.length % 22}
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
  // #endregion function rendering
}

function Gestalt({ fallback }) {
  //console.log({ fallback });

  // #region function rendering

  return (
    <SWRConfig value={{ fallback }}>
      <GestaltDash />
    </SWRConfig>
  );

  // #endregion function rendering
}

export async function getServerSideProps(context) {
  // #region function data fetching
  await dbConnect();

  const session = await getSession(context);
  const userName = session?.user.email;
  const testName = "Gwyn";
  /* find all the data in our database */
  const result = await Response.find({ username: userName })
    .sort({ time_stamped: -1 })
    .limit(22);
  const responses = result.map((doc) => {
    const response = doc.toObject();
    response._id = response._id.toString();
    response.time_stamped = response.time_stamped.toString();
    //response.prompt_id[0] = response.prompt_id[0].toString();

    return response;
  });

  // #endregion function data fetching

  // #region function return props
  return {
    props: {
      fallback: {
        api_responses: responses,
        api_session: session,
      },
    },
  };

  // #endregion function return props
}

export default Gestalt;
