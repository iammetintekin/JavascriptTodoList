const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const seconCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners()
{
    // loadAllTodosUI();
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI)
    seconCardBody.addEventListener("click",deletetodo);
    filter.addEventListener("keydown",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Tümünü Silmek İstediğinize Emin Misin ?"))
    {
        //todoList.innerHTML = ""//yavas
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
const filterValue = e.target.value.toLowerCase();
const listItems = document.querySelectorAll(".list-group-item");
listItems.forEach(function(listItem){
    const text = listItem.textContent.toLowerCase();
    if(text.indexOf(filterValue)===-1)
    {
        //bulamadı
        listItem.setAttribute("style","display : none !important");

    }
    else{
        listItem.setAttribute("style","display : block");
    }
})
}
function deletetodo(e){
    if(e.target.className === 'fa fa-remove')
    {
        //silme işlemi
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        //deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Silme Başarılı");
    }

    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo)
{
let todos = getTodosFromStorage();
todos.forEach(function(todo, index) {
    if(todo===deletetodo){
        todos.splice(index,1);
    }
});
localStorage.setItem("todos",JSON.stringify(todos));
}


function loadAllTodosUI(){
    let todos = getTodosFromStorage();
    for (let index = 0; index < todos.length; index++)
    {
        console.log(todos[index]);
        addTodoToUI(todos[index]);
        
    }
}


function addTodo(e)
{
    const newTodo = todoInput.value.trim();
    if(newTodo === "")
    {
        showAlert("danger","Lütfen bir todo giriniz ...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo Başarıyla Eklendi")
    }
    
    e.preventDefault();
}

function getTodosFromStorage(){ //todo alma
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function showAlert(type,message)
{
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    //set timeout
    setTimeout(function(){
        alert.remove();
    },1500);
    //console.log(alert);
}

function addTodoToUI(newTodo){
    //List item olusturma
    const listItem = document.createElement("li");
    //a link olusturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    //text node ekleme
    listItem.className  = "list-group-item d-flex justify-content-between"
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    //todolistt e list itemı ekleme
    todoList.appendChild(listItem);
    todoInput.value="";
}