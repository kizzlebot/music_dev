'use strict';



const Composer = require('./core');

Composer((err, server) => {

  if (err) {
    throw err;
  }

  if (require.main === module){
    server.start(() => {
      server.log(require(`${process.cwd()}/package`).name + ' started at: ' + server.info);
    });
  }
  module.exports = server ;
});
