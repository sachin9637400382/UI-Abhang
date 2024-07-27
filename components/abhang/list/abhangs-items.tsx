import { useLoading } from "@abhang/app/context/loading-context";
import { IAbhang } from "@abhang/app/types/IAbhang";
import { ISant } from "@abhang/app/types/ISant";
import HELPERS from "@abhang/app/utils/helper";
import { TextShareProps, UrlShare } from "@abhang/app/utils/share";
import SocialButtonsComponents from "@abhang/components/social/social-buttons"
import { Avatar, Card, CardContent, CardHeader, Grid, SxProps, Typography } from "@mui/material"
import Link from "next/link";

interface SantAbhangsItemProps {
    sant: ISant,
    sx?: SxProps
}

const AbhangRow = (abhang: IAbhang, santUrlId: string, abhangIndex: number) => {
    return (
        <Link style={{ textDecoration: 'none' }} href={abhang.click}>
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
                >  <Typography variant="h5" style={{ color: 'black'}}>{HELPERS.convertToMarathiNumber(abhangIndex)} </Typography>
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
    )
}

const SantAbhangsItem = ({ sant, sx }: SantAbhangsItemProps) => {
    const { setLoading: setContextLoading } = useLoading()
    const facebookClick = (item: ISant) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }

    const whatsAppClick = (item: ISant) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }
    const instagramClick = (item: ISant) => {
        UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading: setContextLoading } as TextShareProps)
    }

    return (
        <Card sx={{ height: '100%' }} key={`${sant?.name}-sant-type-card`}>
            <CardHeader
                action={
                    <SocialButtonsComponents item={sant} facebookClick={facebookClick} whatsAppClick={whatsAppClick} instagramClick={instagramClick} />
                }
                title={<><span style={{ color: 'orange' }}>✍🏻</span> {sant?.name}</>}
            />
            <CardContent>
                <Grid container spacing={1}>
                    {(sant?.abhangs)?.map((abhang, abhangIndex) => (
                        <Grid key={`${abhang.name}-abhang-grid`} item xs={12} sm={6} md={4} lg={3}>
                            {AbhangRow(abhang, sant.urlId, abhangIndex)}
                        </Grid>
                    ))}
                </Grid>
            </CardContent>

        </Card>
    );
}

export default SantAbhangsItem