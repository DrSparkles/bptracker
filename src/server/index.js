import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { resolve } from 'path';
import historyFallback from 'connect-history-api-fallback';
import webpackConfig from '../../webpack.config';

const { NODE_ENV = 'development', PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
var myLogger = function (req, res, next) {
  console.log('REQ HOST', req.get('host'))
  console.log('REQ ORIGNAL URL', req.originalUrl);
  console.log('REQ URL', req.url);
  next()
};

app.use(myLogger);
*/

// set up routing
var apiRouter = require('./router')(app);
app.use(historyFallback());

if (NODE_ENV === 'production') {
  const FE_DIR = resolve(__dirname, '..', 'client');

  app.use(express.static(FE_DIR));

  app.get('/*', (req, res) => {
    res.sendFile(resolve(FE_DIR, 'index.html'));
  });
} else {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    stats: { colors: true },
  }));
  app.use(webpackHotMiddleware(compiler));
}

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
