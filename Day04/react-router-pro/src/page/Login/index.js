import {useNavigate, useSearchParams} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    return (
        <div>
            登录页
            <br/>

            {/* 编程式写法 */}
            <div>接收参数 id：{params.get('id')}</div>
            <div>接收参数 name：{params.get('name')}</div>
            <br/>
            <button onClick={() => navigate('/article/111/Tom')}>跳转到文章页并 params 传参</button>
        </div>
    )
}

export default Login
