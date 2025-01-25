import {configureStore} from '@reduxjs/toolkit';

// 导入子模块 reducer
import counterReducer from './modules/counterStore'
import channelStore from "./modules/channelStore";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        channel: channelStore
    }
})

export default store
