//exercise 4.3
const dummy = (blogs) => {
    return 1
}

//exercise 4.4
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    //const newBlog = blogs.filter(blog => blog.likes > 0)
    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, { likes }) => likes > 0 ? sum+=likes : sum, 0)
}

//exercise 4.5
const favoriteBlog = (blogs) => {
    const newBlogs = blogs.filter(
        blog => blog.id !== null
    ).map(({title,author,likes}) => ({title,author,likes}))
    const highestLikes = Math.max(...newBlogs.map(p => p.likes))
    // console.log(highestLikes);
    return blogs.length === 0
        ? 0
        : newBlogs.filter(item => item.likes === highestLikes)
}

//exercise 4.6
const mostBlogs = (blogs) => {
    const counter = {}
    blogs.forEach(obj => {
        if (counter[obj.author]) {
            counter[obj.author] += 1
        } else {
            counter[obj.author] = 1
        }
    })
    const mostPublishedBlogs = obj => {
        const values = Object.values(obj) 
        const max = Math.max.apply(Math, values)
        for (key in obj) {
            if (obj[key] === max) {
                return {
                    [key]:max
                }
            }
        }
    }
    return mostPublishedBlogs(counter)
}

//exercise 4.7
const mostLikes = (blogs) => {
  const newBlogs = blogs
    .filter((blog) => blog.id !== null)
    .map(({ author, likes }) => ({ author, likes }));
  const highestLikes = Math.max(...newBlogs.map((p) => p.likes));
  // console.log(highestLikes);
  return blogs.length === 0
    ? 0
    : newBlogs.filter((item) => item.likes === highestLikes);
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}