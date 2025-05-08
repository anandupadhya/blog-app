const express = require("express")
const router = express.Router()

const commentController = require('../controllers/commentController.js')
const Comment = require('../models/Comment')

// DELETE = delete one comment
router.delete("/:commentId", async (req, res) => {
	const commentId = req.params.commentId
	const deletedComment = await Comment.findByIdAndDelete(commentId)
	res.redirect(`/posts/${deletedComment.postId}`)
})

// MANAGE COMMENTS
router.post("/manageComments", commentController.manageComments)

module.exports = router