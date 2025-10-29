export enum ItemRarity {
    ConsumerGrade = "ConsumerGrade",
    IndustrialGrade = "IndustrialGrade",
    MilSpec = "MilSpec",
    Restricted = "Restricted",
    Classified = "Classified",
    Covert = "Covert",
    Contraband = "Contraband"
}

export interface CaseItem {
    id: number
    name: string
    price: number
    collection?: string 
    imagePath: string
}

export interface SkinItem {
    id: number
    name: string
    rarity : ItemRarity
    price: number
    collection?: string 
    imagePath: string
}