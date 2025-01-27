import {Link, useNavigate, useParams} from "react-router-dom";

const Article = () => {
    const navigate = useNavigate()
    const params = useParams()

    return (
        <div>
            文章页
            {/* 声明式写法 */}
            <Link to='/login'>跳转到登录页</Link>
            <br/>

            {/* 编程式写法 */}
            <div>接收参数 id：{params.id}</div>
            <div>接收参数 name：{params.name}</div>
            <br/>
            <button onClick={() => navigate('/login')}>跳转到登录页</button>
            <br/>
            <button onClick={() => navigate('/login?id=111&name=Tom')}>跳转到登录页并 searchParams 传参</button>
        </div>
    )
}

export default Article
