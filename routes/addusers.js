var express = require('express');
var router = express.Router();


let addusers = require('../controllers/addusers')

/* GET home page. */
router.get('/', addusers.addusers);
//router.post('/saveuser', addusers.saveuser);
module.exports = router;