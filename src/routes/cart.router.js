
import {Router} from 'express'
import CartModel from '../DAO/mongoManager/models/cart.model.js'

const router = Router()

router.get('/', async (req,res) => {
    const findCart = await CartModel.find()
    res.send(findCart)
})
router.get('/:cid', async (req,res) => {
    const cid = req.params.cid
    const cart = await CartModel.findById(cid)
    res.send(cart)
})

router.post('/', async (req,res) => {
    const result = await CartModel.create({products: []})
    res.send(result)
})

//Add product to cart
router.post('/:cid/:pid', async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.query.quantity || 1
    const productToCart = await CartModel.findById(cid)
    productToCart.products.push({ id:pid, quantity })
    const result = productToCart.save()
    res.send(result)
})

export default router