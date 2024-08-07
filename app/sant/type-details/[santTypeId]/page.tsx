
import { ISantTypes } from "@abhang/app/types/ISantTypes";
import API_ENDPOINTS from "@abhang/app/utils/api-endpoints";
import { apiCall } from "@abhang/app/utils/fetch";
import HELPERS from "@abhang/app/utils/helper";
import SantTypeDetailsComponent from "@abhang/components/sant/sant-type-details";
import { Metadata } from "next";

const getSantWithType = async (searchQuery: string = ""): Promise<ISantTypes> => {
  const { Data } = await apiCall<ISantTypes>(`${API_ENDPOINTS.GET_SANT_TYPES_BY_ID}${searchQuery}`, 'GET');
  return Data
}
 
var meta = HELPERS.defaultMeta;
export async function generateMetadata({ params }: { params: { santTypeId: string } }): Promise<Metadata> {
  const Data = await getSantWithType(params?.santTypeId).then((santType) => {
    if (santType !== null || santType !== undefined) {
      const santNames = santType?.sants?.map(sant => sant.name).join(',');
      meta.title = `${santType?.name} - माहिती`,
      meta.description = `${santType?.name} या संप्रदाय मध्ये वाचा माहिती या संतांची  - ${santNames}`,
      meta.openGraph.url = `${API_ENDPOINTS.DOMAIN_BASE_URL}${santType?.click}`
      meta.openGraph.title = `${santType?.name} - माहिती`,
      meta.openGraph.description = `${santType?.name} या संप्रदाय मध्ये वाचा माहिती या संतांची  - ${santNames}`,
      meta.openGraph.images = (santType?.document?.url !== null || santType?.document?.url !== undefined) ? [
        {
            url: HELPERS.getDocUrl(santType?.document?.url),
            secureUrl: HELPERS.getDocUrl(santType?.document?.url),
            alt: `${santType?.name} - माहिती`,
            width: 300,
            height: 300,
            type: "image/jpg"
        },
        {
            url:  HELPERS.getDocUrl(santType?.document?.url),
            secureUrl:  HELPERS.getDocUrl(santType?.document?.url),
            alt: `${santType?.name} - माहिती`,
            width: 300,
            height: 300,
            type: "image/jpg"
        }
      ] : meta.openGraph.images,
      meta.twitter = (santType?.document?.url !== null || santType?.document?.url !== undefined) ? {
        card: "summary_large_image",
        title:  `${santType?.name} - माहिती`,
        description: `${santType?.name} या संप्रदाय मध्ये वाचा माहिती या संतांची  - ${santNames}`,
        images:  HELPERS.getDocUrl(santType?.document?.url),
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

const SantTypesDeatils = ({ params }: { params: { santTypeId: string } }) => {
  return (
    <SantTypeDetailsComponent santTypeId={params?.santTypeId} />
  )
}
 
export default SantTypesDeatils;