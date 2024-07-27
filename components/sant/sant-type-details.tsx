"use client"
import Hero from "@abhang/app/comps/hero/hero";
import { IAbhangList } from "@abhang/app/types/IAbhang";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import HELPERS from "@abhang/app/utils/helper";
import { Avatar, Box, Card, CardContent, CardHeader, Container, Grid, Link, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AdCard from "@abhang/app/comps/ad-card/ad-card";
import LeftCardList from "@abhang/app/comps/left-card-list.tsx/left-card-list";
import SocialButtonsComponents from "../social/social-buttons";
import { IRelatedData } from "@abhang/app/types/IRelatedData";
import { useLoading } from "@abhang/app/context/loading-context";
import { TextShareProps, UrlShare } from "@abhang/app/utils/share";
import { ISantTypes, ISantTypesList } from "@abhang/app/types/ISantTypes";
import { IContentList } from "@abhang/app/types/IContent";
import { IContentTypeList } from "@abhang/app/types/IContentType";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";

interface SantTypeDetailsComponentProps {
    santWithType: ISantTypes | undefined,
    santTypesList: ISantTypesList,
    abhangsList: IAbhangList,
    aratisList: IContentTypeList,
    currentSantTypeIndex: number
}

const initialValue: SantTypeDetailsComponentProps = {
    santWithType: undefined,
    santTypesList: [],
    abhangsList: [],
    aratisList: [],
    currentSantTypeIndex: 0
}

const SantTypeDetailsComponent = ({ santTypeId }: any) => {
    const secondGridRef = useRef(null);
    const [firstGridHeight, setFirstGridHeight] = useState('auto');
    const [page, setPage] = useState<SantTypeDetailsComponentProps>(initialValue);
    const [loading, setLoading] = useState({
        santWithType: true,
        santTypesList: true,
        abhangsList: true,
        aratisList: true
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    await getSantWithType(santTypeId),
                    await getRelatedData(),
                ]).then((value: [ISantTypes, IRelatedData]) => {
                    setPage(prevState => ({
                        ...prevState,
                        santWithType: value[0] || undefined,
                        santTypesList: value[1]?.santTypes,
                        abhangsList: value[1]?.abhangs,
                        aratisList: value[1]?.aratis
                    }));
                }).finally(() => {
                    setLoading(prevState => ({
                        ...prevState,
                        santWithType: false,
                        santTypesList: false,
                        abhangsList: false,
                        aratisList: false
                    }))
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const secondGrid = secondGridRef.current;

        if (secondGrid) {
          const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
              const height = entry.contentRect.height;
              setFirstGridHeight(`${height}px`);
            }
          });
    
          resizeObserver.observe(secondGrid);
    
          return () => {
            resizeObserver.unobserve(secondGrid);
          };
        }
    }, []);

    const getSantWithType = async (searchQuery: string = ""): Promise<ISantTypes> => {
        const { Data } = await apiCall<ISantTypes>(`${API_ENDPOINTS.GET_SANT_TYPES_BY_ID}${searchQuery}`, 'GET');
        return Data
    }

    const getRelatedData = async (): Promise<IRelatedData> => {
        const { Data } = await apiCall<IRelatedData>(`${API_ENDPOINTS.GET_ENTITY_TYPEDATA}`, 'POST', {
            "pageNumber": 0,
            "pageSize": 0,
            "parms": [
                {
                    "key": "",
                    "value": HELPERS.ApiEntityType.abhang,
                    "recoredCount": HELPERS.Page.pageSizeRecentList
                },
                {
                    "key": "",
                    "value": HELPERS.ApiEntityType.arati,
                    "recoredCount": HELPERS.Page.pageSizeRecentList
                },
                {
                    "key": "",
                    "value": HELPERS.ApiEntityType.santTypes,
                    "recoredCount": HELPERS.Page.pageSizeRecentList
                },
            ]
        });


        return Data;
    }

    const title = page?.santWithType?.name?.split(" ");

    const { setLoading: setContextLoading } = useLoading()
    const facebookClick = (item: ISantTypes) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }

    const whatsAppClick = (item: ISantTypes) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }
    const instagramClick = (item: ISantTypes) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }
    return (
        <>
            <Hero loading={loading.santWithType} title={title && title.length ? title[0] : ""} subTitle={title && title.length > 0 ? title[1] : ""} />
            <Container id="features" sx={{ py: { xs: 1, sm: 5 } }}>
                <Grid container spacing={2} alignItems={'top'}>
                    <Grid item lg={8} xs={12} key={`sant-type-gird`}
                    sx={{
                        height: firstGridHeight,
                        paddingTop:0,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                          width: '10px', 
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: '#888', 
                          borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                          backgroundColor: '#555', 
                        },
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#888 #f5f5f5', 
                      }}>
                        {
                            loading.santWithType === true ?
                                    <Skeleton variant="rectangular" width={'100%'} height={500} />
                                 :
                                <>{
                                    (page?.santWithType === undefined && !loading.santWithType) ?
                                        <div style={{ textAlign: 'center' }}>
                                            <ImageWithLoader title="abhangvani.com" width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" />
                                            <div>रेकॉर्ड सापडले नाही</div>
                                        </div>
                                        :
                                        <>
                                            <Grid item key={`abhang-typw-child-grid`} style={{height: '100%'}}>
                                                <Card sx={{  }} key={`sant-type-card`}>
                                                    {page?.santWithType !== undefined &&
                                                        <>
                                                            <CardHeader
                                                                action={
                                                                    <SocialButtonsComponents item={page?.santWithType} facebookClick={facebookClick} whatsAppClick={whatsAppClick} instagramClick={instagramClick} />
                                                                }
                                                                sx={(theme) => ({
                                                                    textAlign: 'center',
                                                                    backgroundColor: theme.palette.mode === 'light' ? 'antiquewhite' : 'primary.light'
                                                                })}
                                                            />
                                                            <CardContent style={{ padding: 0 }}>
                                                                <Grid container spacing={1} textAlign={'center'}>
                                                                    <Grid key={`new-item`} item xs={12}
                                                                    sx={(theme) => ({
                                                                        backgroundColor: theme.palette.mode === 'light' ? 'antiquewhite' : 'primary.light'
                                                                    })}>
                                                                        <Typography
                                                                            variant="h1"
                                                                            sx={{
                                                                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                                                            }}
                                                                        >
                                                                            {`⭑माहिती⭑`}
                                                                        </Typography>
                                                                        <Box>
                                                                            {page?.santWithType === undefined ?
                                                                                <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 30 }}>
                                                                                    <ImageWithLoader title="abhangvani.com" width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" />
                                                                                    <div>अभंग सापडला नाही , खालील अभंग पहा !</div>
                                                                                </div> :
                                                                                <div id="abhang-content"
                                                                                    style={{ padding: 20 }}
                                                                                    dangerouslySetInnerHTML={{ __html: page?.santWithType?.description }}
                                                                                />
                                                                            }
                                                                        </Box>
                                                                        <Typography
                                                                            variant="h1"
                                                                            sx={{
                                                                                marginTop: '16px',
                                                                                marginBottom:'10px',
                                                                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                                                            }}
                                                                        >
                                                                            {`⭑ संत ⭑`}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid key={`new-item`} item xs={12} marginTop={2}>
                                                                    <Grid container columnSpacing={1} rowSpacing={1} justifyContent="center" padding= '10px'>
                                                                        {(page?.santWithType?.sants)?.map((sant, santIndex) => (
                                                                            <Grid item key={`${sant.id}-sant-grid`} xs={12} sm={5} md={5} lg={5}>
                                                                                <Link style={{ textDecoration: 'none' }} href={`/sant/${sant.urlId}`}>
                                                                                    <Card sx={{
                                                                                        backgroundColor: 'antiquewhite',
                                                                                        display: 'flex', height: 60,
                                                                                        border: '1px solid #ffd7a5',
                                                                                        borderRadius: '5px',
                                                                                        padding: '7px',
                                                                                        alignItems: 'center',
                                                                                        boxShadow: '0px 0px 4px rgba(0, 0, 0, .12)',
                                                                                        margin: '0px 0px 10px 0px',

                                                                                    }}>
                                                                                        <Avatar
                                                                                            sx={{
                                                                                                alignSelf: 'center',
                                                                                                margin: '10px',
                                                                                                width: 40,
                                                                                                height: 40,
                                                                                                borderRadius: '50%',
                                                                                                backgroundColor: 'white',
                                                                                                padding: '3px',
                                                                                                border: '1px dotted orangered'
                                                                                            }}
                                                                                            alt="अभंग"
                                                                                            src={HELPERS.getDocUrl(sant?.document?.url)}
                                                                                        > </Avatar>
                                                                                        <CardContent>
                                                                                            <Typography component="div" variant="h6" style={{ color: 'black'}}>
                                                                                                {sant.name}
                                                                                            </Typography>
                                                                                        </CardContent>
                                                                                    </Card>
                                                                                </Link>
                                                                            </Grid>
                                                                        ))}
                                                                    </Grid>

                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </>
                                                    }
                                                </Card>
                                            </Grid>
                                        </>
                                }
                                </>

                        }
                    </Grid>
                    <Grid item lg={4} md={6} xs={12} ref={secondGridRef}>
                        <Grid item>
                            <AdCard sx={{ height: '100%', mb: 2 }} id={'sant-home-ad-card'} />
                        </Grid>
                        <Grid item>
                            {
                                loading.aratisList === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :

                                    <LeftCardList sx={{ height: '100%', mb: 2 }} items={page.aratisList} listTitle={"आरती संग्रह"} displayField={{
                                        name: "name",
                                        description: "shortDescription",
                                        imageUrl: "documentUrl"
                                    }} />
                            }
                        </Grid>
                        <Grid item>
                            {
                                loading.abhangsList === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :

                                    <LeftCardList sx={{ height: '100%', mb: 2 }} items={page.abhangsList} listTitle={"नक्की वाचा"} displayField={{
                                        name: "name",
                                        description: "santName",
                                        imageUrl: "abhangThumbnailUrl"
                                    }} />
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SantTypeDetailsComponent;