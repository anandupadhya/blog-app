require('dotenv').config()

const express = require("express")
const methodOverride = require("method-override")
const connectDB = require('./config/db')

const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
connectDB()

app.use(methodOverride('_method'))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
	res.redirect("/posts")
})

app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)
app.use("/users", userRoutes)

app.listen(3000, () => {
	console.log("SERVER IS RUNNING")
})