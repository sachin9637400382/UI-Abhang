"use client"
import Hero from "@abhang/app/comps/hero/hero";
import { IAbhangList } from "@abhang/app/types/IAbhang";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import { Avatar, Card, CardContent, CardHeader, Container, Grid, Link, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AdCard from "@abhang/app/comps/ad-card/ad-card";
import LeftCardList from "@abhang/app/comps/left-card-list.tsx/left-card-list";
import HELPERS from "@abhang/app/utils/helper";
import SocialButtonsComponents from "@abhang/components/social/social-buttons";
import { IContentWithType } from "@abhang/app/types/IContentWithType";
import { IRelatedData } from "@abhang/app/types/IRelatedData";
import { useLoading } from "@abhang/app/context/loading-context";
import { TextShareProps, UrlShare } from "@abhang/app/utils/share";
import { IContentType, IContentTypeList } from "@abhang/app/types/IContentType";
import { ISantTypesList } from "@abhang/app/types/ISantTypes";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";

interface AbhangDetatilsComponentProps {
    aratiDetails: IContentType | undefined,
    santTypesList: ISantTypesList,
    abhangsList: IAbhangList,
    aratisList: IContentTypeList,
    totalRecords: number,
    pageNumber: number,
    pageSize: number,
    currentAratiIndex: number
}

const initialValue: AbhangDetatilsComponentProps = {
    aratiDetails: undefined,
    santTypesList: [],
    abhangsList: [],
    aratisList: [],
    totalRecords: 0,
    pageNumber: 1,
    pageSize: HELPERS.Page.pageSize,
    currentAratiIndex: 0
}

const AratiDetailsComponent = ({ aratiTypeId, aratiId }: any) => {
    const secondGridRef = useRef(null);
    const [firstGridHeight, setFirstGridHeight] = useState('auto');
    const [page, setPage] = useState<AbhangDetatilsComponentProps>(initialValue);
    const [loading, setLoading] = useState({
        aratiDetails: true,
        santTypesList: true,
        abhangsList: true,
        aratisList: true
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    await getAratiDetails(aratiTypeId),
                    await getRelatedData(),
                ]).then((value: [IContentType, IRelatedData]) => {
                    var index = value[0]?.contents.findIndex((item) => item.urlId === aratiId);
                    setPage(prevState => ({
                        ...prevState,
                        aratiDetails: value[0] || undefined,
                        currentAratiIndex: index,
                        santTypesList: value[1].santTypes,
                        abhangsList: value[1].abhangs,
                        aratisList: value[1].aratis
                    }));
                }).finally(() => {
                    setLoading(prevState => ({
                        ...prevState,
                        aratiDetails: false,
                        santTypesList: false,
                        abhangsList: false,
                        aratisList: false
                    }))
                });
            } catch (error) {
                
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

    const getAratiDetails = async (aratiContetnTypeId: string): Promise<IContentType> => {
        const { Data } = await apiCall<IContentType>(`${API_ENDPOINTS.GET_CONTENT_TYPE_BY_URLID}${aratiContetnTypeId}`, 'GET');
        return Data;
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
                    "value": HELPERS.ApiEntityType.abhang,
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

    const { setLoading: setContextLoading } = useLoading()
    const facebookClick = (item: IContentWithType) => {
        const currentArati =  item?.contents[page.currentAratiIndex];
        UrlShare({ message: `${HELPERS.getShareUrl(currentArati.click)}`, setLoading: setContextLoading } as TextShareProps)
    }
    const whatsAppClick = (item: IContentWithType) => {
        const currentArati =  item?.contents[page.currentAratiIndex];
        UrlShare({ message: `${HELPERS.getShareUrl(currentArati.click)}`, setLoading: setContextLoading } as TextShareProps)
    }
    const instagramClick = (item: IContentWithType) => {
        const currentArati =  item?.contents[page.currentAratiIndex];
        UrlShare({ message: `${HELPERS.getShareUrl(currentArati.click)}`, setLoading: setContextLoading } as TextShareProps)
    }

    return (
        <>
            <Hero loading={loading.aratiDetails} title={`⭑${page.aratiDetails?.contents[page.currentAratiIndex]?.name ?? page.aratiDetails?.name}⭑`} subTitle={""} />
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
                            loading.aratiDetails === true ? <Skeleton variant="rectangular" width={'100%'} height={500} /> :
                                <>{
                                    (page?.aratiDetails === undefined && !loading.aratiDetails) ?
                                        <div style={{ textAlign: 'center' }}>
                                            <ImageWithLoader  width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" title={""} />
                                            <div>रेकॉर्ड सापडले नाही</div>
                                        </div>
                                        :
                                        <>
                                            <Grid item key={`abhang-card-child-grid`} >
                                                <Card key={`sant-type-card`} >
                                                    {page?.aratiDetails !== undefined &&
                                                        <>
                                                            <CardHeader
                                                                action={
                                                                    <SocialButtonsComponents item={page.aratiDetails} facebookClick={facebookClick} whatsAppClick={whatsAppClick} instagramClick={instagramClick} />
                                                                }
                                                                sx={(theme) => ({
                                                                    textAlign: 'center',
                                                                    backgroundColor: theme.palette.mode === 'light' ? 'antiquewhite' : 'primary.light'
                                                                })}
                                                            />
                                                            <CardContent style={{ padding: 0 }}>
                                                                <Grid container spacing={1} textAlign={'center'}>
                                                                    <Grid key={`new-item`} item xs={12} sx={(theme) => ({
                                                                        backgroundColor: theme.palette.mode === 'light' ? 'antiquewhite' : 'primary.light'
                                                                    })}>
                                                                      
                                                                    <ImageWithLoader
                                                                        style={{
                                                                            borderRadius: '50%'
                                                                        }}
                                                                        alt={page?.aratiDetails.name || ""}
                                                                        title={page?.aratiDetails.name}
                                                                        src={HELPERS.getDocUrl(page.aratiDetails?.contents[page.currentAratiIndex]?.document?.url ?? page.aratiDetails?.document?.url)}
                                                                        height={220}
                                                                        width={220}
                                                                    />
                                                                        <Typography
                                                                            variant="h1"
                                                                            sx={{
                                                                                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                                                                marginTop: '16px'
                                                                            }}
                                                                        >
                                                                            {page?.aratiDetails?.name ?? ""}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="h2"
                                                                            sx={{
                                                                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                                                                marginTop: '16px'
                                                                            }}
                                                                        >
                                                                            {`⭑ ${page.aratiDetails?.contents[page.currentAratiIndex]?.name ?? ""} ⭑`}
                                                                        </Typography>

                                                                        {page.currentAratiIndex === -1 ?
                                                                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                                                                <ImageWithLoader width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" title={"abhangvani.com"} />
                                                                                <div>आरती सापडली  नाही , खालील आरती पहा !</div>
                                                                            </div> :
                                                                               <>{
                                                                                page?.aratiDetails?.contents[page.currentAratiIndex].isFilrUrl === true ?
                                                                                    <>
                                                                                        <object style={{ margin: 10 }} width="100%" height="794px" data={decodeURIComponent(page?.aratiDetails?.contents[page.currentAratiIndex].content)} type="application/pdf"> </object>
                                                                                    </>
                                                                                    :  < div id="abhang-content" style={{ padding: 20 }}
                                                                                    dangerouslySetInnerHTML={{ __html: page?.aratiDetails?.contents[page.currentAratiIndex].content }}
                                                                                />
                                                                            }
                                                                            </>
    
                                                                           
                                                                        }
                                                                        <Typography
                                                                            variant="h1"
                                                                            sx={{
                                                                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                                                                marginTop: '16px',
                                                                                marginBottom: '10px'
                                                                            }}
                                                                        >
                                                                            {`⭑संबंधीत आरती ⭑`}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid key={`new-item`} item xs={12} marginTop={2}>

                                                                        <Grid container columnSpacing={1} rowSpacing={1} justifyContent="center" marginTop={3} padding={'10px'}>
                                                                            {(page?.aratiDetails.contents)?.map((content, contentIndex) => (
                                                                                <Grid item key={`${content.id}-abhang-grid`} xs={12} sm={5} md={5} lg={5}>
                                                                                    <Link style={{ textDecoration: 'none' }} href={content.click}>
                                                                                        <Card sx={{
                                                                                            backgroundColor: 'antiquewhite',
                                                                                            display: 'flex',
                                                                                            height: 60,
                                                                                            border: '1px solid #ffd7a5',
                                                                                            borderRadius: '5px',
                                                                                            alignItems: 'center',
                                                                                            boxShadow: '0px 0px 4px rgba(0, 0, 0, .12)',
                                                                                            margin: '0px 0px 10px 0px',
                                                                                            color: 'black'

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
                                                                                                    border: '1px dotted orangered',
                                                                                                    color: 'black'
                                                                                                }}
                                                                                                alt="अभंग"
                                                                                            >  <Typography variant="h5" style={{ color: 'black' }}>{HELPERS.convertToMarathiNumber(contentIndex)} </Typography>
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
                                                                                                    {content.name}
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

                                    <LeftCardList moreHref="/articals/aratis" sx={{ height: '100%', mb: 2 }} items={page.aratisList} listTitle={"✨आरती संग्रह"} displayField={{
                                        name: "name",
                                        description: "shortDescription",
                                        imageUrl: "documentUrl"
                                    }} />
                            }
                        </Grid>
                        <Grid item>
                            {
                                loading.abhangsList === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :

                                    <LeftCardList moreHref="/abhangs" sx={{ height: '100%', mb: 2 }} items={page.abhangsList} listTitle={"✔️ नक्की वाचा"} displayField={{
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

export default AratiDetailsComponent;