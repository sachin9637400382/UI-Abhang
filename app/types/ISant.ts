import { IAbhangList } from "./IAbhang"
import { IDocument } from "./IDocument"
import { ISantTypes } from "./ISantTypes"

export interface ISant {
    id: string,
    name: string,
    description: string, 
    urlId: string,
    click:string,
    document:IDocument,
    santType: ISantTypes
    abhangs:IAbhangList
}

export type ISantList = ISant[] 