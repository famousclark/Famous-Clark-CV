import * as React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled, alpha, useTheme } from "@mui/material/styles";

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

function StyledDateChangedPaper() {
  // #region function Props
  const theme = useTheme();
  // #endregion function Props

  // #region function rendering
  return (
    <StyledPaper square={true} sx={{ width: 1 }}>
      <Container component="span" maxWidth="lg">
        <Typography
          sx={{ mt: 4 }}
          variant="h5"
          color={theme.palette.secondary.main}
        >
          *CHANGE TO LOCATION AND OPENING HOURS*
        </Typography>

        <Typography
          sx={{ mt: 2 }}
          variant="body1"
          color={theme.palette.secondary.main}
        >
          OPENING HOURS
        </Typography>

        <Typography
          sx={{ mb: 4, whiteSpace: "pre-line" }}
          variant="body1"
          color={theme.palette.secondary.main}
        >
          {`Center For the Arts
            103 Center For The Arts, Buffalo, NY 14260`}
        </Typography>

        <Typography
          sx={{ mb: 4, whiteSpace: "pre-line" }}
          variant="body1"
          color={theme.palette.secondary.main}
        >
          {`May 16th | Friday 12:00 - 21:00`}
        </Typography>
      </Container>
    </StyledPaper>
  );
  // #endregion function rendering
}

export default StyledDateChangedPaper;
