const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodoUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e) {
    if(confirm("Tüm todoları silmek istedinizden emin misiniz?")){
        while (todoList.firstElementChild!=null) {
            todoList.firstElementChild.remove();
            
        }
        localStorage.removeItem("todos");
    }
}
function filterTodos(e) {
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {

        const text=listItem.textContent.toLowerCase();
 
        if(text.indexOf(filterValue) == -1){
            listItem.setAttribute("style","display: none !important");
        }else{
            listItem.setAttribute("style","display: block");
        }
    });
}
function deleteTodo(e) {
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos=getTodosFromLocalStorage();

    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}


function loadAllTodoUI() {
    let todos=getTodosFromLocalStorage();
    todos.forEach(function name(todo) {
        addTodoToUI(todo);
        
    });
}
function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo==="") {

        showAlert("danger","Lütfen bir Todo giriniz...");
        
    }else{
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success","Başarıyla eklendi...");
    }
    

    e.preventDefault();

}

function showAlert(type,message) {
    /*<div class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
    </div>
    */
   const alert =document.createElement("div");
   alert.className='alert alert-'+type;
   alert.textContent=message;
   firstCardBody.appendChild(alert);

   // setTimeout

   setTimeout(function(){
       alert.remove();
   }, 900);

}
function getTodosFromLocalStorage() {
    let todos;
    if (localStorage.getItem("todos")=== null) {
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}
function addTodoStorage(newTodo) {
    let todos=getTodosFromLocalStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}
function addTodoToUI(newTodo) {
    /* <li class="list-group-item d-flex justify-content-between">
            Todo 1
            <a href = "#" class ="delete-item">
                <i class = "fa fa-remove"></i>
            </a>

        </li>
    */
    const listItem=document.createElement("li");
    const link=document.createElement("a");


    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";


    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    
    todoList.appendChild(listItem);
    todoInput.value="";
}