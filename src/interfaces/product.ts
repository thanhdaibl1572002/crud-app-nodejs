import { Types } from 'mongoose'

export interface IProductModel extends Document {
    name: string
    brand: string
    description: string
    categories: Types.ObjectId[]
    specifications: {
        screen: string
        operatingSystem: string
        rearCamera: string
        frontCamera: string
        chip: string
        sim: string
        battery: string
        charger: string
    }
    variants: {
        variantId: string
        ram: number
        rom: number
        price: number
        colors: {
            name: string
            code: string
            image: string[]
            video: string[]
        }[]
        quantity: number
    }[]
    warranty: {
        months: number
        startAt: Date
        endAt: Date
        conditions: string
    }
    isDiscounted: {
        percent: number
        startAt: Date
        endAt: Date
    },
    isNew: boolean
    onSale: boolean
    isOutOfStock: boolean
    isDiscontinued: boolean
    isDeleted: boolean
}