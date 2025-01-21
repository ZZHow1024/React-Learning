# React前端开发_Day1

参考课程:

**【*黑马程序员* React18入门到实战】**

[https://www.bilibili.com/video/BV1ZB4y1Z7o8]

@ZZHow(ZZHow1024)

# React 简介

- React 由 Meta 公司研发，是一个用于 **构建 Web 和原生交互界面的库**
    - Web 应用
    - IOS and Android 应用
- 优势
    - 相较于传统基于 DOM 开发的优势：组件化的开发方式 和 不错的性能
    - 相较于其它前端框架的优势：丰富的生态 和 跨平台支持
- 市场情况：目前全球最流行。

# React开发环境创建

- 使用 `create-react-app` 快速搭建开发环境
- `create-react-app` 是一个快速 **创建 React 开发环境的工具**，底层由 Webpack 构建，**封装了配置细节**，开箱即用
- 执行命令：`npx create-react-app react-basic`
    1. `npx`：Node.js 工具命令，查找并执行后续的包命令
    2. `create-react-app`：核心包（固定写法），用于创建 React 项目
    3. `react-basic` ：React 项目的名称（可以自定义）
- 创建 React 项目的更多方式
    - `yarn create react-app react-basic`
    - `pnpm create react-app react-basic`
    
    [启动一个新的 React 项目 – React 中文文档](https://zh-hans.react.dev/learn/start-a-new-react-project)
    
- React 工程启动基本流程
    - index.js 是项目的入口
        - 导入 React 必要的两个核心包
        - 导入项目的根组件
        - 将 App 根组件渲染到 id 为 root 的 DOM 节点上
    - App.js 是项目的根组件
        - App -> index.js -> public/index.html(root)

# JSX基础

- JSX 简介
    - 概念：JSX 是 Javascript 和 XML(HTML)的缩写，表示在 JS 代码中编写 HTML 模版结构，它是**在 React 中编写 UI 模版的方式**
    - 优势：
        1. HTML 的声明式模版写法
        2. JS 的可编程能力
    - 本质：JSX 并不是标准的 JS 语法，它是 **JS 的语法扩展**，浏览器本身不能识别，需要通过**解析工具**(Babel)做解析之后才能在浏览器中运行
- JSX 中使用 JS 表达式
    - 在 JSX 中可以通过 **大括号语法{}** 识别 JavaScript 中的表达式，比如常见的变量、函数调用、方法调用等等
        1. 使用引号传递字符串
        2. 使用 JavaScript 变量
        3. 函数调用和方法调用
        4. 使用 JavaScript 对象
- JSX 中实现列表渲染
    
    ```jsx
    <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
    ```
    
    - 语法：在 JSX 中可以使用原生 JS 中的 map 方法遍历渲染列表
    - 方法：list 的 map 方法，循环哪个结构就 return 哪个结构
    - 注意事项：加上独一无二的 key 字符串或者 number(id)
    - key 的作用：React 框架内部使用，提升更新性能
- JSX 中实现条件渲染
    
    ```jsx
    {/* 逻辑与 && */}
    {isLogin && <span>已登录</span>}<br/>
    {/* 三元运算 */}
    {isLogin ? <span>已登录</span> : <span>未登录</span>}<br/>
    ```
    
    - 语法：在 React 中，可以通过逻辑与运算符 `&&`、三元表达式`( ? : )`实现基础的条件渲染
- JSX 中实现复杂条件渲染
    - 需求：列表中需要根据文章状态适配三种情况，单图，三图，和无图三种模式
    - 解决方案：**自定义函数** + **if 判断语句**

# React事件绑定

- 基础语法：on事件名称={事件处理函数}，整体上遵循驼峰命名法
- 使用事件对象参数：在事件回调函数中设置形参 e
- 传递自定义参数：事件绑定的位置改造成**箭头函数的写法**，在执行 clickHandler 实际处理业务函数的时候传递实参
    - 注意：不能直接写函数调用，这里事件绑定需要一个**函数引用**
- 同时传递事件对象和自定义参数：在事件绑定的位置传递事件实参 e 和自定义参数，clickHandler 中声明形参，注意顺序对应
    
    ```jsx
    <button onClick={(e) => handleClick('Tom', e)}>按钮</button>
    ```
    

# React中的组件

- 概念：一个组件就是用户界面的一部分，它可以有自己的逻辑和外观，组件之间可以**互相嵌套**，**也可以复用多次**
- 优势：组件化开发可以让开发者像搭积木一样构建一个完整的庞大的应用
- React 组件：在 React 中，一个组件就是首字母大写的函数，内部存放了组件的逻辑和视图 UI，渲染组件只需要把组件当成标签书写即可
    
    ```jsx
    // 1. 定义组件
    const Button = () => {
        return <button>自定义按钮</button>
    }
    ```
    
    ```jsx
    {/* 2. 使用组件（渲染组件） */}
    {/* 自闭和 */}
    <Button/>
    {/* 成对标签 */}
    <Button></Button>
    ```
    

# useState

- useState 基础使用
    - useState 是一个 React Hook（函数），它允许我们向组件添加一个状态变量，从而控制影响组件的渲染结果
    - 本质：和普通 JS 变量不同的是，状态变量一旦发生变化组件的视图 UI 也会跟着变化（数据驱动视图）
    
    ```jsx
    const [count, setCount] = useState(0)
    ```
    
    1. useState 是一个函数，返回值是一个数组
    2. 数组中的第一个参数是状态变量，第二个参数是 set 函数用来修改状态变量
    3. useState 的参数将作为 count 的初始值
- 修改状态的规则
    - 状态不可变：在 React 中，状态被认为是只读的，我们应该始终**替换它而不是修改它**，直接修改状态不能引发视图更新
    - 修改对象状态：对于对象类型的状态变量，应该始终传给 set 方法一个**全新的对象**来进行修改

# 基础样式控制

- React 组件基础样式控制有两种方式：
    1. 行内样式（不推荐）
    2. class 类名控制

# 评论案例

- 功能：
    1. 渲染评论列表
    2. 删除评论实现
    3. 渲染导航 Tab 和高亮实现
    4. 评论列表排序功能实现
- 渲染评论列表
    - 思路：使用 useState 维护评论列表，使用 map 方法对列表数据进行遍历渲染（需要加 key）
- 删除评论
    - 需求：
        1. 只有自己的评论才显示删除按钮
        2. 点击删除按钮，删除当前评论，列表中不再显示
    - 思路：
        1. 删除显示——条件渲染
        2. 删除功能——拿到当前项 id 以 id 为条件对评论列表做 filter 过滤
- 渲染导航 Tab 和高亮
    - 需求：点击哪个 Tab 项，哪个做高亮处理
    - 思路：点击谁就把谁的 **type（独一无二的标识）**记录下来，然后和遍历时的**每一项的 type 做匹配**，谁匹配到就设置负责高亮的类名
- 评论列表排序功能
    - 需求：点击最新，评论列表按照创建时间倒序排列（新的在前），点击最热按照点赞数排序（多的在前）
    - 排序使用前端热门的工具库——Lodash 实现
        - 安装：`pnpm add lodash`
        - 导入：`import _ from 'lodash'`
        
        [Lodash](https://lodash.com/)
        
- 案例演示：[**react-basic-pro**](https://github.com/ZZHow1024/React-Learning/tree/main/Day01/react-basic-pro)

# classnames优化类名控制

- classnames 是一个简单的 JS 库，可以非常方便的**通过条件动态控制 class 类名的显示**
    
    ```jsx
    <span key={item.type} className={classNames('nav-item', {active: type === item.type})}onClick={() => handleTabChange(item.type)}>{item.text}</span>
    ```
    
- 安装：`pnpm add classnames`
- 导入：`import classNames from 'classnames'`

[GitHub - JedWatson/classnames: A simple javascript utility for conditionally joining classNames together](https://github.com/JedWatson/classnames)
