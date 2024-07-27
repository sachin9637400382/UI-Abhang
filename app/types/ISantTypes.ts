import { IDocument } from "./IDocument"
import { ISantList } from "./ISant"

export interface ISantTypes {
    id: string
    name: string
    description: string,
    urlId: string,
    order:number,
    click: string,
    document:IDocument
    sants: ISantList
}

export type ISantTypesList = ISantTypes[]