import { IRelatedData } from "@abhang/app/types/IRelatedData";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import HELPERS from "@abhang/app/utils/helper";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { IContentTypeList } from "@abhang/app/types/IContentType";

interface QuickArtis {
    aratis: IContentTypeList,
    loading: boolean;
}

const initialValue: QuickArtis = {
    aratis: [],
    loading: true
}

const QuickAratis = () => {
    const [page, setPage] = useState<QuickArtis>(initialValue);
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    await getRelatedData(),
                ]).then((value: [IRelatedData]) => {
                    setPage(prevState => ({
                        ...prevState,
                        aratis: value[0].aratis,
                    }));
                }).finally(() => {
                    setPage(prevState => ({
                        ...prevState,
                        loading: false
                    }))
                });
            } catch (error) {
                console.error("Error fetching data:", error);
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
                    "key": HELPERS.ApiEntityType.arati,
                    "value": HELPERS.ApiEntityType.arati,
                    "recoredCount": HELPERS.Page.pageSizeRecentList
                }

            ]
        });

        return Data;
    }
    return (
        <Container
            id="faq"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Typography
                component="h2"
                variant="h4"
                color="text.primary"
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                मराठी आरती संग्रह. 
            </Typography>
            <Box sx={{ width: '100%' }}>
            {page.aratis.map((arati, aratiIndex) => (
                <Accordion
                    key={`ararti-${aratiIndex}`}
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <Typography component="h3" variant="subtitle2">
                            {arati.name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                        >
                            {arati.shortDescription}
                            <Link href={arati.click}>आणखी पहा </Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
            </Box>
        </Container>
    )

}
export default QuickAratis;