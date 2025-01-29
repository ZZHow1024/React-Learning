# React前端开发_Day6-Day9_极客园项目

参考课程：

**【*黑马程序员* React18入门到实战】**

[https://www.bilibili.com/video/BV1ZB4y1Z7o8]

@ZZHow(ZZHow1024)

# 项目前置准备

- 使用 CRA 初始化项目环境
    1. 使用 CRA 创建项目
        
        `pnpm create react-app react-jike`
        
    2. 按照业务规范整理项目目录（重点 src 目录）
        
        
        | 文件夹 | 作用 |
        | --- | --- |
        | apis | 接口 |
        | assets | 静态资源 |
        | components | 通用组件 |
        | pages | 页面级组件 |
        | router | 路由Router |
        | store | Redux状态 |
        | utils | 工具函数 |
- 安装 SCSS
    - 简介：SCSS 是一种后缀名为 .scss 的预编译 CSS 语言，支持一些原生 CSS 不支持的高级用法，比如变量使用，嵌套语法等，使用 SCSS 可以让样式代码更加高效灵活
    - CRA 项目中接入 SCSS：
        1. `pnpm add sass -D`
        2. 测试 .scss 文件是否可用（嵌套语法）
- 配置 ESLint + Prettier
    - `pnpm add eslint eslint-plugin-react --D`
    - `pnpm add prettier eslint-config-prettier eslint-plugin-prettier -D`
    - `eslint --init`
- 安装 Ant Design 组件库
    - 简介：Ant Design 是由蚂蚁金服出品的社区使用最广的 **React PC 端组件库**，**内置了常用的现成组件**，可以帮助我们快速开发 PC 管理后台项目
    - 安装AntD到项目：`pnpm add antd`
- 配置基础路由 Router
    - 步骤：
        1. 安装路由包 **react-router-dom**
        2. 准备两个基础路由组件 **Layout 和 Login**
        3. 在 router/index.js 文件中引入组件进行路由配置，**导出 router 实例ß**
        4. 在入口文件中渲染 `<RouterProvider/>`，传入 router 实例
- 配置 @ 别名路径
    - 简介：通过 @ 替代 src 路径，方便开发过程中的路径查找访问
    - 步骤：
        - 路径编译配置
            1. 安装 `craco` 工具包：`pnpm add @craco/craco -D`
            2. 增加 `craco.config.js` 配置文件
                
                ```jsx
                // craco.config.js
                // 扩展 Webpack 的配置
                const path = require("path");
                
                module.exports = {
                  // webpack 配置
                  webpack: {
                    // 配置别名
                    alias: {
                      // 约定：使用 @ 表示 src 文件所在路径
                      "@": path.resolve(__dirname, "src"),
                    },
                  },
                };
                ```
                
            3. 修改 `scripts 命令`
                
                ```json
                "scripts": {
                  "start": "craco start",
                  "build": "craco build",
                  "test": "craco test",
                  "eject": "react-scripts eject"
                }
                ```
                
            4. 测试是否生效
        - 编辑器联想配置
            1. 在项目根目录创建 `jsconfig.json` 配置文件
                
                ```json
                {
                  "compilerOptions": {
                    "baseUrl": "./",
                    "paths": {
                      "@/*": ["src/*"]
                    }
                  }
                }
                ```
                
- 使用 Git 管理项目

# 登录模块

- 准备基础静态结构
    - 使用 **AntD 现成的组件**创建登录页的内容结构
    - 主要组件：Card、Form、Input、Button
- 表单校验实现
    - 表单校验可以在提交登录之前**校验用户的输入是否符合预期**，如果不符合就阻止提交，显示错误信息
    - 参考官网实现基础校验
        - Formltem 绑定 name
        - Formltem 绑定 rules
    - 按照业务定制化修改
        - 增加失焦时校验
        - 手机号为有效格式
- 获取表单数据
    - 当用户输入了正确的表单内容，点击确认按钮时需要**收集到用户当前输入的内容**，用来提交接口请求
    - 解决方案：给 Form 组件绑定 **onFinish 回调函数**，通过回调函数的参数获取用户输入的内容
- 封装 request 请求模块
    - 在整个项目中会发送很多网络请求，使用 axios 三方库做好统一封装，**方便统一管理和复用**
    - 结构：
        - Redux（Token 管理） ←提交 action— Login 组件
    - 步骤：
        1. Redux 中编写获取 Token 的异步获取和同步修改
        2. Login 组件负责提交 action 并且把表单数据传递过来
- Token 持久化
    - 现存问题：Redux 存入 Token 之后如果刷新浏览器，Token 会丢失（持久化就是防止刷新时丢失 Token）
    - 问题原因：Redux 是基于浏览器内存的存储方式，刷新时状态恢复为初始值
    - 技术方案：
        - 获取并存 Token：Redux + LocalStorage
        - 初始化 Token：LocalStorage ? LocalStore : 空字符串
- 封装 Token 的存取删方法
    - 原因：对于 Token 的各类操作在项目多个模块中都有用到，为了共享复用可以封装成工具函数
    - utils/token.js：setToken、getToken 和 removeToken → 其他模块
