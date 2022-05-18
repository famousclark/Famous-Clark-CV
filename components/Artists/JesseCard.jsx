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

function JesseCard() {
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
            <CardMedia
              component="img"
              sx={{ width: 1, height: 1 }}
              image="/Images/3D-waffles.png"
              alt="3D Waffles"
            />
          </Grid>

          <Grid item xs>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h4">
                  Biscursive Disquick Waffling
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Jesse Rodkin | {`Until. It. Breaks`}
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
                  Humanity jumped forward into agreat chapter of cohesive and
                  mediated ways of thinking when we invented the written
                  language. We suddenly had means of description, without an in
                  person-interface–a way of projecting into the minds of one
                  anotherthe lighting, tones, and textures of stories, symbols,
                  memories, perceived futures; or, images. Often, moving
                  images.We discovered a way of compressing into learned symbols
                  what was previously unquantified data. “There were this many
                  trees, and the leaves were this hue of green.”Largelyall it
                  tookto fill in the gaps between the image compression into
                  transmission into decompression, was empathy. “I bet the sky
                  was a deep beautiful blue above those that many trees”–though
                  that is a conclusion more than it is conclusive. We then leapt
                  into a new chapterof communication, one that we’re still at
                  the earliest stages of, with the photograph. It is both a more
                  andless compressed method, generally larger in transmission
                  size butmuchfaster toencode, as well as decodeand register in
                  the mind, yet of a potentially more limited scale than the
                  spoken word. Pairing with thisnew, highly accessible level of
                  mimesis, coming along just a few decades later, was the
                  recorded sound.
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  This has created a disconnect, for many reasons. Time and
                  space do not compress similarly across the photograph and the
                  sound recording. Sound, to our ears, tends to make the most
                  sense redistributed at a 1:1 playback time. The still and
                  moving image have far more leniency. The meaning of a sound
                  can be contextually warped by differing imagery while the
                  image with a poorly “linked” sound will not fool as many
                  recipients.
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  The distribution of both has scaled massively and spun out
                  into seemingly endless formats. The more accessible
                  andmanipulatable the media has become, the less our ability to
                  follow through on the original intent of communication. Or
                  perhaps, there is simply too much data from too many angles
                  without an in-person interface attached. Our understanding of
                  our media, on its very surface level intent of retelling or
                  teaching, has been throttled.
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="secondary.main"
                  component="div"
                >
                  Description of work
                </Typography>

                <Typography color="text.primary" variant="body2" gutterBottom>
                  {`Flour, sugar, water, a rising agent, and butter. 
                  Maybe some maple syrup. I made either a pancake, or a waffle, and both sizzled.`}
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

export default JesseCard;
