import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled, alpha, useTheme } from "@mui/material/styles";

import FamousCard from "./Artists/FamousCard";
import ProjectIFCard from "./Artists/ProjectIFCard";
import AngelCard from "./Artists/AngelCard";
import ForestCard from "./Artists/ForestCard";
import TrainCard from "./Artists/TrainCard";
import StationCard from "./Artists/StationCard";
import StationTwoCard from "./Artists/StationTwoCard";

// #region Helper Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  //color: theme.palette.text.secondary,
  padding: theme.spacing(3, 3, 3, 3),
}));
// #endregion Helper Styled Components

function ExhibitMainDesktop() {
  // #region function Props
  const theme = useTheme();
  // #endregion function Props

  // #region function rendering
  return (
    <Container component="span" sx={{ mt: 4, mb: 4 }} maxWidth="xl">
      <Divider sx={{ mt: 4, mb: 4 }} component="div" />

      <StationTwoCard />

      <Divider sx={{ mt: 4, mb: 4 }} component="div" />

      <StationCard />

      <Divider sx={{ mt: 4, mb: 4 }} component="div" />

      <TrainCard />

      <Divider sx={{ mt: 4, mb: 4 }} component="div" />

      <ForestCard />

      <Divider sx={{ mt: 4, mb: 4 }} component="div" />

      <FamousCard />

      <Divider sx={{ mt: 4, mb: 4 }} component="div" />

      <ProjectIFCard />

      <Divider sx={{ mt: 4, mb: 4 }} component="div" />

      <AngelCard />

      <Divider sx={{ mt: 4, mb: 4 }} component="div" />
    </Container>
  );
  // #endregion function rendering
}

export default ExhibitMainDesktop;
