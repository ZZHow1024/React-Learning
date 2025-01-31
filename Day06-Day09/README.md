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
        
        ```jsx
        // React 插件配置
        {
          plugins: {
            react,
          },
          languageOptions: {
            parserOptions: {
              ecmaVersion: "latest", // 使用最新的 ECMAScript 标准
              sourceType: "module",
              ecmaFeatures: {
                jsx: true, // 启用 JSX 支持
              },
            },
          },
          settings: {
            react: {
              version: "detect", // 自动检测 React 版本
            },
          },
          rules: {
            // 关闭 react-in-jsx-scope，因为 React 17+ 不再需要显式引入 React
            "react/react-in-jsx-scope": "off",
          },
        }
        ```
        
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
- Axios 请求拦截器注入 Token
    - 原因：Token 作为用户的一个标识数据，后端很多接口都会以它作为接口权限判断的依据；请求拦截器注入 Token 之后，所有用到 Axios 实例的接口请求都自动携带了 Token
    - 结构：utils/request.js →axios（Token 统一注入）
    - 技术方案：
        - Axios 请求拦截器请求头中注入 Token
        - 调用接口测试 Token 是否成功携带
- 使用 Token 做路由权限控制
    - 原因：有些路由页面内的内容信息比较敏感，如果用户没有经过登录获取到有效 Token，是没有权限跳转的，根据 Token 的有无控制当前路由是否可以跳转就是路由的权限控制
    - 技术方案：
        - 路由组件
        - 是否有 Token
            - 是（正常返回路由组件）→ 路由组件
            - 否（强制跳回到登录）→ 跳回登录
    - 技术方案：封装高阶组件 → 测试有无 Token 条件下的高阶组件

# Layout模块

- 结构创建和样式初始化
    - 静态结构搭建
    - 样式初始化
        - 安装 Normalize.css：`pnpm add normalize.css`
        - 修改 index.css 样式
            
            ```css
            html,
            body {
              margin: 0;
              height: 100%;
            }
            
            #root {
              height: 100%;
            }
            ```
            
- 二级路由配置
    - 结构：
        - Layout（一级路由）
            - Home（二级路由）
            - Article（二级路由）
            - Publish（二级路由）
        - Login（一级路由）
    - 步骤：准备三个二级路由组件 → router 中通过 children 配置项进行配置 →Layout 组件中配置二级路由出口
- 菜单点击跳转路由实现
    - 实现效果：点击左侧菜单可以跳转到对应的目标路由
    - 思路分析：
        1. 左侧菜单要和路由形成一一对应的关系（知道点了谁）
        2. 点击时拿到路由路径调用路由方法跳转（跳转到对应的路由下面）
    - 步骤：菜单参数 item 中 key 属性换成路由的路径地址 → 点击菜单时通过 key 获取路由地址跳转
- 根据当前路由路径高亮菜单
    - 实现效果：页面在刷新时可以根据当前的路由路径让对应的左侧菜单高亮显示
    - 思路分析
        1. 获取当前 URL 上的路由路径
        2. 找到菜单组件负责高亮的属性，绑定当前的路由路径
- 展示个人信息
    - 用户信息维护：和 Token 令牌类似，用户的信息通常很有可能在多个组件中都需要共享使用，所以同样应该**放到 Redux 中维护**
    - 步骤：使用 Redux 进行信息管理 → Layout 组件中提交 action → Layout 组件中完成渲染
- 退出登录实现
    - 退出登录是一个通用的业务逻辑
    - 步骤：
        1. 提示用户是否确认要退出（危险操作，二次确认）
        2. 用户确认之后清除用户信息（Token 以及其它个人信息）
        3. 跳转到登录页（为下次登录做准备）
- 处理 Token 失效
    - 简介：为了用户的安全和隐私考虑，在用户**长时间未在网站中做任何操作**且**规定的失效时间到达**之后，当前的 Token 就会失效，一旦失效，不能再作为用户令牌标识请求隐私数据
    - 如何知道 Token 失效：通常在 Token 失效之后再去请求接口，后端会返回 **401 状态码**，前端可以监控这个状态做后续的操作
- Echarts 基础图表实现
    - 步骤：
        1. 按照三方插件文档中的“快速开始”，快速跑起来 Demo
            - 安装：`pnpm add echarts`
            - 导入：`import * as echarts from "echarts";`
        2. 按照业务需求修改配置项做定制处理
- Echarts 组件封装实现
    - 原因：组件封装主要解决了**复用**的问题
    - 思路：把图表不一样的部分抽象成 props 参数做适配
    - 步骤：保持功能代码不变抽象成组件 → 替换可变的部分变成 prop 参数
- API 模块封装
    - 现存问题：当前的接口请求放到了功能实现的位置，没有在固定的模块内维护，后期查找维护困难
    - 解决思路：把项目中的所有接口按照业务模块以函数的形式统一封装到 apis 模块中
    - 结构：reauest.js → apis
        - user.js（用户相关请求函数）
        - article.js（文章相关请求函数）
        - 其它业务接口模块…

# 文章发布模块

- 功能点：
    - 实现基础文章发布
    - 实现封面上传功能
    - 实现带封面的文章
- 创建基础结构
    - 面包屑导航组件 Breadcrumb
    - 表单组件 Form
    - 输入框组件 Input
    - 下拉框组件 Select-Option
    - 按钮组件 Button
- 准备富文本编辑器
    - 步骤：
        1. 安装 react-quill 富文本编辑器：`pnpm add react-quill`
        2. 导入编辑器组件和配套样式文件
            
            ```jsx
            import ReactQuill from "react-quill";
            import "react-quill/dist/quill.snow.css";
            
            // ...
            
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
            ```
            
        3. 渲染编辑器组件
        4. 调整编辑器组件样式
- 收集表单数据提交表单
    - 步骤：
        1. 使用 Form 组件收集表单数据
        2. 按照接口文档封装接口函数
        3. 按照接口文档处理表单数据
        4. 提交接口并验证是否成功
- 实现切换封面类型
    - 实现效果：只有当前模式为单图或者三图模式时才显示上传组件
    - 步骤：获取到当前的封面类型 → 对上传组件进行条件渲染
- 控制上传图片的数量
    - 实现的效果：
        1. 单图模式时，最多能上传一张图片
        2. 三图模式时，最多能上传三张图片
    - 如何实现
        1. 找到限制上传数量的组件属性
        2. 使用 imageType 进行绑定控制

# 文章列表模块

- 静态结构创建
- 宣染频道数据
    - 可选的方案：
    1. 直接再写一遍
    2. 存到 Redux 中维护
    3. **使用自定义业务 hook**
        1. 创建一个 use 打头的函数
        2. 在函数中封装业务逻辑，并 return 出组件中要用到的状态数据
        3. 组件中导入函数执行并解构状态数据使用
- 渲染 table 文章列表
    - 步骤：
        1. 封装请求接口
        2. 使用 useState 维护状态数据
        3. 使用 useEffect 发送请求
        4. 在组件身上绑定对应属性完成渲染
- 适配文章状态
    - 实现效果：根据文章的不同状态在状态列显示不同 Tag
    - 实现思路：
        1. 如果要适配的状态只有两个：三元条件渲染
        2. 如果要适配的状态有多个：枚举渲染
