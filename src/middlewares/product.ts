import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND } from '@/errors/codes'
import { productErrorMessage } from '@/errors/messages'
import { IResponse } from '@/interfaces/response'
import { ProductModel } from '@/models/product'
import { Request, Response, NextFunction } from 'express'
import { isValidObjectId } from 'mongoose'

export const validateProductId = async (req: Request, res: Response, next: NextFunction): Promise<Response<IResponse> | void> => {
    const productId: string = req.params.productId
    if (!isValidObjectId(productId))
        return res.status(HTTP_STATUS_BAD_REQUEST).json({
            message: productErrorMessage.PRODUCT_ID_INVALID_MESSAGE
        } as IResponse)
    next()
}

export const checkProductExistence = async (req: Request, res: Response, next: NextFunction): Promise<Response<IResponse> | void> => {
    const productId: string = req.params.productId
    const product = await ProductModel.findById(productId)
    if (!product)
        return res.status(HTTP_STATUS_NOT_FOUND).json({
            message: productErrorMessage.PRODUCT_NOT_FOUND_MESSAGE
        } as IResponse)

    req.product = product
    next()
}