var chai = require('chai');
var deepFreeze = require('deep-freeze');


global.assert = chai.assert;
global.expect = chai.expect;
global.request = require('supertest');
global.cheerio = require('cheerio');
global.deepFreeze = deepFreeze;
