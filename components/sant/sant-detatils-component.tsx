'use client'
import AdCard from "@abhang/app/comps/ad-card/ad-card";
import Hero from "@abhang/app/comps/hero/hero";
import LeftCardList from "@abhang/app/comps/left-card-list.tsx/left-card-list";
import { IAbhangList } from "@abhang/app/types/IAbhang";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import { Avatar, Box, Card, CardContent, CardHeader, Container, Grid, Link, Skeleton, SxProps, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SocialButtonsComponents from "../social/social-buttons";
import HELPERS from "@abhang/app/utils/helper";
import { IRelatedData } from "@abhang/app/types/IRelatedData";
import { TextShareProps, UrlShare } from "@abhang/app/utils/share";
import { useLoading } from "@abhang/app/context/loading-context";
import { ISant } from "@abhang/app/types/ISant";
import { ISantTypes, ISantTypesList } from "@abhang/app/types/ISantTypes";
import { IContentType, IContentTypeList } from "@abhang/app/types/IContentType";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";

interface SantDetailsComponentProps {
    santDetails: ISant | undefined,
    santTypes: ISantTypesList,
    abhangs: IAbhangList,
    aratis: IContentTypeList
}

interface SantDetailsProps {
    santDetails: ISant,
    sx?: SxProps
}

const initialValue: SantDetailsComponentProps = {
    santDetails: undefined,
    santTypes: [],
    abhangs: [],
    aratis: [],
}

const SantDetailsItem = ({ santDetails, sx }: SantDetailsProps) => {
    const {setLoading} = useLoading()
    const facebookClick = (item: ISant) => {
      UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading } as TextShareProps)
    }
  
    const whatsAppClick = (item: ISant) => {
      UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading } as TextShareProps)
    }
    const instagramClick = (item: ISant) => {
      UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading } as TextShareProps)
    }

    return (
        <Card sx={{}} key={`sant-details-card`}>
            <CardHeader
                sx={(theme) => ({
                    textAlign: 'center',
                    backgroundColor: theme.palette.mode === 'light' ? 'antiquewhite' : 'primary.light'
                })}
                action={
                    <SocialButtonsComponents item={santDetails} facebookClick={facebookClick} whatsAppClick={whatsAppClick} instagramClick={instagramClick} />
                }
            />
            <CardContent style={{ padding: 0 }}>
                <Grid container spacing={1} textAlign={'center'}>
                    <Grid
                        key={`new-item`}
                        item xs={12}
                        sx={(theme) => ({
                            backgroundColor: theme.palette.mode === 'light' ? 'antiquewhite' : 'primary.light'
                        })}>
                        <ImageWithLoader
                            style={{
                                borderRadius: '50%'
                            }}

                            alt={santDetails?.name || ""}
                            title={santDetails?.name}
                            src={HELPERS.getDocUrl(santDetails?.document?.url)}
                            height={220}
                            width={220}
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                marginTop: '16px'
                            }}
                        >
                            {`⭑माहिती⭑`}
                        </Typography>
                        <Box
                            style={{ padding: 20 }}
                            dangerouslySetInnerHTML={{ __html: santDetails?.description ?? "" }}
                        />

                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                marginTop: '16px',
                                marginBottom: '10px'
                            }}
                        >
                            {`⭑अभंग⭑`}
                        </Typography>
                    </Grid>
                    <Grid key={`new-item`} item xs={12} marginTop={2}>

                        <Grid container columnSpacing={1} rowSpacing={1} justifyContent="center" marginTop={3} padding={'10px'}>
                            {(santDetails.abhangs)?.map((abhang, santIndex) => (
                                <Grid item key={`${abhang.id}-abhang-grid`} xs={12} sm={5} md={5} lg={5}>
                                    <Link style={{ textDecoration: 'none' }} href={`/abhangs/${santDetails?.urlId}/${abhang.urlId}`}>
                                        <Card sx={{
                                            backgroundColor: 'antiquewhite',
                                            display: 'flex',
                                            height: 60,
                                            border: '1px solid #ffd7a5',
                                            borderRadius: '5px',
                                            alignItems: 'center',
                                            boxShadow: '0px 0px 4px rgba(0, 0, 0, .12)',
                                            margin: '0px 0px 10px 0px'
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
                                            >  <Typography style={{ color: 'black'}} variant="h5" color="text.secondary">{HELPERS.convertToMarathiNumber(santIndex)} </Typography>
                                            </Avatar>
                                            <CardContent sx={{
                                                textAlign: 'left',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                padding: '0 !important',
                                                color: 'black'
                                                
                                            }}>
                                                <span>
                                                    {abhang.name}
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

const SantDetailsComponent = ({ santName }: any) => {
    const secondGridRef = useRef(null);
    const [firstGridHeight, setFirstGridHeight] = useState('auto');
    const [page, setPage] = useState<SantDetailsComponentProps>(initialValue);
    const [loading, setLoading] = useState({
        santDetails: true,
        santTypes: true,
        abhangs: true,
        aratis: true,
        granths: true
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    await getSantDetails(santName),
                    await getRelatedData(),
                ]).then((value: [ISant,IRelatedData]) => {
                    setPage(prevState => ({
                        ...prevState,
                        santDetails: value[0] || undefined,
                        santTypes: value[1].santTypes,
                        abhangs: value[1].abhangs,
                        aratis: value[1].aratis
                    }));
                }).finally(() => {
                    setLoading(prevState => ({
                        ...prevState,
                        santDetails: false,
                        santTypes: false,
                        abhangs: false,
                        aratis: false
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


    const getSantDetails = async (santName: string): Promise<ISant> => {
        const { Data: SantDetails } = await apiCall<ISant>(`${API_ENDPOINTS.GET_SANT_DETAILS_BY_NAME}${santName}`, 'GET');
        return SantDetails;
    }

    const getRelatedData = async (): Promise<IRelatedData> => {
        const { Data } = await apiCall<IRelatedData>(`${API_ENDPOINTS.GET_ENTITY_TYPEDATA}`, 'POST', {
            "pageNumber": 0,
            "pageSize": 0,
            "parms": [
                {
                    "key": "",
                    "value": HELPERS.ApiEntityType.santTypes,
                    "recoredCount": HELPERS.Page.pageSizeRecentList
                },
                {
                    "key": "",
                    "value": HELPERS.ApiEntityType.grnth,
                    "recoredCount": HELPERS.Page.pageSizeRecentList
                },
                {
                    "key": "",
                    "value": HELPERS.ApiEntityType.arati,
                    "recoredCount": HELPERS.Page.pageSizeRecentList
                }
            ]
        });

        return Data;
    }
    
    return (
        <>

            <Hero loading={loading.santDetails} title={`⭑${page?.santDetails?.name ?? ""}⭑`} subTitle={""} />
            <Container id="sant-details-container" sx={{ py: { xs: 1, sm: 5 } }}>
                <Grid container spacing={2} alignItems={'top'}>
                    <Grid item lg={8} xs={12} key={`sant-details-gird`}
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
                            loading.santDetails === true ? <Skeleton variant="rectangular" width={'100%'} height={500} />
                                :
                                <>{
                                    page?.santDetails === undefined && !loading.santDetails ?
                                        <div style={{ textAlign: 'center' }}>
                                            <ImageWithLoader title="abhangvani.com" width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" />
                                            <div>रेकॉर्ड सापडले नाही</div>
                                        </div>
                                        :
                                        <>
                                            {page?.santDetails && <Grid style={{height: '100%'}} item key={`sant-details-item`}>
                                                <SantDetailsItem sx={{ height: '100%', mb: 2, }} santDetails={page?.santDetails} />
                                            </Grid>
                                            }
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
                                loading.aratis === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :
                                    <LeftCardList sx={{ height: '100%', mb: 2 }} items={page.aratis} listTitle={"✨आरती संग्रह"} displayField={{
                                        name: "name",
                                        description: "shortDescription",
                                        imageUrl: "documentUrl"
                                    }} />
                            }
                        </Grid>
                        <Grid item>
                            {
                                loading.abhangs === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :
                                    <LeftCardList sx={{ height: '100%', mb: 2 }} items={page.abhangs} listTitle={"💡नक्की वाचा"} displayField={{
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

export default SantDetailsComponent;