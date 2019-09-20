exports.addusers = function(req, res, next) {
    res.render('addusers', { title: 'Add Users' });
    res.render('addusers', {data: 'User Registration'})
  }