//Selectors
const todoInput = document.querySelector('.todo-input');
const todoRandomId = document.querySelector('.todo-hidden-id');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listeners

todoButton.addEventListener('click', addTaskToHtmlAndLocalStorage);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);


//Functions
function TodoItem(id, title, isChecked) {
    this.id = id;
    this.title = title;
    this.isChecked = isChecked;
}


function generateRandomId() {
    let randomGeneratedId = Date.now();
    return randomGeneratedId;
}


function addTaskToHtmlAndLocalStorage(event) {
    event.preventDefault();
    let randomId = generateRandomId();

    let inputData;

    (function () {
        let stringRandomId = randomId.toString();
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const hiddenInput = document.createElement('input');
        hiddenInput.type = "hidden";
        hiddenInput.classList.add("hidden-input");
        hiddenInput.value = stringRandomId;
        todoDiv.appendChild(hiddenInput);

        const newTodo = document.createElement('li');

        newTodo.innerText = todoInput.value;
        inputData = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        todoInput.value = "";
    })();

    (function () {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        }
        else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        let taskId = randomId;
        let taskTitle = inputData;
        let isChecked = false;

        let newTodo = new TodoItem(taskId, taskTitle, isChecked);
        console.log(newTodo);
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
    })();

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "none";
                }
                else {
                    todo.style.display = "flex";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "none";
                }
                else {
                    todo.style.display = "flex";
                }
                break;
        }
    })

}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //create hidden input
        const hiddenInput = document.createElement('input');
        hiddenInput.type = "hidden";
        hiddenInput.classList.add("hidden-input");
        hiddenInput.value = todo.id;
        todoDiv.appendChild(hiddenInput);

        //Create LI
        const newTodo = document.createElement('li');

        newTodo.innerText = todo.title;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check MARK button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // check trash BUTTOn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // APPEND TO LIST

        if(todo.isChecked === true){
            todoDiv.classList.toggle("completed");
        }

        todoList.appendChild(todoDiv);

    })
}

function deleteCheck(e) {
  
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        const hiddenId = todo.children[0].value;
        EditToDoChecked(hiddenId);
        todo.classList.toggle("completed");
    }
}

function EditToDoChecked(item) {
    var todosFromLocalStorage = JSON.parse(localStorage.getItem("todos"));
    var selectedObject = _.find(todosFromLocalStorage, function (SelectedObject) {
        return SelectedObject.id == item;
    }
    );
    selectedObject.isChecked = true;
    localStorage.setItem("todos", JSON.stringify(todosFromLocalStorage));
}

function removeItem(item) {
    var todosFromLocalStorage = JSON.parse(localStorage.getItem("todos")); //Array

    _.remove(todosFromLocalStorage, function (selectedItem, index, array) {
        return selectedItem.id == item;
    });

    localStorage.setItem("todos", JSON.stringify(todosFromLocalStorage));

}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].value;

    todos = removeItem(todoIndex);

}



