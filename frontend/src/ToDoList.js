import { useState } from 'react';
import styles from './styles.css';
export default function ToDoList({ items, onTodoStatusChanged }) {
    console.log(items);
    if (items.isComplete) {
        // var description = items.description + " (Done!)";
        // items.description = description;
        // console.log(description);
        return (
            <div>
                <li>{items.description} {<span> Done!</span>}</li>
                <input type="checkbox" value={items.description} checked={items.isComplete} onChange={onTodoStatusChanged(items.index)}></input>
            </div>
        )
    }
    else {
        return (
            <div>
                <li>{items.description}</li>
                <input type="checkbox" value={items.description} checked={items.isComplete}></input>
            </div>
        )
    }


}
function onTodoStatusChanged(index) {
    console.log("Todostatus handler");
    console.log(index);

}