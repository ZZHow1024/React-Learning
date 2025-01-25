import classNames from 'classnames'
import './index.scss'
import {useDispatch, useSelector} from "react-redux"
import {changeActiveIndex} from "../../store/modules/takeaway"

const Menu = () => {
    const {foodList, activeIndex} = useSelector(state => state.foods)
    const dispatch = useDispatch()

    const menus = foodList.map(item => ({tag: item.tag, name: item.name}))
    return (
        <nav className="list-menu">
            {/* 添加active类名会变成激活状态 */}
            {menus.map((item, index) => {
                return (
                    <div
                        onClick={() => dispatch(changeActiveIndex(index))}
                        key={item.tag}
                        className={classNames(
                            'list-menu-item',
                            activeIndex === index && 'active'
                        )}
                    >
                        {item.name}
                    </div>
                )
            })}
        </nav>
    )
}

export default Menu
