import {useEffect, useRef, useState} from "react";
import {useDrag} from "react-dnd";
import classNames from "classnames";
import {ListItem, useTodoListStore} from "../Store";

interface ItemProps {
    data: ListItem
}

export default function Item(props: ItemProps) {
    const {data} = props;

    const ref = useRef<HTMLDivElement>(null);

    const updateItem = useTodoListStore(state => state.updateItem);

    // 编辑状态
    const [editing, setEditing] = useState(false);

    // input内容
    const [editingContent, setEditingContent] = useState(data.content);

    // 拖拽
    const [{ dragging }, drag] = useDrag({
        type: 'list-item',
        item: {
            id: data.id
        },
        collect(monitor) {
            return {dragging: monitor.isDragging()};
        }
    });

    useEffect(() => {
        drag(ref);
    }, []);

    return <div ref={ref} className={classNames(
        "h-100 border-2 border-black bg-blue-300 p-10",
        "flex justify-start items-center",
        "text-xl tracking-wide",
        dragging ? 'border-dashed bg-white': '',
    )}
        onDoubleClick={() => {
            {/*    双击的时候显示input，修改editing的状态为true    */}
            setEditing(true);
        }}
    >
        <input
            type="checkbox"
            className="w-40 h-40 mr-10"
            checked={data.status === 'done'}
            onChange={(e) => {
                updateItem({
                    ...data,
                    status: e.target.checked ? 'done' : 'todo'
                })
            }}
        />
        <p>
            {
                editing ?
                <input
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    onBlur={() => {
                        // input失去焦点的时候将editing修改为false，同时更新editingContent
                        setEditing(false);
                        updateItem({
                            ...data,
                            content: editingContent
                        })
                    }}
                /> :data.content
            }
            </p>
    </div>
}