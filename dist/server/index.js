'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _path = require('path');

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _webpack3 = require('../../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { NODE_ENV = 'development', PORT = 3000 } = process.env;

const app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

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
app.use((0, _connectHistoryApiFallback2.default)());

if (NODE_ENV === 'production') {
  const FE_DIR = (0, _path.resolve)(__dirname, '..', 'client');

  app.use(_express2.default.static(FE_DIR));

  app.get('/*', (req, res) => {
    res.sendFile((0, _path.resolve)(FE_DIR, 'index.html'));
  });
} else {
  const compiler = (0, _webpack2.default)(_webpack4.default);

  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    stats: { colors: true }
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

const server = _http2.default.createServer(app);

server.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});