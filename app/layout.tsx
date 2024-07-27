import type { Metadata } from "next";
import { Inter } from "next/font/google";
import API_ENDPOINTS from "./utils/api-endpoints";
import { AppProvider } from "@abhang/app/context/app-context";
import { Box, Divider } from "@mui/material";
import ThemeProviderComp from "./comps/theme/theme-provider-comp";
import { LoadingProvider } from "./context/loading-context";
import AppBarWrapper from "./comps/app-bar/app-bar-wrapper";
import Loading from "./comps/loading/loading";
import Footer from "./comps/footor/footer";
import HELPERS from "./utils/helper";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  applicationName: 'अभंगवाण.कॉम-Abhangwani.com',
  title: {
    default: "अभंगवाण.कॉम-Abhangwani.com",
    template: "%s - अभंगवाण.कॉम-Abhangwani.com",
  },
  openGraph: {
    url: API_ENDPOINTS.DOMAIN_BASE_URL,
  },
  description: HELPERS.defaultMeta.description,
};


export default function RootLayout({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <meta property='fb:app_id' content="1914971988945945" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/assets/favicons/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <AppProvider>
          <ThemeProviderComp>
            <LoadingProvider>
              <AppBarWrapper />
              <Box sx={{ bgcolor: 'background.default' }} id={'abhang-box'}>
                {children}
                <Loading />
                <Divider />
                <Footer />
              </Box>
            </LoadingProvider>
          </ThemeProviderComp>
        </AppProvider>
      </body>
    </html>
  );
}
