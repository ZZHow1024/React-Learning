import {useEffect, useRef, useState} from "react";

// type 对象
type User = {
    name: string
    age: number
}

/*
interface 接口
interface User {
    name: string
    age: number
}
*/

type Props1 = {
    className: string
    children: React.ReactNode
}

type Props2 = {
    onGetMsg?: (msg: string) => void
}

function Button(props: Props1) {
    const {className, children} = props

    return <button className={className}>{children}</button>
}

function Son(props: Props2) {
    const {onGetMsg} = props
    const clickHandler = () => {
        onGetMsg?.('Son message')
    }

    return <button onClick={clickHandler}>Send message</button>
}

function App() {
    const [user, setUser] = useState<User | null>(null)
    const changeUser = () => {
        setUser({
            name: 'Tom',
            age: 20
        })
    }

    const getMsgHandler = (msg: string) => {
        console.log(msg)
    }

    const domRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        domRef.current?.focus()
    }, [])

    const timerRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        timerRef.current = setInterval(() => {
            console.log('定时器运行中')
        }, 1000)

        return () => clearInterval(timerRef.current)
    }, [])

    return (
        <>
            <div>useState 与 TypeScript 演示</div>
            <div>user.name = {user?.name}</div>
            <div>user.age = {user?.age}</div>
            <button onClick={changeUser}>Change user</button>
            <br/><br/>
            <div>Props 与 TypeScript 演示</div>
            <Button className={'test'}>Click me</Button>
            <Son onGetMsg={(msg) => console.log(msg)}/>
            <Son onGetMsg={getMsgHandler}/>
            <br/><br/>
            <div>useRef 与 TypeScript 演示</div>
            <input ref={domRef}/>
        </>
    )
}

export default App
