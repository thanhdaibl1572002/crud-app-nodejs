import { model } from 'mongoose'
import { IProductModel } from '@/interfaces/product'
import { Joi, convertJoiSchemaToMongoose } from '@/utils/joi'
import { PRODUCT_BRAND_REGEX, PRODUCT_DESCRIPTION_REGEX, PRODUCT_NAME_REGEX } from '@/utils/regexes'

export const JoiProductSchema = Joi.object({
    /**
     * Tên sản phẩm
     */
    name: Joi
    .string()
    .trim()
    .pattern(PRODUCT_NAME_REGEX)
    .required()
    .empty()
    .messages({

    }),
    /**
     * Thương hiệu sản phẩm
     */
    brand: Joi
    .string()
    .trim()
    .pattern(PRODUCT_BRAND_REGEX)
    .required()
    .empty()
    .messages({

    }),
    /**
     * Mô tả sản phẩm
     */
    description: Joi
    .string()
    .trim()
    .pattern(PRODUCT_DESCRIPTION_REGEX)
    .required()
    .default('')
    .messages({

    }),
    /**
     * Danh mục sản phẩm
     */
    categories: Joi
    .array().
    items(Joi.string().required()),
    /**
     * Thông số sản phẩm
     */
    specifications: Joi
    .object({
        screen: Joi.string().trim().required().default(''),
        operatingSystem: Joi.string().trim().required().default(''),
        rearCamera: Joi.string().trim().required().default(''),
        frontCamera: Joi.string().trim().required().default(''),
        chip: Joi.string().trim().required().default(''),
        sim: Joi.string().trim().required().default(''),
        battery: Joi.string().trim().required().default(''),
        charger: Joi.string().trim().required().default(''),
    })
    .required(),
    /**
     * Biến thể sản phẩm
     */
    variants: Joi
    .array()
    .items({
        variantId: Joi.string().trim().required(),
        ram: Joi.number().required(),
        rom: Joi.number().required(),
        price: Joi.number().required(),
        colors: Joi
        .array()
        .items({
            name: Joi.string().trim().required(),
            code: Joi.string().trim().required(),
            image: Joi.array().items(Joi.string().default([])),
            video: Joi.array().items(Joi.string().default([])),
        }),
        quantity: Joi.number().required().default(0)
    })
    .required(),
    /**
     * Bảo hành sản phẩm
     */
    warranty: Joi
    .object({
        months: Joi.number().required().default(0),
        startAt: Joi.date().required().default(null),
        endAt: Joi.date().required().default(null),
        conditions: Joi.string().trim(),
    })
    .required(),
    /**
     * Giảm giá sản phẩm
     */
    isDiscounted: Joi
    .object({
        percent: Joi.number().required().default(0),
        startAt: Joi.date().required().default(null),
        endAt: Joi.date().required().default(null),
    })
    .required(),
    /**
     * Sản phẩm mới
     */
    isNew: Joi
    .boolean()
    .required()
    .default(false),
    /**
     * Sản phẩm đang được bán
     */
    onSale: Joi
    .boolean()
    .required()
    .default(true),
    /**
     * Sản phẩm đang còn hàng
     */
    isOutOfStock: Joi
    .boolean()
    .required()
    .default(true),
    /**
     * Sản phẩm ngừng bán
     */
    isDiscontinued: Joi
    .boolean()
    .required()
    .default(false),
    /**
     * Sản phẩm bị xóa
     */
    isDeleted: Joi
    .boolean()
    .required()
    .default(false),
})

const ProductSchema = convertJoiSchemaToMongoose(JoiProductSchema)

export const ProductModel = model<IProductModel>('product', ProductSchema)