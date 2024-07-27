import { Metadata } from "next";
import HomeComponent from "@abhang/components/home/home-component";
import API_ENDPOINTS from "./utils/api-endpoints";

export async function generateMetadata(): Promise<Metadata> {
  //const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  //const post: BlogPost = await response.json();
  return {
    title: "अभंगवाणी-Abhangvani",
    description: "वाचा सर्व ग्रंथ, आरती , कादंबरी , अभंग , संत आणि  संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री... -Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...",
    keywords: ["ग्रंथ", "संत",
      "आरती",
      "कादंबरी",
      "अभंग",
      "संत आणि  संप्रदाय संतांची माहिती",
      "पवित्र व्यक्ती",
      "धार्मिक व्यक्ती",
      "धर्म",
      "आध्यात्मिकता",
      "सेवा",
      "संप्रदाय",
      "धार्मिक गट",
      "आध्यात्मिक गट",
      "गुरु",
      "शिकवणी",
      "भारतीय धार्मिक परंपरा",
      "भारतीय सांस्कृतिक परंपरा",
      "संत आणि संप्रदाय",
      "भारतीय संत",
      "भारतीय संप्रदाय"],
    openGraph: {
      url: `${API_ENDPOINTS.DOMAIN_BASE_URL}`,
      title: "अभंगवाणी-Abhangvani",
      description: "वाचा सर्व ग्रंथ,आरती,कादंबरी,अभंग,संत आणि संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री...-Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...",
      type: 'website',
      images: [
        {
          url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-fb-og.png`,
          secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-fb-og.png`,
          alt: "अभंगवाणी-Abhangvani",
          width: 1200,
          height: 630,
          type: "image/png"
        },
        {
          url: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-insta-og.png`,
          secureUrl: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-insta-og.png`,
          alt: "अभंगवाणी-Abhangvani",
          width: 1080,
          height: 1080,
          type: "image/png"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "अभंगवाणी",
      description: "वाचा सर्व ग्रंथ,आरती,कादंबरी,अभंग,संत आणि संप्रदाय संतांची माहिती आणि त्यांचे साहित्य - abhangvani.com ते हि फ्री...-Read All Granth,Aratis,Kadambaris,Abhangs ,Sant and Sampradaye Information free...",
      images: `${API_ENDPOINTS.DOMAIN_BASE_URL}assets/images/abhangvani-og/abhangvani-twitter-og.png`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function Home() {
  return (
    <HomeComponent />
  );
}
