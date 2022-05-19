import './styles.css'

import { Todo, TodoList, crearTodoHtml, divTodoList } from './classes';



export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);





// localStorage.setItem('mi-key', 'AB1s234');
// sessionStorage.setItem('mi-key', 'ABC1234');

// setTimeout(() => {
//     localStorage.removeItem('mi-key');
// }, 1500);