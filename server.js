// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
const dotenv = require("dotenv");

dotenv.config();


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const recipesRouter = require('./routes/recipes')

const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABSE_URL, { family: 4 })
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to mongoose"))

app.use('/', indexRouter)
app.use('/recipes', recipesRouter)

app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3033)