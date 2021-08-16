'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const router = require('express').Router();

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  router.route('/api/convert')
    .get((req,res) => {
      const initNum = convertHandler.getNum(req.query.input)
      const initUnit = convertHandler.getUnit(req.query.input)
      if(initNum === 'invalid number' && initUnit === 'invalid unit') {
        res.status(200).send('invalid number and unit')
      }
      if(initNum === 'invalid number') {
        res.status(200).send('invalid number')
      }
      if(initUnit === 'invalid unit') {
        res.status(200).send('invalid unit')
      }
      const returnNum = convertHandler.convert(initNum,initUnit)
      const returnUnit = convertHandler.getReturnUnit(initUnit)
      
      const returnString = convertHandler.getString(initNum,initUnit,returnNum,returnUnit)
      res.json(returnString)
    })

  app.use(router);
};
