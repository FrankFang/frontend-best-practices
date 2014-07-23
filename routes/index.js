var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    console.log(req)
    next();
});
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
});
router.get('/admin', function (req, res) {
    res.render('admin', { title: 'Admin' });
});

module.exports = router;
