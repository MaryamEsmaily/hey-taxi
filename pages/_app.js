import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "styles/theme/theme";
import { CacheProvider } from "@emotion/react";
import cacheRtl from "utility/cacheRtlEmotion";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
