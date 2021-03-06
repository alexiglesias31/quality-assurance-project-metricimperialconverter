function ConvertHandler() {
  
  this.getNum = function(input) {
    // Return 1 when no input be provided
    if(!input) {
      return 1
    }
    if(input.match(/^\D/)) {
      return 1
    }
    let result = input.match(/^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)(\w*)$/)
    if(result) {
      return eval(result[1])
    }
    return 'invalid number'
  };
  
  this.getUnit = function(input) {
    let result = input.match(/\d*([gG][aA][lL]|[lL][bB][sS]|[kK][gG]|[mM][iI]|[kK][mM]|[lL])$/);
    return result ? result[1] === 'L' || result[1] === 'l' ? 'L' : result[1].toLowerCase() : 'invalid unit'
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitPairs = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi',
    }
    return unitPairs[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellUnits = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    }
    
    return spellUnits[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const unitConvert = {
      gal: galToL,
      L: 1/galToL,
      lbs: lbsToKg,
      kg: 1/lbsToKg,
      mi: miToKm,
      km: 1/miToKm,
    }
    let result = initNum*unitConvert[initUnit]
    return result.toFixed(5)
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = {
      initNum: parseFloat(initNum),
      initUnit: initUnit,
      returnNum: parseFloat(returnNum),
      returnUnit: returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };
    
    return result;
  };
  
}

module.exports = ConvertHandler;
