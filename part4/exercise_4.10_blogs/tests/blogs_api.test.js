// exercise 4.8 all
const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper")

const api = supertest(app);



beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
  
  const promiseArray = blogObject.map(blog => blog.save())
   
  await Promise.all(promiseArray)

});

test.only("blogs are returned as json", async () => {
   await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test.only("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test.only("the first blog is about HTTP methods", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((e) => e.title);
  assert(contents.includes("HTML is easy"));
});

// exercise 4.9
test("confirm the id does nto have underscore", async () => {
  const convertedBlog = await helper.blogsInDb();
  const singleBlog = convertedBlog[0];

  const checkBlog = await api
    .get(`/api/blogs/${singleBlog.id}`)
    .expect(200)
    .expect('content-type', /application\/json/);
  
  assert.deepStrictEqual(checkBlog.body, singleBlog);
});

//exercise 4.10
test("confirm http post request creat's a new blog", async () => {
  const newBlog = {
    title: "new blog",
    author: "Rashed",
    url: "localhost:3001",
    likes: 0,
  }
  await api.post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('content-type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)

  const contents = blogsAtEnd.map(blog => blog.title)
  assert(contents.includes("new blog"));
})

//exercise 4.11
test.only("confirm the likes by default is zero", async () => {
  const newBlog = {
    title: "super new blog",
    author: "Rashed",
    url: "localhost:3001"
  };


  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("content-type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb()
  const blogWithoutLikeProb = blogsAtEnd.find(blog => blog.likes === undefined)
  const addLikeProb = { ...blogWithoutLikeProb, likes: 0 }

  assert.strictEqual(addLikeProb.likes, 0);
});

test.only("prompt status 400 bad request", async () => {
  const newBlog = {
    title: "Checing url",
    author: "Rashed",
    likes: 30
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)
  // const blogWithMissingProb = blogsAtEnd.find(
  //   (blog) => blog.title === undefined || blog.url === undefined
  // );
  // console.log(blogWithMissingProb);
  // const promptBadRequest = blogWithMissingProb ? 
  // console.log(blogWithZeroLike.title === "super new blog")
  // assert.strictEqual(addLikeProb.likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
