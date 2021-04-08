import { useState } from 'react';
import styles from './styles.css';

export default function NewToDoItem({ onAddTodo }) {
    const [description, setDescription] = useState('');

    return (
        <div className={styles.newTodo}>
            <label>Description: </label>
            <input type="text" value={description} onInput={e => setDescription(e.target.value)} />
            <button onClick={() => onAddTodo(description)}>Add</button>
        </div>
    )


}