import { Avatar, Box, Card, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { IContentTypeList } from "@abhang/app/types/IContentType";
import { useEffect, useState } from "react";
import { IRelatedData } from "@abhang/app/types/IRelatedData";
import { apiCall } from "@abhang/app/utils/fetch";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import HELPERS from "@abhang/app/utils/helper";
import Link from "next/link";

interface HighlightsProps {
    granths: IContentTypeList,
    loading: boolean;
}

const initialValue: HighlightsProps = {
    granths: [],
    loading: true
}
const items = [
    {
        icon: <SettingsSuggestRoundedIcon />,
        title: 'Adaptable performance',
        description:
            'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
    },
    {
        icon: <ConstructionRoundedIcon />,
        title: 'Built to last',
        description:
            'Experience unmatched durability that goes above and beyond with lasting investment.',
    },
    {
        icon: <ThumbUpAltRoundedIcon />,
        title: 'Great user experience',
        description:
            'Integrate our product into your routine with an intuitive and easy-to-use interface.',
    },
    {
        icon: <AutoFixHighRoundedIcon />,
        title: 'Innovative functionality',
        description:
            'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
    },
    {
        icon: <SupportAgentRoundedIcon />,
        title: 'Reliable support',
        description:
            'Count on our responsive customer support, offering assistance that goes beyond the purchase.',
    },
    {
        icon: <QueryStatsRoundedIcon />,
        title: 'Precision in every detail',
        description:
            'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
    },
];

const Highlights = () => {
    const [page, setPage] = useState<HighlightsProps>(initialValue);
    useEffect(() => {
        const fetchData = async () => {
            try {

                await Promise.all([
                    await getRelatedData(),
                ]).then((value: [IRelatedData]) => {
                    setPage(prevState => ({
                        ...prevState,
                        granths: value[0].granths,
                    }));
                }).finally(() => {
                    setPage(prevState => ({
                        ...prevState,
                        loading: false
                    }))
                });
            } catch (error) {
               
            }
        };
        fetchData();
    }, []);

    const getRelatedData = async (): Promise<IRelatedData> => {
        const { Data } = await apiCall<IRelatedData>(`${API_ENDPOINTS.GET_ENTITY_TYPEDATA}`, 'POST', {
            "pageNumber": 0,
            "pageSize": 0,
            "parms": [
                {
                    "key": HELPERS.ApiEntityType.grnth,
                    "value": HELPERS.ApiEntityType.grnth,
                    "recoredCount": 10
                }

            ]
        });

        return Data;
    }
    return (
        <>
            {
                page.loading ? <Skeleton variant="rectangular" width={'100%'} height={500} /> :
                    <Box
                        id="highlights"
                        sx={{
                            pt: { xs: 4, sm: 12 },
                            pb: { xs: 8, sm: 16 },
                            color: 'white',
                            bgcolor: '#06090a',
                            marginTop: 5
                        }}
                    >
                        <Container
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: { xs: 3, sm: 6 },
                            }}
                        >
                            <Box
                                sx={{
                                    width: { sm: '100%', md: '60%' },
                                    textAlign: { sm: 'left', md: 'center' },
                                }}
                            >
                                <Typography component="h2" variant="h4">
                                    नवीन ग्रंथ
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'grey.400' }}>
                                    आपल्याला विविध विषयांवर आधारित नवीनतम साहित्य, लेखनकृती आणि ज्ञानकोश सापडतील. ज्ञानाच्या शोधात असलेल्या प्रत्येक वाचकासाठी हा एक अनमोल खजिना आहे.
                                </Typography>
                            </Box>
                            <Grid container spacing={2.5}>
                                {page?.granths?.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Stack
                                            direction="column"
                                            color="inherit"
                                            component={Card}
                                            spacing={1}
                                            useFlexGap
                                            sx={{
                                                p: 3,
                                                height: '100%',
                                                border: '1px solid',
                                                borderColor: 'grey.800',
                                                background: 'transparent',
                                                backgroundColor: 'grey.900',
                                            }}
                                        >
                                            <Link href={item.click} style={{ textDecoration: 'none',color:'inherit' }}>
                                            <Box sx={{ opacity: '50%' }}>

                                                {item?.document?.url !== undefined ? <Avatar
                                                    src={HELPERS.getDocUrl(item?.document?.url)}>

                                                </Avatar> : <></>
                                                }
                                            </Box>
                                            <div style={{marginTop:15}}>
                                                <Typography fontWeight="medium" gutterBottom color="inherit">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'grey.400' }}  dangerouslySetInnerHTML={{ __html: item?.shortDescription ?? "" }}>
                                                    {/* {item.shortDescription}  */}
                                                </Typography>
                                            </div>
                                            </Link>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Box>
            }
        </>
    )
}

export default Highlights;