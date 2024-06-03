import User from '../../../DB/Models/user.model.js';
import Post from '../../../DB/Models/post.model.js';
import Comment from '../../../DB/Models/comment.model.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

// ============================ registeration ===============================
// data
export const registerUser = async (req, res, next) => {
    const { username, email, pass } = req.body

    // hard requirements
    if (!username || !email || !pass) {
        return res.json({ message: 'All fields are required' })
    }

    // check email is unique
    const isEmailExist = await User.findOne({
        where: {
            email
        }
    })
    if (isEmailExist) {
        return res.json({ message: 'Email already exists' })
    }

    const newUser = await User.create({ username, email, password: pass })

    res.json({ message: 'User added successfully', newUser })
}


// ================================ login ===================================
export const loginUser = async (req, res, next) => {
    const { email, pass } = req.body


    // find email
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (!user) {
        return res.json({ message: 'invalid email or password' })
    }

    // check login status
    if (user.loginFlag == true) {
        return res.json({ message: 'user is already logged in' })
    }

    // is password valid
    const validPassword = await user.validPassword(pass);
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }


    // Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // changing login flag 
    user.loginFlag = true;
    await user.save();


    res.json({ message: 'login successful', token, user });
}


// ================================ logout ==================================

// ==================================================================================================================
// ==================================================================================================================
// ============================= Front end developer should  handle the logout ======================================
// ======================== Just remove the TOKEN from the browser's local storage ==================================
// ==================================================================================================================
// ==================================================================================================================
export const logoutUser = async (req, res, next) => {
    const userId = req.user.id;

    const user = await User.findByPk(userId)
    if (!user) {
        return res.json({ message: 'This email does NOT exist' })
    }

    if (user.loginFlag == false) {
        return res.json({ message: 'user is already logged out' })
    }

    user.loginFlag = false;
    await user.save();

    res.json({ message: 'User logged out successfully' })
}


// ========================== get author with all their posts ==============================
export const getAuthorPosts = async (req, res, next) => {
    try {
        const userId = req.query.id;
        const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'deleteFlag'],
                },
            ],
        });


        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ numberOfPosts: user.Posts.length, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ============ get a user with a specific post and post’s comments. ===================
export const getUserPostAllComments = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const postId = req.query.postId;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
        });
        const post = await Post.findByPk(postId,
            {
                include: [
                    {
                        model: Comment,
                        where: { userId },
                        attributes: ['id', 'content']
                    }
                ]
            }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const data = {
            user: { ...user.toJSON(), post }
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }




};