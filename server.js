require('dotenv').config()

const express = require('express')
const server = express()
const jwt = require('jsonwebtoken')

server.use(express.json())

const posts = [
    {
        username: "Jim",
        title: "Jim's post title"
    },
    {
        username: "Bill",
        title: "Bill's post title"
    }
]

server.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

server.listen(3000)