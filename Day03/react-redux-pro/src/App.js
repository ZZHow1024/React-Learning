import {useDispatch, useSelector} from 'react-redux'
import {increment, decrement, addToNum} from './store/modules/counterStore'
import {fetchChannelList} from "./store/modules/channelStore"
import {useEffect} from "react";

function App() {
    const {count} = useSelector(state => state.counter)
    const {channelList} = useSelector(state => state.channel)
    const dispatch = useDispatch()

    // 使用 useEffect 钩子函数触发异步请求执行
    useEffect(() => {
        dispatch(fetchChannelList())
    }, [dispatch])

    return (
        <div className="App">
            <button onClick={() => dispatch(decrement())}>-</button>
            {count}
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(addToNum(10))}>Add to 10</button>
            <button onClick={() => dispatch(addToNum(20))}>Add to 20</button>
            <br/>

            <div>异步数据展示</div>
            <ul>
                {channelList.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default App
