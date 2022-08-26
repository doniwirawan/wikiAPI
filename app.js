const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')

const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))

// todolist ada disini



app.listen(process.env.PORT || 3000, () => {
    if (!err) {
        console.log('port running on localhost:3000')
    }
})
