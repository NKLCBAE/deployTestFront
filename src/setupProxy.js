const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: '13.125.85.191:8080/',
      changeOrigin: true,
    })
  );
};