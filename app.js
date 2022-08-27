const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const { urlencoded } = require('body-parser')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

const articleSchema = {
    title: String,
    content: String
}

const Article = new mongoose.model('Article', articleSchema)

const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('public'))

app.route('/articles')
    .get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            if (!err) {
                res.send(foundArticles)
                console.log(foundArticles)
            } else {
                res.send(err)
            }
        })
    })
    .post((req, res) => {
        // console.log(req.body.title)
        // console.log(req.body.content)
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save((err) => {
            if (!err) {
                res.send(newArticle)
            } else {
                res.send(err)
            }
        })
    })
    .delete((req, res) => {
        Article.deleteMany((err) => {
            if (!err) {
                res.send('successfully deleted all articles')
            } else {
                console.log(err)
            }
        })
    })


app.route('/articles/:title')
    .get((req, res) => {
        // console.log(req.params.title)
        const title = req.params.title
        Article.findOne({ title }, (err, foundArticles) => {
            if (!err) {
                res.send(foundArticles)
                console.log(foundArticles)
            } else {
                res.send(err)
            }

        })
    })
    .put((req, res) => {
        // console.log(req.params.title)
        const title = req.params.title
        Article.updateOne({ title }, { title: req.body.title, content: req.body.content }, { overwrite: true }, (err, foundArticles) => {
            if (!err) {
                res.send(foundArticles)
                console.log(foundArticles)
            } else {
                res.send(err)
            }

        })
    })
    .patch((req, res) => {
        console.log(req.params.title)
        const title = req.params.title

    })
    .delete(async (req, res) => {
        console.log(req.params.title)
        const title = req.params.title
        Article.findOneandDelete({ title }, (err, foundArticles) => {
            if (!err) {
                res.send(foundArticles)
                console.log(foundArticles)
                res.redirect('/')
            }

        })
    })

app.listen(process.env.PORT || 3000, function (err, res) {
    if (!err) {
        console.log('port running on localhost:3000')
    }
})
