import { IAbhangList } from "./IAbhang";
import { IContentTypeList } from "./IContentType";
import { ISantList } from "./ISant";
import { ISantTypes, ISantTypesList } from "./ISantTypes";

export interface IRelatedData {
   aratis: IContentTypeList,
   granths: IContentTypeList,
   kadambaris: IContentTypeList,
   abhangs: IAbhangList,
   santTypes: ISantTypesList,
   sants: ISantList
}
