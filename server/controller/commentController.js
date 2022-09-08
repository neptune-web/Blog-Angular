const Blog = require('../model/blogSchema');
const comment = require('../model/commentSchema');

// Add Comment
const postComment = async (req, res, next) => {
    const comment = {
        userId: req.user.id,
        name: req.user.name,
        comment: req.body.comment,
    }
    const blogId = req.body._id;
    console.log(blogId);
    try {
        const added_comment = await Blog.findByIdAndUpdate(blogId,{
            $push:{ 
                comments: comment,
            }
        }).sort({'postedAt' : -1});
        res.status(200).json({ added_comment, message: "Comment Successfully added" })
    }catch (error) {
        next({ status: 500, message: error.message })
    }
}



module.exports = { postComment }