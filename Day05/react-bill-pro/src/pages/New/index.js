import {Button, DatePicker, Input, Modal, NavBar} from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import {billListData} from '@/contents'
import {useNavigate} from 'react-router-dom'
import {useState} from "react"
import {useDispatch} from "react-redux"
import {addBillList} from "@/store/modules/billStore"
import dayjs from "dayjs";

const New = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // 控制收入支出状态
    const [billType, setBillType] = useState('pay') // pay-支出，income-收入

    // 收集金额
    const [money, setMoney] = useState('0')
    const moneyChange = (value) => {
        setMoney(value)
    }

    // 收集账单类型
    const [useFor, setUseFor] = useState('')

    // 保存账单
    const saveBill = () => {
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: date,
            useFor: useFor
        }

        if (useFor === null || useFor === '') {
            Modal.alert({
                content: '请选择记账类型',
                closeOnMaskClick: true,
            })

            return
        }

        if (parseFloat(money) === 0) {
            Modal.alert({
                content: '请输入金额',
                closeOnMaskClick: true,
            })

            return
        }

        dispatch(addBillList(data))
        Modal.alert({
            content: '保存成功',
            closeOnMaskClick: true,
        })
    }

    // 时间选择器打开关闭
    const [dateVisible, setDateVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const dateConfirm = (value) => {
        setDate(value)
    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' && 'selected')}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'income' && 'selected')}
                        onClick={() => setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon"/>
                            <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
                            {/* 时间选择器 */}
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}
                                onClose={() => setDateVisible(false)}
                                onConfirm={dateConfirm}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type && 'selected'
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type}/>
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New
