
'use client'
import Hero from "@abhang/app/comps/hero/hero";
import { IContentTypeList } from "@abhang/app/types/IContentType";
import { IRelatedData } from "@abhang/app/types/IRelatedData";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import HELPERS from "@abhang/app/utils/helper";
import { Container, Grid, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AratiItem from "./arati-items";
import Image from "next/image";
import MyButton from "@abhang/lib/button";
import AdCard from "@abhang/app/comps/ad-card/ad-card";
import { IContentWithTypeList } from "@abhang/app/types/IContentWithType";
import LeftCardList from "@abhang/app/comps/left-card-list.tsx/left-card-list";
import { ISantTypesList } from "@abhang/app/types/ISantTypes";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";

interface AratisListComponentProps {
    aratisList: IContentTypeList,
    santTypesWithSants: ISantTypesList;
    granthsList: IContentTypeList
    totalRecords: number,
    searchQuery: string
    pageNumber: number,
    pageSize: number,
}

const initialValue: AratisListComponentProps = {
    aratisList: [],
    santTypesWithSants: [],
    granthsList: [],
    totalRecords: 0,
    searchQuery: "",
    pageNumber: 1,
    pageSize: HELPERS.Page.pageSize,
}
const AratisListComponent = () => {
    const secondGridRef = useRef(null);
    const [firstGridHeight, setFirstGridHeight] = useState('auto');
    const [page, setPage] = useState<AratisListComponentProps>(initialValue);
    const [loading, setLoading] = useState({
        aratisList: true,
        granthsList: true,
        santTypesWithSants: true
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    await getAratis(page.pageNumber, page.pageSize, page.searchQuery),
                    await getRelatedData()
                ]).then((value: [{ "list": IContentTypeList; count: number; }, IRelatedData,]) => {
                    setPage(prevState => ({
                        ...prevState,
                        aratisList: value[0].list,
                        totalRecords: value[0].count,
                        santTypesWithSants: value[1].santTypes,
                        granthsList: value[1].granths,
                    }));
                }).finally(() => {
                    setLoading(prevState => ({
                        ...prevState,
                        aratisList: false,
                        granthsList: false,
                        santTypesWithSants: false
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

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAratis(page.pageNumber, page.pageSize, page.searchQuery);
            if (result) {
                setPage(prevState => ({
                    ...prevState,
                    aratisList: result.list,
                    totalRecords: result.count
                }));
            }
        }
        fetchData();
    }, [page.searchQuery, page.pageSize]);

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
                }
            ]
        });


        return Data;
    }

    const getAratis = async (pageNumber: number, pageSize: number, searchQuery: string): Promise<{ "list": IContentTypeList, count: number }> => {
        const { Data, TotalRecordCount } = await apiCall<IContentTypeList>(`${API_ENDPOINTS.GET_ARATIS_CONTENT_TYPE}`, 'POST', {
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "parms": searchQuery === "" ? [] : [{
                "Key": "",
                "Value": searchQuery
            }]
        });
        return { list: Data, count: TotalRecordCount }
    }

    const updateSearchQuery = (searchQuery: string) => {
        setPage(prevState => ({
            ...prevState,
            searchQuery: searchQuery
        }));
    }

    const onNextPageClick = () => {
        var pageSize = page.pageSize * 2;
        setPage(prevState => ({
            ...prevState,
            pageSize: pageSize
        }));
    }


    return (
        <><Hero loading={loading.aratisList} searchQuery={page.searchQuery} updateSearchQuery={updateSearchQuery} isSearchEnable={true} title={"आरती"} subTitle={"संग्रह"} />
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
                      }}
                    >
                        {
                            loading.aratisList === true ? <Skeleton variant="rectangular" width={'100%'} height={500} /> :
                                <>
                                    {
                                        page?.aratisList.length <= 0 && !loading.aratisList ?
                                            <div style={{ textAlign: 'center' }}>
                                                <ImageWithLoader width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" title={""}/>
                                                <div>रेकॉर्ड सापडले नाही</div>
                                            </div>
                                            :
                                            <>{(page?.aratisList).map((arati, santIndex) => (
                                                <Grid id="sant-type-gird" item key={`${santIndex}-sant-type`} marginBottom={5}>
                                                    <AratiItem aratiWithType={arati} />
                                                </Grid>
                                            ))}
                                                {page.totalRecords > page?.aratisList.length && <Grid id="sant-type-gird" item key={`more-sant-type`} marginBottom={2} textAlign={'center'}>
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
                                loading.santTypesWithSants === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :
                                    <LeftCardList sx={{ height: '100%', mb: 2 }} items={page.santTypesWithSants} listTitle={"✨ पंथ आणि संप्रदाय"} displayField={{
                                        name: "santTypeName",
                                        description: "discription",
                                        imageUrl: ""
                                    }} />
                            }
                        </Grid>
                        <Grid item>
                            {
                                loading.granthsList === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :

                                    <LeftCardList sx={{ height: '100%', mb: 2 }} items={page.granthsList} listTitle={"📜 ग्रंथ"} displayField={{
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

export default AratisListComponent;