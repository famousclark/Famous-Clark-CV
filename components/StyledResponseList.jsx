import * as React from "react";
import { useSession } from "next-auth/react";

import useSWR, { SWRConfig } from "swr";

import * as Constants from "../constants";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { styled } from "@mui/material/styles";

import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// #region Helper Styled Components
const StyledFab = styled(Fab)({
  // position: "absolute",
  // left: "-2%",
  // top: "-.1%",
  // right: 0,
  // margin: "0 auto",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

// #endregion Helper Styled Components

// #region Helper Methods

const useResponseAPI = () => {
  const { data, error, mutate } = useSWR("api_responses");

  return {
    result: data,
    isLoading: !data & error,
    mutate,
  };
};

const usePromptAPI = (prompting) => {
  const { data, error } = useSWR(() => (prompting ? "api_prompting" : null));

  return {
    data: data,
    error,
  };
};

const handleUserNameSplit = (name) => {
  const nameArray = name.split(" ");

  return nameArray[0];
};

// #endregion Helper Methods

function StyledActionCard(props) {
  // #region function Props and variables
  const {
    sess,
    prompting,
    index,
    handleClear,
    handleSubmit,
    handleWaffling,
    elevation,
    actions,
    wafflingData,
    cardData,
  } = props;

  const { data, error } = usePromptAPI(prompting);
  // #endregion function Props and variables

  // #region Session and data - error | loading | authentication checks
  if (error) return "An error has occurred. Please Reload Page";
  if (prompting && !data) {
    return (
      <Dialog open={prompting}>
        <Box display="flex" justifyContent="center">
          <CircularProgress sx={{ ml: 2, mt: 2, mb: 2 }} color="primary" />
          <DialogTitle>
            <Typography
              sx={{ mt: 1 }}
              color="primary.main"
              variant="subtitle1"
              component="p"
            >
              {`Letting Ada do her divination`}
            </Typography>
          </DialogTitle>
        </Box>
      </Dialog>
    );
  }
  // #endregion Session and data - error | loading | authentication checks

  // #region function rendering
  return (
    <StyledCardLayout
      sess={sess}
      index={index}
      handleClear={handleClear}
      handleSubmit={handleSubmit}
      handleWaffling={handleWaffling}
      elevation={elevation}
      actions={actions}
      wafflingData={wafflingData}
      cardData={cardData}
    />
  );
  // #endregion function rendering
}

function StyledCardLayout(props) {
  // #region function Props and variables
  const {
    sess,
    index,
    wafflingData,
    cardData,
    actions,
    elevation,
    handleSubmit,
    handleWaffling,
    handleClear,
  } = props;

  const red3D = "rgba(125, 0, 0, 1)";
  const cyan3D = "rgba(0, 125, 125, 1)";
  // #endregion function Props and variables

  // #region function Method
  const handlePolarize = () => {
    if (actions && !wafflingData.sentiment == "") {
      //console.log(wafflingData.sentiment);
      if (wafflingData.sentiment.includes("negative")) {
        return red3D;
      } else if (wafflingData.sentiment.includes("positive")) {
        return cyan3D;
      }
    } else {
      return "";
    }
  };
  // #endregion function Method

  // #region function rendering
  return (
    <>
      <Card
        sx={{
          backgroundColor: handlePolarize(),
          display: "flex",
        }}
        elevation={elevation}
      >
        {actions ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: "-2%",
              top: "-.1%",
            }}
          >
            <Tooltip title="Save Story" placement="right" arrow>
              <StyledFab
                size="medium"
                color="primary"
                aria-label="save"
                onClick={handleSubmit}
              >
                <SaveOutlinedIcon />
              </StyledFab>
            </Tooltip>
            {cardData.prompt == "" ? (
              <>
                {/* <StyledFab
                  size="small"
                  color="default"
                  disabled
                  aria-label="api"
                  sx={{ mt: 1 }}
                  onClick={handleWaffling}
                >
                  <ApiRoundedIcon />
                </StyledFab> */}

                <StyledFab
                  size="small"
                  color="error"
                  disabled
                  aria-label="delete"
                  sx={{ mt: 1 }}
                  onClick={handleClear}
                >
                  <DeleteOutlineIcon />
                </StyledFab>
              </>
            ) : (
              <>
                <Tooltip title="Get Waffling" placement="right" arrow>
                  <StyledFab
                    size="small"
                    color="default"
                    aria-label="api"
                    sx={{ mt: 1 }}
                    onClick={handleWaffling}
                  >
                    <ApiRoundedIcon />
                  </StyledFab>
                </Tooltip>

                <Tooltip title="Delete" placement="right" arrow>
                  <StyledFab
                    size="small"
                    color="error"
                    aria-label="delete"
                    sx={{ mt: 1 }}
                    onClick={handleClear}
                  >
                    <DeleteOutlineIcon />
                  </StyledFab>
                </Tooltip>
              </>
            )}
          </Box>
        ) : (
          <></>
        )}

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid sx={{ ml: 1 }} item xs={12} sm={12} md={8} lg={8}>
            <CardContent>
              <Typography align="center" component="div" variant="h4">
                {Constants.ArcanaTags[index]} | {cardData.orientation}
              </Typography>
              <Divider variant="fullWidth" />
            </CardContent>
            <Box
              sx={{
                ml: 1,
                mr: 1,
                overflow: "auto",
                maxHeight: "450px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {/* cardData.username */}
                  {sess} | {`Until {Code} Breaks`}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Prompt
                </Typography>

                <Typography
                  sx={{ whiteSpace: "pre-line" }}
                  color="text.primary"
                  variant="body2"
                  paragraph
                  gutterBottom
                >
                  {cardData
                    ? ` -- ${cardData.prompt} \n${cardData.fragment}`
                    : " — Recite Alice in Wonderland."}
                </Typography>
                <Divider variant="fullWidth" />
                <Typography variant="subtitle1" color="text.secondary">
                  Ada | {`Until {Code} Breaks`}
                </Typography>

                <Typography variant="subtitle1" color="secondary.main">
                  Response
                </Typography>

                <Typography
                  sx={{ whiteSpace: "pre-line" }}
                  color="text.primary"
                  variant="body2"
                  paragraph
                  gutterBottom
                >
                  {cardData
                    ? `-- ${cardData.text}`
                    : `-- So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.`}
                </Typography>
              </CardContent>
            </Box>
          </Grid>

          <Grid item xs>
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  width: 1,
                  height: 1,
                  transform:
                    cardData.orientation == Constants.REVERSED
                      ? "rotate(180deg)"
                      : "",
                }}
                image={`/Images/Arcana/Arcana-${index}.jpg`}
                alt="0 - The Fool"
              />
              <CardContent>
                <Typography align="center" component="div" variant="subtitle1">
                  {cardData.orientation == Constants.REVERSED
                    ? Constants.ArcanaReversed[index]
                    : Constants.ArcanaUpright[index]}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
        </Grid>
      </Card>
    </>
  );
  // #endregion function rendering
}

function StyledCardLayoutArray(props) {
  // #region function Props
  const { sess } = props;
  // #endregion function Props

  // #region useSWR, useState, useSession
  const { result, isLoading } = useResponseAPI();
  // #endregion useSWR, useState, useSession

  // #region Session and data - error | loading | authentication checks
  if (isLoading) return "An error has occurred.";
  if (!result) return "Loading...";
  // #endregion Session and data - error | loading | authentication checks

  // #region function rendering
  let indexKey = result.length - 1;

  return (
    <>
      {result.map((doc, index) => (
        <Box key={doc._id}>
          <StyledCardLayout
            sess={sess}
            index={(indexKey - index) % 22}
            elevation={2}
            actions={false}
            cardData={doc}
          />
          <Divider sx={{ mt: 4, mb: 4 }} component="div" />
        </Box>
      ))}
    </>
  );
  // #endregion function rendering
}

function StyledResponseList(props) {
  // #region function Props
  const {
    setPrompting,
    prompting,
    notSaved,
    waffling,
    postResponse,
    postWaffling,
    setResult,
    setWaffling,
  } = props;

  // #endregion function Props

  // #region SWR and useState
  const { result, isLoading } = useResponseAPI();

  const [errors, setErrors] = React.useState({});
  const [snackbar, setSnackbar] = React.useState(false);
  const [sentitmentbar, setSentitmentbar] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const { data: session, status } = useSession();
  // #endregion SWR and useState

  // #region function Methods
  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setSnackbar(true);
    console.log(snackbar);
  };

  const handleClear = () => {
    setWaffling({
      sentiment: "",
    });
    setResult({
      username: "",
      prompt: "",
      text: "",
      orientation: Constants.UPRIGHT,
    });
  };

  const handleCloseSnackBar = () => {
    setSnackbar(false);
    setSentitmentbar(false);
  };

  const handleSubmit = () => {
    notSaved.username = session.user.email;
    console.log({ notSaved });
    const errs = responseValidate();
    if (Object.keys(errs).length === 0) {
      postResponse(notSaved);
      handleClear();
    } else {
      setErrors({ errs });
      handleClick(TransitionRight);
    }
  };

  const handleWaffling = () => {
    setPrompting(true);
    const data = {
      story: Constants.SENTIMENT,
      userPrompt: notSaved.prompt,
      userFragment: notSaved.text,
    };
    postWaffling(data);

    setSentitmentbar(true);
    //setTransition(TransitionRight);

    //console.log(snackbar);
  };

  const responseValidate = () => {
    let err = {};
    if (!notSaved.text) err.text = "response is required";
    if (!notSaved.prompt) err.prompt = "prompt is required";
    return err;
  };
  // #endregion function Methods

  // #region function rendering
  return (
    <>
      <List sx={{ width: "100%" }}>
        <StyledActionCard
          // sess={handleUserNameSplit(session.user.name)}
          sess={"Human"}
          prompting={prompting}
          index={result.length % 22}
          handleClear={handleClear}
          handleSubmit={handleSubmit}
          handleWaffling={handleWaffling}
          elevation={6}
          actions={true}
          wafflingData={waffling}
          cardData={notSaved}
        />

        <Divider sx={{ mt: 4, mb: 4 }} component="div" />
        <StyledCardLayoutArray
          // sess={handleUserNameSplit(session.user.name)}
          sess={"Human"}
          result={result}
        />
      </List>
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
          {!errors.errs ? "" : `No response to save !`}
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={9000}
        open={sentitmentbar}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="I love snacks"
        key={"sentiment"}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="info"
          sx={{ width: "100%" }}
        >
          {waffling.sentiment.includes("positive")
            ? "Ada: Colour of divination sentiment is | cyan"
            : "Ada: Colour of divination sentiment is | red"}
        </Alert>
      </Snackbar>
    </>
  );
  // #endregion function rendering
}

export default StyledResponseList;
