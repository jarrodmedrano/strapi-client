// path: ./config/env/production/server.ts

export default ({ env }) => ({
  proxy: true,
  host: env('HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  // url: env('APP_URL'), // replaces `host` and `port` properties in the development environment
  app: {
    keys: env.array('APP_KEYS', [
      'Sl/3T8adNMB5C44t+7UQ9Q==,gAogfl8DZ5pDQDLxFIMlXw==,NPOlZB+Kln2eASlpj6K6bQ==',
      'auFqhbrYTJJl/8YiDoJ4Fw==',
    ]),
  },
});
