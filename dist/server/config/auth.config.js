'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Set up the auth configs such as expire time
 * @type {{secret: string, authExpireMinutes: number}}
 */
const authConfig = {
  secret: 'monkeysareawesomecreatures',
  authExpireMinutes: 1440
};

exports.default = authConfig;