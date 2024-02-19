import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_PROXY_TARGET,
            ignorePath: false,
            changeOrigin: true,
            secure: false,
        }),
    );

    app.use(
        '/socket.io',
        createProxyMiddleware({
            target: process.env.REACT_APP_PROXY_TARGET,
            ignorePath: false,
            changeOrigin: true,
            secure: false,
        }),
    );
};
