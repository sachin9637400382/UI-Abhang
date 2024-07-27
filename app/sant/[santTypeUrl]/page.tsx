
import API_ENDPOINTS from "../../utils/api-endpoints";
import { Metadata } from "next";
import SantDetailsComponent from "@abhang/components/sant/sant-detatils-component";
import HELPERS from "@abhang/app/utils/helper";
import { apiCall } from "@abhang/app/utils/fetch";
import { ISant } from "@abhang/app/types/ISant";


const getSant = async (santName: string = ""): Promise<ISant> => {
    const { Data } = await apiCall<ISant>(`${API_ENDPOINTS.GET_SANT_DETAILS_BY_NAME}${santName}`, 'GET');
    return Data
  }
   
  var meta = HELPERS.defaultMeta;
  export async function generateMetadata({ params }: { params: { santTypeUrl: string } }): Promise<Metadata> {
    await getSant(params?.santTypeUrl).then((santDetails) => {
      if (santDetails) {
        const name = `${santDetails.name}(${santDetails?.santType?.name})`
        const abhangsNames = santDetails?.abhangs?.map(sant => sant.name).join(',');
        meta.title = `${name} - माहिती`,
        meta.description = `*${name}- ${abhangsNames} यांचे अभंग,ग्रंथ,जीवन चरित्र आदी माहिती abhangvani.कॉम वर ते हि फ्री...-Read information about all sant and abhang,granth,jivan charita - on abhangvani.com it's free...*`,
        meta.openGraph.url = `${API_ENDPOINTS.DOMAIN_BASE_URL}${santDetails.click}}`
        meta.openGraph.title = `${name} - माहिती`,
        meta.openGraph.description = `*${name}- ${abhangsNames} यांचे अभंग,ग्रंथ,जीवन चरित्र आदी माहिती abhangvani.कॉम वर ते हि फ्री...-Read information about all sant and abhang,granth,jivan charita - on abhangvani.com it's free...*`,
        meta.openGraph.images = (santDetails?.document?.url !== null || santDetails?.document?.url !== undefined) ? [
          {
              url: HELPERS.getDocUrl(santDetails?.document?.url),
              secureUrl: HELPERS.getDocUrl(santDetails?.document?.url),
              alt:  `${name} - माहिती`,
              width: 1200,
              height: 630,
              type: "image/png"
          },
          {
              url:  HELPERS.getDocUrl(santDetails?.document?.url),
              secureUrl:  HELPERS.getDocUrl(santDetails?.document?.url),
              alt:  `${name} - माहिती`,
              width: 1080,
              height: 1080,
              type: "image/png"
          }
        ] : meta.openGraph.images,
        meta.twitter = (santDetails?.document?.url !== null || santDetails?.document?.url !== undefined) ? {
          card: "summary_large_image",
          title:  `${name} - माहिती`,
          description: `*${name}- ${abhangsNames} यांचे अभंग,ग्रंथ,जीवन चरित्र आदी माहिती abhangvani.कॉम वर ते हि फ्री...-Read information about all sant and abhang,granth,jivan charita - on abhangvani.com it's free...*`,
          images:  HELPERS.getDocUrl(santDetails?.document?.url),
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

const SantDetails = async ({ params }: { params: { santTypeUrl: string } }) => {
    return (
        <SantDetailsComponent santName={params.santTypeUrl} />
    )
}

export default SantDetails;