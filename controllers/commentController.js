const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

exports.manageComments = async (req, res) => {
	let comments = req.body.comments
	if (!Array.isArray(comments)) {
		comments = [ comments ]
	}
	
	const action = req.body.action
	const destination = req.body.destination
	
	console.log(action, comments, destination)
	
	if (action === "destroy") {
		await comments.forEach( async (commentId) => {
			await Comment.findByIdAndDelete(commentId)
		})
	} 
	// else if (action === "publish") {
	// 	await posts.forEach( async (postId) => {
	// 		await Post.findByIdAndUpdate(
	// 			postId,
	// 			{ $set: { isPublished : true } }
	// 		)
	// 	})
	// } else if (action === "unpublish") {
	// 	await posts.forEach( async (postId) => {
	// 		await Post.findByIdAndUpdate(
	// 			postId,
	// 			{ $set: { isPublished : false } }
	// 		)
	// 	})
	// } else if (action === "restore") {
	// 	await posts.forEach( async (postId) => {
	// 		await Post.findByIdAndUpdate(
	// 			postId,
	// 			{ $set: { isDeleted : false } }
	// 		)
	// 	})
	// } else if (action === "delete") {
	// 	await posts.forEach( async (postId) => {
	// 		await Post.findByIdAndUpdate(
	// 			postId,
	// 			{ $set: { isDeleted : true } }
	// 		)
	// 	})
	// }
	
	// if (destination) {
	// 	res.redirect(destination)
	// 	return
	// }
	
	res.redirect("/users/profile")
}