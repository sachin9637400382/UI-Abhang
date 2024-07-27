export interface IApplicationSearch {
    sants: IApplicationChildItem[],
    abhangs: IApplicationChildItem[],
    granths: IApplicationChildItem[],
    aratis: IApplicationChildItem[],
    kadambari: IApplicationChildItem[],
    content: IApplicationChildItem[]
}

export interface IApplicationChildItem {
    id: string,
    name: string,
    click: string,
}
export type IApplicationSearchList = IApplicationSearch[]