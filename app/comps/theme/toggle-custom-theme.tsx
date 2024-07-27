"use client";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import {
    AutoAwesomeRounded as AutoAwesomeRoundedIcon
} from '@abhang/lib/mui-icons';
import ShopIcon from '@mui/icons-material/Shop';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
interface IGlobalSettings {
    WhatsappGroupUrl: string,
    AndroidAppUrl: string
}

interface ToggleCustomThemeProps {
    buttonValue: string;
    toggleButton: (value: string) => void;
}


const ToggleCustomTheme =({
    buttonValue,
    toggleButton,
}: ToggleCustomThemeProps) =>{
    const [globalSettings, setGlobalSettings] = useState<IGlobalSettings>()
    const GetGlobalSettings = async () => {
        const { Data: Settings } = await apiCall<IGlobalSettings>(`${API_ENDPOINTS.GET_GLOBAL_SETTINGS}`, 'POST', {
            "pageNumber": 0,
            "pageSize": 0,
            "parms": []
        });

        return Settings;
    }


    useEffect(() => {
        const fetchData = async () => {
            var data = await GetGlobalSettings();
            if (data) {
                setGlobalSettings(data)
            }
        };

        fetchData();

    },[])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >

            <ToggleButtonGroup
                color="primary"
                exclusive
                value={buttonValue}
                onChange={(event: React.MouseEvent<HTMLElement>,
                    newValue: string,) => toggleButton(newValue)}
                aria-label="Platform"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton  value={'PlayStore'} href={globalSettings?.WhatsappGroupUrl || ""} target="_blank">
                    <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
                    <ShopIcon />
                </ToggleButton>
                <ToggleButton value={'WhatsApp'} href={globalSettings?.WhatsappGroupUrl || ""} target="_blank">
                    <WhatsAppIcon />
                    <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

export default ToggleCustomTheme;