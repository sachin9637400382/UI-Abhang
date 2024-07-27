import { IContent } from "./IContent"
import { IDocument } from "./IDocument"

export interface IContentType {
        id: string,
        urlId: string,
        name: string,
        shortDescription: string,
        document: IDocument,
        contentFormatTypeId: number,
        click: string,
        contents: IContent[]
}

export type IContentTypeList = IContentType[]