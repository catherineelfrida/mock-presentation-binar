const express=require('express')
const path=require('path')
const swaggerUI=require('swagger-ui-express')
const routers=require('./router')
const swaggerJSON = require('./openapi.json')

const app = new express()
const port=3000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")

app.set("views",path.join(__dirname,'./app/view'))

app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerJSON))

app.use(routers)

app.listen(port, () => 
    console.log(`Server runs at http://localhost:${port}`))

module.exports = app