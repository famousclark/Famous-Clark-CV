import * as React from "react";
import { keyframes } from "@emotion/react";

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
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { styled } from "@mui/material/styles";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// #region Helper Styled Components
const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });

const StyledFab = styled(Fab)({
  position: "relative",
  //left: "50%",
  //right: "30%",
  top: 20,
  margin: "0 auto",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};
// #endregion Helper Styled Components

// #region Helper Methods
const useTarotAPI = (prompting) => {
  const { data, error } = useSWR(() => (prompting ? "api_tarot" : null));

  return {
    data: data,
    error,
  };
};

const handleInstrucionSetting = (deckQuestionData) => {
  if (deckQuestionData.text == "" && deckQuestionData.prompt == "") {
    return "Ask The Deck A Question";
  }

  if (deckQuestionData.text == "") {
    return "Draw Five Cards";
  }

  return "Your Reading";
};
// #endregion Helper Methods

function StyledActionCard(props) {
  // #region function Props
  const {
    hand,
    handleGetReading,
    handleDrawCard,
    prompting,
    elevation,
    handleResetDeck,
    deckQuestionData,
  } = props;
  // #endregion function Props

  // #region useSWR, useState, useSession
  const { data, error } = useTarotAPI(prompting);
  // #endregion useSWR, useState, useSession

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
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        {hand.length < 5 ? (
          <StyledFab
            disabled={deckQuestionData.prompt == "" ? true : false}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="draw"
            onClick={handleDrawCard}
          >
            <AddCircleOutlineOutlinedIcon />
            Draw A Card
          </StyledFab>
        ) : (
          <Box display="flex">
            <StyledFab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="draw"
              onClick={handleGetReading}
            >
              <ApiRoundedIcon />
              Get Reading
            </StyledFab>
            <StyledFab
              sx={{ ml: 2 }}
              variant="extended"
              size="medium"
              color="error"
              aria-label="reset"
              onClick={handleResetDeck}
            >
              <ApiRoundedIcon />
              Reset Deck
            </StyledFab>
          </Box>
        )}
      </Box>
      <Card
        sx={{
          display: "flex",
        }}
        elevation={elevation}
      >
        <Container>
          <CardContent sx={{ mt: 2, flex: "1 0 auto" }}>
            <Typography align="center" component="div" variant="h4">
              {handleInstrucionSetting(deckQuestionData)}
            </Typography>

            <Divider variant="fullWidth" />
            <Typography
              align="center"
              variant="h5"
              color="secondary.main"
              component="div"
            >
              Your Question
            </Typography>

            <Typography
              align="center"
              color="text.primary"
              variant="subtitle1"
              paragraph
              gutterBottom
            >
              {deckQuestionData.prompt}
            </Typography>

            {!deckQuestionData.text == "" ? (
              <>
                <Typography
                  align="center"
                  variant="h5"
                  color="secondary.main"
                  paragraph
                  gutterBottom
                >
                  Divination
                </Typography>
                <Typography
                  align="center"
                  color="text.primary"
                  variant="subtitle1"
                  paragraph
                  gutterBottom
                >
                  {deckQuestionData.text}
                </Typography>
              </>
            ) : (
              ""
            )}
          </CardContent>
        </Container>
      </Card>
    </Box>
  );
  // #endregion function rendering
}

function StyledTarotDrawList(props) {
  // #region function Props
  const {
    hand,
    setHand,
    postData,
    deckQuestionData,
    setPrompting,
    prompting,
    setResult,
  } = props;

  const defaultDeck = [...Constants.ArcanaTags];
  // #endregion function Props

  // #region useSWR, useState, useSession
  const [deck, setDeck] = React.useState(defaultDeck);
  const [errors, setErrors] = React.useState({});
  const [snackbar, setSnackbar] = React.useState(false);
  const [sentitmentbar, setSentitmentbar] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  // #endregion useSWR, useState, useSession

  // #region function Methods

  const handleResetDeck = () => {
    setDeck(defaultDeck);
    setHand([]);
    setResult({
      username: "",
      prompt: "",
      text: "",
      orientation: Constants.UPRIGHT,
    });
  };

  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setSnackbar(true);
    console.log(snackbar);
  };

  const handleCloseSnackBar = () => {
    setSnackbar(false);
    setSentitmentbar(false);
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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleGetReading = () => {
    const errs = formValidate();
    const noModel = "";
    const cheapModel = "text-ada-001";
    const middleModel = "text-curie-001";
    const bestModel = "text-davinci-002";
    //const options = { optimisticData: user, rollbackOnError: true }
    if (Object.keys(errs).length === 0) {
      setPrompting(true);
      const form = {
        model: bestModel,
        userPrompt: deckQuestionData.prompt,
        userFragment: hand,
        story: Constants.TAROT,
      };
      console.log(form);
      postData(form);
      //forNewPrompt ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
      handleClick(TransitionRight);
    }
  };

  const handleDrawCard = () => {
    shuffleArray(deck);
    setDeck(deck);

    // console.log("Shuffled deck: ", deck);
    // console.log("Default deck: ", Constants.ArcanaTags);
    const draw = deck.length - 1;
    const cardName = deck[draw];
    // console.log(cardName);
    // console.log(Constants.ArcanaTags.indexOf(`${cardName}`));
    const cardToPush = {
      title: cardName,
      orientation: handleOrientation(),
      index: Constants.ArcanaTags.indexOf(cardName),
    };
    setDeck(deck.filter((card) => card !== cardName));
    setHand((arr) => [...arr, cardToPush]);
  };

  const formValidate = () => {
    let err = {};
    if (deckQuestionData.prompt == "")
      err.userPrompt = "Question is required !";
    return err;
  };

  // #endregion function Methods

  // #region function rendering
  return (
    <>
      <StyledActionCard
        hand={hand}
        elevation={6}
        handleResetDeck={handleResetDeck}
        handleGetReading={handleGetReading}
        handleDrawCard={handleDrawCard}
        setPrompting={setPrompting}
        prompting={prompting}
        deckQuestionData={deckQuestionData}
      />

      <Grid
        sx={{ mt: 3, mb: 5 }}
        container
        spacing={2}
        justifyContent="center"
        alignItems="stretch"
      >
        {hand
          .slice(0)
          .reverse()
          .map((card, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <Card elevation={2}>
                <CardContent>
                  <Typography align="center" component="div" variant="h5">
                    {card.title} | {card.orientation}
                  </Typography>
                  <Divider variant="fullWidth" />
                </CardContent>
                {index == 0 ? (
                  <CardMedia
                    component="img"
                    sx={{
                      width: 1,
                      height: 1,
                      transition: `1.5s ease-in-out`,
                      webkitTransform: `
                      ${
                        card.orientation == Constants.REVERSED
                          ? "rotate(180deg)"
                          : ""
                      }`,
                      mozTransform: `
                      ${
                        card.orientation == Constants.REVERSED
                          ? "rotate(180deg)"
                          : ""
                      }`,
                      oTransform: `
                      ${
                        card.orientation == Constants.REVERSED
                          ? "rotate(180deg)"
                          : ""
                      }`,
                      msTransform: `
                      ${
                        card.orientation == Constants.REVERSED
                          ? "rotate(180deg)"
                          : ""
                      }`,
                      transform: `
                        ${
                          card.orientation == Constants.REVERSED
                            ? "rotate(180deg)"
                            : ""
                        }`,
                    }}
                    image={`/Images/Arcana/Arcana-${card.index}.jpg`}
                    alt={card.title}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    sx={{
                      width: 1,
                      height: 1,
                      transform:
                        card.orientation == Constants.REVERSED
                          ? "rotate(180deg)"
                          : "",
                    }}
                    image={`/Images/Arcana/Arcana-${card.index}.jpg`}
                    alt={card.title}
                  />
                )}

                <CardContent>
                  <Typography align="center" component="div" variant="body1">
                    {card.orientation == Constants.REVERSED
                      ? Constants.ArcanaReversed[card.index]
                      : Constants.ArcanaUpright[card.index]}
                  </Typography>
                  <Divider variant="fullWidth" />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
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
          {"Ask Deck A Question!"}
        </Alert>
      </Snackbar>
    </>
  );
  // #endregion function rendering
}

export default StyledTarotDrawList;
