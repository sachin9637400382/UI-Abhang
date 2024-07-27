import { IContentList } from "./IContent"

export interface IContentWithType {
    contentTypeName: string,
    id: string,
    urlId: string,
    documentUrl: string,
    shortDescription: string,
    click: string,
    contents:IContentList
}

export type IContentWithTypeList = IContentWithType[]