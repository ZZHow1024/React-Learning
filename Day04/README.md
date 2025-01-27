# React前端开发_Day4

参考课程：

**【*黑马程序员* React18入门到实战】**

[https://www.bilibili.com/video/BV1ZB4y1Z7o8]

@ZZHow(ZZHow1024)

# ReactRouter

- 快速开始
    - 什么是前端路由：一个路径 path 对应一个组件 component 当我们在浏览器中访问一个 path 的时候，path 对应的组件会在页面中进行渲染
    - 创建路由开发环境：采用 CRA 创建项目的方式进行基础环境配置
        1. 创建项目并安装所有依赖：`pnpm create react-app react-router-pro`
        2. 安装最新的 ReactRouter 包：`pnpm add react-router-dom`
        3. 启动项目：`pnpm start`
    - 需求：创建一个可以切换登录页和文章页的路由系统
        - /login：登录
        - /article：文章
    - 步骤：
        1. 创建 router 实例对象并且配置路由对应关系
            
            ```jsx
            const router = createBrowserRouter([
                {
                    path: "/login",
                    element: <div>登录页</div>
                },
                {
                    path: "/article",
                    element: <div>文章页</div>
                }
            ])
            ```
            
        2. 路由绑定
            
            ```jsx
            <RouterProvider router={router}/>
            ```
            
- 抽象路由模块
    - src/page/
        - Login
        - Article
    - src/router（引入组件配置 path-component）
    - 应用入口文件渲染 RouterProvider（注入 router 实例）
- 路由导航
    - 路由系统中的多个路由之间需要进行**路由跳转**，并且在跳转的同时有可能需要**传递参数进行通信**
    - 声明式导航
        - 声明式导航是指通过在模版中通过 `<Link/>` **组件描述出要跳转到哪里**，比如后台管理系统的左侧菜单通常使用这种方式进行
            
            ```jsx
            <Link to='/article'>跳转到文章页</Link>
            ```
            
        - 语法说明：通过给组件的 **to 属性指定要跳转到路由 path**，组件会被渲染为浏览器支持的 a 链接，如果需要传参直接**通过字符串拼接**的方式拼接参数即可
    - 编程式导航
        - 编程式导航是指通过 `useNavigate` 钩子得到导航方法，然后通过**调用方法以命令式的形式**进行路由跳转，比如想在登录请求完毕之后跳转就可以选择这种方式，更加灵活
            
            ```jsx
            const navigate = useNavigate()
            
            <button onClick={() => navigate('/article')}>跳转到文章页</button>
            ```
            
        - 语法说明：通过调用 `navigate` 方法传入地址 path 实现跳转
- 导航传参
    - searchParams 传参
        - 发送方
        
        ```jsx
        const navigate = useNavigate()
        
        <button onClick={() => navigate('/article?id=111&name=Tom')}>跳转到文章页并传参</button>
        ```
        
        - 接收方
        
        ```jsx
        const [params] = useSearchParams()
        
        <div>接收参数 id：{params.get('id')}</div>
        <div>接收参数 name：{params.get('name')}</div>
        ```
        
    - params 传参
        - 发送方
        
        ```jsx
        const navigate = useNavigate()
        
        <button onClick={() => navigate('/article/111/Tom')}>跳转到文章页并 params 传参</button>
        ```
        
        - 接收方
        
        ```jsx
        const params = useParams()
        
        <div>接收参数 id：{params.id}</div>
        <div>接收参数 name：{params.name}</div>
        ```
        
- 嵌套路由配置
    - 在一级路由中又内嵌了其他路由，这种关系就叫做嵌套路由，嵌套至一级路由内的路由又称作二级路由
    - 实现步骤：
        1. 使用 children 属性配置路由嵌套关系
            
            ```jsx
            const router = createBrowserRouter([
                {
                    path: '/',
                    element: <Layout/>,
                    children: [
                        {
                            path: 'board',
                            element: <Board/>
                        },
                        {
                            path: 'about',
                            element: <About/>
                        }
                    ]
                }
            ])
            ```
            
        2. 使用 `<Outlet/>` 组件配置二级路由渲染位置
            
            ```jsx
            const Layout = () => {
                return (
                    <div>
                        一级路由 Layout 组件
                        <br/>
                        <Link to='/board'>面板</Link>
                        &nbsp;
                        <Link to='/about'>关于</Link>
                        {/* 配置二级路由的出口 */}
                        <Outlet/>
                    </div>
                )
            }
            ```
            
- 默认二级路由
    - 当访问的是一级路由时，默认的二级路由组件可以得到渲染，只需要在二级路由的位置**去掉 path**，**设置 index 属性为 true**
    
    ```jsx
    children: [
        // 设置为默认二级路由
        {
            index: true,
            element: <Board/>
        }
    ]
    ```
    
- 404 路由配置
    - 场景：当浏览器输入 url 的路径在整个路由配置中都找不到对应的 path，为了用户体验，可以使用 404 兜底组件进行渲染
    - 实现步骤：
        1. 准备一个 NotFound 组件
        2. 在路由表数组的末尾，以 * 号作为路由 path 配置路由
- 两种路由模式
    - 各个主流框架的路由常用的路由模式有两种，**history 模式和 hash 模式**，ReactRouter 分别由 `createBrowserRouter` 和 `createHashRouter` 函数负责创建
    
    | 路由模式 | URL 中路径的表现 | 底层原理 | 部署时是否需要特殊配置 |
    | --- | --- | --- | --- |
    | history | /xxx | history 对象 + pushState 事件 | 需要 |
    | hash | /#/xxx | 监听 hashChange 事件 | 不需要 |
- 案例演示：[**react-router-pro**](https://github.com/ZZHow1024/React-Learning/tree/main/Day04/react-router-pro)

# 记账本案例

- 环境搭建：使用 CRA 创建项目，并安装必要依赖，包括下列基础包
    1. Redux 状态管理：@reduxjs/toolkit、 react-redux
    2. 路由：react-router-dom
    3. 时间处理：dayjs
    4. class 类名处理：classnames
    5. 移动端组件库：antd-mobile
    6. 请求插件：axios
- 配置别名路径@
    1. 路径解析配置(webpack)，把 @/ 解析为 src/：使用 craco 插件
    2. 路径联想配置(VsCode)，VS Code 在输入 @/ 时，自动联想出来对应的 src/ 下的子级目录：通过 jsconfig.json 配置
    - 路径解析配置
        - CRA 本身把 webpack 配置包装到了黑盒里无法直接修改，需要借助一个插件：craco
        - 配置步骤：
            1. 安装 craco：`pnpm add -D @craco/craco`
            2. 项目根目录下创建配置文件：craco.config.js
            3. 配置文件中添加路径解析配置
                
                ```jsx
                // craco.config.js
                const path = require("path")
                
                module.exports = {
                    webpack: {
                        alias: {
                            '@': path.resolve(__dirname, './src')
                        }
                    }
                }
                
                ```
                
            4. 包文件中配置启动和打包命令
                
                ```json
                // package.json
                "scripts": {
                    "start": "craco start",
                    "build": "craco build"
                }
                ```
                
    - 联想路径配置
        - VS Code 的联想配置，需要我们在项目目录下添加 jsconfig.json 文件，加入配置之后 VS Code 会自动联想提示
        - 配置步骤：
            1. 根目录下新增配置文件：jsconfig.json
            2. 添加路径提示配置
                
                ```json
                // jsconfig.json
                {
                  "compilerOptions": {
                    "baseUrl": "./",
                    "paths": {
                      "@/*": [
                        "src/*"
                      ]
                    }
                  }
                }
                ```
                
- 数据 Mock 实现
    - 在前后端分类的开发模式下，前端可以在没有实际后端接口的支持下先进行接口数据的模拟，进行正常的业务功能开发
    - 市场常见的 Mock 方式
        1. 前端直接写假数据：纯静态，没有服务
        2. 自研 Mock 平台：成本太高
        3. json-server 等工具：有服务，成本低
    - json-server 实现数据 Mock
        - json-server 是一个 node 包，可以在不到 30 秒内获得零编码的完整的 Mock 服务
        - 实现步骤：
            1. 项目中安装 json-server：`pnpm add -D json-server`
            2. 准备一个 JSON 文件
            3. 添加启动命令
                
                ```json
                // package.json
                "serve": "json-server ./server/data.json --port 8888"
                ```
                
            4. 访问接口进行测试
- 整体路由设计
    - Layout（一级路由）
        - Month（二级路由）
        - Year（二级路由）
    - New（一级路由）
- antD-mobile 主题定制
    - 定制方案：
        1. 全局定制：**整个应用范围**内的组件都生效
            
            ```css
            :root:root {
            --adm-color-primary: #a062d4;
            }
            ```
            
        2. 局部定制：**只在某些元素内部**的组件生效
- Redux 管理账目列表
    - 基于RTK管理账目列表
        - RTK
            - State：billList
            - reducer：setBillList
            - 异步 action
        - component
            - dispatch 异步 action
- TabBar 功能实现
    - 需求：使用 antD 的 **TabBar 标签栏组件**进行布局以及路由的切换
    - 实现方式：看文档（找到相似 Demo → 复制代码跑通 → 定制化修改）
        1. 静态布局实现
        2. 切换路由实现
- 案例演示：[**react-bill**](https://github.com/ZZHow1024/React-Learning/tree/main/Day04/react-bill)
