var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visitor = require('../models/Visitor.js');

/* GET ALL VISITORS */
router.get('/', function(req, res, next) {
  //if(req.)
  var sortObj = {};
  let findObj = {};
  let regex;
  if (req.query.searchString && req.query.searchString.length > 0){
    regex = new RegExp(escapeRegex(req.query.searchString), 'gi');
    //findObj = {$text: {$search : req.query.searchString }}
    findObj = { "first_name": regex };
  }
  if(req.query.count === "true"){
    Visitor.find(findObj).count().exec(function (err, visitors) {
      if (err) return next(err);
      res.json(visitors);
    });
  }else{
    var order = (req.query.isAscending === 'true') ? 1 : -1;
  for(var i = 0; i < req.query.sortColumns.length;i++){
    sortObj[req.query.sortColumns[i]] = order ;
  }
  
  //Visitor.find().sort(sortObj).skip(req.query.startInd ? req.query.startInd : 0).limit(req.query.pageSize ? req.query.pageSize : 10).exec(function (err, visitors) {
  //Visitor.find(findObj).sort(sortObj).skip(+req.query.startInd).limit(+req.query.pageSize).exec(function (err, visitors) {
  Visitor.find(findObj).exec(function (err, visitors) {
//Visitor.find().sort(sortObj).skip(+req.query.startInd).limit(+req.query.pageSize).exec(function (err, visitors) {
    if (err) return next(err);
    res.json(visitors);
  });
  }
  
  //Visitor.find();
});

/* GET SINGLE VISITOR BY ID */
router.get('/:id', function(req, res, next) {
  Visitor.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE VISITOR */
router.post('/', function(req, res, next) {
  Visitor.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE VISIOR */
router.put('/:id', function(req, res, next) {
  Visitor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// /* DELETE BOOK */
// router.delete('/:id', function(req, res, next) {
//   Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;