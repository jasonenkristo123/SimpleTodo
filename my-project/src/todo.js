const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-all");
const filterBtn = document.querySelectorAll(".filter-btn")

let todos = loadTodos();
let currentFilter = "all";
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

filterBtn.forEach(btn => {
    btn.onclick = () => {
        currentFilter = btn.dataset.filter;

        filterBtn.forEach(b => b.classList.remove("font-bold"));
        btn.classList.add("font-bold");
        renderTodos();
    }
})

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}   

function loadTodos() {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : []
}

function renderTodos() {
    list.innerHTML = "";

    let filteredTodos = todos;
    
    if (currentFilter === "active") {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter(t => t.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-slate-100 border py-2 px-3 rounded-md";
        li.innerHTML = `
            <div class="flex items-center gap-2">
                <input type="checkbox" ${todo.completed ? "checked" : ""}/>
                <span class="${todo.completed ? "line-through text-slate-400" : ""}">
                    ${todo.text}
                </span>
            </div>
            <div class="flex gap-2">
                <button class="edit-btn px-4 rounded-md text-white bg-blue-500">Edit</button>
                <button class="delete-btn px-4 rounded-md text-white bg-purple-800">X</button>
            </div>
        `;

        li.querySelector("input").onchange = () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        }

        li.querySelector(".edit-btn").onclick = () => {
            const span = li.querySelector("span");
            const inputEdit = document.createElement("input");
            inputEdit.type = "text";
            inputEdit.value = todo.text;
            inputEdit.className = "borded rounded-md px-2 py-1";

            span.replaceWith(inputEdit);
            inputEdit.focus();

            inputEdit.onblur = () => {
                todo.text = inputEdit.value.trim() || todo.text;
                saveTodos();
                renderTodos();
            };

            inputEdit.onkeydown = e => {
                if (e.key === "Enter") inputEdit.blur();
            };
        };

        li.querySelector(".delete-btn").onclick = () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        };
        list.appendChild(li);
    })
}