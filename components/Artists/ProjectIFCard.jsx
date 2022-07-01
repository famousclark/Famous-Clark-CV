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

function ProjectIFCard() {
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
                  Project IF
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
                  {` The key to an enjoyable game is To play along with its story It is a performance of apparatus, narrative, and user
                    Video games are found everywhere in the public sphere and in the privacy of the solitary user's device, whether played 
                    at home or in public. Games are as diverse as they are prolific. Their content ranges from the pleasurable and contested to 
                    the extraordinary and banal. They can be expensive or cheap, violent or sweet, flagrantly stupid, or philosophical. 
                    Modern video games have achieved technical innovation, narrative complexity, and emotional connectivity to allow the genre 
                    to reflect and imply a distortive mirror to their extrapolated societies. In this reflection and distortion, modern video 
                    games create an elaborate dance between anthropocentrism and artistic symbolism. Who we see ourselves as and who we desire to be.`}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`Project IF is a small one room game centered around interacting with a futuristic mechanical agent whilst in detention. 
                  Through dialogue and simple puzzles the player and machine explore notions of being and cohabitation with different bodies.`}
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
              image="/Images/PRIF.png"
              alt="Fool-Arcana"
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
  // #endregion function rendering
}

export default ProjectIFCard;
