'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const router = require('express').Router();

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  router.route('/api/convert')
    .get((req,res) => {
      console.log(req.query);
    })

};
