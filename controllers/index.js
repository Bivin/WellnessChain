const path = require('path');
exports.index = function(req, res, next) {
    res.render('index', { title: 'WellnessChain' });
    
}