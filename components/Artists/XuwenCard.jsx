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

function XuwenCard() {
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
                  Visual Designing
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Xuwen Zhang | {`Until. It. Breaks`}
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
                  {`Visual programming inspired me to attempt visualising the
                  designing process. Designers are required to complete a draft
                  form with the ability to operate software at a proficient
                  level, spending time editing details. However, different
                  software has different requirements: some of them, by
                  sacrificing the amount of freedom in choices of design to make
                  the process easier, less time consuming and more unified as
                  results. The benefit of costing less time figuring out
                  technical processes is to be able to associate with a greater
                  range of studies. For instance, an architect does not require
                  high coding skills to write programs, a sound engineer does
                  not require high coding skills to write programs. These are
                  all associated with computational elements without actually
                  learning a computational language which makes the design
                  process easier (utilising both skills in one action).`}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`The apparatus is designed as a simple version for expressing the
                  idea of linking the design process and computer language on a
                  larger scale. In this model, designers can use less effort to
                  design a rather clear proposal so that people can have better
                  efficiency in practising their ideas. My goal is to increase
                  the accessibility of design so that people can spend less time
                  studying design but still have the same quality.`}
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

export default XuwenCard;
