var chai = require('chai');

//chai.use(require('chai-passport-strategy'));
global.assert = chai.assert;
global.expect = chai.expect;
global.request = require('supertest');
global.cheerio = require('cheerio');
