const { param } = require("../app");
const Blog = require("../models/blog");
const User = require('../models/user')

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Rashed",
    url: "localhost:3002",
    likes: 10,
  },
  {
    title: "CSS is fun",
    author: "Mohua",
    url: "localhost:3001",
    likes: 1,
  },
];



const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
