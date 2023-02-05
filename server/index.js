const connectToMongo = require("./db")
const express = require('express')
const multer  = require('multer')
var cors = require('cors')
const path = require('path')

connectToMongo()
const app = express()
const port =  9000

app.use(cors())
app.use(express.json({ extended: false, limit: '50mb' }))

app.use('/uploads/images', express.static(path.join(__dirname, './uploads/images')));

app.get('/', (req, res) => {
    res.send('Hello Aman!')
  })

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/script', require('./routes/script_main'))
app.use('/api/scene', require('./routes/scene_main').router)
app.use('/api/category', require('./routes/category_main').router)
app.use('/api/item', require('./routes/item_main').router)
app.use('/api/', require('./routes/import_main'))

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})