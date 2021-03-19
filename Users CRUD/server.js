const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
const port = 3000;
const usersData = JSON.parse(fs.readFileSync('users.json'));

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

app.get('/users', (req, res) => {
    res.json(usersData);
});

app.get('/users/:id', (req, res) => {
    let user = usersData.find(_user => _user.id === +req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            error: 'User not found',
        });
    }
});

app.post('/users', (req, res) => {
    usersData.push(req.body);
    fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));
    res.send({message: 'User added'});
});

app.put('/users/:id', (req, res) => {
    let user = usersData.find(_user => _user.id === +req.body.id);

    if (user) {
        for (let key of Object.keys(req.body)) {
            if (Array.isArray(req.body[key]) && req.body[key].join() !== user[key].join()) {
                user[key] = req.body[key];
            } 
            else if (req.body[key] !== user[key]) {
                user[key] = req.body[key];
            }
        }
        
        fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));
        res.send({message: 'User edited'});
    } else {
        res.status(404).json({
            error: 'User not found',
        });
    }
    
});

app.delete('/users/:id', (req, res) => {
    let user = usersData.find(_user => _user.id === +req.params.id);
    if (user) {
        usersData.splice(usersData.indexOf(user), 1);
        fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));
        res.send({message: 'User deleted'});
    } else {
        res.status(404).json({
            error: 'User not found',
        });
    }
})