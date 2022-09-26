// path: ./config/env/production/server.ts
export default ({ env }) => ({
  proxy: true,
  host: env('HOST', '0.0.0.0'),
  port: 8080,
  // url: env('APP_URL'), // replaces `host` and `port` properties in the development environment
  app: {
    keys: env.array('APP_KEYS'),
  },
});