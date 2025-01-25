# React前端开发_Day3

参考课程：

**【*黑马程序员* React18入门到实战】**

[https://www.bilibili.com/video/BV1ZB4y1Z7o8]

@ZZHow(ZZHow1024)

# Redux入门

- 简介：Redux 是 React 最常用的**集中状态管理工具**，类似于 Vue 中的 Pinia 或。Vuex，**可以独立于框架运行**
- 作用：通过集中管理的方式管理应用的状态
- Redux 快速体验：不和任何框架绑定，不使用任何构建工具，使用纯 Redux 实现计数器
    - 使用步骤：
        1. 定义一个 **reducer 函数**（根据当前想要做的修改返回一个新的状态）
        2. 使用 createStore 方法传入 reducer 函数生成一个 **store 实例对象**
        3. 使用 store 实例的 **subscribe 方法**订阅数据的变化（数据一旦变化，可以得到通知）
        4. 使用 store 实例的 **dispatch 方法提交 action 对象**触发数据变化（告诉 reducer 你想怎么改数据）
        5. 使用 store 实例的 **getState 方法**获取最新的状态数据更新到视图中
    - Redux 管理数据流程：View[视图] → Action → Reducer → Store → View[视图]
- Redux 数据修改的**三个核心概念**
    1. state：一个对象，存放管理的数据状态
    2. action：一个对象，描述如何修改数据
    3. reducer：一个函数，根据 action 的描述生成一个新的 state
- 案例演示：[react-redux-pro](https://github.com/ZZHow1024/React-Learning/tree/main/Day03/react-redux-pro)

# Redux与React

- 环境准备
    - 配套工具：在 React 中使用 redux，官方要求安装俩个其他插件 **Redux Toolkit** 和 **react-redux**
        1. Redux Toolkit(RTK)：官方推荐编写 Redux 逻辑的方式，是一套工具的集合集，**简化书写方式**
            1. 简化 store 的配置方式
            2. 内置 immer 支持可变式状态修改
            3. 内置 thunk 更好的异步创建
        2. react-redux：用来**链接 Redux** 和 **React 组件**的中间件
            1. Redux → react-redux -获取状态→ React 组件
            2. Redux ←更新状态- react-redux - React 组件
    - 配置基础环境
        1. 使用 CRA 快速创建 React 项目：`pnpm create react-app react-redux-pro` 
        2. 安装配套工具：`pnpm add @reduxjs/toolkit react-redux`
        3. 启动项目：`pnpm start`
    - store 目录结构设计
        1. 通常集中状态管理的部分都会单独创建一个单独的 ‘store’ 目录
        2. 应用通常会有很多个子 store 模块，所以创建一个 ‘modules’ 目录，在内部编写业务分类的子 store
        3. store 中的入口文件 index.js 的作用是组合 modules 中所有的子模块，并导出 store
- 实现 counter
    - 整体路径熟悉
        - Redux store 配置 → store → React 组件
        - Redux store 配置
            - 配置 counterStore 模块
            - 配置根 store 并组合 counterStore 模块
        - React 组件
            - 注入 store(react-redux)
            - 使用 store 中的数据
            - 修改 store 中的数据
    - 使用 React Toolkit 创建 counterStore（样板代码）
        
        ```jsx
        // src/store/modules/counterStore
        import {createSlice} from '@reduxjs/toolkit'
        
        const counterStore = createSlice({
            name: 'counter', // 模块名字
            // 初始化 state
            initialState: {
                count: 0
            },
            // 修改状态的方法同步方法，支持直接修改
            reducers: {
                increment(state) {
                    state.count++
                },
                decrement(state) {
                    state.count--
                }
            }
        })
        
        // 解构出来 actionCreator 函数
        const {increment, decrement} = counterStore.actions
        
        // 获取 reducer
        const reducer = counterStore.reducer
        
        // 按需导出的方式导出 actionCreator
        export {increment, decrement}
        
        // 以默认导出的方式导出 reducer
        export default reducer
        ```
        
        ```jsx
        // src/store/index.js
        import {configureStore} from '@reduxjs/toolkit';
        
        // 导入子模块 reducer
        import counterReducer from './modules/counterStore'
        
        const store = configureStore({
            reducer: {
                counter: counterReducer
            }
        })
        
        export default store
        ```
        
    - 为 React 注入 store：react-redux 负责把 Redux 和 React 链接起来，内置 Provider 组件通过 store 参数把创建好的 store 实例注入到应用中，链接正式建立
        
        ```jsx
        // src/index.js
        // ...
        
        const root = ReactDOM.createRoot(document.getElementById('root'))
        root.render(
            <React.StrictMode>
                <Provider store={store}>
                    <App/>
                </Provider>
            </React.StrictMode>
        )
        ```
        
    - React 组件使用 store 中的数据：在 React 组件中使用 store 中的数据，需要用到一个钩子函数 - useSelector，它的作用是把 store 中的数据映射到组件中
        - 使用样例：
            
            ```jsx
            // src/App.js
            import {useSelector} from 'react-redux'
            
            function App() {
                const {count} = useSelector(state => state.counter)
            
                return (
                    <div className="App">
                        {count}
                    </div>
                );
            }
            
            export default App
            
            ```
            
    - React 组件修改 store 中的数据：React 组件中修改 store 中的数据需要借助另外一个 hook 函数 - useDispatch，它的作用是生成提交 action 对象的 dispatch 函数
        - 使用样例：
            
            ```jsx
            // src/App.js
            import {useDispatch, useSelector} from 'react-redux'
            import {increment, decrement} from './store/modules/counterStore' // 导入 actionCreator
            
            function App() {
                const {count} = useSelector(state => state.counter)
                const dispatch = useDispatch()
            
                return (
                    <div className="App">
                        <button onClick={() => dispatch(decrement())}>-</button>
                        {count}
                        <button onClick={() => dispatch(increment())}>+</button>
                    </div>
                )
            }
            
            export default App
            
            ```
            
    - 总结：
        1. 组件中使用 “useSelector” Hook 函数获取 store 中的数据
        2. 组件中使用 “useDispatch” Hook 函数获取 dispatch 方法
        3. 执行 store 模块中导出的 actionCreater 方法得到要提交 action 对象
- 提交 action 传参
    - 需求：组件中有俩个按钮 add to 10 和 add to 20 可以直接把 count 值修改到对应的数字，目标 count 值是在组件中传递过去的，需要在**提交 action 的时候传递参数**
    - 提交 action 传参实现需求：在 reducers 的同步修改方法中**添加 action 对象参数**，在**调用 actionCreater 的时候传递参数**，参数会被传递到 **action 对象 payload 属性**上
- 异步状态操作
    - 需求：通过 Redux 管理从后端获取的数据
    - 架构：
        - Redux Store
            - 配置 store
            - 同步修改
            - **异步修改**
        - React 组件
            - 消费使用 store 中的数据
            - dispatch action 更新 store
    - 异步操作样板代码
        1. 创建 store 的写法保持不变，配置好同步修改状态的方法
        2. 单独封装一个函数，在函数内部 return 一个新函数，在新函数中
            1. 封装异步请求获取数据
            2. 调用**同步 actionCreater** 传入异步数据生成一个 action 对象，并使用 dispatch 提交
        3. 组件中 dispatch 的写法保持不变
- Redux 调试——devtools
    
    [Redux DevTools - Chrome Web Store](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=ext_app_menu)
    

# 美团外卖案例

- 功能列表：
    - 商品列表和分类渲染
    - 添加商品
    - 购物车操作
    - 订单数量统计和高亮实现
- 基本开发思路：使用 RTK(Redux Toolkit) 来管理应用状态，组件负责**数据渲染**和 **dispatch action**
- 分类和商品列表渲染
    1. 启动项目（mock 服务＋前端服务）
    2. 使用 RTK 编写 store（异步 action）
    3. 组件触发 action 并且渲染数据
- 点击分类激活交互实现
    1. 使用 RTK 编写管理 activelndex
    2. 组件中点击时触发 action 更改 activelndex
    3. 动态控制激活类名显示
- 商品列表切换显示
    - 条件渲染：控制对应项显示
    - `activeIndex === index && 视图`
- 添加购物车实现
    1. 使用 RTK 管理新状态 CartList
    2. 如果添加过，只更新数量 count，没有添加过，直接 push 进去
    3. 组件中点击时收集数据提交 action 添加购物车
- 统计区域功能实现
    1. 基于 store 中的 cartList 的 length 渲染数量
    2. 基于 store 中的 cartList 累加 price * count
    3. 购物车 cartList 的 length 不为零则高亮
- 购物车列表功能实现
    1. 使用 cartList 遍历渲染列表
    2. RTK 中增加增减 reducer，组件中提交 action
    3. RTK 中增加清除购物车 reducer，组件中提交 action
- 控制购物车显示和隐藏
    1. 使用 useState 声明控制显隐的状态
    2. 点击统计区域设置状态为 true
    3. 点击蒙层区域设置状态为 false
- 案例演示：[redux-meituan](https://github.com/ZZHow1024/React-Learning/tree/main/Day03/redux-meituan)
