/**
 * Set up the auth configs such as expire time
 * @type {{secret: string, authExpireMinutes: number}}
 */
const authConfig = {
  secret: 'monkeysareawesomecreatures',
  authExpireMinutes: 1440
};

export default authConfig;