const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
  
});


blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  //exercise 4.22
  const user = request.user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token is invalid'})
  }
  //exercises before 4.22
  //const user = await User.findById(decodedToken.id)
  //const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const saveBlog = await blog.save()
  user.blogs = user.blogs.concat(saveBlog._id)
  await user.save()

  response.status(201).json(saveBlog);
  
    
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token is invalid" });
  }
  //const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id).populate('user', {id:1})
  if (blog.user.id.toString() !== user._id.toString()) {
    return response
      .status(401)
      .json({
        error: "Not authorized to do that",
        user: user._id,
        blogUser: blog.user.id,
      });
  }
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
  
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    autor: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  )
 
  response.json(updatedBlog);
});

module.exports = blogsRouter;
