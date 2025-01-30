// 扩展 Webpack 的配置
/* eslint-disable */

const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
