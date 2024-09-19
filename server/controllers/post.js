 import Post from '../models/post.js';
import User from '../models/User.js';

//  create
export const createPost = async(req,res) =>{
    try {
        const {userId, description , picturePath} = req.body;
        const user = await User.findById({id: userId});
        const newPost = new Post({
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            description,
            userPicturePath : user.picturePath,
            picturePath,
            likes :{},
            comments :[]
        })

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
        
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}