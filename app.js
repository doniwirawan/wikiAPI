const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const { urlencoded } = require('body-parser')

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true })

const articleSchema = {
    title: String,
    body: String
}

const Article = new mongoose.model('Article', articleSchema)

const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))

// todolist ada disini
app.get('/articles', (req, res) => {
    console.log('fetch all articles')
})

app.get('/articles/:title', (req, res) => {
    console.log(req.params.title)
})

app.post('articles', (req, res) => {
    Article.find({}, (err, foundArticles) => {
        res.send(foundArticles)
        console.log(foundArticles)
    })
})

app.put('/articles/:title', (req, res) => {
    console.log(req.params.title)
})

app.patch('/articles/:title', (req, res) => {
    console.log(req.params.title)
})

app.delete('/articles/:title', (req, res) => {
    console.log(req.params.title)
})




app.listen(process.env.PORT || 3000, function (err, res) {
    if (!err) {
        console.log('port running on localhost:3000')
    }
})
