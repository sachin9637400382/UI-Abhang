import { useLoading } from "@abhang/app/context/loading-context";
import { IContent } from "@abhang/app/types/IContent";
import { IContentType } from "@abhang/app/types/IContentType";
import { IContentWithType } from "@abhang/app/types/IContentWithType";
import HELPERS from "@abhang/app/utils/helper";
import { TextShareProps, UrlShare } from "@abhang/app/utils/share";
import SocialButtonsComponents from "@abhang/components/social/social-buttons"
import { Avatar, Card, CardContent, CardHeader, Grid, SxProps, Typography } from "@mui/material"
import Link from "next/link";

interface SantAbhangsItemProps {
    aratiWithType: IContentType,
    sx?: SxProps
}

const AratiRow = (arati: IContent, aratiUrlId: string, aratiIndex: number) => {
    return (
        <Link style={{ textDecoration: 'none' }} href={arati.click}>
            <Card sx={{
                backgroundColor: 'antiquewhite',
                display: 'flex',
                height: 60,
                border: '1px solid #ffd7a5',
                borderRadius: '5px',
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
                >  <Typography variant="h5" style={{ color: 'black'}}>{HELPERS.convertToMarathiNumber(aratiIndex)} </Typography>
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
                        {arati.name}
                    </span>
                </CardContent>
            </Card>
        </Link>
    )
}

const AratiItem = ({ aratiWithType, sx }: SantAbhangsItemProps) => {
    const { setLoading: setContextLoading } = useLoading()
    const facebookClick = (item: IContentWithType) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }
    const whatsAppClick = (item: IContentWithType) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }
    const instagramClick = (item: IContentWithType) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }

    return (
        <Card sx={{ height: '100%' }} key={`${aratiWithType?.name}-sant-type-card`}>
            <CardHeader
                action={
                    <SocialButtonsComponents item={aratiWithType} facebookClick={facebookClick} whatsAppClick={whatsAppClick} instagramClick={instagramClick} />
                }
                title={<><span style={{ color: 'orange' }}>✍🏻</span> {aratiWithType?.name}</>}
            />
            <CardContent>
                <Grid container spacing={1}>
                    {(aratiWithType?.contents).map((content, aratiIndex) => (
                        <Grid key={`${content.name}-${aratiIndex}-grid`} item xs={12} sm={6} md={4} lg={3}>
                            {AratiRow(content, aratiWithType.urlId, aratiIndex)}
                        </Grid>
                    ))}
                </Grid>
            </CardContent>

        </Card>
    );
}

export default AratiItem