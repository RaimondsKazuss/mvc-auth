const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = [];

// get all users
app.get('/users', (req, res) => {
    res.json(users)
})

// create a new user
app.post('/users', async (req, res) => {
    try {
        
        // crypt.hash(string, saltRounds)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})


// login a user
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (!user) {
        return res.status(400).send('Sorry something went wrong!')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success!')
        } else {
            res.send('Wrong password!')
        }
    } catch {
        res.status(500).send()
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`server running ar http://localhost:${3000}`);
})