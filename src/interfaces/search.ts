export enum SearchType {
    REALSTATE = 'realstate',
    RENT = 'rent',
    TRAINING = 'training',
    MENU = 'menu',
    MATERIAL = 'material',
}

export interface iSearch {
    id?: number
    title: string
    type: SearchType
}