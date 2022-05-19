import { Todo, TodoList, todoList } from '../classes';
// Referencias en el HTML
export const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {

    const htmlTodo = `
        <li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

txtInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (!e.target.value == '') {
            const tarea = new Todo(e.target.value);
            todoList.nuevoTodo(tarea);
            crearTodoHtml(tarea);

            txtInput.value = '';
        }
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) { //click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

        const todoCount = document.querySelector('.todo-count strong');
        let a1 = todoList.contadorTareas()
        todoCount.innerText = a1

    } else if (nombreElemento.includes('button')) { // hay que borrar el todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilters.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;

        }
    }
});