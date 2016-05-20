

var mongoUrl = process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017';
const config = {
  mongoURL: (process.env.NODE_ENV == 'test') ? `${mongoUrl}/mern-test` : `${mongoUrl}/mern-starter`,
  port: process.env.PORT || 8000,
  secret: 'secret',
  spotify: {
    client_id:'21af28a899214cb5b9311fb75e18230a',
    secret:'20b31173013344afb57a8855da7c6967'
  }
};

export default config;
