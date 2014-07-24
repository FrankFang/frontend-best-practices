/*jshint node:true, strict:false, asi: true*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/1/login', function (req, res) {
    var status = req.query.status
    res.set('Content-Type', 'application/json')
    res.json({
        ret: status || 0
    })
})

module.exports = router
