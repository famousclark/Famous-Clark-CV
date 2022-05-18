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

function OluCard() {
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
                  Crossing the Bar
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Olu Akanbi | {`Until. It. Breaks`}
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
                  My work takes a humanistic view from socio-political and
                  philosophical perspectives. It is driven by a need to relate
                  the human experience to a larger cosmological story. My work
                  directly deals with the duality of urban landscapes and the
                  natural world along with the violence, injustice, ruin and
                  renewal born out of that duality.
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`As a two-channel installation, Crossing the Bar is a meditation on migration, identity and resistance. 
                  It looks at the sea as a bridge that connects borders and histories but also a mechanism for 
                  reshaping identity and the resistance that comes with that reshaping. 
                  It explores the sea as both a beaconof hope, a graveyard of death and traversing the 
                  sea as a metaphor in the internal and external struggle in reshaping identity.`}
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

export default OluCard;
