var chai = require('chai');
var path = require('path');

//chai.use(require('chai-passport-strategy'));
global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();
global.path = path ;


global.request = require('supertest');
global.cheerio = require('cheerio');
