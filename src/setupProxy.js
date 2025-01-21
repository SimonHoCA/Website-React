const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/proxy1',
    createProxyMiddleware({
      target: 'http://localhost:2604',
      changeOrigin: true,
    }),
  );
  app.use(
    '/proxy2',
    createProxyMiddleware({
      target: 'http://localhost:2605',
      changeOrigin: true,
    }),
  );
};