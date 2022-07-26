import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "styles/theme/theme";
import { CacheProvider } from "@emotion/react";
import cacheRtl from "utility/cacheRtlEmotion";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
