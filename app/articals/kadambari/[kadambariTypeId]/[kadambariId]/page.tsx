import { Metadata } from "next";
import React from "react";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import KadambariDetailsComponent from "@abhang/components/articals/kadambari/kadambari-details-component";
import HELPERS from "@abhang/app/utils/helper";
import { apiCall } from "@abhang/app/utils/fetch";
import { IContentType } from "@abhang/app/types/IContentType";

const getKadambariDetails = async (kadambariTypeId: string): Promise<IContentType> => {
    const { Data } = await apiCall<IContentType>(`${API_ENDPOINTS.GET_CONTENT_TYPE_BY_URLID}${kadambariTypeId}`, 'GET');
    return Data;
}

var meta = HELPERS.defaultMeta;
export async function generateMetadata({ params }: { params: { kadambariTypeId: string, kadambariId: string } }): Promise<Metadata> {
    await getKadambariDetails(params.kadambariTypeId).then((kadambari) => {
        var index = kadambari?.contents?.findIndex((item) => item.urlId === params.kadambariId) || 0;
        if (index !== -1) {
            const contentNames = kadambari?.contents?.map(sant => sant.name).join(',');
            meta.title = `*${kadambari?.name} - वाचा नवनवीन मराठी कादंबरी* `,
                meta.description = `*${kadambari?.name} - ${contentNames} - वाचा नवनवीन मराठी कादंबरी अभंगवाणी वर* `,
                meta.openGraph.url = `${API_ENDPOINTS.DOMAIN_BASE_URL}${kadambari?.click}`
            meta.openGraph.title = `*${kadambari?.name} - वाचा नवनवीन मराठी कादंबरी* `,
                meta.openGraph.description = `*${kadambari?.name} - ${contentNames} - वाचा नवनवीन मराठी कादंबरी अभंगवाणी वर* `,
                meta.openGraph.images = (kadambari?.document?.url !== null || kadambari?.document?.url !== undefined) ? [
                    {
                        url: HELPERS.getDocUrl(kadambari?.document?.url),
                        secureUrl: HELPERS.getDocUrl(kadambari?.document?.url),
                        alt: `*${kadambari?.name} - ${contentNames} - वाचा नवनवीन मराठी कादंबरी अभंगवाणी वर* `,
                        width: 1200,
                        height: 630,
                        type: "image/png"
                    },
                    {
                        url: HELPERS.getDocUrl(kadambari?.document?.url),
                        secureUrl: HELPERS.getDocUrl(kadambari?.document?.url),
                        alt: `*${kadambari?.name} - ${contentNames} - वाचा नवनवीन मराठी कादंबरी अभंगवाणी वर* `,
                        width: 1080,
                        height: 1080,
                        type: "image/png"
                    }
                ] : meta.openGraph.images,
                meta.twitter = (kadambari?.document?.url !== null || kadambari?.document?.url !== undefined) ? {
                    card: "summary_large_image",
                    title: `*${kadambari?.name} - वाचा नवनवीन मराठी कादंबरी* `,
                    description: `*${kadambari?.name} - ${contentNames} - वाचा नवनवीन मराठी कादंबरी अभंगवाणी वर* `,
                    images: HELPERS.getDocUrl(kadambari?.document?.url),
                } : meta.twitter
        }

    });
    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        openGraph: {
            url: meta.openGraph.url,
            title: meta.openGraph.title,
            description: meta.openGraph.description,
            type: 'website',
            images: meta.openGraph.images
        },
        twitter: meta.twitter,
        robots: {
            index: false,
            follow: true,
        },
    };
}

const KadambariDetails = async ({ params }: { params: { kadambariTypeId: string, kadambariId: string } }) => {
    return (
        <KadambariDetailsComponent kadambariTypeId={params?.kadambariTypeId} kadambariId={params?.kadambariId} />
    )
}

export default KadambariDetails;