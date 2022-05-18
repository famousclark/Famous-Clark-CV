//import "../css/style.css";
import "../css/form.css";

import * as React from "react";

import PropTypes from "prop-types";

import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Paper from "@mui/material/Paper";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
function MyApp(
  props /*{
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}*/
) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  //console.log({ pageProps: pageProps });

  return (
    <>
      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Famous Clark</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Paper sx={{ minHeight: "100vh" }}>
              <Component {...pageProps} />
            </Paper>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
