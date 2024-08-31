class User {
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = new Date();
    }

    getInfo() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            createdAt: this.createdAt,
        };
    }
}

class UserManager {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }

    addUser(username, email) {
        if (this.users.some(user => user.email === email)) {
            throw new Error('User with this email already exists');
        }
        const newUser = new User(this.nextId++, username, email);
        this.users.push(newUser);
        return newUser;
    }

    getAllUsers() {
        return this.users.map(user => user.getInfo());
    }

    getUserById(id) {
        return this.users.find(user => user.id === parseInt(id)) || null;
    }

    deleteUserById(id) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
        return index !== -1 ? this.users.splice(index, 1) : false;

    }
}

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userManager = new UserManager();
userManager.addUser('User1', 'user1@example.com');
userManager.addUser('User2', 'user2@example.com');
userManager.addUser('User3', 'user3@example.com');

app.get('/', (req, res) => {
    const users = userManager.getAllUsers();
    res.status(200).json(users);
});

app.post('/users', (req, res) => {
    const {username, email} = req.body;
    try {
        const newUser = userManager.addUser(username, email);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser.getInfo(),
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.get('/users/:id', (req, res) => {
    const user = userManager.getUserById(req.params.id);
    if (user) {
        res.status(200).json(user.getInfo());
    } else {
        res.status(404).json({error: 'User not found'});
    }
});

app.delete('/users/:id', (req, res) => {
    const success = userManager.deleteUserById(req.params.id);
    if (success) {
        res.status(200).json({message: 'User deleted successfully'});
    } else {
        res.status(404).json({error: 'User not found'});
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`
  Available Routes:
  - GET / : List all users
  - POST /users : Create a new user (send { "username": "name", "email": "email" } in the request body)
  - GET /users/:id : Get a user by ID
  - DELETE /users/:id : Delete a user by ID
  `);
});
