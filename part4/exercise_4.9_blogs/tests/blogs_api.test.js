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
   
  const newBlog = await Promise.all(promiseArray)

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


after(async () => {
  await mongoose.connection.close();
});
