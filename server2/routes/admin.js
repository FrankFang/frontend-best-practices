/* Created by frank on 14-7-24. */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('admin', { title: 'Admin' });
});

module.exports = router;
