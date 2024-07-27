"use client";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import getLPTheme from "./theme";
import { useApp } from "@abhang/app/context/app-context";
import { useState } from "react";
import ToggleCustomTheme from "./toggle-custom-theme";
const defaultTheme = createTheme({});




interface LayoutProps {
    children: React.ReactNode;
}

const ThemeProviderComp = ({ children }: LayoutProps) => {
    const { app } = useApp()
    const [button, setButtonToogle] = useState('');
    const LPtheme = createTheme(getLPTheme(app.mode));
    return (

        <ThemeProvider theme={app.showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            {children}
            <ToggleCustomTheme
                buttonValue={button}
                toggleButton={setButtonToogle}
            />
        </ThemeProvider>
    )
}
export default ThemeProviderComp;