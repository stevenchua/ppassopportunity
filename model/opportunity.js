"use strict";
var table = 'opportunity';
var Db = require('./model.js');
var util = require('util');
var Query = require('./sql');


var opportunity = {};

/*
 * info post by cat id
 * @param 
 * 
 */
opportunity.save = function(data,callback){
    //console.log(data);
    Query.insert(data,table,function(err,result){
        if(!err){
          callback(null,result);
        }else{
          //console.log(err);
          callback(null,err);
        }
      });
}
/**
   * Add order
   * @param data
   */
opportunity.getAll = function(callback){
    var sql = "SELECT * FROM `"+table+"`;"; 
    console.log(sql);
        Db.query(
            sql,
            function selectCb(err, results) {
                if (!err) {
                  return callback(null, results); 
                }
                else{
                  console.log(err);
                  return callback(err, null); 
                }            
            }
         );
  },
  /**
   * Add order
   * @param data
   */
opportunity.getById = function(id, callback){
    var sql = "SELECT * FROM `"+table+"` WHERE id='"+id+"';"; 
    console.log(sql);
        Db.query(
            sql,
            function selectCb(err, results) {
                if (!err) {
                  return callback(null, results); 
                }
                else{
                  console.log(err);
                  return callback(err, null); 
                }            
            }
         );
  },
  /**
   * Add order
   * @param data
   */
opportunity.getFields = function(callback){
    var sql = "SHOW COLUMNS FROM `"+table+"`;";     
      Db.query(
            sql,
            function selectCb(err, results) {
                if (!err) {
                  var columns = [];
                  for(var i in results){
                    columns.push(results[i]['Field'].toUpperCase());
                  }
                  return callback(null, columns); 
                }
                else{
                  console.log(err);
                  return callback(err, null); 
                }            
            }
      );
    
        
  },

module.exports = opportunity;


