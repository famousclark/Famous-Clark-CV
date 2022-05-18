import * as React from "react";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";

import { autocompleteClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled, alpha, useTheme } from "@mui/material/styles";

import StyledBottomAppBar from "../components/StyledBottomAppBar";
import StyledDateChangedPaper from "../components/StyledDateChangedPaper";

import ExhibitMainDesktop from "../components/ExhibitMainDesktop";
import ExhibitFooter from "../components/ExhibitFooter";
import ExhibitMainMobile from "../components/ExhibitMainMobile";

//import SplashVideo from "/Vids/Splash_Page.mp4";
// #region Helper Styled Components

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  //minHeight: "100vh",
  color: theme.palette.common.black,
  background: theme.palette.common.white,
  padding: theme.spacing(3, 3, 3, 3),
}));

// #endregion Helper Styled Components

function Index() {
  // #region function props and variables
  const theme = useTheme();
  // #endregion function props and variables

  // #region function rendering
  return (
    <>
      <Box
        sx={{
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          //public\Images\sigmund-By-tZImt0Ms-unsplash.jpg
          backgroundImage: `url(${"/Images/sigmund-By-tZImt0Ms-unsplash.jpg"})`,
          display: "flex",
          flexDirection: "column",
          //height: "100vh",
        }}
      >
        <Box bgcolor={" rgba(0,0,0,.7);"}>
          <Container component="span" sx={{ mb: 4 }} maxWidth="xl">
            <Box
              display="flex"
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100vh" }}
            >
              <Typography
                sx={{ whiteSpace: "pre-line" }}
                color="text.primary"
                variant="h2"
                component="h2"
                gutterBottom
              >
                <Box sx={{ mx: 4, fontStyle: "normal" }}>Famous Clark |</Box>

                {/* {`until it breaks.`} */}
              </Typography>

              <Typography
                sx={{ whiteSpace: "pre-line" }}
                color="text.primary"
                variant="h6"
                component="h3"
              >
                {`I am independent game developer focusing on integrations 
                between mythology, artificial intelligence, and identity. My work looks into 
                integrating artificial intelligence and proto-feminism, developing technology 
                that queers cultural memory and experience. As such he intends to further 
                queering cultural memory via speculating on developing queer experiences with 
                advancing technology by combining artificial intelligence and feminist cultural 
                histories such as early western occult practices.`}
              </Typography>

              <Divider sx={{ mt: 4 }} component="div" />
            </Box>
          </Container>

          <Box
            sx={{
              flexDirection: "column",
              display: { xs: "flex", md: "none" },
            }}
          >
            <ExhibitMainMobile />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <ExhibitMainDesktop />
          </Box>

          <Box>
            <Container component="span" maxWidth="xl">
              <Typography textAlign="center" variant="body1">
                Background image by
                <Link
                  color="secondary"
                  href="https://unsplash.com/@sigmund?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                >
                  {` Sigmund `}
                </Link>
                on
                <Link
                  color="secondary"
                  href="https://unsplash.com/@sigmund?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                >
                  {` Unsplash `}
                </Link>
              </Typography>
              <Divider sx={{ mt: 8, mb: 0 }} component="div" />
            </Container>
          </Box>

          <Box sx={{ flexDirection: "column", mb: 8 }}>
            {/* <ExhibitFooter /> */}
          </Box>
          <StyledBottomAppBar bottom={true} />
        </Box>
      </Box>
    </>
  );

  // #endregion function rendering
}

export default Index;
