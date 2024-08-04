// config/apiEndpoints.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.gadkilla.com/api/Abhangs/';
const DOMAIN_BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_BASE_URL  || '';
const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL  || '';
const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL  || '';
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL  || '';
const NEXT_PUBLIC_PLAYSTORE_URL = process.env.NEXT_PUBLIC_PLAYSTORE_URL || '';
const API_ENDPOINTS = {
    API_BASE_URL:API_BASE_URL,
    DOMAIN_BASE_URL: DOMAIN_BASE_URL,
    WHATSAPP_URL: WHATSAPP_URL,
    FACEBOOK_URL: FACEBOOK_URL,
    INSTAGRAM_URL: INSTAGRAM_URL,
    PLAYSTORE_URL : NEXT_PUBLIC_PLAYSTORE_URL,
    // GET_ARTIS_WITH_TYPE : "Abhangs/Contents/getaratis",
    // GET_GRNTHS_WITH_TYPE : "Abhangs/Contents/getgranth",
    // GET_KADAMBARI_WITH_TYPE : "Abhangs/Contents/getkadambaris",
    GET_GLOBAL_SETTINGS: "Common/GlobalSettings/getGlobalSettings",
    GET_SANT_TYPES : 'Abhangs/SantTypes/get',
    GET_SANT_TYPES_BY_ID : 'Abhangs/SantTypes/get/',

    GET_SANTS:"Abhangs/Sants/get",
    GET_ABHANG_WITH_SANT:"Abhangs/Abhangs/getAbhangWithSant",
    GET_SANT_DETAILS_BY_NAME:'Abhangs/Sants/get/',

    GET_ABHANG_BY_ID:"Abhangs/Abhangs/get/",
    GET_ABHANGS :'Abhangs/Abhangs/get',
    SHARE_ABHANG:"Abhangs/Abhangs/share/",

    GET_CONTENT_BY_URLID: "Abhangs/Contents/getbyurl/",
    GET_ENTITY_TYPEDATA : 'Common/GlobalSettings/getAbhangWaniData',
    GET_CONTENT_TYPE_BY_URLID: "Abhangs/ContentTypes/get/",
    
    GET_ARATIS_CONTENT_TYPE:'Abhangs/ContentTypes/getaratis',
    GET_CONTENT_TYPE_GRANTHS :'Abhangs/ContentTypes/getgranth',
    GET_CONTENT_TYPE_KADAMBARI :'Abhangs/ContentTypes/getkadambaris',

    GET_APPLICATION_SEARCH:"Abhangs/Search/abhang?query="
};

export default API_ENDPOINTS;
