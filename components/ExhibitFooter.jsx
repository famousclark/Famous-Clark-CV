import * as React from "react";
import { useRouter } from "next/router";

import { autocompleteClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled, alpha, useTheme } from "@mui/material/styles";

// #region Helper Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  minHeight: "100vh",
  color: theme.palette.common.black,
  background: theme.palette.common.white,
  padding: theme.spacing(3, 3, 3, 3),
}));
// #endregion Helper Styled Components

function ExhibitFooter() {
  // #region function Props
  const theme = useTheme();
  // #endregion function Props

  // #region function rendering
  return (
    <>
      <StyledPaper square={true} sx={{ width: 1, mt: 8 }}>
        <Container component="span" maxWidth="lg">
          <Typography variant="h5" color="common.black">
            Thank for checking out my works!
          </Typography>

          <Typography variant="h6" color="secondary.main">
            Always updating this, but here are some thanks
          </Typography>

          <Divider
            sx={{ mt: 4, mb: 4, borderColor: "rgba(0,0,0,1)" }}
            component="div"
          />

          <Box>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography
                  sx={{ mt: 4, mb: 4 }}
                  variant="body1"
                  color="secondary.main"
                >
                  famouscl@buffalo.edu
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography
                  sx={{ mt: 4, mb: 4 }}
                  variant="body1"
                  color="common.black"
                >
                  HUGE THANKS TO THE FOLLOWING
                </Typography>

                <Typography
                  sx={{ mt: 4, mb: 4, whiteSpace: "pre-line" }}
                  variant="body1"
                  color="common.black"
                >
                  {`- University at Buffalo Media Study Department
                  
                  - Friends & Family
                  - Lots of caffeine...`}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </StyledPaper>
    </>
  );
  // #endregion function rendering
}

export default ExhibitFooter;
