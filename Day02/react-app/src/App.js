import {createContext, useContext, useEffect, useRef, useState} from 'react'

const MsgContext = createContext()
const url = 'http://geek.itheima.net/v1_0/channels'

function Son(props) {
    // 子传父
    const sonMsg = 'This is son msg'

    return (
        <div>
            <div>This is son.</div>
            <div>父组件中的数据：{props.name}</div>
            <button onClick={() => props.onGetSonMsg(sonMsg)}>send</button>
        </div>
    )
}

function A(props) {
    const aName = 'This is A name'

    return (
        <div>
            This is A component
            <button onClick={() => props.onGetAName(aName)}>send -> B</button>
        </div>
    )
}

function B(props) {
    return (
        <div>
            This is B component
            <div>来自兄弟组件(A)的数据：{props.aName}</div>
        </div>
    )
}

function AA() {
    return (
        <div>
            <div>---This is AA component---</div>
            <BB/>
            <div>---This is AA component---</div>
        </div>
    )
}

function BB() {
    const msg = useContext(MsgContext)
    return (
        <div>
            This is BB component
            <div>来自根组件(App)的数据：{msg}</div>
        </div>
    )
}

function C() {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Hello')
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, []);

    return <div>this is C component</div>
}

// 自定义 Hook 函数
function useToggle() {
    const [show, setShow] = useState(false)
    const toggle = () => setShow(!show)

    return {
        show,
        toggle
    }
}

function App() {
    // 受控绑定表单
    const [value, setValue] = useState('')

    // React 中获取 DOM
    const inputRef = useRef(null)

    // 父组件中的数据
    const name = 'This is app name.'

    // 接收子的数据
    const [msg, setMsg] = useState('')
    const getMsg = (msg) => {
        setMsg(msg)
    }

    // 接收 A 组件的数据
    const [aName, setAName] = useState('')
    const getAName = (name) => {
        setAName(name)
    }

    // 根组件数据
    const appMessage = 'App message'

    // 创建状态数据
    const [list, setList] = useState([])
    useEffect(() => {
        // 额外操作，获取频道列表
        async function getList() {
            const res = await fetch(url)
            const list = await res.json()
            setList(list.data.channels)
            console.log(list)
        }

        getList()
    }, [])

    // 控制 C 组件展示
    // 使用自定义 Hook 函数
    const {show, toggle} = useToggle()

    return (
        <div className="App">
            <div>受控绑定表单演示</div>
            <div>输入的数据：{value}</div>
            <input value={value} onChange={(e) => setValue(e.target.value)} type='text'></input>
            <br/><br/>

            <div>React 中获取 DOM 演示</div>
            <input ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} type='text'></input>
            <button onClick={() => console.log(inputRef.current)}>获取 DOM</button>
            <br/><br/>

            <div>父传子和子传父演示</div>
            <Son name={name} onGetSonMsg={getMsg}/>
            <div>子组件传来的数据：{msg}</div>
            <br/><br/>

            <div>兄弟组件通信演示</div>
            <A onGetAName={getAName}/>
            <B aName={aName}/>
            <br/><br/>

            <div>跨层级组件通信演示</div>
            <MsgContext.Provider value={appMessage}>
                <div>---This is App---</div>
                <AA/>
                <div>---This is App---</div>
            </MsgContext.Provider>
            <br/><br/>

            <div>useEffect 基础使用演示</div>
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
            <br/><br/>

            <div>清除副作用和自定义 Hooks 函数演示</div>
            {show && <C/>}
            <button onClick={() => toggle()}>装载/卸载 C 组件</button>
        </div>
    );
}

export default App;
