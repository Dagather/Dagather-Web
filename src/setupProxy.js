const { createProxyMiddleware } = require('http-proxy-middleware');

const ENV = process.env;
const {
  REACT_APP_UP_ACCOUNT_LOGICAL_NAME: logicalName,
  REACT_APP_UP_TENANT_NAME: tenantName,
} = ENV;

module.exports = (app) => {
  app.use(
    '/oauth',
    createProxyMiddleware({
      target: 'https://account.uipath.com',
      changeOrigin: true,
    }),
  );

  app.use(
    '/odata',
    createProxyMiddleware({
      target: `https://cloud.uipath.com/${logicalName}/${tenantName}`,
      changeOrigin: true,
    }),
  );
};
