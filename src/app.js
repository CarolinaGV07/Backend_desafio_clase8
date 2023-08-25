import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import ProductManager from './DAO/fileManager/ProductManager.js'
import __dirname from './utils.js'

const app = express()
app.use('/static', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

const runServer = () => {
    const httpServer = app.listen(8080, () => console.log('Listening...'))
        const io = new Server(httpServer)

        io.on('connection', socket => {
            socket.on('new-product', async data => {
                const productManager = new ProductManager()
                await productManager.createProduct(data)
                const products = await productManager.listProducts()
                io.emit('reload-table', products)
            })
        })
}

const URL = 'mongodb+srv://CarolinaCoderDB:3992coderbd@coderclustercgv.kecc4uv.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
console.log('Connecting...')
mongoose.connect(URL, {
    dbName: 'ecommerce'
})
    .then(() => {
        console.log('DB connected')
        runServer()})
    .catch(e => console.log('Can`t connect to DB'))

