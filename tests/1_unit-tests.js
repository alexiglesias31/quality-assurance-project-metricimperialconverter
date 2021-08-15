const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // Input tests
    test('Read a whole number input', function(){
        assert.isNumber(convertHandler.getNum('31'))
    })
    test('Read a decimal number input', function(){
        assert.isNumber(convertHandler.getNum('31.19'))
    })
    test('Read a fractional input', function(){
        assert.isNumber(convertHandler.getNum('1/3'))
        assert.equal(convertHandler.getNum('1/2'),0.5)
    })
    test('Read a fractional input with a decimal', function(){
        assert.isNumber(convertHandler.getNum('2.4/4.8'))
        assert.equal(convertHandler.getNum('2.4/4.8'),0.5)
    })
    test('Error on a double-fraction input', function(){
        assert.isString(convertHandler.getNum('3/2/3'))
    })
    test('Default value 1 when no input', function(){
        assert.equal(convertHandler.getNum('kg'),1)
        assert.equal(convertHandler.getNum(''),1)
    })

    // Unit tests
    test('Read each valid input unit', function(){
        assert.equal(convertHandler.getUnit('2gal'),'gal')
        assert.equal(convertHandler.getUnit('2L'),'L')
        assert.equal(convertHandler.getUnit('Km'),'km')
        assert.equal(convertHandler.getUnit('3.4/6.5mi'),'mi')
        assert.equal(convertHandler.getUnit('3.1kG'),'kg')
        assert.equal(convertHandler.getUnit('lBS'),'lbs')
    })
    test('Return error for invalid input', function(){
        assert.equal(convertHandler.getUnit('l'),'invalid unit')
        assert.equal(convertHandler.getUnit('kilogram'),'invalid unit')
        assert.equal(convertHandler.getUnit('lb'),'invalid unit')
        assert.equal(convertHandler.getUnit('mile'),'invalid unit')
        assert.equal(convertHandler.getUnit('mis'),'invalid unit')
        assert.equal(convertHandler.getUnit('kms'),'invalid unit')
    })
    test('Return correct unit for each input unit', function(){
        assert.equal(convertHandler.getReturnUnit('L'),'gal')
        assert.equal(convertHandler.getReturnUnit('gal'),'L')
        assert.equal(convertHandler.getReturnUnit('kg'),'lbs')
        assert.equal(convertHandler.getReturnUnit('lbs'),'kg')
        assert.equal(convertHandler.getReturnUnit('km'),'mi')
        assert.equal(convertHandler.getReturnUnit('mi'),'km')
    })
    test('Return spelled-out unit', function(){
        assert.equal(convertHandler.spellOutUnit('gal'),'gallon')
        assert.equal(convertHandler.spellOutUnit('L'),'liter')
        assert.equal(convertHandler.spellOutUnit('km'),'kilometer')
        assert.equal(convertHandler.spellOutUnit('mi'),'mile')
        assert.equal(convertHandler.spellOutUnit('kg'),'kilogram')
        assert.equal(convertHandler.spellOutUnit('lbs'),'pound')
    })
    test('Convert gal to L', function(){
        assert.equal(convertHandler.convert(1,'gal'),3.78541)
    })
    test('Convert L to gal', function(){
        assert.equal(convertHandler.convert(1,'L'),0.26417)
    })
    test('Convert mi to km', function(){
        assert.equal(convertHandler.convert(1,'mi'),1.60934)
    })
    test('Convert km to mi', function(){
        assert.equal(convertHandler.convert(1,'km'),0.62137)
    })
    test('Convert lbs to kg', function(){
        assert.equal(convertHandler.convert(1,'lbs'),0.45359)
    })
    test('Convert kg to lbs', function(){
        assert.equal(convertHandler.convert(1,'kg'),2.20462)
    })
});