"use client"
import { Container, Grid, Skeleton } from "@mui/material";
import ImageSlider from "../slider/image-slider";
import { useEffect, useState } from "react";
import OurFeatureComponent from "./our-features";
import Highlights from "./highlights";
import QuickAratis from "./quick-aratis";

const HomeComponent = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false)
    });

    return (
        <>
            <Container id="features" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 10, sm: 15 },
                pb: { xs: 1, sm: 1 },
            }}
            >
                <Grid container alignItems={'top'}>
                    {loading ? <Skeleton variant="rectangular" width={'100%'} height={500} /> :
                        <ImageSlider />
                    }
                    <OurFeatureComponent />
                </Grid>
            </Container>
            <Highlights />
            <QuickAratis />
        </>
    );
}

export default HomeComponent;