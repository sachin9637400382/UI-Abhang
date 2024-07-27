import API_ENDPOINTS from "../utils/api-endpoints";
import { Metadata } from "next";
import React from "react";
import SantListComponent from "@abhang/components/sant/list/sant-list-component";
import HELPERS from "../utils/helper";

export const metadata: Metadata = {
    title: "मराठी आरती चा खजिना  - Sant And Sampradye",
    description: "वाचा सर्व संत आणि  संप्रदाय ची माहिती आणि त्यांचे साहित्य - abhangvani.कॉम वर ते हि फ्री...-Read information about all sant and sampradye and their literature - on abhangvani.com it's free...",
    keywords: HELPERS.defaultMeta.keywords,
    openGraph: {
        url: `${API_ENDPOINTS.DOMAIN_BASE_URL}sant`,
        title: "संत आणि संप्रदाय माहिती - Sant And Sampradye",
        description: "वाचा सर्व संत आणि  संप्रदाय ची माहिती आणि त्यांचे साहित्य - abhangvani.कॉम वर ते हि फ्री...-Read information about all sant and sampradye and their literature - on abhangvani.com it's free...",

        type: 'website',
        images: [
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/sant-og/sant-fb-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/sant-og/sant-fb-og.png`,
                alt: "संत आणि संप्रदाय माहिती - Sant And Sampradye",
                width: 1200,
                height: 630,
                type: "image/png"
            },
            {
                url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/sant-og/sant-insta-og.png`,
                secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/sant-og/sant-insta-og.png`,
                alt: "संत आणि संप्रदाय माहिती - Sant And Sampradye",
                width: 1080,
                height: 1080,
                type: "image/png"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "संत आणि संप्रदाय माहिती - Sant And Sampradye",
        description: "वाचा सर्व संत आणि  संप्रदाय ची माहिती आणि त्यांचे साहित्य - abhangvani.कॉम वर ते हि फ्री...-Read information about all sant and sampradye and their literature - on abhangvani.com it's free...",
        images: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/sant-og/sant-twitter-og.png`,
    },
    robots: {
        index: false,
        follow: true,
    },
};

const SantHome = async () => {
    return (
        <SantListComponent></SantListComponent>
    )
}

export default SantHome;