// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
const dotenv = require("dotenv");

dotenv.config();


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABSE_URL, { family: 4 })
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to mongoose"))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3033)