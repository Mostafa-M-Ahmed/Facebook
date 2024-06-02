import Post from "../../../DB/Models/post.model.js"
import User from "../../../DB/Models/user.model.js"
import Comment from "../../../DB/Models/comment.model.js"




// ============================ Add Post ===============================
// data
export const addPost = async (req, res, next) => {
    const { title, content } = req.body
    const userId = req.user.id;

    // hard requirements
    if (!title || !content) {
        return res.json({ message: 'All fields are required' })
    }

    const newPost = await Post.create({ title, content, author: userId })
    res.json({ message: 'Post created successfully', newPost })
}



// ============================ Get all posts ===============================
export const listPosts = async (req, res, next) => {
    const posts = await Post.findAll()           // get all posts (no restrictions)
    res.json(posts)
}
// ============================ Get specific post ===============================
export const listSpecificPost = async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findByPk(id)
    if (!post) {
        return res.json({ error: 'Post not found' });
    }
    res.json({ meassage: `post found with id ${id}`, post })
}


// ============================ Delete post ===============================
export const deletePost = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;

    try {
        const post = await Post.findByPk(id);
        if (!post || post.author !== userId) {
            return res.status(403).json({ error: 'You can only delete your own posts' });
        }
        // // HARD DELETE
        // await post.destroy();

        if (post.deleteFlag == true) {
            return res.json({ error: 'That post it already deleted'})
        }

        // soft delete
        post.deleteFlag = true;
        await post.save();


        res.json({ message: 'Post has been (soft) deleted', post });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// ============================ Update post ===============================
export const updatePost = async (req, res, next) => {
    const { title, content } = req.body;
    const id  = req.params.id;
    const userId = req.user.id;


    try {
        const post = await Post.findByPk(id);
        if (!post || post.author !== userId) {
            return res.status(403).json({ error: 'You can only delete your own posts' });
        }

        post.title = title;
        post.content = content;
        await post.save();


        res.json({ message: 'Post updated successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


// ========================== get post with its author ==============================
export const getPostWithAuthor = async (req, res, next) => {
    try {
        const postId = req.query.id;
        const post = await Post.findOne({
            where: { id: postId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email'],
                },
            ],
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ========================= get specific post and its comments ========================
export const getPostWithComments = async (req, res, next) => {
    try {
        const postId = req.query.id;
        const post = await Post.findOne({
            where: { id: postId },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content'],
                },
            ],
        });


        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ numberOfComments: post.Comments.length, post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};