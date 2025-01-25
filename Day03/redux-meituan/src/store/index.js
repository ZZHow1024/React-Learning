import foodReducer from './modules/takeaway'
import {configureStore} from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        foods: foodReducer
    }
})

export default store
