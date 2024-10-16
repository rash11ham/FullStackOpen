const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
  });

  blog
    .save()
    .then((savedblog) => {
      response.json(savedblog);
    })
    .catch((error) => next(error));
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
