# React前端开发_Day11

参考课程：

**【*黑马程序员* React18入门到实战】**

[https://www.bilibili.com/video/BV1ZB4y1Z7o8]

@ZZHow(ZZHow1024)

# React+TypeScript基础环境创建

- Vite 官网
    
    [Vite](https://vite.dev/)
    
- 使用 Vite 创建项目：`pnpm create vite react-ts-app --template react-ts`

# useState与TypeScript

- 自动推导
    - 通常 React 会根据传入 useState 的默认值来自动推导类型，不需要显式标注类型
    - 案例：
        
        ```tsx
        const [value, setValue] = useState(false)
        ```
        
        - `value`：类型为 boolean
        - `setValue`：参数类型为 boolean
    - 场景：明确的初始值
- 传递泛型参数
    - useState 本身是一个**泛型函数**，可以传入具体的自定义类型
    - 案例：
        
        ```tsx
        type User = {
        	name: string
        	age: number
        }
        
        const [user, setUser] = useState<User>()
        ```
        
        - 限制 `useState` 函数参数的初始值必须满足类型为：User | () => User
        - 限制 `setUser` 函数的参数必须满足类型为：User | () => User | undefined
        - user 状态数据具备 User 类型相关的类型提示
- 初始值为 null
    - 当我们不知道状态的初始值是什么，将 useState 的初始值为 null 是一个常见的做法，可以通过具体类型联合 null 来做显式注解
    - 案例：
        
        ```tsx
        type User = {
        	name: string
        	age: number
        }
        
        const [user, setUser] = useState<User | null>(null)
        ```
        
        - 限制 useState 函数参数的初始值可以是 User | null
        - 限制 setUser 函数的参数类型可以是 User | null
    - 为了类型安全可选链做类型守卫：只有 user 不为 null（不为空值）的时候才进行点运算

# Props与TypeScript

- 基础使用
    - 为组件 prop 添加类型，本质是给函数的参数做类型注解，可以使用 type 对象类型或者 interface 接口来做注解
    - 案例：
        
        ```tsx
        // type 对象
        type Props = {
        	className: string
        }
        
        /*
        interface 接口
        interface Props {
        	className: string
        }
        */
        
        function Button(props: Props) {
        	const {className} = props
        	return <button className={className}>Click me</button>
        }
        ```
        
        - Button 组件只能传入名称为 className 的 prop 参数，类型为 string，且为必填
- 为 children 添加类型
    - children 是一个比较特殊的 prop，支持多种不同类型数据的传入，需要通过一个内置的 ReactNode 类型来做注解
    - 案例：
        
        ```tsx
        type Props = {
        	children: React.ReactNode
        }
        
        function Button(props: Props) {
        	const {children} = props
        	return <button>{children}</button>
        }
        ```
        
    - 注解之后，children 可以是多种类型，包括：React.ReactElement、string、number、React.ReactFragment、React.ReactPortal、boolean、null、undefined
- 为事件 prop 添加类型
    - 组件经常执行类型为函数的 prop 实现子传父，这类 prop 重点在于函数参数类型的注解
    - 案例：
        
        ```tsx
        type Props = {
            onGetMsg?: (msg: string) => void
        }
        
        function Son(props: Props) {
            const {onGetMsg} = props
            const clickHandler = () => {
                onGetMsg?.('Son message')
            }
        
            return <button onClick={clickHandler}>Send message</button>
        }
        ```
        
        - 在组件内部调用时需要遵守类型的约束，参数传递需要满足要求
        - 绑定 prop 时如果绑定内联函数直接可以推断出参数类型，否则需要单独注解匹配的参数类型

# useRef与TypeScript

- 获取 DOM
    - 获取 DOM 的场景，可以直接把要获取的 **DOM 元素的类型当成泛型参数传递给 useRef**，可以推导出 **.current 属性的类型**
    - 案例：
        
        ```tsx
        function App() {
        	const domRef = useRef<HTMLInputElement>(null)
        	
        	useEffect(() => {
        		domRef.current?.focus()
        	}, [])
        	
        	return (
        		<>
        			<input ref={domRef} />
        		</>
        	)
        }
        ```
        
- 引用稳定的存储器
    - 把 useRef 当成引用稳定的存储器使用的场景可以通过**泛型传入联合类型**来做
    - 案例：
        
        ```tsx
        function App() {
        	const timerRef = useRef<number | undefined>(undefined)
        	
        	useEffect(() => {
        		timerRef.current = setInterval(() => {
        			console.log('定时器运行中')
        		}, 1000)
        		
        		return () => clearInterval(timerRef.current)
        	}, [])
        	
        	return <div>App</div>
        }
        ```
