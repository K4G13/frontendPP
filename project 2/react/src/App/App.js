import './App.css';
import React from 'react';
import TodoListElement from "./TodoListElement";
import axios from 'axios';

const App = () => {

	const endpoint = "http://localhost:3000/api";
	const [todos, setTodos] = React.useState([]);
	const [title, setTitle] = React.useState("");

	React.useEffect( () => {
		axios.get(endpoint).then(res => {setTodos(res.data)})
	}, []);

	const addNewTodo = async () =>{
		if(title.length === 0)return;
		const res = await axios.post(endpoint, {title: title}).then(res => res.data)
		setTodos([...todos,res]);
		setTitle("");
	}

	const deleteTodo = async (id) => {
		await axios.delete(`${endpoint}/${id}`);
		setTodos(todos.filter((todo) => todo.id !== id));
	}

	const toggleTodo = async (id) => {
		const el = todos.find(todo => todo.id === id);
		await axios.patch(`${endpoint}/${id}`,{title: el.title, done:!el.done});
		setTodos(todos.map(todo => todo.id === id? {...todo, done:!todo.done} : todo));
	}

  	return (
		<div className="App flex flex-col items-center w-full gap-6 px-4 pt-4">


			<div className="flex justify-center w-full p-4 bg-blue-500 rounded-md">
				<h1 className="flex items-center gap-8 text-5xl">nodeTODO react
					<span className="bg-blue-400 rounded-xl font-semibold size-[80px] flex justify-center place-items-center">
						{todos.filter(todo =>!todo.done).length}
					</span>
				</h1>
			</div>


			<div className="w-[600px] flex justify-center">
				<form className="flex gap-2">

					<input value={title} onChange={(e) => setTitle(e.target.value)}
					className="bg-transparent border-[2px] border-blue-500 rounded-md w-[530px] py-2 text-white text-center" type="text"/>

					<button onClick={addNewTodo} type='button'
					className="px-4 bg-blue-500 rounded-md">Add</button>

				</form>
			</div>


			<div className="w-[600px] pb-20">
				<ul className="flex flex-col gap-2">
					
					{todos.map((todoItem) => (
						<TodoListElement key={todoItem.id} todoItem={todoItem}  
						handleDelete={() => deleteTodo(todoItem.id)}
						handleToggle={() => toggleTodo(todoItem.id)} />
					))}

				</ul>            
			</div>


		</div>
  	);
}

export default App;
