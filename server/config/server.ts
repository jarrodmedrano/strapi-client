export default ({ env }) => ({
  host: 'https://shark-app-vdb7t.ondigitalocean.app',
  port: 1337,
  app: {
    keys: env.array('APP_KEYS'),
  },
});
