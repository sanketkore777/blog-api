const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now() }
})
const blogModel = mongoose.model('blogs', blogSchema)
module.exports = blogModel;