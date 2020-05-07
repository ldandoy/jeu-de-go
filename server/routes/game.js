const express = require("express");
const Router = express.Router();
const verifyToken = require('../common');

const Game = require('../models/Game');

Router.get('/', verifyToken, async(req, res) => {
    Game.findAll()
        .then(async games => {
            return res.status(200).json(games);
        })
        .catch(err => {
            return res.status(500).json({ 'erreur': err })
        });
});

Router.post('/', verifyToken, async(req, res) => {
    if (req.body.label && req.body.label != "" && req.body.komi && req.body.size && req.body.size != "" && req.body.rules && req.body.rules != "") {
        Game.create({
                label: req.body.label,
                white: req.body.white,
                black: req.body.black,
                komi: req.body.komi,
                size: req.body.size,
                rules: req.body.rules,
            })
            .then(async game => {
                res.status(200).json(game)
            })
            .catch(erreur => {
                res.status(500).json({ 'erreur': erreur })
            });
    } else {
        res.status(500).json({ 'erreur': "Il n'y a pas assez de paramètre" })
    }
});

Router.get('/:gameId', verifyToken, async(req, res) => {
    const gameId = req.params.gameId;

    Game.findOne({
            where: {
                id: gameId
            }
        })
        .then(game => {
            console.log(game);
            res.status(200).json(game);
        })
        .catch(err => {
            res.status(500).json({ 'error': err });
        });
});

module.exports = Router;