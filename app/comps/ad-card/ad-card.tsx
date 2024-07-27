import { Card, CardHeader, SxProps } from "@mui/material";

interface AdCardProps {
    sx?: SxProps
    id: string
}
const AdCard = (props: AdCardProps): React.JSX.Element => {
    return (
        <Card sx={props.sx} id={props.id} key={props.id}>
            <CardHeader title="Ads here" />
        </Card>
    );
}

export default AdCard;