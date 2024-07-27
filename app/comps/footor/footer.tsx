import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';
import API_ENDPOINTS from '@abhang/app/utils/api-endpoints';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="https://abhangs.com/">Amruta Technology &nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-15px' }}>
              <Link href='/' title='Abhang'>
                <Image
                  title='abhangvani.com'
                  alt="abhangvani.com"
                  src="/assets/images/logo.svg"
                  width={140}
                  height={70}
                  style={{ color: 'transparent', width: '140px', height: 'auto' }}
                  
                  loading={'eager'}/>
              </Link>
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
            वृत्तपत्र
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
            अशीच नवनवीन माहितीसाठी आमच्या वेबसाईट ला 🔔सब्स्क्राइब करा .
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="email-outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autoComplete: 'off',
                  //ariaLabel: 'Enter your email address',
                }}
              />
              <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                 सब्स्क्राइब
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
          🌐लिंक्स 
          </Typography>
          <Link color="text.secondary" href='/abhangs'>
          ★अभंग
          </Link>
          <Link color="text.secondary" href={'/articals/aratis'}>
          ★आरती
          </Link>
          <Link color="text.secondary"href={'/articals/grnth'}>
          ★ग्रंथ
          </Link>
          <Link color="text.secondary" href={'/articals/kadambari'}>
          ★कादंबरी
          </Link>
          <Link color="text.secondary" href="#">
          ？FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
          🧑🏻‍💻कंपनी
 </Typography>
          <Link color="text.secondary" href="/about">
          ℹ️ आमच्याबद्दल
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
          📝लीगल 
          </Typography>
          <Link color="text.secondary"href="mailto:support@abhangvani.com">
          📞संपर्क करा
          </Link>
          <Link color="text.secondary" href="/privacy-policy">
          👁️‍🗨️Privacy
          </Link>
         
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="/privacy-policy">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href={API_ENDPOINTS.WHATSAPP_URL}
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href={API_ENDPOINTS.FACEBOOK_URL}
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href={API_ENDPOINTS.INSTAGRAM_URL}
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <InstagramIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}