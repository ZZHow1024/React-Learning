import './App.scss'
import avatar from './images/bozai.png'

import _ from 'lodash'
import classNames from 'classnames'
import {useState} from 'react'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
    {
        // 评论id
        rpid: 3,
        // 用户信息
        user: {
            uid: '13258165',
            avatar: '',
            uname: '周杰伦',
        },
        // 评论内容
        content: '哎哟，不错哦',
        // 评论时间
        ctime: '10-18 08:15',
        like: 88,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: '黑马前端',
        },
        content: '学前端就来黑马',
        ctime: '10-19 09:00',
        like: 66,
    },
]
// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar,
    // 用户昵称
    uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
    {type: 'hot', text: '最热'},
    {type: 'time', text: '最新'},
]

const App = () => {
    // 渲染评论列表
    // 使用 useState 维护 list
    const [commentList, setCommentList] = useState(_.orderBy(defaultList, 'like', 'desc'))

    // 删除评论逻辑
    const handleDelete = (id) => {
        // 对 commentList 做过滤处理
        setCommentList(commentList.filter((item) => item.rpid !== id))
    }

    // Tab 切换逻辑
    const [type, setType] = useState('hot')
    const handleTabChange = (type) => {
        setType(type)
        // 基于列表的排序
        if (type === 'hot') {
            // 根据点赞数量排序
            // 使用 Lodash 工具库
            setCommentList(_.orderBy(commentList, 'like', 'desc'))
        } else {
            // 根据创建时间排序
            setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
        }
    }

    return (
        <div className="app">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{10}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {tabs.map(item => (
                            <span key={item.type} className={classNames('nav-item', {active: type === item.type})}
                                  onClick={() => handleTabChange(item.type)}>{item.text}</span>
                        ))}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像"/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send">
                            <div className="send-text">发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {commentList.map(item => (
                        <div key={item.rpid} className="reply-item">
                            {/* 头像 */}
                            <div className="root-reply-avatar">
                                <div className="bili-avatar">
                                    <img
                                        src={item.user.avatar}
                                        className="bili-avatar-img"
                                        alt=""
                                    />
                                </div>
                            </div>

                            <div className="content-wrap">
                                {/* 用户名 */}
                                <div className="user-info">
                                    <div className="user-name">{item.user.uname}</div>
                                </div>
                                {/* 评论内容 */}
                                <div className="root-reply">
                                    <span className="reply-content">{item.content}</span>
                                    <div className="reply-info">
                                        {/* 评论时间 */}
                                        <span className="reply-time">{item.ctime}</span>
                                        {/* 评论数量 */}
                                        <span className="reply-time">点赞数:{item.like}</span>

                                        {/* 删除按钮显示条件：user.uid === item.user.uid */}
                                        {user.uid === item.user.uid &&
                                            <span className="delete-btn" onClick={() => handleDelete(item.rpid)}>
                          删除
                        </span>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
