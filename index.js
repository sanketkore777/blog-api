const express = require('express')
const mongoose = require('mongoose')
const app = express()
const blogModel = require('./Schemas');
const port = process.env.PORT || 5000;

//database connection
mongoose.connect('mongodb://localhost:27017/blog-api').then(() => console.log("Connected :)"))
    .catch((err) => console.log(err))

app.use(express.json())


//storing blogs to the database
app.post('/', (req, res) => {
    const blog = new blogModel({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    })
    blog.save().then((data) => res.send(data))
        .catch((err) => console.log(err))
})

//getting all blogs from database
app.get('/', (req, res) => {
    blogModel.find().then((data) => res.send(data))
        .catch((err) => console.log(err))
})


//updating blogs in the database
app.put('/update', (req, res) => {
    let con = req.body.condition
    let upd = req.body.updation
    blogModel.updateMany(con, { $set: upd })
        .then((data) => res.send(data))
        .catch((err) => console.log(err))
})


//deleting blogs from the database
app.delete('/delete', (req, res) => {
    blogModel.deleteMany(req.body.condition).then((data) => res.send(data))
        .catch((err) => console.log(err))
})


//serching specif blogs in database
app.get('/search/:str', (req, res) => {
    blogModel.find({
        "$or": [
            { title: { $regex: req.params.str } },
            { content: { $regex: req.params.str } },
            { author: { $regex: req.params.str } }
        ]
    }).then((data) => res.send(data)).catch((err) => console.log(err))
})
app.listen(port, () => console.log(`Server running on ${port}`))