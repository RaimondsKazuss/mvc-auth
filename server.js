require('dotenv').config()

const express = require('express')
const app = express()
// const bcrypt = require('bcrypt')

app.use(express.json())

const jwt = require('jsonwebtoken')

const posts = [
    {
        username: "Jim",
        title: "Jim's post"
    },
    {
        username: "Bob",
        title: "Bob's post"
    }
]

//get all posts
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
  })

  function authenticateToken(req, res, next) {
    const  authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        //just some placeholder function (it's doing nothing here)
        next()
    })
}

const port = 3000;
app.listen(port, () => {
    console.log(`server running ar http://localhost:${3000}`);
})