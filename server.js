const express = require('express')

const app = express()

const PORT = process.env.PORT || 8080

const Container = require('./classes/Container')

const productsContainer = new Container("products")

const server =  app.listen(PORT, () => {
    console.log(`Servidor http escuchando en `+PORT)
})

server.on("err", err =>  console.log(`Error in server ${err}`))

app.get('/',(req, res) => {
    res.send(`<div style='font-size: 2rem;text-align: center; margin-top: 5rem'>
                <h1>Desafio Clase 6 - Servidor Express</h1> 
                <br>
                <a href='/products'>See all Products</a>
                <br><br>
                <a href='/randomProduct'>See a Random Product</a>
            </div>`)
})

app.get('/products', (req, res) => {
    productsContainer.getAll()
    .then(result => res.send(result))
})

app.get('/randomProduct', async (req, res) => {
    let quantity = await productsContainer.getAll().then(result => result.length)
    let randomProduct = await productsContainer.getById(Math.floor(Math.random() * quantity + 1))
    res.send(randomProduct)
})