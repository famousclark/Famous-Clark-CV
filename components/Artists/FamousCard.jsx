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

function FamousCard() {
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
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h4">
                  The Gestalt Game
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
                  {` I am fascinated by the potential of artificial intelligence in
                  gaming. I believe that AI should be reframed in more queer
                  terms such as symbiotic intelligence and can create new and
                  unique intra-active experiences that are not possible with
                  traditional game design. I am constantly exploring new ways to
                  use AI in games, and I believe that the future of gaming will
                  be shaped by artificial intelligence. I am particularly
                  interested in the potential of AI in creating queer gaming
                  experiences. I believe that AI can create characters and
                  storylines that are not possible with traditional game design.
                  The future of human computer intra-action can benefit from
                  being shaped by queer symbiosis of anthropocentrism and
                  artificial intelligence.`}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`The Gestalt Journal is an intra-active experience between players and an artificial intelligence generated through OpenAI’s GPT-3 system. 
              The Gestalt Journal is played alongside {Ada}, a symbiotic intellect. 
              Players give a few lines of script or fragment and a prompt to {Ada}, and in return {Ada} uses some black magic to interpret and complete the fragment. 
              This can occur through the 22 steps of the major arcana of a Tarot deck, beginning at the fool and ending at the world. 
              Each step’s writing is mixed with the essence of corresponding arcana and {Ada’s} own interpretation to make a unique and unexpected story. 
              Through human and computer interaction, the player and {Ada} work to make an unprecedented gestalt of shared narrative and cyborgian experience.`}
                </Typography>
              </CardContent>
              <CardActions>
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
              </CardActions>
            </Box>
          </Grid>

          <Grid item xs>
            <CardActionArea sx={{ width: 1, height: 1 }} href="/tarot">
              <CardMedia
                component="img"
                sx={{ width: 1, height: 1 }}
                image="/Images/Arcana/Arcana-0.jpg"
                alt="Fool-Arcana"
              />
            </CardActionArea>
          </Grid>
        </Grid>
      </Card>
    </>
  );
  // #endregion function rendering
}

export default FamousCard;
