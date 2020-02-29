
var btnAddTodo = document.getElementById('btn-add-todo');
btnAddTodo.addEventListener('click', function() {
    addTodoFromInputBox();
});

var txtInputTodo = document.getElementById('input-todo');
txtInputTodo.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        addTodoFromInputBox();
    }
});

loadTodoList();


function addTodoFromInputBox() {
    var inputText = txtInputTodo.value;
    if (addTodoItem(inputText)) txtInputTodo.value = '';
}

function loadTodoList() {
    var todoItemsStr = localStorage.getItem('todolists');
    var todoItems = JSON.parse(todoItemsStr);
    var todoListsElements = document.getElementsByClassName('todo-lists')[0];
    while(todoListsElements.firstChild) {
        todoListsElements.removeChild(todoListsElements.lastChild);
    }

    if(todoItemsStr !== null) {
        for (var i = 0; i < todoItems.length; i++) {
            addTodoItem(todoItems[i].text, todoItems[i].checked);
        }
    } else {
        addTodoItem('hello');
        addTodoItem('your task here');
        addTodoItem('task done here', true);
    }
}

function saveTodoList() {
    var todoItems = [];

    var todoListItemsElements = document.getElementsByClassName('todo-item');

    for (var i = 0; i < todoListItemsElements.length; i++) {
        const element = todoListItemsElements[i];

        var checkboxState;

        var inputs = element.getElementsByTagName('input');

        for(var j = 0; j <inputs.length; j++) {
            if(inputs[j].type.toLowerCase() === 'checkbox') {
                checkboxState = inputs[j].checked;
                break;
            }
        }

        var todoText = element.getElementsByTagName('label')[0].innerText;
        todoItems.push({
            text: todoText,
            checked: checkboxState
        });
    }

    localStorage.setItem('todolists', JSON.stringify(todoItems));
}

function addTodoItem(text, checked = false) {
    if(text.trim() !== '') {
        var todoItem = document.createElement('li');
        todoItem.setAttribute('class', 'todo-item');

        var chkbox = document.createElement('input');
        chkbox.setAttribute('type', 'checkbox');
        chkbox.checked = checked;
        todoItem.appendChild(chkbox);

        var chkboxRender = document.createElement('span');
        chkboxRender.setAttribute('class', 'checkbox');
        chkboxRender.addEventListener('click', function() {
            chkbox.checked = !chkbox.checked;
            saveTodoList();
        });
        todoItem.appendChild(chkboxRender);

        var todoLabel = document.createElement('label');
        todoLabel.innerText = text;
        todoItem.appendChild(todoLabel);

        var btnDelete = document.createElement('span');
        btnDelete.setAttribute('class', 'delete');
        btnDelete.addEventListener('click', function() {
            this.parentElement.remove();
            saveTodoList();
        });
        todoItem.appendChild(btnDelete);

        var todoLists = document.getElementsByClassName('todo-lists')[0];
        todoLists.appendChild(todoItem);

        saveTodoList();

        return true;
    }
    return false;
}