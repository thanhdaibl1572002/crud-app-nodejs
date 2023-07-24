import { Router } from 'express'
import { upload } from '@/utils/upload'
import { createProduct, readProduct, updateProduct, deleteProduct } from '@/controllers/product'
import { checkProductExistence, validateProductId } from '@/middlewares/product'

const ProductRouter = Router()

ProductRouter.post(
    '/create', 
    upload.array('product-images', 3), 
    createProduct
)

ProductRouter.get(
    '/read', 
    validateProductId,
    checkProductExistence,
    readProduct
)

ProductRouter.put(
    '/update', 
    upload.array('product-images', 3), 
    validateProductId,
    checkProductExistence,
    updateProduct
)

ProductRouter.delete(
    '/delete',  
    validateProductId,
    checkProductExistence,
    deleteProduct
)


export default ProductRouter