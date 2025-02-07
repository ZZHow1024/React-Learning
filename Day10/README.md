# React前端开发_Day10

参考课程：

**【*黑马程序员* React18入门到实战】**

[https://www.bilibili.com/video/BV1ZB4y1Z7o8]

@ZZHow(ZZHow1024)

# 性能优化API

- useReducer
    - 作用：和 `useState` 的作用类似，用来管理**相对复杂**的状态数据
    - 基础语法：
        
        ```jsx
        function reducer(state, action) {
        	// 根据不同的 action 返回不同的新状态
        }
        
        // 在组件中调用 useReducer，并传入 reducer 函数和状态的初始值
        const [state, dispatch] = useReducer(reducer, 0)
        ```
        
    - 步骤：
        1. 定义一个 reducer 函数（根据不同的 action 返回不同的新状态）
        2. 在组件中调用 useReducer，并传入 reducer 函数和状态的初始值
        3. 事件发生时，通过 dispatch 函数分派一个 action 对象（通知 reducer 要返回哪个新状态并渲染 UI）
- useMemo
    - 作用：在组件每次重新渲染的时候**缓存计算的结果**
    - 基础语法：
        
        ```jsx
        const result = useMemo(() => {
          // 返回计算的结果
        }, []);
        ```
        
    - 说明：使用 useMemo 做缓存之后可以保证只有 count 依赖项发生变化时才会重新计算
- React.memo
    - 作用：允许组件在 Props 没有改变的情况下跳过渲染
    - React 组件默认的渲染机制：只要父组件重新渲染子组件就会重新渲染
    - 说明：经过 memo 函数包裹生成的缓存组件只有在 props 发生变化的时候才会重新渲染
    - 基础语法：
        
        ```jsx
        const Input = memo(function Input() {
            return <input type='text'/>
        })
        ```
        
    - props 的比较机制
        - 机制：在使用 memo 缓存组件之后，React 会对每一个 prop 使用 Object.is 比较新值和老值，返回 true，表示没有变化
        - prop 是简单类型
            - 例：`Object.is(3, 3)` → true 没有变化
        - prop 是引用类型（对象 / 数组）
            - 例：`Object.is([], [])` → false 有变化，React 只关心引用是否变化
    - 使引用稳定的方法：使用 useMemo 缓存
        
        ```jsx
        const list = useMemo(() => {
        	return [1, 2, 3]
        }, [])
        ```
        
- useCallback
    - 作用：在组件多次重新渲染的时候**缓存函数**
    - 说明：使用 useCallback 包裹函数之后，函数可以保证在 App **重新渲染的时候保持引用稳定**
    - 基础语法：
        
        ```jsx
        const changeHandler = useCallback((value) => {
            return setText(value)
        }, [])
        ```
        

# ref相关API

- React.forwardRef
    - 使父组件通过 ref 获取到子组件内部的元素
    - 基础语法：
        
        ```jsx
        const Son = forwardRef((props, ref) => {
            return <input type='text' ref={ref}/>
        })
        ```
        
- useImperativeHandle
    - 使父组件通过 ref 调用子组件内部的方法
    - 基础语法：
        
        ```jsx
        // 子组件内部将方法暴露出去
        useImperativeHandle(ref, () => {
            return {
                focusHandler
            }
        })
        ```
        

# Class API类组件

- 类组件基础结构
    - 类组件就是通过 **JS 中的类来组织组件的代码**
    - 成员：
        1. 通过类属性 state 定义状态数据
        2. 通过 setState 方法来修改状态数据
        3. 通过 render 来写 UI 模版（JSX 语法一致）
    - 基本语法：
        
        ```jsx
        // Counter 组件
        class Counter extends Component {
            // 编写逻辑代码
            // 1. 状态变量
            state = {
                count: 0
            }
        
            // 2. 定义事件回调
            setCount = () => {
                this.setState({
                    count: this.state.count + 1
                })
            }
        
            // 3. UI(JSX)
            render() {
                return <button onClick={this.setCount}>{this.state.count}</button>
            }
        }
        ```
        
- 类组件的生命周期函数
    - 概念：组件从创建到销毁的**各个阶段自动执行的函数**就是生命周期函数
        
        ![React类组件的生命周期函数.png](./ReactComponentLifecycleFunctions.png)
        
    - 常见函数：
        1. `componentDidMount`：组件挂载完毕自动执行——**异步数据获取**
        2. `componentWillUnmount`：组件卸载时自动执行——**清理副作用**
- 类组件的组件通信
    - 概念：类组件和 Hooks 编写的组件在组件通信的**思想上完全一致**
    - 类型：
        1. 父传子：通过 prop 绑定数据
        2. 子传父：通过 prop 绑定组件中的函数，子组件调用
        3. 兄弟通信：状态提升，通过父组件做桥接

# Zustand

- 快速上手
    - 创建 store（状态数据 和 操作方法）—绑定到组件—> component（消费数据和方法）
    - 安装：`pnpm add zustand`
    - 基本语法：
        
        ```jsx
        import { create } from 'zustand'
        
        const useStore = create((set) => ({
          count: 1,
          inc: () => set((state) => ({ count: state.count + 1 })),
        }))
        
        function Counter() {
          const { count, inc } = useStore()
          return (
            <div>
              <span>{count}</span>
              <button onClick={inc}>one up</button>
            </div>
          )
        }
        ```
        
    - 官网：
        
        [Zustand](https://zustand-demo.pmnd.rs/)
        
- 异步支持
    - 对于异步的支持不需要特殊的操作，直接在函数中编写异步逻辑，最后只需要**调用 set 方法传入新状态**即可
    - 基础语法：
        
        ```jsx
        import { create } from 'zustand'
        
        const useStore = create((set) => {
          return {
            // 状态数据
            channelList: [],
            fetchGetList: async () => {
              const res = await fetch(URL)
              const jsonRes = await res.json()
              set({
                channelList: jsonRes.data.channels
              })
            }
          }
        })
        ```
        
- 切片模式
    - 场景：当单个 store 比较大的时候，可以采用**切片模式**进行模块拆分组合，类似于模块化
    - 步骤：
        1. 拆分子模块，再组合起来
            
            ```jsx
            const createCounterStore = (set) => {
              return {
                // 状态数据
                count: 0,
                // 修改状态数据的方法
                inc: () => {
                  set((state) => ({count: state.count + 1}))
                },
              }
            }
            
            const createChannelStore = (set) => {
              return {
                // 状态数据
                channelList: [],
                // 修改状态数据的方法
                fetchGetList: async () => {
                  const res = await fetch(URL)
                  const jsonRes = await res.json()
                  set({
                    channelList: jsonRes.data.channels
                  })
                }
              }
            }
            
            const useStore = create((...a) => {
              return {
                ...createCounterStore(...a),
                ...createChannelStore(...a)
              }
            })
            ```
            
        2. 组件使用
            
            ```jsx
            function App() {
              const {count, inc, channelList, fetchGetList} = useStore()
            
              useEffect(() => {
                fetchGetList()
              }, [fetchGetList]);
            
              return (
                <>
                  <button onClick={inc}>{count}</button>
                  <ul>
                    {channelList.map(item => <li key={item.id}>{item.name}</li>)}
                  </ul>
                </>
              );
            }
            ```
