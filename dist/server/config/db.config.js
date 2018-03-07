'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const dbConfig = {
  development: {
    connection: 'localhost:27017/bptracker'
  },
  production: {
    connection: 'localhost:27017/bptracker'
  }
};

exports.default = process.env.NODE_ENV == 'development' ? dbConfig.development : dbConfig.production;