import API_ENDPOINTS from "../../../utils/api-endpoints";
import { Metadata } from "next";
import React from "react";
import AbhangDetatilsComponent from "@abhang/components/abhang/abhang-details-component";
import { apiCall } from "@abhang/app/utils/fetch";
import { IAbhang } from "@abhang/app/types/IAbhang";
import HELPERS from "@abhang/app/utils/helper";

var meta = HELPERS.defaultMeta;
export async function generateMetadata({ params }: { params: { santName: string, abhangId: string } }): Promise<Metadata> {
    const { Data: Abhang } = await apiCall<IAbhang>(`${API_ENDPOINTS.GET_ABHANG_BY_ID}${params.abhangId}`, 'GET');
    if (Abhang !== undefined || Abhang !== null) {
        meta.title = `${Abhang?.sant?.name} - ${Abhang?.name}`
        meta.description = `माहिती -${Abhang?.name} - ${Abhang?.name}- वाचा सर्व ग्रंथ,आरती,कादंबरी,अभंग,संत आणि संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री...-Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...`,
            meta.openGraph.url = `${API_ENDPOINTS.DOMAIN_BASE_URL}${Abhang.click}`
        meta.openGraph.title = `${Abhang?.name} - ${Abhang?.name}`
        meta.openGraph.description = `माहिती -${Abhang?.name} - ${Abhang?.name} - वाचा सर्व ग्रंथ,आरती,कादंबरी,अभंग,संत आणि संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री...-Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...`,
            meta.openGraph.images = (Abhang?.sant?.document?.url !== null || Abhang?.sant?.document?.url !== undefined) ? [
                {
                    url: HELPERS.getDocUrl(Abhang?.sant?.document?.url),
                    secureUrl: HELPERS.getDocUrl(Abhang?.sant?.document?.url),
                    alt: `${Abhang?.name} - ${Abhang?.name}`,
                    width: 1200,
                    height: 630,
                    type: "image/png"
                },
                {
                    url: HELPERS.getDocUrl(Abhang?.sant?.document?.url),
                    secureUrl: HELPERS.getDocUrl(Abhang?.sant?.document?.url),
                    alt: `${Abhang?.name} - ${Abhang?.name}`,
                    width: 1080,
                    height: 1080,
                    type: "image/png"
                }
            ] : meta.openGraph.images,
            meta.twitter = (Abhang?.sant?.document?.url !== null || Abhang?.sant?.document?.url !== undefined) ? {
                card: "summary_large_image",
                title: `${Abhang?.name} - ${Abhang?.name}`,
                description: `माहिती -${Abhang?.name} - ${Abhang?.name} - वाचा सर्व ग्रंथ,आरती,कादंबरी,अभंग,संत आणि संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री...-Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...`,
                images: HELPERS.getDocUrl(Abhang?.sant?.document?.url),
            } : meta.twitter
    }
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

const Abhangs = async ({ params }: { params: { santName: string, abhangId: string } }) => {
    return (
        <AbhangDetatilsComponent santName={params?.santName} abhangId={params?.abhangId} />
    )
}

export default Abhangs;