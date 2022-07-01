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

function StationTwoCard() {
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
                  Metro Station Railway
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
                  {`Game Modeling Artwork`}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`Metro Station Railway.`}
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
              image="/Images/Clover-Level_Design-09.png"
              alt="3D Station"
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
  // #endregion function rendering
}

export default StationTwoCard;
