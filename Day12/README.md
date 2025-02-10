# React前端开发_Day12_极客园移动端项目

参考课程：

**【*黑马程序员* React18入门到实战】**

[https://www.bilibili.com/video/BV1ZB4y1Z7o8]

参考文章：

**【vite搭建React+ts+eslint+prettier】**

[https://blog.csdn.net/m0_71534259/article/details/139006549]

@ZZHow(ZZHow1024)

# 项目前置准备

- 使用 Vite 创建开发环境
    - Vite 是一个框架无关的前端工具链，可以快速的生成一个 React+TypeScript 的开发环境，并且可以提供快速的开发体验
    - 安装命令：`pnpm create vite react-jike-mobile --template react-ts`
    - 说明：
        1. `pnpm create vite` 固定写法（使用最新版本 Vite 初始化项目）
        2. `react-jike-mobile` 项目名称（可以自定义）
        3. `--template react-ts` 指定项目模版位 React+TypeScript
- 配置 Prettier
    - 安装命令：`pnpm add prettier eslint-config-prettier eslint-plugin-prettier -D`
    - 根目录创建 .prettierrc 文件
        
        ```json
        {
          "useTabs": false,
          "tabWidth": 2,
          "printWidth": 80,
          "singleQuote": true,
          "trailingComma": "none",
          "semi": true
        }
        ```
        
        - useTabs：使用 Tab 缩进还是空格缩进；
        - tabWidth：Tab 是空格的情况下，是几个空格，选择 2 个；
        - printWidth：当行字符的长度，推荐 80；
        - singleQuote：使用单引号还是双引号，选择 true，使用单引号；
        - trailingComma：在多行输入的尾逗号是否添加，设置为 none；
        - semi：语句末尾是否要加分号，默认值 true。
    - 根目录创建 .prettierignore文件，忽略不需要格式化的文件夹或文件
        
        ```
        /dist/*
        .local
        .output.js
        /node_modules/**
         
        **/*.svg
        **/*.sh
         
        /public/*
        ```
        
    - 开启保存时自动运行 Prettier
- 安装 Ant Design Mobile
    - Ant Design Mobile 是 Ant Design 家族里专门针对于移动端的组件库
    - 安装命令：`pnpm add antd-mobile`
- 初始化路由
    - React 的路由初始化，我们采用 react-router-dom 进行配置
    - 路由结构：
        - Home（一级路由）
        - Detail（一级路由）
- 配置路径别名
    - 场景：项目中各个模块之间的互相导入导出，可以通过@别名路径做路径简化，经过配置 @ 相当于 src 目录
    - 步骤：
        1. 让 Vite 做路径解析（真实的路径转换）
            - 安装包 node 类型包：`pnpm add @types/node -D`
            - 配置 vite.config.ts 文件
            
            ```tsx
            export default defineConfig({
              plugins: [react()],
              resolve: {
                alias: {
                  '@': path.resolve(__dirname, './src')
                }
              }
            });
            ```
            
        2. 让 IDE 做智能路径提示（开发者体验）
            - 配置 tsconfig.app.json 文件
            
            ```json
            {
              "compilerOptions": {
                ...
                "baseUrl": ".",
                "paths": {
                  "@/*": [
                    "src/*"
                  ]
                },
              }
            }
            ```
            
- 安装 Axios
    - 场景：Axios 作为最流行的请求插件，同样是类型友好的，基于 Axios 做一些基础的封装
    - 步骤：
        1. 安装 Axios 到项目：`pnpm add axios`
        2. 在 utils 中封装 http 模块，主要包括接口基地址、超时时间、拦截器
        3. 在 utils 中做统一导出
- 封装 API 模块
    - 场景：Axios 提供了 request 泛型方法，方便我们传入类型参数推导出接口返回值的类型
    - 基础语法：
        
        ```tsx
        axios.request<Type>(requestConfig).then((res) => {
          // res.data 的类型为 Type
          console.log(res.data);
        });
        ```
        
    - 说明：泛型参数 `Type` 的类型决定了 `res.data` 的类型
    - 步骤：
        1. 根据接口文档创建一个通用的泛型接口类型（多个接口返回值的结构是相似的）
        2. 根据接口文档创建特有的接口数据类型（每个接口有自己特殊的数据格式）
        3. 组合 1 和 2 的类型，得到最终传给 request 泛型的参数类型

# Home模块

- 整体组件嵌套设计
    - Tabs 区域 和 Lists 区域
- Tabs 区域实现
    - 实现步骤：
        1. 使用 ant-mobile 组件库中的 Tabs 组件进行页面结构创建
        2. 使用真实接口数据进行渲染
        3. 有优化的点进行优化处理
- 自定义 hook 函数优化
    - 场景：当前状态数据的各种操作逻辑和组件渲染是写在一起的，可以采用**自定义 hook 封装的方式让逻辑和渲染相分离**
    - 实现步骤：
        1. 把和 Tabs 相关的响应式数据状态以及操作数据的方法放到 hook 函数中
        2. 组件中调用 hook 函数，消费其返回的状态和方法
- List 组件实现
    - 实现步骤：
        1. 搭建基础结构，并获取基础数据
        2. 为组件设计 channelId 参数，点击 Tab 时传入不同的参数
- List 列表无限滚动实现
    - 交互要求：List 列表在滑动到底部时，自动加载下一页列表数据
    - 实现思路：
        1. 滑动到底部触发加载下一页动作：`<InfiniteScroll/>`
        2. 加载下一页数据：`pre_timestamp` 接口参数
        3. 把老数据和新数据做拼接处理：`[…oldList, …newList]`
        4. 停止监听边界值：`hasMore`

# 详情模块

- 路由跳转和数据渲染
    - 需求：点击列表中的某一项跳转到详情路由并显示当前文章
    - 步骤：
        1. 通过路由跳转方法进行跳转，并传递参数
        2. 在详情路由下获取参数，并请求数据
        3. 渲染数据到页面中

# **项目演示**

- 在线演示：https://geek.itheima.net/
- 接口文档：https://geek.itheima.net/api.html
- 基地址：http://geek.itheima.net/v1_0
