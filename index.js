import express from 'express'
import userRouter from "./src/Modules/User/user.routes.js";
import postRouter from "./src/Modules/Posts/post.routes.js";
import commentRouter from "./src/Modules/Comments/comment.routes.js";
import testConnection from './DB/connection.js';
import { dbConnection } from "./DB/connection.js";
import User from './DB/Models/user.model.js';
import Post from './DB/Models/post.model.js';
import Comment from './DB/Models/comment.model.js';



const app = express()
const port = 8080
app.use(express.json())
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)



//connection database
// testConnection();
dbConnection();
console.log(User);
console.log(Post);
console.log(Comment);



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))