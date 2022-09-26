// path: ./config/env/production/server.ts

export default ({ env }) => ({
  proxy: true,
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // url: env('APP_URL'), // replaces `host` and `port` properties in the development environment
  app: {
    keys: env.array('APP_KEYS'),
  },
});
