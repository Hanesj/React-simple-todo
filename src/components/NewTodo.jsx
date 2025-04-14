import { useState } from 'react';

const NewTodo = ({ createTodo }) => {
	const [todoText, setTodoText] = useState('');
	const [check, setCheck] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(todoText, check);
		createTodo(todoText, check);
		setTodoText('');
		setCheck(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			Lägg till ny todo överst:
			<input
				type='text'
				value={todoText}
				name='todo'
				onChange={(e) => setTodoText(e.target.value)}
			/>
			<input
				type='checkbox'
				value={check}
				name='checked'
				onChange={(e) => setCheck(e.target.checked)}
			/>
			<button>Lägg till</button>
		</form>
	);
};

export default NewTodo;
