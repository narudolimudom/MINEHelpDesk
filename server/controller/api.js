
const Post = require('../models/post');

module.exports = class API{
    //fech all post
    static async fetchAllPost(req, res){
        try{
            const posts = await Post.find();
            res.status(200).json(posts);
        }
        catch(err){
            res.status(404).json({message: err.message});
        }
    }

    static async fetchBySort(req, res){
        const id = req.params.id;
        let sort = null;
        if(id == '1'){
            sort = 'pending'
        }else if(id == '2'){
            sort = 'accepted'
        }else if(id == '3'){
            sort = 'resolved'
        }else if(id == '4'){
            sort = 'rejected'
        }
        try{
            const posts = await Post.find({status: sort});
            res.status(200).json(posts);
        }
        catch(err){
            res.status(404).json({message: err.message});
        }

    }

    //fetch post by id
    static async fetchPostById(req, res){
        const id = req.params.id;
        try{
            const posts =  await Post.findById(id);
            res.status(200).json(posts);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //create a post
    static async createPost(req, res){
                const post = req.body
        try{
            await Post.create(post)
            res.status(201).json({message: "post created successfully"})
        }catch (err){
            res.status(404).json({message: err.message})
        } 
    }
    // update a post
    static async updatePost(req, res){
        const id = req.params.id;
        const newpost = req.body;
        try{
            await Post.findByIdAndUpdate(id, newpost);
            res.status(200).json({message: "post updated successfully"})
        }catch (err) {
            res.status(404).json({message: err.message})
        }
    }
    // delete a post
    static async deletePost(req, res){
        const id = req.params.id;
        try{
            await Post.findByIdAndDelete(id);
            res.status(200).json({message: "post deleted successfully"})
        }catch (err){
            res.status(404).json({message: err.message})
        }

    }
}