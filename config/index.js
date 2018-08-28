// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, '../app-example/index.html'),
    assetsRoot: path.resolve(__dirname, '../app-example'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    port: 8002,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    host: '0.0.0.0',
    assetsPublicPath: '/',
    proxyTable: {
        
        '/authAction':{
            target:'http://172.30.10.72:8000',
            changeOrigin:true
            // pathRewrite:{
            //   '^/share-system':''
            // }
        },
        '/share-system':{
            target:'http://172.30.10.72:8000',
            changeOrigin:true
            // pathRewrite:{
            //   '^/share-system':''
            // }
        },
        '/share-trip':{
            target:'http://10.10.20.66:9003',
            changeOrigin:true,
            pathRewrite:{
               '^/share-trip':''
            }
        },
        '/share-log':{
            target: 'http://172.30.10.71:9005',
            changeOrigin: true,
            pathRewrite: {
              '^/share-log':''
            }
        },
        '/share-file':{
            target:'http://172.30.10.72:9004',
            changeOrigin:true,
            pathRewrite:{
               '^/share-file':''
            }
        }
        
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
