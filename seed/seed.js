require('dotenv').config()

const { faker } = require("@faker-js/faker")
const mongoose = require('mongoose');

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

const avatarFiles = [
  'Multiavatar-1b86d46210a71a58ab.png',
  'Multiavatar-4a70b89e073219a9bd.png',
  'Multiavatar-4fbeec69f884112169.png',
  'Multiavatar-53681aa8c3fdf9571e.png',
  'Multiavatar-6216ed4c8a37d1d0f1.png',
  'Multiavatar-77a84f03aed0213921.png',
  'Multiavatar-b48b7fb012d49dc1dc.png',
  'Multiavatar-bf5e8b88eefa76f096.png',
  'Multiavatar-cfe0998f7579ce0855.png',
  'Multiavatar-f8dd8448e0b399b4d9.png'
]

const seedDB = async () => {
	// connect to database
	const uri = process.env.MONGODB_URI
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	
	// clear database
	await Comment.deleteMany({})
	await Post.deleteMany({})
	await User.deleteMany({})
	
	// generate users
	const users = []
	
	for (let i = 0; i < 10; i++) {
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()
		const user = await User.create({
			username: firstName + lastName,
			password: "11111",
			firstName: firstName,
			lastName: lastName,
			email: firstName + "." + lastName + "@gmail.com",
			profilePic: avatarFiles[Math.floor(Math.random() * avatarFiles.length)],
		})
		users.push(user)
		console.log(user)
	}
	
	const user = await User.create({
		googleId: "114991314493776009508",
		username: "AnandUpadhya",
		password: "11111",
		firstName: "Anand",
		lastName: "Upadhya",
		email: "anand.upadhya@gmail.com",
		profilePic: "Multiavatar-1b86d46210a71a58ab.png"
	})
	users.push(user)
	console.log(user)
	
	// generate posts and comments
	for (let i = 0; i < 10; i++) {
		const post = await Post.create({
			title: faker.book.title(),
			author: users[Math.floor(Math.random() * users.length)],
			text: faker.lorem.paragraphs(),
			numLikes: Math.floor(Math.random() * 100),
			isPublished: true,
			isDeleted: false,
		})
	
		for (let i = 0; i < 5; i++) {
			await Comment.create({
				postId: post.id,
				author: users[Math.floor(Math.random() * users.length)],
				text: faker.lorem.sentence(),
			})
		}
	}
	
	mongoose.connection.close()
}

seedDB()
