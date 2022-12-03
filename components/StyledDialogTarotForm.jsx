import * as React from "react";

import * as Constants from "../constants";

import { useState } from "react";
import useSWR from "swr";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

import MuiAlert from "@mui/material/Alert";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

// #region Helper Styled Components
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};
// #endregion Helper Styled Components

function StyledDialogTarotForm(props) {
  // #region function Props and variables
  const { setQuestion, setPrompting, handleClose, form, postData, setForm } =
    props;

  const defaultValues = {
    defaultPrompt: "Ask a question",
    defaultFragment:
      "All in the golden afternoon Full leisurely we glide; For both our oars, with little skill, By little arms are plied, While little hands make vain pretence Our wanderings to guide.",
  };
  // #endregion function Props and variables

  // #region useSWR, useState, useSession
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [transition, setTransition] = useState(undefined);
  // #endregion useSWR, useState, useSession

  // #region function Methods
  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setSnackbar(true);
    console.log(snackbar);
  };

  const handleCloseSnackBar = () => {
    setSnackbar(false);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    setForm({
      ...form,
      [id]: value,
    });
  };

  const handleOrientation = () => {
    const orientation = Math.floor(Math.random() * 2) == 0;
    if (orientation) {
      return Constants.UPRIGHT;
    } else if (!orientation) {
      return Constants.REVERSED;
    } else {
      return Constants.UPRIGHT;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noModel = "";
    // const cheapModel = "text-ada-001";
    // const middleModel = "text-curie-001";
    // const bestModel = "text-davinci-002";

    const toSubmit = {
      ...form,
      model: noModel,
      deckIndex: Math.floor(Math.random() * Constants.ArcanaTags),
      orientation: handleOrientation(),
    };
    setForm({
      ...form,
      deckIndex: Math.floor(Math.random() * Constants.ArcanaTags),
      orientation: handleOrientation(),
    });
    console.log(toSubmit);
    const errs = formValidate();
    //const options = { optimisticData: user, rollbackOnError: true }
    if (Object.keys(errs).length === 0) {
      setPrompting(true);
      handleClose();
      //setPrompting(false);
      setQuestion(toSubmit);
      //forNewPrompt ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
      handleClick(TransitionRight);
    }
  };

  const formValidate = () => {
    let err = {};
    if (!form.userPrompt) err.userPrompt = "Question is required !";
    return err;
  };
  // #endregion function Methods

  // #region function rendering
  return (
    <>
      <DialogTitle>Ask Deck A Question</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ whiteSpace: "pre-line" }}
          paragraph
          gutterBottom
        >
          {`The idea is to use the card reading to illuminate a path forward, 
          so the tarot reader shoudl ask questions that are broader. 
          Here are a few frameworks to consider if you're new to tarot:

            - "What do I need to know about...?"
            - "How can I understand...?"
            - "Why am I feeling anxious about...?"
            - "Where is the hidden opportunity in...?"
            - "What should I focus on in my relationship with...?"
            - "How can I move past...?"`}
        </DialogContentText>
        <Box sx={{ my: 3, mx: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            id="userPrompt"
            label="Prompt"
            type="prompt"
            color="primary"
            placeholder={defaultValues.defaultPrompt}
            value={form.userPrompt}
            onChange={handleChange}
            fullWidth
            //variant="standard"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
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
      {message}
    </>
  );
  // #endregion function rendering
}

export default StyledDialogTarotForm;
