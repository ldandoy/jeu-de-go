const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const Router = express.Router();

Router.post("/register", async(req, res) => {
    // console.log(req.body);
    if (req.body.email != "" && req.body.email == req.body.email2 && req.body.password != "" && req.body.password == req.body.password2) {
        User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: 'User alreay exists'
                    })
                } else {
                    User.create({
                            email: req.body.email,
                            password: req.body.password,
                            label: req.body.label,
                            level: 1
                        })
                        .then(async user => {
                            res.status(200).json(user);
                        })
                        .catch(err => {
                            res.status(500).json({ 'error': err });
                        });
                }
            })
            .catch(err => {
                res.status(500).json({ 'error': err });
            });
    } else {
        res.status(500).json({ 'error': "Vous n'avez pas rempli tous les champs, ou ils sont mal confirmés" });
    }
});

Router.post("/login", async(req, res) => {
    // console.log(req.body);
    if (req.body.email != "" && req.body.password != "") {
        User.findOne({
                where: {
                    email: req.body.email
                },
                attributes: ['id', 'email', 'password', 'created_at', 'updated_at'],
            })
            .then(async user => {
                if (!user) {
                    res.status(500).json({ 'error': 'Erreur de login ou de mot de passe' });
                } else if (!await user.validPassword(req.body.password)) {
                    res.status(500).json({ 'error': 'Erreur de login ou de mot de passe' });
                } else {
                    console.log(user.email);
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                    }, "Secret12", {
                        expiresIn: "1h"
                    })

                    return res.status(200).json(token);
                }
            })
            .catch(err => {
                return res.status(500).json({ 'error': err });
            });

    } else {
        res.status(500).json({ 'error': "Vous n'avez pas rempli tous les champs" });
    }
});

Router.get("/logout", (req, res) => {
    res.status(200).json('Vous êtes bien déconnecté');
});

module.exports = Router;