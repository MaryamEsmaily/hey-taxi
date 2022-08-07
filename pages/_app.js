import { CssBaseline, ThemeProvider, Zoom } from "@mui/material";
import theme from "styles/theme/theme";
import { CacheProvider } from "@emotion/react";
import cacheRtl from "utility/cacheRtlEmotion";
import "../styles/globals.css";
import {
  QueryClientProvider,
  Hydrate,
  QueryClient,
} from "@tanstack/react-query";
import reactQueryConfig from "config/reactQueryConfig";
import { useState } from "react";
import { SnackbarProvider } from "notistack";
import UserProvider from "provider/UserProvider";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: reactQueryConfig,
        },
      })
  );
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              TransitionComponent={Zoom}
            >
              <UserProvider>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </UserProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
