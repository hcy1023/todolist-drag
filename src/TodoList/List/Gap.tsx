import {useEffect, useRef} from "react";
import {useDrop} from "react-dnd";
import classNames from "classnames";
import {useTodoListStore} from "../Store";

interface GapProps {
    id?: string
}

export default function Gap(props: GapProps) {
    const {id} = props;

    const addItem = useTodoListStore(state => state.addItem);

    const ref = useRef<HTMLDivElement>(null);

    // accept指定new-item，只有对应的type拖拽到Gap才能触发isOver
    const [{ isOver }, drop] = useDrop(() => {
        return {
            accept: 'new-item',
            drop() {
                    addItem({
                        // 生成6位随机数
                        id: Math.random().toString().slice(2, 8),
                        status: 'todo',
                        content: '待办事项'
                    }, id)
            },
            collect(monitor) {
                return {isOver: monitor.isOver()};
            }
        }
    })

    useEffect(() => {
        drop(ref);
    }, []);

    const cs = classNames(
        "h-10",
        isOver ? 'bg-red-300' : ''
    )

    return <div ref={ref} className={cs}></div>
}