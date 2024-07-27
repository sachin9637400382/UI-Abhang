import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import HELPERS from "@abhang/app/utils/helper";
import { ArrowForward, ArrowRight } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, SxProps, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ImageWithLoader from "../loading/image-loader";

export interface LeftCardListProps {
    sx?: SxProps;
    items: any[];
    listTitle: string
    displayField: { name: string, description: string, imageUrl: string }
    onItemClick?: (item: any) => string
}


const LeftCardList = ({ items = [], sx, listTitle = "नवीन", displayField, onItemClick }: LeftCardListProps): React.JSX.Element => {
    return (
        <Card sx={sx}>
            <CardHeader title={listTitle} />
            <Divider />
            <List>
                {items.map((item, index) => (
                    <Link key={`${listTitle}-${index}`} href={item.click} style={{textDecoration:'none'}}>
                        <ListItem divider={index < items.length - 1} key={`${index}-data`}>
                            <ListItemAvatar>
                                {item[displayField.imageUrl] ? (
                                    <ImageWithLoader 
                                        alt={item[displayField.name]}
                                        height={48}
                                        width={48}
                                        style={{
                                            borderRadius: '50%',
                                        }}
                                        src={HELPERS.getDocUrl(item[displayField.imageUrl])} title={"abhangvani.com"}                                    />
                                ) : (
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
                                >  <Typography variant="h5" style={{ color: 'black'}}>{HELPERS.convertToMarathiNumber(index)} </Typography>
                                </Avatar>
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                primary={item[displayField.name]}
                                primaryTypographyProps={{ variant: 'subtitle1' }}
                                secondary={`${item[displayField.description] ?? ""}`}
                                secondaryTypographyProps={{ variant: 'body2' }}
                                style={{
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            />

                            <IconButton edge="end">
                                <ArrowForward />
                            </IconButton>

                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    color="inherit"
                    endIcon={<ArrowRight />}
                    size="small"
                    variant="text"
                >
                    अजून पहा
                </Button>
            </CardActions>
        </Card>
    );
}

export default LeftCardList;