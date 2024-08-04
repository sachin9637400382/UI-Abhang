'use client'
import AdCard from "@abhang/app/comps/ad-card/ad-card";
import Hero from "@abhang/app/comps/hero/hero";
import LeftCardList from "@abhang/app/comps/left-card-list.tsx/left-card-list";
import { IContentType, IContentTypeList } from "@abhang/app/types/IContentType";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import { Container, Grid, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MyButton from "@abhang/lib/button";
import SantTypeWithSantsItem from "./sant-type-item";
import HELPERS from "@abhang/app/utils/helper";
import { IRelatedData } from "@abhang/app/types/IRelatedData";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";
import { ISantTypesList } from "@abhang/app/types/ISantTypes";

interface SantListComponentProps {
    santTypesWithSants: ISantTypesList;
    aratis: IContentTypeList,
    granths: IContentTypeList
    totalRecords: number,
    searchQuery: string
    pageNumber: number,
    pageSize: number,
}

const initialValue: SantListComponentProps = {
    santTypesWithSants: [],
    aratis: [],
    granths: [],
    totalRecords: 0,
    searchQuery: "",
    pageNumber: 1,
    pageSize: HELPERS.Page.pageSize,
}

const SantListComponent = () => {
    const secondGridRef = useRef(null);
    const [firstGridHeight, setFirstGridHeight] = useState('auto');
    const [page, setPage] = useState<SantListComponentProps>(initialValue);
    const [loading, setLoading] = useState({
        santWithType: true,
        arati: true,
        granths: true
    })

    useEffect(() => {
        const fetchData = async () => {
            try {

                await Promise.all([
                    await getSantTypes(page.pageNumber, page.pageSize, ""),
                    await getRelatedData(),
                ]).then((value: [{
                    list: ISantTypesList;
                    count: number;
                }, IRelatedData]) => {
                    setPage(prevState => ({
                        ...prevState,
                        santWithAbhangsList: value[0].list,
                        totalRecords: value[0].count,
                        aratis: value[1].aratis,
                        granths: value[1].granths,

                    }));
                }).finally(() => {
                    setLoading(prevState => ({
                        ...prevState,
                        santWithType: false,
                        arati: false,
                        granths: false
                    }))
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        console.log("called -1")
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

    useEffect(() => {
        const fetchData = async () => {
            getSantTypes(page.pageNumber, page.pageSize, page.searchQuery).then((result) => {

                if (result) {
                    setPage(prevState => ({
                        ...prevState,
                        santTypesWithSants: result.list,
                        totalRecords: result.count
                    }));
                }

                setLoading(prevState => ({
                    ...prevState,
                    santWithType: true
                }))
            }).finally(() => {
                setLoading(prevState => ({
                    ...prevState,
                    santWithType: false
                }))
            });

        }
        fetchData();
    }, [page.searchQuery, page.pageSize]);

    const updateSearchQuery = (searchQuery: string) => {
        setPage(prevState => ({
            ...prevState,
            searchQuery: searchQuery
        }));
    }

    const onNextPageClick = () => {
        setPage(prevState => ({
            ...prevState,
            pageSize: HELPERS.Page.pageSize + HELPERS.Page.pageSize
        }));
        setLoading(prevState => ({
            ...prevState,
            santWithType: true
        }))
    }

    const getSantTypes = async (pageNumber: number, pageSize: number, searchQuery: string): Promise<{ "list": ISantTypesList, count: number }> => {
        const { Data, TotalRecordCount } = await apiCall<ISantTypesList>(`${API_ENDPOINTS.GET_SANT_TYPES}`, 'POST', {
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "parms": searchQuery === "" ? [] : [{
                "Key": "",
                "Value": searchQuery
            }]
        });
        return { list: Data, count: TotalRecordCount }
    }

    const getRelatedData = async (): Promise<IRelatedData> => {
        const { Data } = await apiCall<IRelatedData>(`${API_ENDPOINTS.GET_ENTITY_TYPEDATA}`, 'POST', {
            "pageNumber": 0,
            "pageSize": 0,
            "parms": [
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
            <Hero loading={loading.santWithType} searchQuery={page?.searchQuery} updateSearchQuery={updateSearchQuery} isSearchEnable={true} title={"पंथ"} subTitle={"आणि संप्रदाय"} />
            <Container id="features" sx={{ py: { xs: 1, sm: 5 } }}>
                <Grid container columnSpacing={2} alignItems={'top'}>
                    <Grid item lg={8} xs={12} key={`sant-type-gird`}
                        sx={{
                            height: firstGridHeight,
                            paddingTop: 0,
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
                        }}
                    >

                        {
                            loading?.santWithType === true ? <Skeleton variant="rectangular" width={'100%'} height={500} />
                                :
                                <>
                                    {
                                        page?.santTypesWithSants.length <= 0 && !loading.santWithType ?
                                            <div style={{ textAlign: 'center' }}>
                                                <ImageWithLoader
                                                    width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" title={""} />
                                                <div>रेकॉर्ड सापडले नाही</div>
                                            </div>
                                            :
                                            <>{Array.isArray(page?.santTypesWithSants) && (page?.santTypesWithSants as ISantTypesList)?.map((santType, santIndex) => (
                                                <Grid item key={`${santIndex}-sant-type`} marginBottom={5}>
                                                    <SantTypeWithSantsItem santType={santType} />
                                                </Grid>
                                            ))}
                                                {page?.totalRecords > page?.santTypesWithSants.length &&
                                                    <Grid id="sant-type-gird" item key={`more-sant-type`} marginTop={1} marginBottom={2} textAlign={'center'}>
                                                        <MyButton onClick={onNextPageClick} btnText={"  लोड करा..."} />
                                                    </Grid>}
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
                                loading.arati === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :

                                    <LeftCardList moreHref="/articals/aratis" sx={{ height: '100%', mb: 2 }} items={page?.aratis} listTitle={"✨ आरती संग्रह"} displayField={{
                                        name: "name",
                                        description: "shortDescription",
                                        imageUrl: "documentUrl"
                                    }} />
                            }
                        </Grid>
                        <Grid item>
                            {
                                loading.granths === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :

                                    <LeftCardList moreHref="/abhangs" sx={{ height: '100%', mb: 2 }} items={page?.granths} listTitle={"📜 ग्रंथ"} displayField={{
                                        name: "name",
                                        description: "shortDescription",
                                        imageUrl: "documentUrl"
                                    }} />
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SantListComponent;