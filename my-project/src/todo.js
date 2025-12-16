const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
let todos = loadTodos();
renderTodos();

form.addEventListener("submit", e => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    const todo = {
        id: Date.now(), // id unik
        text
    };

    todos.push(todo);
    saveTodos();
    renderTodos();

    input.value = "";
})

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}   

function loadTodos() {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
}

function renderTodos() {
    list.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-slate-100 px-3 py-2 rounded-md border";
        li.innerHTML = `<span>${todo.text}</span> <button class="text-white bg-red-500 border px-4 rounded-md">X</button>`
        li.querySelector("button").onclick = () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        };
        list.appendChild(li);
    })
}