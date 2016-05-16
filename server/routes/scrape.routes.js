import { Router } from 'express';
const router = new Router();
var url = require('url');
var querystring = require('querystring');

var phantom = require('phantom');


router.get('/', (req, res, next) => {
  if (req.query.url){
    process.nextTick(function(){
      var sitepage = null;
      var phInstance = null;
      phantom.create()
        .then(instance => {
          phInstance = instance;
          return instance.createPage();
        })
        .then(page => {
          sitepage = page;
          return page.open(req.query.url);
        })
        .then(status => {
          console.log(status);
          return sitepage.property('content');
        })
        .then(content => {
          sitepage.close();
          phInstance.exit();
          res.json({msg:content});
        })
        .catch(error => {
          console.log('errored');
          console.log(error);
          res.json({msg:'failed'});
          phInstance.exit();
        });
    })
  }
  else res.json({msg:'no url provided'});
});

module.exports = router ;

