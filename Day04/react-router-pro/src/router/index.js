import {createBrowserRouter} from "react-router-dom";
import Article from "../page/Article";
import Login from "../page/Login";
import Layout from "../Layout";
import Board from "../page/Board";
import About from "../page/About";
import NotFound from "../page/NotFound";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            // 设置为默认二级路由
            {
                index: true,
                element: <Board/>
            },
            {
                path: 'about',
                element: <About/>
            }
        ]
    },
    {
        path: "/article/:id/:name",
        element: <Article/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default router
