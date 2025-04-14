import { useEffect, useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import NewTodo from './components/NewTodo';
import Search from './components/Search';

function App() {
	//const [hasFetched, setHasFetched] = useState(false);
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('todo') || '[]')
	);
	const [search, setSearch] = useState('');
	//const [currentTodo, setCurrentTodo] = useState({});
	//useEffect(() => {
	//const getKey = async () => {
	//const response = await fetch(
	//'####################################################',
	//{
	//method: 'POST',
	//body: JSON.stringify({ email: 'hannes@email.com' }),
	//headers: { 'content-type': 'application/json' },
	//}
	//);
	//const data = await response.text();
	//console.log(data);
	//localStorage.setItem('key', data);
	//};
	//getKey();
	//});

	// Lade till hårdkodad api-nyckel för lättare testning
	let key;
	localStorage.getItem('key') > 0
		? (key = JSON.parse(localStorage.getItem('key')))
		: (key =
				'$2a$10$3prREGFncvD28TRGpc9VBOuQCsuxmDwDVQ6fAAyvo.w2jpcTK.vXa');
	useEffect(() => {
		if (todos.length > 0) {
			return;
		}
		const getTodo = async () => {
			const response = await fetch(
				`###?apikey=${encodeURI(
					key
				)}`
			);
			const data = await response.json();
			setTodos(data);
			localStorage.setItem('todo', JSON.stringify(data));
		};
		getTodo();
	}, []);

	const setDone = (id) => {
		const newTodos = todos.map((todoItem) => {
			if (todoItem.id === id) {
				const updatedTodo = { ...todoItem, done: !todoItem.done };
				return updatedTodo;
			}
			return { ...todoItem };
		});
		setTodos(newTodos);
	};

	const removeTodo = (id) => {
		const newTodos = todos.filter((todoItem) => todoItem.id !== id);
		setTodos(newTodos);
	};

	const addTodo = (text, checked) => {
		const newTodos = [
			{ task: text, done: checked, id: Date.now() },
			...todos,
		];
		setTodos(newTodos);
	};

	const setFilter =
		search.length > 0
			? todos.filter((todoItem) =>
					todoItem.task.toLowerCase().includes(search.toLowerCase())
			  )
			: todos;

	return (
		<>
			<div className='list'>
				<ul key={1}>
					{setFilter.length > 0 &&
						setFilter.map((t) => (
							<TodoItem
								key={t.id}
								todo={t}
								setDone={setDone}
								removeTodo={removeTodo}
							/>
						))}

					{localStorage.setItem('todo', JSON.stringify(todos))}
				</ul>
			</div>
			<Search search={search} setSearch={setSearch} />
			<NewTodo createTodo={addTodo} />
		</>
	);
}

export default App;
