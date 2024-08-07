import { IDocument } from "./IDocument"

export interface IContent {
    id: string,
    name: string,
    urlId: string,
    shortDescription: string,
    content: string,
    click: string,
    document: IDocument,
    isFilrUrl:boolean
}

export type IContentList = IContent[]