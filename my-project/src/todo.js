const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-all");

let todos = loadTodos();
renderTodos();

form.addEventListener("submit", e => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    }

    todos.push(todo);
    saveTodos();
    renderTodos();

    input.value = "";
})

clearBtn.onclick = () => {
    if (!confirm("Clear All Todos?")) return;
    todos = [];
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}   

function loadTodos() {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : []
}

function renderTodos() {
    list.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-slate-100 border py-2 px-3 rounded-md";
        li.innerHTML = `
            <div class="flex items-center gap-2">
                <input type="checkbox" ${todo.completed ? "checked" : ""}/>
                <span class="${todo.completed ? "line-through text-slate-400" : ""}>
                    ${todo.text}
                </span>
            </div>
            <button class="px-4 rounded-md text-white bg-purple-800">X</button>
        `;

        li.querySelector("input").onchange = () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        }

        li.querySelector("button").onclick = () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        }
        list.appendChild(li);
    })
}