// 扩展 Webpack 的配置
/* eslint-disable */

const path = require("path");
const { whenProd, getPlugin, pluginByName } = require("@craco/craco");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // 配置 CDN
    configure: (webpackConfig) => {
      let cdn = {
        js: [],
      };
      whenProd(() => {
        // key: 不参与打包的包（由 dependencies 依赖项中的 key 决定）
        // value: CDN 文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        webpackConfig.externals = {
          react: "React",
          "react-dom": "ReactDOM",
        };
        // 配置 CDN 资源地址
        cdn = {
          js: [
            "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js",
          ],
        };
      });

      // 通过 htmlWebpackPlugin 插件在 public/index.html 注入 CDN 资源 URL
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName("HtmlWebpackPlugin"),
      );

      if (isFound) {
        // 找到了 HtmlWebpackPlugin 的插件
        match.options.cdn = cdn;
      }

      return webpackConfig;
    },
  },
};
