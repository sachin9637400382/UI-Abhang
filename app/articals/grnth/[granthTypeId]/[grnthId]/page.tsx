import { Metadata } from "next";
import React from "react";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import GrnthDetailsComponent from "@abhang/components/articals/grnth/grnth-details-component";
import { apiCall } from "@abhang/app/utils/fetch";
import HELPERS from "@abhang/app/utils/helper";
import { IContentType } from "@abhang/app/types/IContentType";

const getGranthDetails = async (aratiContetnTypeId: string): Promise<IContentType> => {
    const { Data } = await apiCall<IContentType>(`${API_ENDPOINTS.GET_CONTENT_TYPE_BY_URLID}${aratiContetnTypeId}`, 'GET');
    return Data;
}

var meta = HELPERS.defaultMeta;
export async function generateMetadata({ params }: { params: { granthTypeId: string, grnthId: string } }): Promise<Metadata> {
    console.log('granthTypeId, grnthId', params.granthTypeId, params.grnthId)
    await getGranthDetails(params.granthTypeId).then((granths) => {
        var index = granths?.contents?.findIndex((item) => item.urlId === params.grnthId) || 0;
        if (index !== -1) {
            const contentNames = granths?.contents?.map(sant => sant.name).join(',');
            meta.title = `*${granths?.name} - वाचा नवनवीन मराठी ग्रंथ* `,
                meta.description = `*${granths?.name} - ${contentNames} - वाचा नवनवीन मराठी ग्रंथ अभंगवाणी वर* `,
                meta.openGraph.url = `${API_ENDPOINTS.DOMAIN_BASE_URL}${granths?.click}`
            meta.openGraph.title = `*${granths?.name} -वाचा नवनवीन मराठी ग्रंथ* `,
                meta.openGraph.description = `*${granths?.name} - ${contentNames} - वाचा नवनवीन मराठी ग्रंथ अभंगवाणी वर* `,
                meta.openGraph.images = (granths?.document?.url !== null || granths?.document?.url !== undefined) ? [
                    {
                        url: HELPERS.getDocUrl(granths?.document?.url),
                        secureUrl: HELPERS.getDocUrl(granths?.document?.url),
                        alt: `*${granths?.name} - ${contentNames} - वाचा नवनवीन मराठी ग्रंथ अभंगवाणी वर* `,
                        width: 1200,
                        height: 630,
                        type: "image/png"
                    },
                    {
                        url: HELPERS.getDocUrl(granths?.document?.url),
                        secureUrl: HELPERS.getDocUrl(granths?.document?.url),
                        alt: `*${granths?.name} - ${contentNames} - वाचा नवनवीन मराठी ग्रंथ अभंगवाणी वर* `,
                        width: 1080,
                        height: 1080,
                        type: "image/png"
                    }
                ] : meta.openGraph.images,
                meta.twitter = (granths?.document?.url !== null || granths?.document?.url !== undefined) ? {
                    card: "summary_large_image",
                    title: `*${granths?.name} -वाचा नवनवीन मराठी ग्रंथ* `,
                    description: `*${granths?.name} - ${contentNames} - वाचा नवनवीन मराठी ग्रंथ अभंगवाणी वर* `,
                    images: HELPERS.getDocUrl(granths?.document?.url),
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

const GranthDetails = async ({ params }: { params: { granthTypeId: string, grnthId: string } }) => {
    return (
        <GrnthDetailsComponent granthTypeId={params?.granthTypeId} grnthId={params?.grnthId} />
    )
}

export default GranthDetails;