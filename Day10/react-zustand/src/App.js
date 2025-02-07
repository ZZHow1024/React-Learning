import {create} from "zustand/react";
import {useEffect} from "react";

const URL = 'http://geek.itheima.net/v1_0/channels'

// 1. 拆分子模块，再组合起来
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

// 2. 组件使用
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

export default App;
