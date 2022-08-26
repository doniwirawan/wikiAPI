const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const { urlencoded } = require('body-parser')

// mongoose.connect('', { urlencoded: true })

// const article = new mongoose.Schema({
//     title: String,
//     body: String
// })

// const Article = new mongoose.model('Article', article)

const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))

// todolist ada disini



app.listen(process.env.PORT || 3000, function (err) {
    if (!err) {
        console.log('port running on localhost:3000')
    }
})
