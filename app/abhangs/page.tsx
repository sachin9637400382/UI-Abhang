import API_ENDPOINTS from "../utils/api-endpoints";
import { Metadata } from "next";
import React from "react";
import SantAbhangListComponent from "@abhang/components/abhang/list/abhangs-list-component";

export const metadata: Metadata = {
    title: "वाचा सर्व अभंग-Read All Abhanga-Abhangvani",
    description: "अभंगवाणी वेबसाइटवर वाचा सर्व अभंग. येथे तुम्हाला संतांची अभंग वाणी, कथा, कादंबरी आणि आरती मराठी भाषेत उपलब्ध आहे. - abhangvani.com ते हि फ्री... Read all Abhanga on our website. Here you can find the devotional poems of saints, stories, novels, and Aarti in Marathi.",
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
        url: `${API_ENDPOINTS.DOMAIN_BASE_URL}abhangs`,
        title: "वाचा सर्व अभंग-Read All Abhanga-Abhangvani",
        description: "अभंगवाणी वेबसाइटवर वाचा सर्व अभंग. येथे तुम्हाला संतांची अभंग वाणी, कथा, कादंबरी आणि आरती मराठी भाषेत उपलब्ध आहे. - abhangvani.com ते हि फ्री... Read all Abhanga on our website. Here you can find the devotional poems of saints, stories, novels, and Aarti in Marathi.",
        type: 'website',
        images: [
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhang-og/abhang-fb-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhang-og/abhang-fb-og.png`,
                alt: "अभंगवाणी वेबसाइटवर वाचा सर्व अभंग. येथे तुम्हाला संतांची अभंग वाणी, कथा, कादंबरी आणि आरती मराठी भाषेत उपलब्ध आहे. - abhangvani.com ते हि फ्री... Read all Abhanga on our website. Here you can find the devotional poems of saints, stories, novels, and Aarti in Marathi.",
                width: 1200,
                height: 630,
                type: "image/png"
            },
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhang-og/abhang-insta-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhang-og/abhang-insta-og.png`,
                alt: "अभंगवाणी वेबसाइटवर वाचा सर्व अभंग. येथे तुम्हाला संतांची अभंग वाणी, कथा, कादंबरी आणि आरती मराठी भाषेत उपलब्ध आहे. - abhangvani.com ते हि फ्री... Read all Abhanga on our website. Here you can find the devotional poems of saints, stories, novels, and Aarti in Marathi.",
                width: 1080,
                height: 1080,
                type: "image/png"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "वाचा सर्व अभंग-Read All Abhanga-Abhangvani",
        description: "अभंगवाणी वेबसाइटवर वाचा सर्व अभंग. येथे तुम्हाला संतांची अभंग वाणी, कथा, कादंबरी आणि आरती मराठी भाषेत उपलब्ध आहे. - abhangvani.com ते हि फ्री... Read all Abhanga on our website. Here you can find the devotional poems of saints, stories, novels, and Aarti in Marathi.",
        images: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhang-og/abhang-twiiter-og.png`,
    },
    robots: {
        index: false,
        follow: true,
    },
};

const Abhangs = async () => {
    return (
        <>
            <SantAbhangListComponent />

        </>
    )
}

export default Abhangs;