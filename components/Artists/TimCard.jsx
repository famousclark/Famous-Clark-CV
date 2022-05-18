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

function TimCard() {
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
          {/*<Grid xs={12} sm={12} md={4} lg={4}>
            <CardActionArea sx={{ width: 1, height: 1 }} href="#">
              <CardMedia
                component="img"
                sx={{ width: 1, height: 1 }}
                image="/Images/Arcana-I.jpg"
                alt="Fool-Arcana"
              />
            </CardActionArea>
          </Grid>*/}

          <Grid item xs>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h4">
                  Giving Tree
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Timothy Zeng | {`Until. It. Breaks`}
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
                  {`I want to draw people into the space, encompassing them to use all of their senses. 
                  This is essentially an escapist environment yetI want for insight tobe formed.
                  This experience would ideally help everyone who experiences it in one way or another.`}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`Interactive piece that has multiple levels to it. 
                  The main focus is similar to my own thesis, of causing joy and reducing stress. 
                  In order to do this, I want to create an environment that is playful, attracts attention, and is memorable.`}
                </Typography>
              </CardContent>
              {/*<CardActions>
                <Button variant="outlined" href="#" size="small">
                  Play The Game | on April 22nd
                </Button>
            </CardActions>*/}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
  // #endregion function rendering
}

export default TimCard;
