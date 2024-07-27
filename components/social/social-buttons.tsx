import { Box, IconButton } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface SocialButtonsComponents {
    item: any,
    facebookClick: (item: any) => void,
    whatsAppClick: (item: any) => void,
    instagramClick: (item: any) => void,
}

const SocialButtonsComponents = ({ item, facebookClick, whatsAppClick, instagramClick }: SocialButtonsComponents) => {

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'row', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}
        >
            <IconButton onClick={()=>facebookClick(item)} style={{ color: 'blue' }} color="inherit" size="small" aria-label="facebook-share">
                <Facebook />
            </IconButton>
            <IconButton onClick={()=>whatsAppClick(item)} style={{ color: 'green' }} color="inherit" size="small" aria-label="whatsapp-share">
                <WhatsAppIcon />
            </IconButton>
            <IconButton onClick={()=>instagramClick(item)} color="inherit" style={{ color: '#E4405F' }} size="small" aria-label="instagram-share">
                <Instagram />
            </IconButton>
        </Box>
    )
}

export default SocialButtonsComponents;