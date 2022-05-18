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

function MichaelCard() {
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
                  Always On
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Michael Jack Chernoff | {`Until. It. Breaks`}
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
                  {`Michael Jack Chernoff is an intermedia filmmaker and critical
                  media artist. His satirical narratives, landscape documentary,
                  and new media installations explore global solutions by
                  investigating how materials and culture shape human identity
                  and determinacy. His practice-based research is an
                  intermediary production by combining archaic video media tech
                  with new media computing in order to establish genealogies of
                  media technology along with the parallel development of human
                  identity under the effects of technologies. His research
                  archive is primarily focused on constructing the relations of
                  cinema with digital computing through the qualities of video
                  signal but as determined by the practices of television
                  programming. His films and art also explore accessing media
                  via glitch, durational landscapes, forming perception, and
                  speculative design.`}
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`Michael’s professional career has crossed over into the fields
                  of videography, studio portraiture, and independent film
                  production. After years of experimenting with media occupation
                  he chose to return to academic media. He is currently earning
                  an M.F.A. in Media Arts Production from the Department of
                  Media Study, University at Buffalo (SUNY).`}
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`Outside of his practice Michael is also highly interested in
                  forming his own brand of media production education by
                  teaching media theory and instrumentation as a way for
                  students to know their own methods and materials for media
                  making.`}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`As a media art installation, Always On, is an incorporation of
                  archaic video technologies with the digital video streaming
                  platforms and will be placed strategically in the gallery so
                  that visitors become incorporated with the “live performance”
                  of the exhibit. This exhibit involves many instances of
                  Analog-to-Digital video conversions for old media to signal
                  new content. It also layers visitors into divisions of
                  performance depending on the video output.`}
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

export default MichaelCard;
