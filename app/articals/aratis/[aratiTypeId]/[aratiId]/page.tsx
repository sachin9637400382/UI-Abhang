import { Metadata } from "next";
import React from "react";
import AratiDetailsComponent from "@abhang/components/articals/aratis/arati-details-component";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import HELPERS from "@abhang/app/utils/helper";
import { IContentType } from "@abhang/app/types/IContentType";

const getAratiDetails = async (aratiContetnTypeId: string): Promise<IContentType> => {
    var url = `${API_ENDPOINTS.GET_CONTENT_TYPE_BY_URLID}${aratiContetnTypeId}`;
    const { Data, StatusCode } = await apiCall<IContentType>(url, 'GET');

    return Data;
}

var meta = HELPERS.defaultMeta;
export async function generateMetadata({ params }: { params: { aratiTypeId: string, aratiId: string } }): Promise<Metadata> {
    const Data = await getAratiDetails(params?.aratiTypeId).then((aratis) => {
        var index = aratis?.contents?.findIndex((item) => item?.urlId === params?.aratiId) || 0;
        if (index !== -1) {
            const contentNames = aratis?.contents?.map(sant => sant.name).join(',');
            meta.title = `*${aratis.name} - वाचा नवनवीन मराठी आरती* `,
                meta.description = `*${aratis.name} - ${contentNames} - वाचा नवनवीन मराठी आरती  अभंगवाणी वर* `,
                meta.openGraph.url = `${API_ENDPOINTS.DOMAIN_BASE_URL}${aratis.click}`
            meta.openGraph.title = `*${aratis.name} -वाचा नवनवीन मराठी आरती* `,
                meta.openGraph.description = `*${aratis.name} - ${contentNames} - वाचा नवनवीन मराठी आरती  अभंगवाणी वर* `,
                meta.openGraph.images = (aratis?.document?.url !== null || aratis?.document?.url !== undefined) ? [
                    {
                        url: HELPERS.getDocUrl(aratis?.document?.url),
                        secureUrl: HELPERS.getDocUrl(aratis?.document?.url),
                        alt: `*${aratis.name} - ${contentNames} - वाचा नवनवीन मराठी आरती  अभंगवाणी वर* `,
                        width: 1200,
                        height: 630,
                        type: "image/png"
                    },
                    {
                        url: HELPERS.getDocUrl(aratis?.document?.url),
                        secureUrl: HELPERS.getDocUrl(aratis?.document?.url),
                        alt: `*${aratis.name} - ${contentNames} - वाचा नवनवीन मराठी आरती  अभंगवाणी वर* `,
                        width: 1080,
                        height: 1080,
                        type: "image/png"
                    }
                ] : meta.openGraph.images,
                meta.twitter = (aratis?.document?.url !== null || aratis?.document?.url !== undefined) ? {
                    card: "summary_large_image",
                    title: `*${aratis.name} -वाचा नवनवीन मराठी आरती* `,
                    description: `*${aratis.name} - ${contentNames} - वाचा नवनवीन मराठी आरती  अभंगवाणी वर* `,
                    images: HELPERS.getDocUrl(aratis?.document?.url),
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

const AratisDetails = async ({ params }: { params: { aratiTypeId: string, aratiId: string } }) => {
    return (
        <AratiDetailsComponent aratiTypeId={params?.aratiTypeId} aratiId={params?.aratiId} />
    )
}

export default AratisDetails;