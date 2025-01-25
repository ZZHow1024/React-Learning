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
        },
        addToNum(state, action) {
            state.count = action.payload
        }
    }
})

// 解构出来 actionCreator 函数
const {increment, decrement, addToNum} = counterStore.actions

// 获取 reducer
const reducer = counterStore.reducer

// 按需导出的方式导出 actionCreator
export {increment, decrement, addToNum}

// 以默认导出的方式导出 reducer
export default reducer
