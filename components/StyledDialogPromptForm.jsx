import * as React from "react";

import * as Constants from "../constants";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Collapse from "@mui/material/Collapse";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

import MuiAlert from "@mui/material/Alert";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

import { styled, alpha, useTheme } from "@mui/material/styles";
// #region Helper Styled Components
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
// #endregion Helper Styled Components

// #region Helper Methods
const handleUserNameSplit = (name) => {
  const nameArray = name.split(" ");

  return nameArray[0];
};

const useResponseAPI = () => {
  const { data, error, mutate } = useSWR("api_responses");

  return {
    result: data,
    isLoading: !data & error,
    mutate,
  };
};
// #endregion Helper Methods

function StyledDialogPromptForm(props) {
  // #region function Props and variables
  const {
    deckIndex,
    setPrompting,
    handleClose,
    setWaffling,
    //result,
    setResult,
    promptForm,
    form,
    postData,
    setForm,
  } = props;

  //const router = useRouter();
  const theme = useTheme();

  const defaultValues = {
    defaultPrompt: `a frightened 13-year-old Alice running through a moonlit, snow-covered English garden. This is The Slumber, a manifestation of Alice’s childhood memories`,
    defaultFragment: `All in the golden afternoon Full leisurely we glide; \nFor both our oars, with little skill, By little arms are plied, \nWhile little hands make vain pretence Our wanderings to guide.`,
  };
  // #endregion function Props and variables

  // #region SWR and useState
  const { result, isLoading } = useResponseAPI();
  const { mutate } = useSWRConfig();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const [occultInfluence, setOccultInfluence] = useState(false);
  const [branching, setBranching] = useState(true);

  const [transition, setTransition] = useState(undefined);
  const [expanded, setExpanded] = React.useState(false);

  const { data: session, status } = useSession();
  // #endregion SWR and useState

  // #region function Methods
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setSnackbar(true);
    console.log(snackbar);
  };

  const handleCloseSnackBar = () => {
    setSnackbar(false);
  };

  const handleSetOccult = () => {
    setOccultInfluence(!occultInfluence);
  };

  const handleSetBranching = () => {
    setBranching(!branching);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    setForm({
      ...form,
      deckIndex: deckIndex,
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

  const handlePromptContext = () => {
    const contextFragment = form.userPrompt;

    if (result[0] && form.userPrompt == "") {
      contextFragment = result[0].prompt;
    }

    return contextFragment;
  };

  const handleFragmentContext = () => {
    const contextFragment = "\n\n" + form.userFragment;

    if (result[0] && branching) {
      return contextFragment;
    }

    if (result[0] && form.userFragment == "") {
      contextFragment = result[0].text;
      //console.log({ card: result[0].deckIndex, text: result[0].text });
      return contextFragment;
    }

    if (result[0]) {
      contextFragment = result[0].text + "\n\n" + form.userFragment;
      //console.log({ card: result[0].deckIndex, text: result[0].text });
      return contextFragment;
    }

    return contextFragment;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //console.log({ context: handleContext() });
    setPrompting(true);

    setWaffling({
      sentiment: "",
    });

    const noModel = "";
    const cheapModel = "text-ada-001";
    const middleModel = "text-curie-001";
    const bestModel = "text-davinci-002";

    const toSubmit = {
      ...form,
      userFragment: handleFragmentContext(),
      userPrompt: handlePromptContext(),
      model: noModel,
      username: handleUserNameSplit(session.user.name),
      deckIndex: deckIndex,
      orientation: handleOrientation(),
      occultInfluence: occultInfluence,
    };

    console.log({ form: toSubmit });

    const errs = formValidate();
    //const options = { optimisticData: user, rollbackOnError: true }
    if (Object.keys(errs).length === 0) {
      handleClose();

      postData(toSubmit);
      //forNewPrompt ? postData(form) : putData(form);
    } else {
      setPrompting(false);
      setErrors({ errs });
      handleClick(TransitionRight);
    }

    setForm({
      ...form,
      userFragment: "",
    });
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    if (!form.userPrompt && deckIndex <= 0)
      err.userPrompt = "Prompt is required !";

    return err;
  };
  // #endregion function Methods

  // #region function rendering
  return (
    <>
      <DialogTitle>
        Add To Story | Current Deck Index: [{deckIndex}]
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ whiteSpace: "pre-line" }}
          paragraph
          gutterBottom
        >
          {`Give Ada a PROMPT to generate a response from. Add a FRAGMENT to tell Ada the desired structure of her respsone.`}
        </DialogContentText>
        <DialogActions>
          <Box
            sx={{ fontStyle: "italic", color: theme.palette.primary.main }}
          >{`Expand for Instructions`}</Box>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </DialogActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <DialogContentText
            sx={{ whiteSpace: "pre-line" }}
            paragraph
            gutterBottom
          >
            {`*Example PROMPT*
          --
          ${defaultValues.defaultPrompt}
          
          *Example FRAGMENT*
          --
          Alice ran through the garden, her heart pounding in her chest. She could hear the creatures of the night stalking her, their claws scraping against the ground. She was so scared she could barely breathe. She didn't know what to do. 
          
          Suddenly, she saw a light in the distance. It was the White Rabbit, beckoning her to follow. Alice didn't know what else to do, so she followed. The White Rabbit led her to a door in a tree. He opened the door and motioned for Alice to go inside.
          Alice hesitated for a moment, but then she entered the tree. She found herself in a long, dark tunnel. She could hear the creatures of the night following her, but she kept going. She had to find her way out.
          
          Eventually, she came to a door at the end of the tunnel. She opened it and stepped into a beautiful, snow-covered garden. She was safe.`}
          </DialogContentText>
        </Collapse>

        <DialogActions>
          <Button
            color={branching ? "success" : "secondary"}
            onClick={handleSetBranching}
          >
            {branching ? "Branching" : "Not Branching"}
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            color={occultInfluence ? "success" : "secondary"}
            onClick={handleSetOccult}
          >
            {occultInfluence ? "Occult" : "No Occult"}
          </Button>
        </DialogActions>

        <Box sx={{ mb: 1, mx: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            id="userPrompt"
            label="Prompt"
            type="prompt"
            color="secondary"
            placeholder={defaultValues.defaultPrompt}
            value={form.userPrompt}
            onChange={handleChange}
            fullWidth
            //variant="standard"
          />
        </Box>
        {/* <Divider variant="middle" />
        <Box sx={{ mt: 1, mx: 1 }}>
          <TextField
            id="userFragment"
            label="Inital Fragment"
            multiline
            margin="dense"
            rows={6}
            fullWidth
            color="secondary"
            placeholder={defaultValues.defaultFragment}
            value={form.userFragment}
            onChange={handleChange}
            //variant="standard"
          />
        </Box> */}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSubmit}>
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

export default StyledDialogPromptForm;
