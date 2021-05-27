var AddYoTask = document.getElementById("new-task");
var AddAButton = document.getElementsByTagName("button")[0];
var taskNotDone = document.getElementById("incomplete-tasks");
var taskDone = document.getElementById("completed-tasks");


//Création des tâches à faire 
var createNewTaskToDo = function (taskString) {

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var midifTxt = document.createElement("input");
    var ModifButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    label.innerText = taskString;

    //Pour tous les éléments, on ajoute:
    checkBox.type = "checkbox";
    midifTxt.type = "text";
    ModifButton.innerText = "Edit";//innerText encode les charactères spéciaux, PAS LES HTML!!
    ModifButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";



    //Et on ajoute
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(midifTxt);
    listItem.appendChild(ModifButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


//function Ajouter les taĉhes :

var addTasks = function () {
    console.log("So what's you gotta do mate?");
    //Créer un nouvel element de la liste avec le texte qui vient de #new-task
    var listItem = createNewTaskToDo(AddYoTask.value);


    taskNotDone.appendChild(listItem);
    linkTasksEvents(listItem, DidIT);

    AddYoTask.value = "";

}

//Fonction editer les taches existantes

var ModifTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");


    if (containsClass) {


        //label devient la valeur d'input.
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }

    //basculer editMode au parent. Je me comprend 
    listItem.classList.toggle("editMode");
}




//Supprimer les éléments

var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);

}


//Marquer que c'est fait:
var DidIT = function () {
    console.log("Complete Task...");

    //Ajouter les taches dans #completed-task
    var listItem = this.parentNode;
    taskDone.appendChild(listItem);
    linkTasksEvents(listItem, NotDidYet);

}


var NotDidYet = function () {
    console.log("Incomplete Task...");

    var listItem = this.parentNode;
    taskNotDone.appendChild(listItem);
    linkTasksEvents(listItem, DidIT);
}



var RequestAJAX = function () {
    console.log("AJAX Request");
}


AddAButton.onclick = addTasks;
AddAButton.addEventListener("click", addTasks);
AddAButton.addEventListener("click", RequestAJAX);


var linkTasksEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //selectionner ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");


    editButton.onclick = ModifTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}


//pour tous les éléments: 
for (var i = 0; i < taskNotDone.children.length; i++) {


    linkTasksEvents(taskNotDone.children[i], DidIT);
}



for (var i = 0; i < taskDone.children.length; i++) {

    linkTasksEvents(taskDone.children[i], NotDidYet);
}

