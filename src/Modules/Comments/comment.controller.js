import Comment from "../../../DB/Models/comment.model.js"
import Post from "../../../DB/Models/post.model.js"
import User from "../../../DB/Models/user.model.js"


// ============================ Add Comment ===============================
// data
export const addComment = async (req, res, next) => {
    const { content, postId } = req.body
    const userId = req.user.id;

    // hard requirements
    if (!content || !postId) {
        return res.json({ message: 'All fields are required' })
    }

    // check postID exist
    const isPostExist = await Post.findOne({
        where: {
            id: postId
        }
    })
    if (!isPostExist) {
        return res.json({ message: 'Error: that post does NOT exist' })
    }

    const newComment = await Comment.create({ content, postId, userId })
    res.json({ message: 'Comment added successfully', newComment })
}



// ============================ Get all comments ===============================
export const listComments = async (req, res, next) => {
    const comments = await Comment.findAll()
    res.json(comments)
}
// ============================ Get specific comment ===============================
export const listSpecificComment = async (req, res, next) => {
    const { id } = req.params;
    const comment = await Comment.findByPk(id)
    if (!comment) {
        return res.json({ error: 'Comment not found' });
    }
    res.json({ meassage: 'Comment found', comment })
}



// ============================ Delete comment ===============================
export const deleteComment = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;

    try {
        const comment = await Comment.findByPk(id);
        if (!comment || comment.userId !== userId) {
            return res.status(403).json({ error: 'You can only delete your own comments' });
        }
        // Hard delete
        await comment.destroy();
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// ============================ Update comment ===============================
export const updateComment = async (req, res, next) => {
    const { content } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const comment = await Comment.findByPk(id);
        if (!comment || comment.userId !== userId) {
            return res.status(403).json({ error: 'You can only delete your own comments' });
        }

        const data = await Comment.update({
            content
        },
            {
                where: {
                    id
                }
            })
        if (!data[0]) {
            return res.json({ message: 'Comment not found' })
        }

        res.json({ message: 'Comment updated successfully', data })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


