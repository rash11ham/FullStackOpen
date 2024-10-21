const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
  
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
  });

  const saveBlog = await blog.save()
  response.status(201).json(saveBlog);
    
});

// blogsRouter.delete("/:id", (request, response, next) => {
//   blog.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// blogsRouter.put("/:id", (request, response, next) => {
//   const body = request.body;

//   const blog = {
//     content: body.content,
//     important: body.important,
//   };

//   blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then((updatedblog) => {
//       response.json(updatedblog);
//     })
//     .catch((error) => next(error));
// });

module.exports = blogsRouter;
