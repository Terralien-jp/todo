const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

// ローカルストレージからJSON形式の内容をtodosへ

const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
    todos.forEach((todo) => {
        add(todo);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    add();
});

// CRUDするところ　課題：Updateがないため、todoの変更機能追加

function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

// 入力文字をリスト（li）にする

    if (todoText) {
        const li = document.createElement("li");

// liにtodoTextを追加とクラス追加

        li.innerText = todoText;
        li.classList.add("list-group-item")

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

// 右クリックを押すと削除（Delete）

        li.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            li.remove();
            saveData();
        });

//  左クリックを押すと打ち消し線、CSSはBootstrapのものを使用

        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

// index.html内のulタグ内に作成したliを追加

        ul.appendChild(li);
        input.value = "";
        saveData();
    } 
}

// 状態保存したりする関数

function saveData() {
    const lists = document.querySelectorAll("li");
    const todos = [];

    lists.forEach((li) => {
        todos.push({
            text: li.innerText,
            completed: li.classList.contains("texxt-decoration-line-through")
        });
    });

// ローカルストレージにJSON形式（文字列）で保存する

    localStorage.setItem("todos", JSON.stringify(todos));
}