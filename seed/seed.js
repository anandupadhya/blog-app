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
	
	for (let i = 0; i < avatarFiles.length-1; i++) {
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()
		const user = await User.create({
			username: firstName + lastName,
			password: "11111",
			firstName: firstName,
			lastName: lastName,
			email: firstName + "." + lastName + "@gmail.com",
			profilePic: avatarFiles[i],
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
		profilePic: avatarFiles[avatarFiles.length-1]
	})
	users.push(user)
	console.log(user)
	
	// generate posts, likes, and comments
	users.forEach(async (u) =>  {
		const numPosts = Math.floor(Math.random() * 6)
		for (let i = 0; i < numPosts; i++) {
			// create a new post
			const post = await Post.create({
				title: faker.book.title(),
				author: u,
				text: faker.lorem.paragraphs(),
				numLikes: 0,
				isPublished: true,
				isDeleted: false,
				likedBy: [],
			})

			// create likes by users
			for (let i = 0; i < 50; i++) {
				const user = users[Math.floor(Math.random() * users.length)]
				if (!post.likedBy.includes(user.id)) {
					post.likedBy.push(user.id)
					post.numLikes += 1
					await post.save()
				}
			}

			// create comments for post
			const numComments = Math.floor(Math.random() * 9) + 2
			for (let i = 0; i < numComments; i++) {
				await Comment.create({
					postId: post.id,
					author: users[Math.floor(Math.random() * users.length)],
					text: faker.lorem.sentence(),
				})
			}
		}
	})
	
	mongoose.connection.close()
}

seedDB()
