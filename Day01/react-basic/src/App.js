// 项目的根组件
// App -> index.js -> public/index.html(root)

import {useState} from "react";

const count = 10
function getName() {
    return 'Tom'
}

const list = [
    {id: 101, name: 'React'},
    {id: 102, name: 'Vue'},
    {id: 103, name: 'Angular'}
]

const isLogin = true

// 定义文章类型
const articleType = 1 // 0, 1, 3
// 定义核心函数（根据文章类型返回不同的 JSX 模版）
function getArticleTemplate() {
    if (articleType === 0)
        return <div>无图模式</div>
    else if (articleType === 1)
        return <div>单图模式</div>
    else
        return <div>三图模式</div>
}

// 1. 定义组件
const Button = () => {
    return <button>自定义按钮</button>
}

function App() {
    // 事件处理函数
    const handleClick = (name, e) => {
        alert('按钮被点击' + name)
        console.log(e)
    }

    // 1. 调用 useState 添加一个状态变量
    // count 状态变量，setCount 修改状态变量的方法
    const [number, setNumber] = useState(0)
    // 2. 点击事件回调，作用：用传入的新值修改 number，重新使用新的 count 渲染 UI
    const numberAdd = () => {
        setNumber(number + 1)
    }

    return (
        <div className="App">
            App.js<br/><br/>

            <div>JSX 中使用 JS 表达式演示</div>
            {/* 使用引号传递字符串 */}
            {'string'}<br/>

            {/* 识别 JS 变量 */}
            {count}<br/>

            {/* 函数调用 */}
            {getName()}<br/>

            {/* 方法调用 */}
            {new Date().getFullYear()}<br/>

            {/* 使用 JS 对象 */}
            <div style={{color: 'blue', fontSize: '30px'}}>Hello React</div>
            <br/>

            <div>JSX 中实现列表渲染演示</div>
            {/* 渲染列表 */}
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
            <br/>

            <div>JSX 中实现条件渲染演示</div>
            {/* 逻辑与 && */}
            {isLogin && <span>已登录</span>}<br/>

            {/* 三元运算 */}
            {isLogin ? <span>已登录</span> : <span>未登录</span>}<br/><br/>

            <div>JSX 中实现复杂条件渲染演示</div>
            {/* 调用函数渲染不同的模版 */}
            {getArticleTemplate()}<br/>

            <div>React 事件绑定演示</div>
            <button onClick={(e) => handleClick('Tom', e)}>按钮</button>
            <br/><br/>

            <div>React 中的组件演示</div>
            {/* 2. 使用组件（渲染组件） */}
            {/* 自闭和 */}
            <Button/>
            {/* 成对标签 */}
            <Button></Button><br/><br/>

            <div>useState 基础使用演示</div>
            <div>number = {number}</div>
            <button onClick={numberAdd}>count + 1</button>
        </div>
    );
}

export default App;
