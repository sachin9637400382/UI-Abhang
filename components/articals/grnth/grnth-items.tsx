import { useLoading } from "@abhang/app/context/loading-context";
import { IContent } from "@abhang/app/types/IContent";
import { IContentType } from "@abhang/app/types/IContentType";
import { IContentWithType } from "@abhang/app/types/IContentWithType";
import HELPERS from "@abhang/app/utils/helper";
import { TextShareProps, UrlShare } from "@abhang/app/utils/share";
import SocialButtonsComponents from "@abhang/components/social/social-buttons"
import { Avatar, Card, CardContent, CardHeader, Grid, SxProps, Typography } from "@mui/material"
import Image from "next/image";
import Link from "next/link";

interface GranthItemProps {
    granthWithType: IContentType,
    sx?: SxProps
}

const GrnthRow = (grnth: IContent ,grnthIndex: number) => {
    return (
        <Link style={{ textDecoration: 'none' }} href={grnth.click}>
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
                >  <Typography variant="h5" style={{ color: 'black'}}>{HELPERS.convertToMarathiNumber(grnthIndex)} </Typography>
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
                        {grnth.name}
                    </span>
                </CardContent>
            </Card>
        </Link>
    )
}

const GrnthItem = ({ granthWithType, sx }: GranthItemProps) => {
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
        <Card sx={{ height: '100%' }} key={`${granthWithType?.name}-sant-type-card`}>
            <CardHeader
                action={
                    <SocialButtonsComponents item={granthWithType} facebookClick={facebookClick} whatsAppClick={whatsAppClick} instagramClick={instagramClick} />
                }
                title={<><span style={{ color: 'orange' }}>✍🏻</span> {granthWithType?.name}</>}
            />
            <CardContent>
                <Grid container spacing={1}>
                    {(granthWithType?.contents).map((content, granthIndex) => (
                        <Grid key={`${content.name}-${granthIndex}-grid`} item xs={12} sm={6} md={4} lg={3}>
                            {GrnthRow(content, granthIndex)}
                        </Grid>
                    ))}
                </Grid>
            </CardContent>

        </Card>
    );
}

export default GrnthItem