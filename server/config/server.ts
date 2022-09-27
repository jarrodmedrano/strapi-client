export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'Sl/3T8adNMB5C44t+7UQ9Q==,gAogfl8DZ5pDQDLxFIMlXw==,NPOlZB+Kln2eASlpj6K6bQ==',
      'auFqhbrYTJJl/8YiDoJ4Fw==',
    ]),
  },
});
