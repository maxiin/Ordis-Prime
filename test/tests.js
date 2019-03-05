var should = require('chai').should
var expect = require('chai').expect
var mainUtils = require('../src/helpers/utils')
var apiUtils = require('../src/handlers/api/utils')
var apiCommands = require('../src/handlers/api')


describe('Utils', function () {
  describe('Main Utils', function() {
    it('should load correctly', function(){
      expect(mainUtils).to.be.a('Object');
    })
    describe('#randomGreeting()', function(){
      it('should return either "Operator" or "Star-Child" in randomGreeting()', function() {
        expect(mainUtils.randomGreeting()).to.be.oneOf(['Operator', 'Star-Child'])
      })
    })
    describe('#capitalize(:string)', function(){
      it('should return capitalized "string"', function() {
        expect(mainUtils.capitalize('string')).equals('String')
      })
      it('should not capitalize string when theres a non alphabetic character in the first position', function() {
        expect(mainUtils.capitalize('1 string')).equals('1 string')
      })
      it('should return nothing when a empty string is sent to capitalize', function() {
        expect(mainUtils.capitalize('')).equals('');
      })
      it('should return nothing when theres no parameters', function() {
        expect(mainUtils.capitalize()).equals('');
      })
    })
  })
  describe('Api Utils', function(){
    it('should load correctly', function(){
      expect(apiUtils).to.be.a('Object');
    })
    describe('#dateFormater()', function(){
      it('should return a correct human readable date from string (17/12/95)', function(){
        expect(apiUtils.dateFormater('1995-12-17T03:24:00')).equals('5:24:0 UTC+0, Sunday, Dec 17 1995');
      })
      it('should return a correct human readable date from string (1/1/00)', function(){
        expect(apiUtils.dateFormater('0')).equals('2:0:0 UTC+0, Saturday, Jan 1 2000');
      })
      it('should return a correct human readable date from number (1/1/00)', function(){
        expect(apiUtils.dateFormater(0)).equals('2:0:0 UTC+0, Saturday, Jan 1 2000');
      })
      it('should return nothing from a empty string', function(){
        expect(apiUtils.dateFormater('')).equals('');
      })
      it('should return nothing from no parameter', function(){
        expect(apiUtils.dateFormater()).equals('');
      })
    })
  })
});

describe('Commands', function(){
  describe('/time', function(){
    xit('should return the correct game time', function(){
      return apiCommands.getTime.then((res) => { 
        //Game time: 19:34:39 UTC+0, Tuesday, Mar 5 2019
        
        //Earth' day will end in 24m 37s
        //Cetus: 1h 8m to Night
        //Vallis: 11m to Warm
        expect(res).to.be.a('string')
        expect(res).to.match(/Game time: (\d+:)+\d+ UTC\+0, [A-z]+, [A-z]+ \d+ \d+\n\nEarth\' [0-9A-z ]+\nCetus: [0-9A-z ]+\nVallis: [0-9A-z ]+/)
      })
    })
  })
  describe('/sortie', function(){
  })
})