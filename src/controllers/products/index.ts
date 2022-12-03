import { Response, Request } from 'express'
import { IProduct } from '../../types/product'
import Product from '../../models/product'

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: IProduct[] = await Product.find()
    res.status(200).json({ products })
  } catch (error) {
    throw error
  }
}

const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id)
    res
      .status(product ? 200 : 404)
      .json({ product } || { resp: 'Product not found' })
  } catch (error) {
    throw error
  }
}

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    type NewType = Pick<IProduct, 'name' | 'description' | 'price' | 'picture'>

    const body = req.body as NewType

    const product: IProduct = new Product({
      ...body,
      active: true
    })

    const newproduct: IProduct = await product.save()
    res.status(201).json({ message: 'Product added', id: newproduct._id })
  } catch (error) {
    throw error
  }
}

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req
    const product: IProduct | null = await Product.findByIdAndUpdate(
      { _id: id },
      body
    )
    res.status(product ? 200 : 404).json(
      product
        ? {
            message: 'Product updated',
            id: product?._id
          }
        : { message: 'Product not found' }
    )
  } catch (error) {
    throw error
  }
}

const disableProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req
    const product: IProduct | null = await Product.findByIdAndUpdate(
      { _id: id },
      { active: false }
    )
    res.status(product ? 200 : 404).json(
      product
        ? {
            message: 'Product disabled',
            id: product?._id
          }
        : { message: 'Product not found' }
    )
  } catch (error) {
    throw error
  }
}

const enableProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req
    const product: IProduct | null = await Product.findByIdAndUpdate(
      { _id: id },
      { active: true }
    )
    res.status(product ? 200 : 404).json(
      product
        ? {
            message: 'Product disabled',
            id: product?._id
          }
        : { message: 'Product not found' }
    )
  } catch (error) {
    throw error
  }
}

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedproduct: IProduct | null = await Product.findByIdAndRemove(
      req.params.id
    )
    res.status(200).json({
      message: 'Product deleted'
    })
  } catch (error) {
    throw error
  }
}

export {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  disableProduct,
  enableProduct
}
