import { ISant } from "@abhang/app/types/ISant";
import { ArrowForward } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SocialButtonsComponents from "../../social/social-buttons";
import HELPERS from "@abhang/app/utils/helper";
import { TextShareProps, UrlShare } from "@abhang/app/utils/share";
import { useLoading } from "@abhang/app/context/loading-context";
import { ISantTypes } from "@abhang/app/types/ISantTypes";
import ImageWithLoader from "@abhang/app/comps/loading/image-loader";

interface SantTypeProps {
  santType: ISantTypes
}



const SantRow = (sant: ISant) => {
  return (
    <Link
      style={{ textDecoration: 'none', }}
      href={`/sant/${sant.urlId}`}
    >
      <Card key={`${sant.name}-sant-card`} id={'sachin'} sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? 'antiquewhite' : 'primary.light',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)'
      }}>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <div>
              <ImageWithLoader
                alt={sant?.document?.name}
                title={sant?.document?.name}
                src={HELPERS.getDocUrl(sant?.document?.url)}
                height={80}
                width={80}
              />
            </div>
            <Stack spacing={1} sx={{ textAlign: 'center' }}>
              <Typography variant="h5">{sant.name}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  )
}

const SantTypeWithSantsItem = ({ santType }: SantTypeProps): React.JSX.Element => {
  const { setLoading } = useLoading()
  const facebookClick = (item: ISantTypes) => {
    UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading } as TextShareProps)
  }

  const whatsAppClick = (item: ISantTypes) => {
    UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading } as TextShareProps)
  }
  const instagramClick = (item: ISantTypes) => {
    UrlShare({ message: `${HELPERS.getShareUrl(item.click)}`, setLoading } as TextShareProps)
  }

  return (
    <Card sx={{ height: '100%' }} key={`${santType?.name}-sant-type-card`}>
      <CardHeader
        action={
          <SocialButtonsComponents item={santType} facebookClick={facebookClick} whatsAppClick={whatsAppClick} instagramClick={instagramClick} />
        }
        title={<><span style={{ color: 'orange' }}>✍🏻</span> {santType?.name}</>}
      />
      <CardContent>
        <Grid container spacing={1}>
          {(santType.sants).map((sant, santIndex) => (
            <Grid key={`${sant.name}-sant-grid`} item xs={12} sm={6} md={4} lg={3}>
              {SantRow(sant)}
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button startIcon={<ArrowForward />} color="inherit" href={`/sant/type-details/${santType.urlId}`}>
          अधिक
        </Button>
      </CardActions>
    </Card>
  );
}

export default SantTypeWithSantsItem;