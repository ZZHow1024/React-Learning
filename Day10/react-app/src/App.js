import {forwardRef, memo, useCallback, useImperativeHandle, useMemo, useReducer, useRef, useState} from "react";
import {Component} from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case"INC": {
            return state + 1
        }
        case "DEC": {
            return state - 1
        }
        case "SET": {
            return state = action.payload
        }
        default: {
            return state
        }
    }
}

// 斐波那契数列
const fibonacci = (n) => {
    console.log('计算函数被调用了')
    if (n < 3) return 1
    else return fibonacci(n - 1) + fibonacci(n - 2)
}

const MemoSon = memo(
    function Son() {
        console.log('MemoSon 组件重新渲染了')

        return <div>Son Component</div>
    }
)

const Input = memo(function Input({onChange}) {
    console.log('Input 组件重新渲染了')

    return <input type='text' onChange={(e) => onChange(e.target.value)}/>
})

// 子组件
// function Son() {
//     return <input type='text'/>
// }

const Son1 = forwardRef((props, ref) => {
    return <input type='text' ref={ref}/>
})

const Son2 = forwardRef((props, ref) => {
    // 子组件内部实现聚焦逻辑
    const inputRef = useRef(null)
    const focusHandler = () => {
        inputRef.current.focus()
    }

    // 将聚焦方法暴露出去
    useImperativeHandle(ref, () => {
        return {
            focusHandler
        }
    })

    return <input type='text' ref={inputRef}/>
})

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

    // 组件挂载完毕自动执行
    componentDidMount() {
        console.log('Counter 组件渲染完毕')
        this.timer = setInterval(() => {
            console.log('定时器运行中')
        }, 1000)
    }

    // 组件卸载时自动执行
    componentWillUnmount() {
        console.log('Counter 组件被卸载')
        clearInterval(this.timer)
    }

    // 3. UI(JSX)
    render() {
        return <button onClick={this.setCount}>{this.state.count}</button>
    }
}

function App() {
    console.log('App 组件重新渲染了')

    const [state, dispatch] = useReducer(reducer, 0)

    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    // const result = fibonacci(count1)
    const result = useMemo(() => {
        return fibonacci(count1)
    }, [count1]);

    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    // 传给子组件的函数
    const changeHandler = useCallback((value) => {
        return setText(value)
    }, [])

    const sonRef1 = useRef(null)
    const sonFocus1 = () => {
        sonRef1.current.focus()
    }

    const sonRef2 = useRef(null)
    const sonFocus2 = () => {
        sonRef2.current.focusHandler()
    }

    // 控制 Counter 组件展示
    const [show, setShow] = useState(true)

    return (
        <div>
            <div>useReducer 演示</div>
            <button onClick={() => dispatch({type: 'DEC'})}>-</button>
            {state}
            <button onClick={() => dispatch({type: 'INC'})}>+</button>
            <button onClick={() => dispatch({type: 'SET', payload: 10})}>SET 10</button>
            <br/><br/>
            <div>useMemo 演示</div>
            <button onClick={() => setCount1(count1 + 1)}>Change count1: {count1}</button>
            <button onClick={() => setCount2(count2 + 1)}>Change count2: {count2}</button>
            <div>fibonacci({count1}) = {result}</div>
            <br/>
            <div>React.memo 演示</div>
            <button onClick={() => setCount(count + 1)}>count = {count}</button>
            <MemoSon/>
            <br/>
            <div>useCallback 演示</div>
            <div>text = {text}</div>
            <button onClick={() => setCount(count + 1)}>count = {count}</button>
            <Input onChange={changeHandler}/>
            <br/><br/>
            <div>React.forwardRef 演示</div>
            <Son1 ref={sonRef1}/>
            <button onClick={sonFocus1}>focus</button>
            <br/><br/>
            <div>useImperativeHandle 演示</div>
            <Son2 ref={sonRef2}></Son2>
            <button onClick={sonFocus2}>focus</button>
            <br/><br/>
            <div>Class API 演示</div>
            {show && < Counter/>}
            <button onClick={() => setShow(!show)}>{show ? 'unmount' : 'mount'}</button>
        </div>
    );
}

export default App;
