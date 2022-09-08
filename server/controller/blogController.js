const { updateOne } = require('../model/blogSchema');
const Blog = require('../model/blogSchema');

// Create blog
const createBlog = async (req, res, next) => {
    console.log(req.body);
    const { title, body, authorDetail, postedAt, tags } = req.body;
    const id = req.user.id;
    try{
        const blogPost = await Blog.create({title, body, authorDetail: id, postedAt, tags});
        // res.json({ blogPost });
        res.status(200).json({ blogPost, message: 'Blog Created Successfully'})
    }catch(error){
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
};

// Get all blogs
const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate('authorDetail', '-email -password').sort({'postedAt' : -1});
        res.json({ blogs });
    }
    catch (error) {
        console.log(error.message);
        next({ status: 500, message: error.message });
    }
};

// Get blogs with blog Id
const getBlogById = async (req , res , next) => {
    try {
        const id = req.params.id;
        const blogs = await Blog.findById( id ).populate('authorDetail', '-password');
        res.json({ blogs });
    } 
    catch (error) {
        next({ status : 404 , message : error.message})
    }
};


// Get your blogs
const getYourBlogs = async (req , res , next) => {
    try {
        const id = req.user.id;
        const blogs = await Blog.find({ authorDetail: id }).populate('authorDetail', '-email -password').sort({ 'postedAt': -1 });
        res.json({ blogs });
    } 
    catch (error) {
        next({ status : 404 , message : error.message})
    }
};

// Update Blog
const updateBlog = async (req , res , next) => {
    const id = req.params.id;
    if(!id){
        return next({ status: 404, message: 'Id is missing'});
    }
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            $set: {
                title: req.body.title,
                body: req.body.body,
                authorDetail: req.user.id
            }
        }, {new: true });
        res.status(201).json({
            message: 'Updated the blog',
            blog: updatedBlog
        });
    } catch(error){
        next({ status: 500, message: error.message });
    }
};

// Delete Blog
const deleteBlog = async (req , res , next) => {
    const id = req.params.id;
    if (!id) {
        return next({ status: 404, message: 'ID Is Missing' })
    };
    try {
        await Blog.deleteOne({
            id: req.params.id,
            authorDetail: req.user.id
        })
        res.json({ message : 'Blog Deleted Successfully ' });
    } catch (error) {
        next({ status: 500, message: error.message })
    }
};

module.exports = { createBlog, getAllBlogs, getYourBlogs, updateBlog, deleteBlog, getBlogById }






















