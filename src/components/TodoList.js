/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

import { cloneTemplate, createElement } from "../functions/dom.js"


export class TodoList {

    /** 
     * @type {Todo[]}
     */
    #todos = []

    /** 
     * @type {HTMLUListElement}
     */
    #list = []

    /**
     * @param {Todo[]} todos
     * */
    constructor(todos) {
        this.#todos = todos
    }

    /**
    * 
    * @param {HTMLElement} element 
    */
    appendTo(element) {

        cloneTemplate(element, 'todolist-template')

        this.#list = element.querySelector('.list-group')
        for (let todo of this.#todos) {
            const item = new TodoListItem(todo)
            this.#list.append(item.element)
        }

        element.querySelector('form').addEventListener('submit', e => this.#onSubmit(e))
        element.querySelectorAll('.todolist-nav button').forEach(button => {
            button.addEventListener('click', e => this.#toggleFilter(e))
        })

    }

    /**
     * 
     * @param {SubmitEvent} e
     */
    #onSubmit = (e) => {

        const form = e.currentTarget

        e.preventDefault()
        const title = new FormData(form).get('title').toString()
        const todo = {
            id: this.#todos.length + 1,
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#list.prepend(item.element)
        form.reset()
    }

    /** 
     * @param {PointerEvent} e
     */
    #toggleFilter(e) {
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')
        if (filter === 'todo') {
            this.#list.classList.add('hide-completed')
            this.#list.classList.remove('hide-todo')
        } else if (filter === 'done') {
            this.#list.classList.add('hide-todo')
            this.#list.classList.remove('hide-completed')
        } else {
            this.#list.classList.remove('hide-todo')
            this.#list.classList.remove('hide-completed')
        }
    }

}

class TodoListItem {

    #element

    constructor(todo) {

        const id = `todo-${todo.id}`

        const li = createElement('li', {
            class: 'todolist-item'
        })

        this.#element = li

        const checkbox = createElement('input', {
            class: 'todo-checkbox',
            type: 'checkbox',
            id,
            checked: todo.completed ? '' : null
        })

        const label = createElement('label', {
            class: 'todolist-item-label',
            for: id
        }, todo.title)

        const button = createElement('button', {
            class: 'btn-trash',
        })

        button.innerHTML = `
        
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>

        `

        li.append(checkbox)
        li.append(label)
        li.append(button)

        this.toggle(checkbox)

        button.addEventListener('click', e => this.remove(e))
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))
    }

    get element() {
        return this.#element
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    remove(e) {
        e.preventDefault()
        this.#element.remove()
    }

    /**
     * Adding/removing class "is-completed" to checkbox element
     * @param {HTMLInputElement} checkbox
     */
    toggle(checkbox) {
        if (checkbox.checked) {
            this.#element.classList.add('is-completed')
        } else {
            this.#element.classList.remove('is-completed')
        }
    }
}