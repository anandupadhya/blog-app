require('dotenv').config()

const { faker } = require("@faker-js/faker")
const mongoose = require('mongoose');

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

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
			email: firstName + "." + lastName + "@gmail.com"
		})
		users.push(user)
		console.log(user)
	}
	
	const user = await User.create({
		username: "AnandUpadhya",
		password: "11111",
		firstName: "Anand",
		lastName: "Upadhya",
		email: "Anand.Upadhya@gmail.com"
	})
	users.push(user)
	console.log(user)
	
	// generate posts and comments
	for (let i = 0; i < 10; i++) {
		const post = await Post.create({
			title: faker.book.title(),
			author: users[Math.floor(Math.random() * users.length)],
			text: faker.lorem.paragraphs(),
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
