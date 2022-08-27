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
        Article.find({}, (err, articles) => {
            if (articles) {
                const jsonArticles = JSON.stringify(articles);
                res.send(jsonArticles);
            } else {
                res.send("No articles currently in wikiDB.");
            }
        })
    })
    .post((req, res) => {
        const newArticle = Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save((err) => {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        })
    })
    .delete((req, res) => {
        Article.deleteMany((err) => {
            if (!err) {
                res.send("Successfully deleted all the articles in wikiDB.");
            } else {
                res.send(err);
            }
        })
    })


app.route('/articles/:title')
    .get((req, res) => {
        // console.log(req.params.title)
        const title = req.params.title
        Article.findOne({ title }, (err, articles) => {
            if (article) {
                const jsonArticle = JSON.stringify(article);
                res.send(jsonArticle);
            } else {
                res.send("No article with that title found.");
            }

        })
    })
    .put((req, res) => {
        // console.log(req.params.title)
        const title = req.params.title
        Article.update({ title }, { title: req.body.title, content: req.body.content }, { overwrite: true }, (err, articles) => {
            if (!err) {
                res.send("Successfully updated selected article.");
            } else {
                res.send(err);
            }
        })
    })
    .patch((req, res) => {
        const title = req.params.title
        Article.update({ title }, { $set: req.body }, (err, articles) => {
            if (!err) {
                res.send("Successfully updated the content of the selected article.");
            } else {
                res.send(err);
            }

        })
    })
    .delete(async (req, res) => {
        console.log(req.params.title)
        const title = req.params.title
        Article.deleteOne({ title }, (err, articles) => {
            if (!err) {
                res.send("Successfully deleted selected article.");
            } else {
                res.send(err);
            }

        })
    })

app.listen(process.env.PORT || 3000, function (err, res) {
    if (!err) {
        console.log('port running on localhost:3000')
    }
})
