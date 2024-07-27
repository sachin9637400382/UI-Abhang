import { Metadata } from "next";
import HomeComponent from "@abhang/components/home/home-component";
import API_ENDPOINTS from "../utils/api-endpoints";
import { Card, CardActions, CardContent, Container, Grid, IconButton, Link, Stack, Typography } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export async function generateMetadata(): Promise<Metadata> {
    //const response = await fetch(`https://dummyjson.com/posts/${postId}`);
    //const post: BlogPost = await response.json();
    return {
        title: "Privacy-Policy",
        description: "वाचा सर्व ग्रंथ, आरती , कादंबरी , अभंग , संत आणि  संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री... -Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...",
        keywords: ["ग्रंथ", "संत",
            "आरती",
            "कादंबरी",
            "अभंग",
            "संत आणि  संप्रदाय संतांची माहिती",
            "पवित्र व्यक्ती",
            "धार्मिक व्यक्ती",
            "धर्म",
            "आध्यात्मिकता",
            "सेवा",
            "संप्रदाय",
            "धार्मिक गट",
            "आध्यात्मिक गट",
            "गुरु",
            "शिकवणी",
            "भारतीय धार्मिक परंपरा",
            "भारतीय सांस्कृतिक परंपरा",
            "संत आणि संप्रदाय",
            "भारतीय संत",
            "भारतीय संप्रदाय"],
        openGraph: {
            url: `${API_ENDPOINTS.DOMAIN_BASE_URL}privacy-policy`,
            title: "अभंगवाणी-Abhangvani",
            description: "वाचा सर्व ग्रंथ,आरती,कादंबरी,अभंग,संत आणि संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री...-Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...",
            type: 'website',
            images: [
                {
                    url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-fb-og.png`,
                    secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-fb-og.png`,
                    alt: "अभंगवाणी-Abhangvani",
                    width: 1200,
                    height: 630,
                    type: "image/png"
                },
                {
                    url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-insta-og.png`,
                    secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-insta-og.png`,
                    alt: "अभंगवाणी-Abhangvani",
                    width: 1080,
                    height: 1080,
                    type: "image/png"
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: "अभंगवाणी",
            description: "वाचा सर्व ग्रंथ,आरती,कादंबरी,अभंग,संत आणि संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री...-Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...",
            images: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-twitter-og.png`,
        },
        robots: {
            index: false,
            follow: true,
        },
    };
}

const PrivacyPolicy = () => {
    return (
        <Card sx={{ margin: "auto", mt: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Privacy Policy - Abhangvani.com
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    Abhangvani.com आपल्या गोपनीयतेचा आदर करतो. आपली वैयक्तिक माहिती
                    कशी गोळा, वापर, उघड, आणि संरक्षित केली जाते हे स्पष्ट करण्यासाठी
                    आम्ही हे Privacy Policy तयार केले आहे. आमच्या वेबसाइटचा वापर
                    करून, आपण या धोरणात नमूद केलेल्या अटींना सहमती दर्शवता.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>माहिती गोळा करणे:</strong> जेव्हा आपण आमच्या वेबसाइटवर येता, तेव्हा आम्ही आमची सेवा कशी वापरली
                    जाते हे जाणून घेण्यासाठी आम्ही आयपी पत्ता, ब्राउझर प्रकार,
                    डिव्हाइस माहिती इत्यादी स्वयंचलितरित्या गोळा करू शकतो.

                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>माहितीचा वापर:</strong> आम्ही ही माहिती आपल्या
                    खात्याची निर्मिती आणि व्यवस्थापन करण्यासाठी, आपल्याला आमच्या
                    सेवांबद्दल माहिती देण्यासाठी, ग्राहक सेवा आणि तांत्रिक समर्थन
                    पुरवण्यासाठी, आणि वापरकर्ता अनुभव सुधारण्यासाठी वापरतो.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>माहिती उघड करणे:</strong> आपली वैयक्तिक माहिती आम्ही
                    कुठेही  शेअर करणार नाही, केवळ कायदेशीर गरजांसाठी किंवा
                    आमचे अधिकार रक्षण करण्यासाठी आणि आमच्या सेवा प्रदात्यांसोबत, जे
                    आमच्या वतीने कार्य करतात, यासाठीच.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>माहिती सुरक्षितता:</strong> आपली वैयक्तिक माहिती
                    संरक्षित करण्यासाठी आम्ही वाजवी सुरक्षा उपाययोजना करत आहोत.
                    परंतु, कोणत्याही इंटरनेट प्रसारणाची किंवा संगणकीय संचयन प्रणालीची
                    पूर्ण सुरक्षितता सुनिश्चित करू शकत नाही.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>कुकीज आणि ट्रॅकिंग तंत्रज्ञान:</strong> आपल्या
                    अनुभवात सुधारणा करण्यासाठी आम्ही कुकीज आणि समान तंत्रज्ञान
                    वापरू शकतो. आपण आपल्या ब्राउझर सेटिंग्जमधून कुकीज नाकारू
                    शकता.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Content Copyright Policy:</strong> या वेबसाइटवरील सर्व
                    सामग्री  संरक्षित आहे. Abhangvani.com च्या
                    परवानगीशिवाय सामग्रीची कोणतीही पुनरुत्पादन, वितरण, किंवा
                    पुनर्प्रसारण करण्यास मनाई आहे. जर आपल्याला सामग्री वापरण्याची
                    परवानगी हवी असेल, तर कृपया आम्हाला संपर्क करा.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Privacy Policy मधील बदल:</strong> आम्ही वेळोवेळी हे
                    Privacy Policy अद्यतनित करू शकतो. कोणत्याही बदलांबद्दल आम्ही
                    आपल्या ईमेलद्वारे किंवा आमच्या वेबसाइटवर नोटीस पोस्ट करून
                    सूचित करू.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>आमच्याशी संपर्क:</strong> आपल्याला या Privacy Policy
                    बद्दल काही प्रश्न असल्यास, कृपया  <Link href="mailto:support@abhangvani.com">support@abhangvani.com </Link>वर
                    आमच्याशी संपर्क साधा.
                </Typography>
            </CardContent>
            <CardActions>
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
            </CardActions>
        </Card>
    );
};


export default function Home() {
    return (
        <>
            <Container id="features" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 10, sm: 15 },
                pb: { xs: 1, sm: 1 },
            }}
            >
                <Grid container alignItems={'top'}>
                    <PrivacyPolicy />
                </Grid>
            </Container>
        </>
    );
}
