require('dotenv').config()

const express = require("express")
const methodOverride = require("method-override")
const connectDB = require('./config/db')

const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // make sure to import your passport config

const app = express()
connectDB()

app.use(methodOverride('_method'))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}))

app.use(session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.get("/", (req, res) => {
	res.redirect("/posts")
})

app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)

app.listen(3000, () => {
	console.log("SERVER IS RUNNING")
})