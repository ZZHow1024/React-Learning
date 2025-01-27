import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            一级路由 Layout 组件
            <br/>
            <Link to='/'>面板</Link>
            &nbsp;
            <Link to='/about'>关于</Link>
            {/* 配置二级路由的出口 */}
            <Outlet/>
        </div>
    )
}

export default Layout
