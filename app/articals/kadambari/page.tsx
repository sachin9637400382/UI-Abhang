import { Metadata } from "next";
import React from "react";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import KadambariListComponent from "@abhang/components/articals/kadambari/kadambari-list-component";
import HELPERS from "@abhang/app/utils/helper";

export const metadata: Metadata = {
    title: "*मराठी कादंबरीचा खजिना - Treasure of Marathi Kadambaris*",
    description: "*वाचा सर्व मराठी कादंबरी - abhangvani.com वर ते हि फ्री...- Read information about all marathi kadambaris - on abhangvani.com it's free...*",
    keywords: HELPERS.defaultMeta.keywords,
    openGraph: {
        url: `${API_ENDPOINTS.DOMAIN_BASE_URL}articals/kadambari`,
        title: "*मराठी कादंबरीचा खजिना - Treasure of Marathi Kadambaris*",
        description: "*वाचा सर्व मराठी कादंबरी - abhangvani.com वर ते हि फ्री...- Read information about all marathi kadambaris - on abhangvani.com it's free...*",
        type: 'website',
        images: [
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}/assets/images/kadambari-og/kadambari-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}/assets/images/kadambari-og/kadambari-og.png`,
                alt: "*मराठी कादंबरीचा खजिना - Treasure of Marathi Kadambaris*",
                width: 1200,
                height: 630,
                type: "image/png"
            },
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}/assets/images/kadambari-og/kadambari-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}/assets/images/kadambari-og/kadambari-og.png`,
                alt: "*मराठी कादंबरीचा खजिना - Treasure of Marathi Kadambaris*",
                width: 1080,
                height: 1080,
                type: "image/png"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "*मराठी कादंबरीचा खजिना - Treasure of Marathi Kadambaris*",
        description: "*वाचा सर्व मराठी कादंबरी - abhangvani.com वर ते हि फ्री...- Read information about all marathi kadambaris - on abhangvani.com it's free...*",
        images: `${API_ENDPOINTS.DOMAIN_BASE_URL}/assets/images/kadambari-og/kadambari-og.png`,
    },
    robots: {
        index: false,
        follow: true,
    },
};


const KadambariList = () => {
    return <KadambariListComponent />
}

export default KadambariList;