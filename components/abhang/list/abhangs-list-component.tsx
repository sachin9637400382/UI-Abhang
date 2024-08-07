'use client'
import MyButton from "@abhang/lib/button";
import { Container, Grid, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { apiCall } from "@abhang/app/utils/fetch";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import AdCard from "@abhang/app/comps/ad-card/ad-card";
import LeftCardList from "@abhang/app/comps/left-card-list.tsx/left-card-list";
import Hero from "@abhang/app/comps/hero/hero";
import Image from "next/image";
import { IContentTypeList } from "@abhang/app/types/IContentType";
import SantAbhangsItem from "./abhangs-items";
import HELPERS from "@abhang/app/utils/helper";
import { IRelatedData } from "@abhang/app/types/IRelatedData";
import { IAbhangList } from "@abhang/app/types/IAbhang";
import { ISantList } from "@abhang/app/types/ISant";
import QuickAratis from "@abhang/components/home/quick-aratis";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";

interface SantAbhangClientComponentProps {
    sants: ISantList;
    aratis: IContentTypeList,
    granths: IContentTypeList
    totalRecords: number,
    searchQuery: string
    pageNumber: number,
    pageSize: number,
}

const initialValue = {
    sants: [],
    aratis: [],
    granths: [],
    totalRecords: 0,
    searchQuery: "",
    pageNumber: 1,
    pageSize: HELPERS.Page.pageSize,
} as SantAbhangClientComponentProps;
 
const SantAbhangListComponent = () => {
    const secondGridRef = useRef(null);
    const [firstGridHeight, setFirstGridHeight] = useState('auto');
    const [page, setPage] = useState<SantAbhangClientComponentProps>(initialValue);
    const [loading, setLoading] = useState({
        sants: true,
        arati: true,
        granths: true
    })

    useEffect(() => {
        const fetchData = async () => {
            try {

                await Promise.all([
                    await getAbhangs(page.pageNumber, page.pageSize, ""),
                    await getRelatedData()
                ]).then((value: [{
                    list: ISantList;
                    count: number;
                }, IRelatedData]) => {
                    setPage(prevState => ({
                        ...prevState,
                        sants: value[0].list,
                        totalRecords: value[0].count,
                        granths: value[1].granths,
                        aratis: value[1].aratis,
                    }));
                }).finally(() => {
                    setLoading(prevState => ({
                        ...prevState,
                        sants:false,
                        abhang: false,
                        arati: false,
                        granths: false
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

    const getAbhangs = async (pageNumber: number, pageSize: number, searchQuery: string): Promise<{ "list": ISantList, count: number }> => {
        const { Data: AbhangsList, TotalRecordCount } = await apiCall<ISantList>(`${API_ENDPOINTS.GET_ABHANG_WITH_SANT}`, 'POST', {
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "parms": searchQuery === "" ? [] : [{
                "Key": "",
                "Value": searchQuery
            }]
        });
        return { list: AbhangsList, count: TotalRecordCount }
    }

    const getRelatedData = async (): Promise<IRelatedData> => {
        const { Data } = await apiCall<IRelatedData>(`${API_ENDPOINTS.GET_ENTITY_TYPEDATA}`, 'POST', {
            "pageNumber": 0,
            "pageSize": 0,
            "parms": [
                {
                    "key": "",
                    "value": HELPERS.ApiEntityType.arati,
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
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await getAbhangs(page.pageNumber, page.pageSize, page.searchQuery);
            if (result) {
                setPage(prevState => ({
                    ...prevState,
                    sants: result.list,
                    totalRecords: result.count
                }));
            }
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
    }

    return (
        <><Hero  loading={loading.sants} searchQuery={page.searchQuery} updateSearchQuery={updateSearchQuery} isSearchEnable={true} title={"मराठी"} subTitle={"अभंग"} />
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
                            loading.sants === true ? <Skeleton variant="rectangular" width={'100%'} height={500} /> :
                                <>
                                    {
                                        page?.sants.length <= 0 && !loading.sants ?
                                            <div style={{ textAlign: 'center' }}>
                                               <ImageWithLoader width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" title={"abhangvani.com"} />
                                                <div>रेकॉर्ड सापडले नाही</div>
                                            </div>
                                            :
                                            <>{(page?.sants)?.map((santWithAbhang, santIndex) => (
                                                <Grid id="sant-type-gird" item key={`${santIndex}-sant-type`} marginBottom={5}>
                                                    <SantAbhangsItem sant={santWithAbhang} />
                                                </Grid>
                                            ))}
                                                {page.totalRecords > page?.sants.length && <Grid id="sant-type-gird" item key={`more-sant-type`} marginBottom={2} textAlign={'center'}>
                                                    <MyButton onClick={onNextPageClick} btnText={"  लोड करा..."} />
                                                </Grid>}
                                            </>
                                    }
                                </>
                        }
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}ref={secondGridRef}>
                        <Grid item>
                            <AdCard sx={{ height: '100%', mb: 2 }} id={'sant-home-ad-card'} />
                        </Grid>
                        <Grid item>
                            {
                                loading.arati === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :
                                    <LeftCardList moreHref="/articals/aratis" sx={{ height: '100%', mb: 2 }} items={page.aratis} listTitle={"✨ आरती संग्रह"} displayField={{
                                        name: "name",
                                        description: "shortDescription",
                                        imageUrl: "documentUrl"
                                    }} />
                            }
                        </Grid>
                        <Grid item>
                            {
                                loading.granths === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :

                                    <LeftCardList moreHref="/articals/grnth" sx={{ height: '100%', mb: 2 }} items={page.granths} listTitle={"📜 ग्रंथ"} displayField={{
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

export default SantAbhangListComponent;