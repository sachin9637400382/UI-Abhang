import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import HELPERS from "@abhang/app/utils/helper";
import AratisListComponent from "@abhang/components/articals/aratis/aratis-list-component";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "*मराठी आरती चा खजिना  - Treasure of Marathi Aarti*",
    description: "*वाचा सर्व मराठी आरती - abhangvani.कॉम वर ते हि फ्री...-Read information about all marathi arathis - on abhangvani.com it's free...*",
    keywords: HELPERS.defaultMeta.keywords,
    openGraph: {
        url: `${API_ENDPOINTS.DOMAIN_BASE_URL}articals/aratis`,
        title: "*मराठी आरती चा खजिना  - Treasure of Marathi Aarti*",
        description: "*वाचा सर्व मराठी आरती - abhangvani.कॉम वर ते हि फ्री...-Read information about all marathi arathis - on abhangvani.com it's free...*",
        type: 'website',
        images: [
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/arati-og/ararti-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/arati-og/ararti-og.png`,
                alt: "*मराठी आरती चा खजिना  - Treasure of Marathi Aarti*",
                width: 1200,
                height: 630,
                type: "image/png"
            },
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/arati-og/ararti-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/arati-og/ararti-og.png`,
                alt: "*मराठी आरती चा खजिना  - Treasure of Marathi Aarti*",
                width: 1080,
                height: 1080,
                type: "image/png"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "*मराठी आरती चा खजिना  - Treasure of Marathi Aarti*",
        description: "*वाचा सर्व मराठी आरती - abhangvani.कॉम वर ते हि फ्री...-Read information about all marathi arathis - on abhangvani.com it's free...*",
        images: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/arati-og/ararti-og.png`,
    },
    robots: {
        index: false,
        follow: true,
    },
};

const AratisHome = () => {
    return <AratisListComponent />
}

export default AratisHome;