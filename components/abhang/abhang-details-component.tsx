"use client"
import Hero from "@abhang/app/comps/hero/hero";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import { Avatar, Card, CardContent, CardHeader, Container, Grid, Link, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import AdCard from "@abhang/app/comps/ad-card/ad-card";
import LeftCardList from "@abhang/app/comps/left-card-list.tsx/left-card-list";
import HELPERS from "@abhang/app/utils/helper";
import SocialButtonsComponents from "../social/social-buttons";
import { ImageShare, ImageShareProps } from "@abhang/app/utils/share";
import { useLoading } from "@abhang/app/context/loading-context";
import { ISant } from "@abhang/app/types/ISant";
import { ISantTypesList } from "@abhang/app/types/ISantTypes";
import { IContentList } from "@abhang/app/types/IContent";
import { IContentTypeList } from "@abhang/app/types/IContentType";
import { IAbhang, IAbhangList } from "@abhang/app/types/IAbhang";
import { IRelatedData } from "@abhang/app/types/IRelatedData";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";

interface AbhangDetatilsComponentProps {
    santDetails: ISant | undefined,
    santTypesList: ISantTypesList,
    abhangsList: IAbhangList,
    aratisList: IContentTypeList,
    totalRecords: number,
    pageNumber: number,
    pageSize: number,
    currentAbhangIndex: number
}

const initialValue: AbhangDetatilsComponentProps = {
    santDetails: undefined,
    santTypesList: [],
    abhangsList: [],
    aratisList: [],
    totalRecords: 0,
    pageNumber: 1,
    pageSize: HELPERS.Page.pageSize,
    currentAbhangIndex: 0
} 

const AbhangDetatilsComponent = ({ santName, abhangId }: any) => {
    const { setLoading: setContextLoading } = useLoading()
    const [page, setPage] = useState<AbhangDetatilsComponentProps>(initialValue);
    const [loading, setLoading] = useState({
        santDetails: true,
        santTypesList: true,
        abhangsList: true,
        aratisList: true
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    await getSantDetails(santName),
                    await getRelatedData(),
                ]).then((value: [ISant, IRelatedData]) => {
                    var index = value[0]?.abhangs.findIndex((item) => item.urlId === abhangId);
                    setPage(prevState => ({
                        ...prevState,
                        santDetails: value[0] || undefined,
                        currentAbhangIndex : index,
                        santTypesList: value[1].santTypes,
                        aratisList :value[1].aratis,
                        abhangsList : value[1].abhangs
                    }));
                }).finally(() => {
                    setLoading(prevState => ({
                        ...prevState,
                        santDetails: false,
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


    const facebookClick = async (santDetails: IAbhang) => {
        await ShareAbhangAsImage(santDetails)
    }
    const whatsAppClick = async (santDetails: IAbhang) => {
        await ShareAbhangAsImage(santDetails)
    }
    const instagramClick = async (santDetails: IAbhang) => {
        await ShareAbhangAsImage(santDetails)
    }

    const ShareAbhangAsImage = async (abhang: IAbhang) => {
        if (abhang) {
            const imageUrl = `${API_ENDPOINTS.API_BASE_URL}Abhangs/Abhangs/share/${abhang?.id}`;;
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const imageFile = new File([blob], 'image.jpg', { type: blob.type });
                ImageShare({ url:  `${HELPERS.getShareUrl(abhang.click)}`, file: imageFile, setLoading:setContextLoading } as ImageShareProps)

            } catch (error) {
                setContextLoading(false);
            }
        }
    }

    return (
        <>
            <Hero loading={loading?.santDetails} title={`⭑${page?.santDetails?.abhangs[page?.currentAbhangIndex]?.name ?? page?.santDetails?.name}⭑`} subTitle={""} />
            <Container id="features" sx={{ py: { xs: 1, sm: 5 } }}>
                <Grid container spacing={3} alignItems={'top'}>
                    <Grid item lg={8} xs={12} key={`sant-type-gird`}>
                        {
                            loading.santDetails === true ? <Skeleton variant="rectangular" width={'100%'} height={500} /> :
                                <>{
                                    (page?.santDetails === undefined && !loading.santDetails) ?
                                        <div style={{ textAlign: 'center' }}>
                                            <ImageWithLoader width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" title={""}/>
                                            <div>रेकॉर्ड सापडले नाही</div>
                                        </div>
                                        :
                                        <>
                                            <Grid item key={`abhang-card-child-grid`}>
                                                <Card key={`sant-type-card`}>
                                                    {page?.santDetails !== undefined &&
                                                        <>
                                                            <CardHeader
                                                                action={
                                                                    <SocialButtonsComponents item={page?.santDetails} facebookClick={facebookClick} whatsAppClick={whatsAppClick} instagramClick={instagramClick} />
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
                                                                        alt={page?.santDetails.name || ""}
                                                                        title={page?.santDetails.name}
                                                                        src={HELPERS.getDocUrl(page.santDetails?.document?.url)}
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
                                                                            {page?.santDetails?.name ?? ""}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="h2"
                                                                            sx={{
                                                                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                                                                marginTop: '16px'
                                                                            }}
                                                                        >
                                                                            {`⭑ ${page.santDetails?.abhangs[page.currentAbhangIndex]?.name ?? ""} ⭑`}
                                                                        </Typography>

                                                                        {page.currentAbhangIndex === -1 ?
                                                                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                                                               <ImageWithLoader width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" title={"abhangvani.com"}/>
                                                                                <div>अभंग सापडला नाही , खालील अभंग पहा !</div>
                                                                            </div> :
                                                                            < div id="abhang-content" style={{ padding: 20 }}
                                                                                dangerouslySetInnerHTML={{ __html: page?.santDetails?.abhangs[page.currentAbhangIndex].content }}
                                                                            />
                                                                        }
                                                                        <Typography
                                                                            variant="h1"
                                                                            sx={{
                                                                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                                                                marginTop: '16px',
                                                                                marginBottom:'10px'
                                                                            }}
                                                                        >
                                                                            {`⭑संबंधीत अभंग ⭑`}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid key={`new-item`} item xs={12} marginTop={2}>
                                                                        
                                                                        <Grid container columnSpacing={1} rowSpacing={1} justifyContent="center" marginTop={3} padding={'10px'}>
                                                                            {(page?.santDetails.abhangs)?.map((abhang, santIndex) => (
                                                                                <Grid item key={`${abhang.id}-abhang-grid`} xs={12} sm={5} md={5} lg={5}>
                                                                                    <Link style={{ textDecoration: 'none' }} href={`/abhangs/${page?.santDetails?.urlId}/${abhang.urlId}`}>
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
                                                                                            >  <Typography variant="h5" style={{ color: 'black'}}>{HELPERS.convertToMarathiNumber(santIndex)} </Typography>
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
                                                        </>
                                                    }
                                                </Card>
                                            </Grid>
                                        </>
                                }
                                </>

                        }
                    </Grid>
                    <Grid item lg={4} md={6} xs={12} >
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

export default AbhangDetatilsComponent;