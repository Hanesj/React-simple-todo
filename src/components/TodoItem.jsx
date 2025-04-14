import { useState } from 'react';

const TodoItem = ({ todo, setDone, removeTodo }) => {
	const [checked, setChecked] = useState(todo.done);
	return (
		<li key={todo.id}>
			{todo.task}
			<input
				type='checkbox'
				onChange={(e) => {
					setChecked(e.target.checked);
					setDone(todo.id);
				}}
				checked={checked}
			/>
			Klar
			<button onClick={() => removeTodo(todo.id)}>Ta bort</button>
		</li>
	);
};

export default TodoItem;
