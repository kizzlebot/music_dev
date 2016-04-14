

var mongoUrl = process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017'
const config = {
  mongoURL: (process.env.NODE_ENV == 'test') ? `${mongoUrl}/mern-test` : `${mongoUrl}/mern-starter`,
  port: process.env.PORT || 8000,
  secret:'secret'
};

export default config;
