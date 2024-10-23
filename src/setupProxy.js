const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-3-36-75-177.ap-northeast-2.compute.amazonaws.com:8080/',
      changeOrigin: true,
    })
  );
};