import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled, alpha, useTheme } from "@mui/material/styles";

function AngelCard() {
  // #region function rendering
  return (
    <>
      <Card sx={{ display: "flex" }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h4">
                  Project 4N63L 'Angel'
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Famous Clark |
                </Typography>

                <Divider variant="middle" />

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Statement from artist
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`Immoral behaviors in video games can cause a feeling of guilt from the experiencer. What modern video games, especially the 
                  role-playing genre, offer is the perception of moral choice and agency. The use of influential narrating figures, story agency, 
                  and character attachment offers an unprecedented level of immersion into modern video games. This level of immersion brought 
                  about by technological fidelity is akin to audience perceptions in visual mediums like film and television. Where video games 
                  differ is their incorporation of agency and choice. The morality of choice that video games offer is a unique feature that separates 
                  its evolution and audience reception from similar visual mediums. However, as experiencers begin to recognize narrative and 
                  affective patterns common throughout the genre, the gravity of their agency and moral sensitivity can and does alter.`}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`4N63L or {Angel} is a branhcing dialogue based game made in the style of retro text based adventures. The project explores
                  the concept of interacting with virtual agents, as an exploration of cyborgian symbiosis between user and increasingly human-like
                  technologies.`}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button
                  sx={{ mr: 1 }}
                  color="warning"
                  variant="outlined"
                  href="/gestalt"
                  size="small"
                >
                  Generate Some Story with (AI) Ada
                </Button>
                |
                <Button
                  sx={{ ml: 1 }}
                  variant="outlined"
                  href="/tarot"
                  size="small"
                >
                  Get Fortune from (AI)
                </Button>
              </CardActions> */}
            </Box>
          </Grid>

          <Grid item xs>
            <CardMedia
              component="img"
              sx={{ width: 1, height: 1 }}
              image="/Images/Friend.jpg"
              alt="Project 4N63L"
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
  // #endregion function rendering
}

export default AngelCard;
