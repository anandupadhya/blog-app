const express = require("express")
const router = express.Router()

const Comment = require('../models/Comment')

// DELETE = delete one comment
router.delete("/:commentId", async (req, res) => {
	const commentId = req.params.commentId
	const deletedComment = await Comment.findByIdAndDelete(commentId)
	res.redirect(`/posts/${deletedComment.postId}`)
})

module.exports = router