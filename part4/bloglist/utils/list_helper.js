/* eslint-disable no-unused-vars */
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (blogs.reduce((sum, blog) => {
    sum = sum + blog.likes
    return sum
  }, 0)
  )
}

const favoriteBlog = (blogs) => {
  let max = 0
  blogs.forEach((blog) => {
    if (max < blog.likes) {
      max = blog.likes
    }
  })

  return (blogs.filter(b => b.likes === max)[0])
}

const mostBlogs = (blogs) => {
  const bMap = _.countBy(blogs, (blog) => blog.author)
  const authorBlogCount = _.keys(bMap).map(author => {
    return {
      author,
      blogs: bMap[author]
    }
  })

  return authorBlogCount.reduce((pv, cv) => pv.count > cv.count ? pv : cv, {})
}

const mostLikes = (blogs) => {
  let blog = _.orderBy(blogs, ['likes'], ['desc'])[0]
  return ({ author: blog.author, likes: blog.likes })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}