const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

// add blog
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Fake Title',
    author: 'Bobby Martin',
    url: 'https://fakeurl.com/',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.author)
  expect(contents).toContain('Bobby Martin')
})

// blogs returned as json
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// get id
test('blog has id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

// set likes to 0 if undefined
test('if likes undefined set to 0', async () => {
  const newBlog = {
    title: 'Learning Node.js',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com',
  }

  const checkBlog = {
    title: 'Learning Node.js',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const result = response.body[response.body.length - 1]
  expect(result.likes).toEqual(checkBlog.likes)
})

// if title or url are missing 400 bad request
test('if title or url empty', async () => {
  const newBlog = {
    title: 'Learning Express',
    author: 'University of Helsinki',
    likes: 10
  }

  await await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})