import * as React from "react";
import { useEffect, useRef } from "react";

import * as Constants from "../constants";

import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import useSWR, { SWRConfig } from "swr";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import MuiAlert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { styled, alpha, useTheme } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

// #region Helper Styled Components

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

// #endregion Helper Styled Component

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

// #endregion Helper Methods

function StyledJournal(props) {
  // #region function props and variables
  const { toggleDrawer, deckIndex } = props;
  const theme = useTheme();
  const router = useRouter();
  // #endregion function props and variables

  // #region useSWR, useState, useSession, useEffect

  const [form, setForm] = React.useState({
    userPrompt: "",
    ediFragment: "...",
  });

  const [story, setStory] = React.useState([
    { prompt: "", fragment: "", text: "" },
  ]);

  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [occultInfluence, setOccultInfluence] = React.useState(false);
  const [branching, setBranching] = React.useState(true);
  const [action, setAction] = React.useState({
    index: 0,
    actions: ["say", "do", "story"],
  });

  const [addXtra, setAddXtra] = React.useState(false);

  const [prompting, setPrompting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const { data: session } = useSession();
  const { responseData, responseError } = useResponsesAPI();

  const responsesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom(responsesEndRef);
  }, [session]);

  useEffect(() => {
    scrollToBottom(responsesEndRef);
  }, [story]);

  // #endregion useSWR, useState, useSession, useEffect

  // #region function Methods

  const handleSetAction = () => {
    if (action.index == 0) {
      setAction({ ...action, index: 1 });
    }

    if (action.index == 1) {
      setAction({ ...action, index: 2 });
    }

    if (action.index == 2) {
      setAction({ ...action, index: 0 });
    }
  };

  const handleSetOccult = () => {
    setOccultInfluence(!occultInfluence);
  };

  const handleSetAddXtra = () => {
    setAddXtra(!addXtra);
  };

  const handleSetBranching = () => {
    setBranching(!branching);
  };

  const handlePromptContext = () => {
    const contextFragment = form.userPrompt;

    if (responseData[0] && form.userPrompt == "") {
      contextFragment = responseData[0].prompt;
      return contextFragment;
    }

    return contextFragment;
  };

  const handleFragmentContext = () => {
    const contextFragment = "\n\n" + form.userFragment;

    if (responseData[0] && branching) {
      return contextFragment;
    }

    if (responseData[0] && form.userFragment == "") {
      contextFragment = responseData[0].text;
      //console.log({ card: result[0].deckIndex, text: result[0].text });
      return contextFragment;
    }

    if (responseData[0]) {
      contextFragment = responseData[0].text + "\n\n" + form.userFragment;
      //console.log({ card: result[0].deckIndex, text: result[0].text });
      return contextFragment;
    }

    return contextFragment;
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    setForm({
      ...form,
      //deckIndex: deckIndex,
      [id]: value,
    });
  };

  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setSnackbar(true);
    console.log(snackbar);
  };

  const handleCloseSnackBar = () => {
    setSnackbar(false);
    //setSentitmentbar(false);
  };

  const testAiTextGen = async (form) => {
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      const { data, prompt, fragment, orientation, deckIndex } =
        await res.json();
      console.log({ data: data, prompt: prompt });
      setForm({
        ...form,
        userPrompt: "",
        ediFragment: data,
      });

      setStory((arr) => [...arr, { prompt: prompt, fragment: "", text: data }]);
    } catch (error) {
      setForm({
        ...form,
        userPrompt: "",
        ediFragment: "...",
      });
      console.log("error");
      //setMessage("Failed to prompt system");
    }
  };

  const formValidate = () => {
    let err = {};
    // if (!form.userPrompt && deckIndex <= 0)
    //   err.userPrompt = "Prompt is required !";

    if (!form.userPrompt) err.userPrompt = "Prompt is required !";

    return err;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //console.log({ context: handleContext() });
    //setPrompting(true);
    const noModel = "";
    const cheapModel = "text-ada-001";
    const middleModel = "text-curie-001";
    const bestModel = "text-davinci-002";

    const toSubmit = {
      ...form,
      model: cheapModel,
      occultInfluence: occultInfluence,
      userPrompt: handlePromptContext(),
    };

    console.log({ form: toSubmit });

    const errs = formValidate();
    //const options = { optimisticData: user, rollbackOnError: true }
    if (Object.keys(errs).length === 0) {
      //handleClose();

      testAiTextGen(toSubmit);
      //forNewPrompt ? postData(form) : putData(form);
    } else {
      setPrompting(false);
      setErrors({ errs });
      handleClick(TransitionRight);
    }

    setForm({
      ...form,
      ediFragment: "...",
      userPrompt: "",
    });
  };

  // const MINUTE_MS = 60000;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("Logs every minute");
  //     handleSubmit();
  //   }, MINUTE_MS);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, []);
  // #endregion function Methods

  return (
    <>
      <Fab
        sx={{
          position: "sticky",
          zIndex: 1,
          //bottom: 82,
          top: 85,
          left: "100%",
          marginTop: -5,
          //right: 16,
        }}
        //variant="extended"
        color="default"
        aria-label="menu"
        //onClick={toggleDrawer("right", true)}
      >
        <SettingsIcon fontSize="large" />
        {/* Ada */}
      </Fab>
      {/* <Divider sx={{ mt: 6, mb: 2 }} variant="fullWidth" component="div" /> */}

      <List sx={{ margin: "0 auto", width: "100%" }}>
        {story //responseData
          //.slice(0)
          //.reverse()
          .map((doc, index) => (
            <Box key={index}>
              <Divider sx={{ mt: 4, mb: 4 }} component="div" />
              <Box sx={{ fontStyle: "italic" }}>
                <Typography
                  sx={{ whiteSpace: "pre-line" }}
                  color={"grey.500"}
                  variant="body1"
                  paragraph
                  gutterBottom
                >
                  {`${doc.prompt} ${doc.fragment}`}
                </Typography>
              </Box>
              <Typography
                sx={{ whiteSpace: "pre-line" }}
                color={"common.white"}
                variant="body1"
                paragraph
                gutterBottom
              >
                {doc.text}
              </Typography>
            </Box>
          ))}
        {/* <Box /> */}
      </List>
      {/* <Divider sx={{ my: 1 }} />
      <Box ref={responsesEndRef} sx={{ margin: "0 auto", width: "100%" }}>
        <Typography
          sx={{ whiteSpace: "pre-line" }}
          color={"common.white"}
          variant="body1"
          paragraph
          gutterBottom
        >
          ...
        </Typography>
      </Box> */}

      <AppBar elevation={1} sx={{ top: "auto", bottom: 0 }}>
        <Toolbar sx={{ my: -2 }}>
          <Box
            display="flex"
            sx={{
              width: "100%",
              flexDirection: "row",

              my: -1,
            }}
          >
            <Button
              color={branching ? "success" : "secondary"}
              onClick={handleSetBranching}
            >
              {branching ? "Branch" : "No Branch"}
            </Button>
            <Divider sx={{ my: 1 }} orientation="vertical" flexItem />
            <Button
              color={occultInfluence ? "success" : "secondary"}
              onClick={handleSetOccult}
            >
              {occultInfluence ? "Occult" : "No Occult"}
            </Button>
            <Divider sx={{ my: 1 }} orientation="vertical" flexItem />
            {/* <Button
              color={addXtra ? "success" : "secondary"}
              onClick={handleSetAddXtra}
            >
              {addXtra ? "xtra" : "no xtra"}
            </Button> */}
          </Box>
        </Toolbar>
        <Toolbar>
          <Box
            display="flex"
            sx={{
              margin: "0 auto",
              width: "90%",
              maxWidth: "100%",
            }}
          >
            {!addXtra ? (
              <TextField
                sx={{ my: 1 }}
                //autoFocus
                margin="dense"
                id="userPrompt"
                label="Prompt"
                type="prompt"
                color="secondary"
                placeholder={"..."}
                value={form.userPrompt}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Button
                        //sx={{ mt: 1 }}
                        aria-label="cycle"
                        onClick={handleSetAction}
                        color="secondary"
                      >
                        {/* <ChangeCircleOutlinedIcon /> */}
                        {action.actions[action.index]}
                      </Button>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ transform: "rotate(-45deg)" }}
                        size="large"
                        edge="start"
                        color="secondary"
                        aria-label="submit prompt"
                        onClick={handleSubmit}
                        //sx={{ mr: 2 }}
                      >
                        <SendOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                //variant="standard"
              />
            ) : (
              <TextField
                sx={{ my: 1 }}
                //autoFocus
                multiline
                margin="dense"
                rows={6}
                id="userFragment"
                label="Fragment"
                type="xtra"
                color="primary"
                placeholder={"..."}
                //value={form.userPrompt}
                //onChange={handleChange}
                fullWidth
                InputProps={{
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     <Button
                  //       //sx={{ mt: 1 }}
                  //       aria-label="cycle"
                  //       onClick={handleSetAction}
                  //       color="primary"
                  //     >
                  //       {action.actions[action.index]}
                  //     </Button>
                  //   </InputAdornment>
                  // ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        //sx={{ transform: "rotate(-45deg)" }}
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="add fragment"
                        //onClick={toggleDrawer("right", true)}
                        //sx={{ mr: 2 }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                //variant="standard"
              />
            )}

            <Divider
              sx={{ ml: 2, mr: 1, my: 1 }}
              orientation="vertical"
              flexItem
            />
          </Box>
          <Box justifyContent={"center"} alignItems={"center"} display="flex">
            <Typography
              sx={{ display: { xs: "none", md: "flex" } }}
              variant="h6"
              component="div"
            >
              Ada
            </Typography>
            <IconButton
              sx={{ ml: 1 }}
              size="large"
              edge="start"
              color="inherit"
              disabled
              aria-label="close menu"
              onClick={toggleDrawer("right", true)}
              //sx={{ mr: 2 }}
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Box>

          {/* <Typography variant="h6" component="div" sx={{ margin: "0 auto" }}>
            Journal
          </Typography> */}
        </Toolbar>
      </AppBar>
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
          {!errors.errs ? "" : errors.errs.userPrompt}
        </Alert>
      </Snackbar>
    </>
  );
}

export default StyledJournal;
