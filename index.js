// implement your API here
const express = require('express');
const db = require('./data/db.js')
const shortid = require("shortid");
const  server = express  ();

server.listen(4000, () => {
    console.log("Listening on port 4000...");
});

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." });
        });
});

server.get('/api/users/:id', (req, res) => {

    db.findById(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else res.status(404).json({ message: "The user with the specified ID does not exist." })      
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." });
        });
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    db.insert(userInfo)
    .then(user => {
        if(userInfo.name && userInfo.bio) {
            res.status(201).json({ success: "Created", user })
        } else res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database", err})
    });
});

