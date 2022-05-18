import * as React from "react";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

// #region Helper Styled Components

function HideOnScroll(props) {
  const { children, bottom } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={bottom ? "up" : "down"} in={!trigger}>
      {children}
    </Slide>
  );
}

// #endregion Helper Styled Components

function StyledBottomAppBar(props) {
  // #region function Props and variables
  const { bottom } = props;
  const pages = [
    { name: "Home", route: "/" },
    { name: "Gestalt", route: "gestalt/" },
    { name: "Tarot", route: "tarot/" },
  ];
  const settings = [/*"Profile", "Account", "Dashboard",*/ "Auth"];
  // #endregion function Props and variables

  // #region useSWR, useState, useSession
  const { data: session, status } = useSession();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // #endregion useSWR, useState, useSession

  // #region function Methods
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAuthSwap = (session) => {
    if (session) {
      return { auth: signOut, route: "./api/auth/signout", name: "Log Out" };
    } else {
      return { auth: signIn, route: "./api/auth/signin", name: "login" };
    }
  };
  // #endregion function Methods

  // #region function rendering
  return (
    <HideOnScroll bottom={bottom}>
      <AppBar
        //position="fixed"
        color="primary"
        sx={{ top: bottom ? "auto" : "", bottom: bottom ? 0 : "" }}
        enableColorOnDark
      >
        {/*=================Routing and Title===============*/}
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Famous
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.route}>
                    <Typography textAlign="center">{`| ${page.name}`}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Famous
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={page.route}>
                  <Typography textAlign="center">{`| ${page.name}`}</Typography>
                </Link>
              </Button>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Link href={handleAuthSwap(session).route}>
                  <Typography
                    color="common.white"
                    textAlign="center"
                    variant="h6"
                    sx={{
                      transition:
                        !session && status == "loading"
                          ? "all 0.2s ease-in"
                          : "all 0.2s ease-out",
                      opacity: !session && status == "loading" ? 0 : 1,
                    }}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleAuthSwap(session).auth();
                      }}
                    >
                      {handleAuthSwap(session).name}
                    </a>
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Box> */}

          {/*=================Sign In | Sign Out===============*/}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
  // #endregion function rendering
}

export default StyledBottomAppBar;
