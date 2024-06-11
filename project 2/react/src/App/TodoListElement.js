const TodoListElement = ({todoItem,handleDelete,handleToggle }) => {
     return(
        <li className="flex gap-2 cursor-pointer">
            <span 
            onClick={handleToggle}
            className={"w-full min-h-[50px] p-3 bg-blue-400 rounded-md font-medium overflow-x-auto"
                +(todoItem.done? " opacity-20" : " ")
            }>
                {todoItem.title}
            </span>
            
            <button onClick={handleDelete}
            className="bg-blue-500 rounded-md min-w-[50px] h-[50px] text-center font-bold">X</button>
            
        </li>
    );
}

export default TodoListElement;