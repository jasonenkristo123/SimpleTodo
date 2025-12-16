const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", e => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-slate-100 px-3 py-2 rounded-md border";

    li.innerHTML = `<span>${text}</span> <button class="text-white bg-red-500 border px-4 rounded-md">X</button>`

    li.querySelector("button").onclick = () => li.remove();

    list.appendChild(li);
    input.value = "";
})