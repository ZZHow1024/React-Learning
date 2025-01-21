参考课程：

**【*黑马程序员* React18入门到实战】**

[https://www.bilibili.com/video/BV1ZB4y1Z7o8]

@ZZHow(ZZHow1024)

# 受控表单绑定

- 概念：使用 React 组件的状态(useState)控制表单的状态
- 步骤：
    1. 准备一个 React 状态值
    2. 通过 value 属性绑定状态，通过 onChange 属性绑定状态同步的函数
    
    ```jsx
    const [value, setValue] = useState('')
    ```
    
    ```jsx
    <input value={value} onChange={(e) => setValue(e.target.value)} type='text'></input>
    ```
    

# React中获取DOM

- 在 React 组件中获取/操作 DOM，需要使用 useRef 钩子函数，分为两步：
    1. 使用 useRef 创建 ref 对象，并与 JSX 绑定
    2. 在DOM可用时，通过 `inputRef.current` 拿到 DOM 对象
    
    ```jsx
    const inputRef = useRef(null)
    ```
    
    ```jsx
    <input ref={inputRef}></input>
    ```
    

# 评论案例

- 发表评论功能
    1. 获取评论内容
    2. 点击发布按钮发布评论
- id 处理和时间处理
    1. rpid 要求一个唯一的随机数 id - uuid
        - 安装：`pnpm add uuid`
        - 导入：`import {v4 as uuidV4} from 'uuid'`
        
        [GitHub - uuidjs/uuid: Generate RFC-compliant UUIDs in JavaScript](https://github.com/uuidjs/uuid)
        
    2. ctime 要求以当前时间为标准，生成固定格式 - dayjs
        - 安装：`pnpm add dayjs`
        - 导入：`import dayjs from 'dayjs'`
        
        [Day.js · 2kB JavaScript date utility library](https://day.js.org/)
        
- 清空内容并重新聚焦
    1. 清空内容 - 把控制 input 框的 value 状态设置为空串
    2. 重新聚焦 - 拿到 input 的 DOM 元素，调用 focus 方法
- 案例演示：[**react-basic-pro**](https://github.com/ZZHow1024/React-Learning/tree/main/Day02/react-basic-pro)

# 组件通信

- 概念：组件通信就是**组件之间的数据传递**，根据组件嵌套关系的不同，有不同的通信方法
- 种类：
    - 父子通信
    - 兄弟通信
    - 跨层通信
- 父传子
    - 实现步骤
        1. 父组件传递数据——在子组件标签上**绑定属性**
        2. 子组件接收数据——子组件通过 **props 参数**接收数据
    - props 说明
        1. props 可传递任意的数据：数字、字符串、布尔值、数组、对象、函数 和 JSX
        2. props 是只读对象：子组件只能读取 props 中的数据，不能直接进行修改，父组件的数据只能由父组件修改
    - 特殊的 prop children
        - 场景：当我们把内容嵌套在子组件标签中时，父组件会自动在名为 children 的 prop 属性中接收该内容
- 子传父
    - 思路：在子组件中调用父组件中的函数并传递参数
- 使用状态提升实现兄弟组件通信
    - 思路：借助“状态提升”机制，通过父组件进行兄弟组件之间的数据传递
    - 步骤：
        1. A 组件先通过子传父的方式把数据传给父组件 App
        2. App 拿到数据后通过父传子的方式再传递给 B 组件
- 使用 Context 机制跨层级组件通信
    - 步骤：
        1. 使用 createContext 方法创建一个上下文对象 Ctx
        2. 在顶层组件(App)中通过 Ctx.Provider 组件提供数据
        3. 在底层组件(B)中通过 useContext 钩子函数获取消费数据

# useEffect

- 概念：useEffect 是一个 React Hook 函数，用于在 React 组件中创建不是由事件引起而是**由渲染本身引起的操作**，比如发送 AJAX 请求，更改 DOM 等等
- 说明：上面的组件中没有发生任何的用户事件，**组件渲染完毕之后**就需要和服务器要数据，整个过程属于“**只由渲染引起的操作**”
- 基础使用
    - 需求：在组件渲染完毕之后，立刻从服务端获取频道列表数据并显示到页面中
    - 语法
        
        ```jsx
        useEffect(() => {}, [])
        ```
        
        - 参数 1 是一个函数，可以把它叫做副作用函数，在函数内部可以放置要执行的操作
        - 参数 2 是一个数组（可选参），在数组里放置依赖项，不同依赖项会影响第一个参数函数的执行，**当是一个空数组的时候，副作用函数只会在组件渲染完毕之后执行一次**
- 依赖项参数说明
    - useEffect 副作用函数的执行时机存在多种情况，根据**传入依赖项的不同**，会有不同的执行表现
    
    |  依赖项 | 副作用函数执行时机 |
    | --- | --- |
    | 没有依赖项 | 组件初始渲染＋组件更新时执行 |
    | 空数组依赖 | 只在初始渲染时执行一次 |
    | 添加特定依赖项 | 组件初始渲染＋特性依赖项变化时执行 |
- 清除副作用
    - 在 useEffect 中编写的**由渲染本身引起的对接组件外部的操作**，社区也经常把它叫做**副作用操作**。比如在 useEffect 中开启了一个定时器，我们想在组件卸载时把这个定时器再清理掉，这个过程就是清理副作用
    
    ```jsx
    useEffect(() => {
    	// 实现副作用操作逻辑
    	
    	return () => {
    		// 清除副作用逻辑
    	}
    }, [])
    ```
    
    - 说明：清除副作用的函数最常见的执行时机是在组件卸载时自动执行
    - 场景举例：在 Son 组件渲染时开启一个定制器，卸载时清除这个定时器

# 自定义Hook函数

- 概念：自定义 Hook 是以 **use 打头的函数**，通过自定义Hook函数可以用来实现**逻辑的封装和复用**
- 思路：不封装直接实现 → 封装自定义 Hook 实现 → 抽象实现的通用逻辑
- 步骤：
    1. 声明一个以 use 打头的函数
    2. 在函数体内封装可复用的逻辑（只要是可复用的逻辑）
    3. 把组件中用到的状态或者回调 return 出去（以对象或者数组）
    4. 在哪个组件中要用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用

# React Hook使用规则

- 只能在组件中或者其他自定义 Hook 函数中调用
- 只能在组件的顶层调用，不能嵌套在 if、for 或 其他函数中

# 评论案例进阶

- 优化需求
    1. 使用请求接口的方式获取评论列表并渲染
    2. 使用自定义 Hook 函数封装数据请求的逻辑
    3. 把评论中的每一项抽象成一个独立的组件实现渲染
- 通过接口获取评论列表
    1. 使用 JSON Server 工具模拟接口服务，通过 Axios 发送接口请求
        - JSON Server 是一个快速以 .json 文件作为数据源模拟接口服务的工具
            - 安装：`pnpm add json-server -D`
            - 启动：`json-server db.json --port 3001`
            
            [GitHub - typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously)](https://github.com/typicode/json-server)
            
        - Axios 是一个广泛使用的前端请求库
            - 安装：`pnpm add axios`
            - 导入：`import *axios* from "axios"`
            
            [Getting Started | Axios Docs](https://axios-http.com/docs/intro)
            
    2. 使用 useEffect 调用接口获取数据
- 自定义 Hook 函数封装数据请求
- 封装评论项 Item 组件
    - 抽象原则：App 作为“智能组件”负责数据的获取，Item 作为“UI组件”负责数据的渲染
- 案例演示：[**react-basic-pro**](https://github.com/ZZHow1024/React-Learning/tree/main/Day02/react-basic-pro)
