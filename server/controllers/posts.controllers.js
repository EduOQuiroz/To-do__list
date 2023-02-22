import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from 'fs-extra';

export const getPosts = async (req, res) => {
    const posts = await Post.find()
    res.send(posts)
} ;
export const createPosts = async (req, res) => {
    try {
        let image;
        const {title, description} = req.body

        if(req.files?.image){
            const resp = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: resp.secure_url,
                public_id: resp.public_id,
            }
        }
        console.log(req.files)
        const newPost = new Post({title, description, image});
        await newPost.save();
        return res.send(newPost)
    } catch (err) {
        console.error(err)
    }
};
export const getPost = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.send(post);
} 
export const updatePost = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const post = await Post.findByIdAndUpdate(id, data);
    res.send({
        message:'updating a post',
        post: await Post.findByIdAndUpdate(id, data)
    });
} 
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id)
    if(post.image.public_id){
        await deleteImage(post.image.public_id)
    }
    
    res.send('deleting a post');
} 