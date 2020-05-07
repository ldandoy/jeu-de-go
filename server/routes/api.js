const express = require("express");
const router = express.Router();
const verifyToken = require('../common');

router.get('/', verifyToken, async(req, res) => {
    res.send('From API route')
});

module.exports = router;