import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const foodStore = createSlice({
    name: 'foods',
    initialState: {
        foodList: [], // 商品列表
        activeIndex: 0, // 菜单激活下标值
        cartList: [] // 购物车列表
    },
    reducers: {
        // 更改商品列表
        setFoodList(state, action) {
            state.foodList = action.payload
        },
        // 更改 activeIndex
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        // 添加购物车
        addCart(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item)
                item.count++
            else
                state.cartList.push(action.payload)
        },
        // count 增
        increaseCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        // count 减
        decreaseCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item.count > 1)
                item.count--
            else if (item.count === 1)
                state.cartList = state.cartList.filter(item => item.id !== action.payload.id)
        },
        // 清空购物车
        clearCart(state) {
            state.cartList = []
        }
    }
})

const {setFoodList, changeActiveIndex, addCart, increaseCount, decreaseCount, clearCart} = foodStore.actions;

// 异步获取部分
const fetchFoodList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodList(res.data))
    }
}

export {fetchFoodList, changeActiveIndex, addCart, increaseCount, decreaseCount, clearCart}

const reducer = foodStore.reducer

export default reducer
