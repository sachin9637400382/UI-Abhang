"use client";
import AppAppBar from '@abhang/app/comps/app-bar/app-bar'
import { useApp } from "@abhang/app/context/app-context";

const AppBarWrapper = () => {
    const { app, setApp } = useApp();

    const toggleTheme = () => {
        setApp({ mode: (app.mode === 'dark' ? 'light' : 'dark') });
    };

    return (
        <AppAppBar mode={app.mode} toggleColorMode={toggleTheme} />
    )
}
export default AppBarWrapper;