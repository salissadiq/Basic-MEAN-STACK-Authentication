
const express = require('express');
const User = require('../models/users');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = 'mongodb://localhost:27017/auth';
mongoose.Promise = global.Promise;
mongoose.connect(db, {useNewUrlParser: true}, (error)=> {
    if(error){
        console.log(error);
    } else {
        console.log('Connected to MongoDb');
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    } else {
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send("Unauthorized request");
        } else {
            const payload = jwt.verify(token, "secretkey");
            if (!payload) {
                return res.status(401).send("Unauthorized request");
            } else {
                req.userId = payload.subject;
                next();
            }
        }
    }


}
router.post('/register', (req, res)=> {
    const userData = req.body;
    const user = new User(userData);
    user.save((err, regUser)=> {
        if(err) {
            console.log(err);
        } else {
            const payload = {subject: regUser._id};
            const token = jwt.sign(payload, 'secretkey');
            res.status(200).send({token});
        }
    })
});

router.post('/login', (req, res)=> {
    const userData = req.body;
    User.findOne({email: userData.email}, (error, user)=> {
        if(error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('Invalid email');
            } else {
                if(userData.password !== user.password) {
                    res.status(401).send('Invalid password')
                } else {
                    const payload = {subject: user._id};
                    const  token = jwt.sign(payload, 'secretkey');
                    res.status(200).send({token});
                }
            }
        }
    })
})

router.get('/events', (req, res)=> {
    const events = [
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        }
    ]
    res.json(events)
})
router.get('/special', verifyToken, (req, res) => {
    const events = [
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        },
        {
            "name": "Hackerton",
            "description": "Exploring Naija coders",
            "date": "22/2/2018"
        }
    ]
    res.json(events)
})

module.exports = router;