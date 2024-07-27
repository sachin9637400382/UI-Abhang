import { Box, Button, Grid, Modal, Skeleton, Typography, styled } from "@mui/material"
import SearchInput from "./search-input";
import useDebounce from "@abhang/app/utils/useDebounce";
import { useEffect, useState } from "react";
import { IApplicationChildItem, IApplicationSearch } from "@abhang/app/types/IApplicationSearch";
import { apiCall } from "@abhang/app/utils/fetch";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from "@mui/x-tree-view";
import Image from "next/image";
import Link from "next/link";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";

interface ApplicationSearchModelProps {
    openSerchModel: boolean,
    setOpenSerchModel: (value: boolean) => void,
    serachQuery: string,
    setSearchQuery: (value: string) => void,
}
const ApplicationSearchModel = ({ openSerchModel, setOpenSerchModel, serachQuery, setSearchQuery }: ApplicationSearchModelProps) => {
    const [inputValue, setInputValue] = useState<string>(serachQuery);
    const debouncedInputValue = useDebounce<string>(inputValue, 500);
    const [searchResult, setSearchResult] = useState<IApplicationSearch | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false);
    const handleClose = () => {
        setOpenSerchModel(false);
        setSearchQuery("");
    }
    const onInputChange = (value: string) => {
        setInputValue(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                await Promise.all([
                    await getSearchResult(debouncedInputValue)
                ]).then((value: [IApplicationSearch]) => {
                    setSearchResult(value[0]);
                }).finally(() => {
                    setLoading(false)
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [debouncedInputValue]);

    const getSearchResult = async (query: string): Promise<IApplicationSearch> => {
        const { Data } = await apiCall<IApplicationSearch>(`${API_ENDPOINTS.GET_APPLICATION_SEARCH}${query}`, 'POST');
        return Data;
    }
    const closeButtonStyle = {
        // position: 'absolute',
    };

    const StyledTreeItem = styled(TreeItem)`
     
    `;

    const StyledTreeItemLabel = styled('span')`
            font-weight: bold;
            font-size: 30px;
            line-height: 1.2;
            font-family: "Inter", "sans-serif";
            line-height: 1.2;
            font-family: "Inter", "sans-serif";
    `;

    return (
        <Modal
            BackdropProps={{
                onClick: (e) => e.stopPropagation(),
            }}
            disableEscapeKeyDown
            open={openSerchModel}
            onClose={() => setOpenSerchModel(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: '350px', sm: '400px', md: '500px', lg: '600px' },
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
            }}>

                <Grid container spacing={2} alignItems={'top'}>
                    <Grid item xs={12} sx={{
                        textAlign: 'end',
                        paddingLeft: 0
                    }}>
                        <Button
                            style={{ backgroundColor: 'red' }}
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{
                        textAlign: 'center',
                        paddingLeft: 0
                    }}>

                        <Typography id="modal-modal-title" variant="h2" component="h2">
                            शोधा
                        </Typography>

                    </Grid>
                    <Grid item xs={12} key={`sant-type-gird`} style={{ paddingLeft: 0 }}>
                        <SearchInput query={inputValue} setQuery={onInputChange} />
                    </Grid>
                    {loading === true ? <Skeleton variant="rectangular" width="100%" height={200} /> :
                        <Grid item xs={12} style={{
                            height: '300px',
                            overflowY: 'auto',
                            backgroundColor: '#FBFCFE',
                            borderRadius: '10px',
                            border: '1px solid rgba(214, 226, 235, 0.8)',
                            transition: 'revertbackground-color, border, 80ms',
                            paddingLeft: 0
                        }}>

                            {loading === false && searchResult === undefined ?
                                <div style={{ textAlign: 'center' }}>
                                    <ImageWithLoader title="abhangvani.com" width={100} height={100} src="/assets/images/cloud.png" alt="no-record-found-image" />
                                    <div>रेकॉर्ड सापडले नाही</div>
                                </div> :
                                <SimpleTreeView defaultExpandedItems={['sants', 'abhangs', 'granths', 'aratis', 'kadambari', 'content']}>
                                    {searchResult?.sants?.length ? <StyledTreeItem itemId="sants" label={<StyledTreeItemLabel>🚩संत</StyledTreeItemLabel>} aria-expanded={true}>
                                        {searchResult?.sants?.map((sant: IApplicationChildItem, index) => (
                                            <Link key={`sant-${sant.id}`} onClick={handleClose} href={sant.click} style={{textDecoration:'none'}} >
                                                <TreeItem itemId={`sant-${sant.id}`} label={`▸${sant.name}`} />
                                            </Link>
                                        ))
                                        }
                                    </StyledTreeItem> : ""
                                    }
                                    {searchResult?.abhangs?.length ? <StyledTreeItem itemId="abhangs" label={<StyledTreeItemLabel>📜अभंग</StyledTreeItemLabel>}>
                                        {searchResult?.abhangs?.map((abhang: IApplicationChildItem, index) => (
                                            <Link key={`abhang-${abhang.id}`} onClick={handleClose} href={abhang.click} style={{textDecoration:'none'}}>
                                                <TreeItem itemId={`abhang-${abhang.id}`} label={`▸${abhang.name}`} />
                                            </Link>
                                        ))
                                        }
                                    </StyledTreeItem> : ""
                                    }

                                    {searchResult?.granths?.length ? <StyledTreeItem itemId="granths" label={<StyledTreeItemLabel>🧾ग्रंथ</StyledTreeItemLabel>}>
                                        {searchResult?.granths?.map((granth: IApplicationChildItem, index) => (
                                            <Link key={`granth-${granth.id}`} onClick={handleClose} href={granth.click} style={{textDecoration:'none'}}>
                                                <TreeItem itemId={`granth-${granth.id}`} label={`▸${granth.name}`} />
                                            </Link>
                                        ))
                                        }
                                    </StyledTreeItem> : ""
                                    }
                                    {searchResult?.kadambari?.length ? <StyledTreeItem itemId="kadambari" label={<StyledTreeItemLabel>🌟कादंबरी</StyledTreeItemLabel>}>
                                        {searchResult?.kadambari?.map((kadambari: IApplicationChildItem, index) => (
                                            <Link key={`kadambari-${kadambari.id}`} onClick={handleClose} href={kadambari.click} style={{textDecoration:'none'}}>
                                                <TreeItem itemId={`kadambari-${kadambari.id}`} label={`▸${kadambari.name}`} />
                                            </Link>
                                        ))
                                        }
                                    </StyledTreeItem> : ""
                                    }
                                    {searchResult?.content?.length ? <StyledTreeItem itemId="content" label={<StyledTreeItemLabel>📣आणखी माहिती</StyledTreeItemLabel>}>
                                        {searchResult?.content?.map((content: IApplicationChildItem, index) => (
                                            <Link key={`content-${content.id}`} onClick={handleClose} href={content.click} style={{textDecoration:'none'}}>
                                                <TreeItem itemId={`content-${content.id}`} label={`▸${content.name}`} />
                                            </Link>
                                        ))
                                        }
                                    </StyledTreeItem> : ""
                                    }
                                </SimpleTreeView>
                            }
                        </Grid>
                    }
                </Grid>
            </Box>
        </Modal>
    )
}

export default ApplicationSearchModel;