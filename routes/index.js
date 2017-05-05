
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.grader = function(req, res){
  res.render('grader', { title: 'Main' });
};