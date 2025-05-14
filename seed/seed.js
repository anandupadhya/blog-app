require('dotenv').config()
const path = require('path')
const fs = require('fs').promises

const { faker } = require("@faker-js/faker")
const mongoose = require('mongoose');

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

const seedDB = async () => {
	// load avatar pic file names
	const avatarsPath = path.join(__dirname, '..', 'public', 'avatars')
	let avatarFiles = await fs.readdir(avatarsPath)
	
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
