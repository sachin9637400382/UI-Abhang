import { IDocument } from "./IDocument"

export interface IContent {
    id: string,
    name: string,
    urlId: string,
    shortDescription: string,
    content: string,
    click: string,
    document: IDocument
}

export type IContentList = IContent[]