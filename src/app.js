import { fetchTodos } from "./functions/api.js";
import { createElement } from "./functions/dom.js";
import { TodoList } from "./components/TodoList.js";

async function main() {
    try {
        const todos = await fetchTodos('https://jsonplaceholder.typicode.com/todos?_limit=5')
        const list = new TodoList(todos)
        list.appendTo(document.getElementById('todolist'))
    } catch (e) {
        const alertElement = createElement('div', {
            class: 'alert alert-danger m-2',
            role: 'alert'
        },
            'Impossible de charger les todos')
        document.body.prepend(alertElement)
    }
}

main();