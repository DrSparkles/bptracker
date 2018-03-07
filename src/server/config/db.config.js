
const dbConfig = {
  development: {
    connection: 'localhost:27017/bptracker'
  },
  production: {
    connection: 'localhost:27017/bptracker'
  }
};



export default (process.env.NODE_ENV == 'development') ? dbConfig.development : dbConfig.production;