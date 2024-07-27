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
            url: `${API_ENDPOINTS.DOMAIN_BASE_URL}about`,
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

const AboutUs = () => {
    return (
        <Card sx={{ margin: "auto", mt: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    अभंगवाणीबद्दल
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    जय हरी माऊली,
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    अभंगवाणी (abhangvani.com) ही वेबसाइट संत,संप्रदाय,ग्रंथ,आरती,कथा,कादंबरी
                    यांचा संग्रह आणि संगणीकृत  करण्याच्या  उद्देशाने निर्माण केली गेली आहे. या ठिकाणी आपल्याला
                    संतांचे अभंग, हरिपाठ, आणि इतर संत साहित्य सहजगत्या उपलब्ध होईल. आमचा
                    हेतू आहे की या पवित्र साहित्याच्या माध्यमातून आपण अध्यात्मिक
                    प्रवासात मार्गदर्शन मिळवावे.
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                    अभंगवाणी - भक्ती आणि साहित्याचा संगम
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    अभंगवाणी, संत साहित्याच्या अनमोल ठेव्याचा संगम, तुमच्यासाठी एक अद्वितीय आणि आध्यात्मिक प्रवास अनुभवण्याचे व्यासपीठ आहे. इथे तुम्हाला संत तुकाराम, संत ज्ञानेश्वर, संत एकनाथ, संत नामदेव आणि अनेक संतांचे अमूल्य साहित्य मिळेल. या साहित्याच्या माध्यमातून आपण संतांच्या विचारसरणीला जवळून अनुभवू शकता.
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                    संत साहित्याचा शोध:
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>अभंगवाणीच्या माध्यमातून तुम्हाला संतांचे अभंग, ओवी, हरिपाठ, आणि भारुड यांचा अद्भुत संग्रह पाहायला मिळेल. या साहित्याचा अभ्यास करून आपण आपले जीवन अधिक अध्यात्मिक आणि समृद्ध बनवू शकता.
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                    आध्यात्मिक कार्यक्रम:
                </Typography>
                <Typography  variant="body2" color="text.secondary" paragraph>
                    आपल्या क्षेत्रातील कीर्तन, प्रवचन, भजन आणि हरीनाम सप्ताह यासारख्या कार्यक्रमांची माहिती येथे मिळेल. त्यामुळे देशभरातील भक्तजनांना या कार्यक्रमांची माहिती मिळेल आणि ते या अध्यात्मिक कार्यक्रमांचा लाभ घेऊ शकतील.
                </Typography>
                <Typography  variant="h5" component="div" gutterBottom>
                    तुमच्या योगदानाची संधी:
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph> अभंगवाणीच्या माध्यमातून आपण आपल्या अध्यात्मिक अनुभवांचे आणि ज्ञानाचे योगदान देऊ शकता. कीर्तनकार, प्रवचनकार आणि संगीतज्ञ यांच्यासाठी एक अद्वितीय व्यासपीठ आम्ही उपलब्ध करून देत आहोत, जिथे ते आपली माहिती जोडून भक्तांसमोर आपल्या कला प्रदर्शित करू शकतील.
                </Typography>
                <Typography  variant="h5" component="div" gutterBottom>
                    संत साहित्याचा प्रचार आणि प्रसार:
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>आम्ही संत साहित्याचा प्रचार आणि प्रसार करून अधिकाधिक लोकांपर्यंत या साहित्याचा लाभ पोहोचविण्याचा प्रयत्न करीत आहोत. या साहित्याच्या अध्ययनाने जीवनात सकारात्मक बदल घडवून आणता येईल, असा आमचा विश्वास आहे.
                </Typography>
                <Typography  variant="h5" component="div" gutterBottom>
                    आम्हाला संपर्क साधा:
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph> आपल्या अभिप्रायांचे आणि सूचनांचे आम्ही स्वागत करतो. कृपया आपले विचार आणि अनुभव आम्हाला कळवा, जेणेकरून आम्ही या वेबसाइटचा अनुभव अधिक चांगला बनवू शकू.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    आम्हाला खात्री आहे की संत साहित्याचा हा खजिना आपल्या अध्यात्मिक
                    जीवनात नवा प्रकाश आणेल. आम्ही या प्रवासात आपल्याला सहभागी होण्यासाठी
                    आग्रह करतो.
                </Typography>
                <Link href="mailto:support@abhangvani.com">support@abhangvani.com   वर आमच्याशी संपर्क साधा.</Link>
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
                    <AboutUs />
                </Grid>
            </Container>
        </>
    );
}
