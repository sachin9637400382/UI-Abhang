import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import HELPERS from "@abhang/app/utils/helper";
import GrnthListComponent from "@abhang/components/articals/grnth/grnth-list-component";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "*मराठी ग्रंथाचा चा खजिना  - Treasure of Marathi Granths*",
    description: "*वाचा सर्व मराठी ग्रंथ - abhangvani.कॉम वर ते हि फ्री...-Read information about all marathi granths - on abhangvani.com it's free...*",
    keywords: HELPERS.defaultMeta.keywords,
    openGraph: {
        url: `${API_ENDPOINTS.DOMAIN_BASE_URL}articals/grnth`,
        title: "*मराठी ग्रंथाचा चा खजिना  - Treasure of Marathi Granths*",
        description: "*वाचा सर्व मराठी ग्रंथ - abhangvani.कॉम वर ते हि फ्री...-Read information about all marathi granths - on abhangvani.com it's free...*",
        type: 'website',
        images: [
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/grnth-og/grnth-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/grnth-og/grnth-og.png`,
                alt: "*मराठी ग्रंथाचा चा खजिना  - Treasure of Marathi Granths*",
                width: 1200,
                height: 630,
                type: "image/png"
            },
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/grnth-og/grnth-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/grnth-og/grnth-og.png`,
                alt: "*मराठी ग्रंथाचा चा खजिना  - Treasure of Marathi Granths*",
                width: 1080,
                height: 1080,
                type: "image/png"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "*मराठी ग्रंथाचा चा खजिना  - Treasure of Marathi Granths*",
        description: "*वाचा सर्व मराठी ग्रंथ - abhangvani.कॉम वर ते हि फ्री...-Read information about all marathi granths - on abhangvani.com it's free...*",
        images: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/grnth-og/grnth-og.png`,
    },
    robots: {
        index: false,
        follow: true,
    },
};

const GranthsList = () => {
    return <GrnthListComponent />
}

export default GranthsList;