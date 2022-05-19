import { todoList, Todo } from './index'
export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    cargarLocalStorage() {
        this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = this.todos.map(Todo.fromJson)
    }

    contadorTareas() {
        let cont = 0;

        for (let i = 0; i < todoList.todos.length; i++) {
            if (!todoList.todos[i].completado) {
                cont++;
            }
        }
        return cont;
    }




}