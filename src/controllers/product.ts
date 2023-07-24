import { Request, Response } from 'express'
import { IResponse } from '@/interfaces/response'
import { ProductModel } from '@/models/product'
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '@/errors/codes'
import { handleErrorResonse } from '@/utils/response'
import { productSuccessMessage } from '@/errors/messages'

export const createProduct = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    try {
        const product = new ProductModel(req.body)
        await product.save()
        return res.status(HTTP_STATUS_CREATED).json({ 
            message: productSuccessMessage.CREATE_PRODUCT_SUCCESS_MESSAGE
        } as IResponse)

    } catch (error: unknown) {
        return handleErrorResonse(error, res)
    }
}

export const readProduct = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    try {
        return res.status(HTTP_STATUS_OK).json({
            message: productSuccessMessage.READ_PRODUCT_SUCCESS_MESSAGE,
            data: req.product
        }  as IResponse)

    } catch (error: unknown) {
        return handleErrorResonse(error, res)
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.product._id, req.body, { new: true })
        return res.status(HTTP_STATUS_OK).json({
            message: productSuccessMessage.UPDATE_PRODUCT_SUCCESS_MESSAGE,
            data: updatedProduct
        } as IResponse)

    } catch (error: unknown) {
        return handleErrorResonse(error, res)
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    try {
        await ProductModel.findByIdAndUpdate(req.product._id, { isDeleted: true }, { new: true })
        return res.status(HTTP_STATUS_OK).json({
            message: productSuccessMessage.DELETE_PRODUCT_SUCCESS_MESSAGE
        } as IResponse)

    } catch (error: unknown) {
        return handleErrorResonse(error, res)
    }
}