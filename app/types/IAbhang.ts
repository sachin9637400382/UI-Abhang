import { ISant } from "./ISant"

export interface IAbhang {

    id: string,
    name: string,
    content: string,
    click : string
    urlId: string,
    sant:ISant
}

export type IAbhangList = IAbhang[]