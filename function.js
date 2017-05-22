
/***Click button to add task***/
document.getElementById('btn').addEventListener('click', addTaskToTaskList);
document.addEventListener("DOMContentLoaded", showFooter, false);
document.addEventListener("DOMContentLoaded", countTasks, false);

/***Add task using enter key on keyboard***/
function enterEvent(event) {
    var x = event.which || event.keyCode;
    if (x == 13) {
        addTaskToTaskList();
    }
}

/***Declare some variables***/
var listItem = document.getElementById('todotext');
var tasklist = document.getElementById('list');
var tasks = [];

showTasksList();
checkCompletedTasks();
removeTaskFromTaskList();


/***Add task and store in local storage***/
function addTaskToTaskList() {
    tasks.push({
        taskLabel: listItem.value,
        id: `task-${Date.now()}`
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasksList();
    clearValueAfterAddingTaskToList();
    removeTaskFromTaskList();
    checkCompletedTasks();
    showFooter();
    countTasks();
}

/***Read tasks from local Storage and parse***/
function readTasksFromStorage() {
    var retrieveList = localStorage.getItem('tasks');
    var retrievedList = JSON.parse(retrieveList);
    tasks = retrievedList;


}

/***Write tasks to local storage***/
function writeTasksToTaskList(a, b) {
    tasks.splice(a, b);
}


/***Draw list of to do items on the ui***/
function showTasksList() {

    if (JSON.parse(localStorage.getItem('tasks')) !== null) {

        readTasksFromStorage();

        var html = '<ul id="test">';
        for (var i = 0; i < tasks.length; i++) {
            html += `
			<div class="listdiv">
			<li>
				<input type="checkbox" id="${tasks[i].id}" name="task" value="" class="checkTask">
				<label for="${tasks[i].id}" class="taskLabel">${tasks[i].taskLabel}</label>
				<button class="deleteTask"></button>
			</li>
			</div>
		`;

        }

        html += '</ul>'
        tasklist.innerHTML = html;
        checkTask();
        removeTaskFromTaskList();
    }
}

/***Click on x to remove a task from local storage and re-draw the ui***/
function removeTaskFromTaskList() {
    var removeTask = document.getElementsByClassName('deleteTask');

    for (var j = 0; j < removeTask.length; j++) {
        removeTask[j].onclick = function() {
            var d = this.parentNode.firstElementChild.id;
            console.log(d);

            var index = findIndexOf(tasks, "id", d);
            console.log(index);
            writeTasksToTaskList(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            showTasksList();
            hideFooter();
            countTasks();
            checkCompletedTasks();
        }
    }
}

/**Check completed tasks and write to locall storage**/
function checkCompletedTasks() {
    var completedTask = document.getElementsByClassName('checkTask');

    for (var j = 0; j < completedTask.length; j++) {
        completedTask[j].onclick = function() {
            var d = this.id;

            readTasksFromStorage();

            var task = findTask(d);

            if (this.checked === true) {

                task.checked = true;
                writeTasksToTaskList(2, 0);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } else {

                task.checked = false;
                writeTasksToTaskList(2, 0);
                localStorage.setItem('tasks', JSON.stringify(tasks));

            }
            countTasks();

        }

    }
}

/**function that will check checkbox state in local storage and update on page load**/
function checkTask() {
    readTasksFromStorage();

    for (var j = 0; j < tasks.length; j++) {
        var getId = (tasks[j].id);
        var task = findTask(getId);
        if (task.checked === true) {
            var a = document.querySelector(`#${getId}`);
            a.checked = true;
        }

    }
}

/***Function to  mark all tasks complete at once***/
function checkAllTasks() {
	readTasksFromStorage();	
    for (var j = 0; j < tasks.length; j++) {
        var getId = (tasks[j].id);
        var task = findTask(getId);
		console.log(task);
        console.log(tasks.length);
		
            var a = document.querySelector(`#${getId}`);
			var b = document.querySelectorAll('input[type="checkbox"]:checked').length;
			
			console.log(b);
			if (a.checked === false) {
				
                task.checked = true;
                writeTasksToTaskList(2, 0);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } 
			else if (a.checked === true && tasks.length === b) {
				
                
				task.checked = false;
                writeTasksToTaskList(2, 0);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } 
			
			
			
            countTasks();
			
        }

    
	console.log('button click');

}


/***Completed task list***/

function completedTaskList(){	
var count = 0;
		readTasksFromStorage();
		for (var j = 0; j < tasks.length; j++) {
        var getId = (tasks[j].id);
        var task = findTask(getId);
		
		
            var a = document.querySelector(`#${getId}`);
			
			if(a.checked === null || a.checked === false){
				
				a.parentNode.style.display = 'none';
				
        if (task.checked !== true) {
            count++;
			console.log(count);
			console.log(tasks.length);
        }
		
		if(tasks.length === count)
			document.getElementById('list').innerHTML = "No completed tasks at this time.";
			document.getElementById('list').style.color = 'gray';
			document.getElementById('list').style.fontSize = '0.8em';
			   
			}
					

   
  
	}
	
	
	
}


/***Function to find index of a task***/
function findIndexOf(arrayToSearch, key, valueToSeek) {
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][key] === valueToSeek) {
            return i;
        }

    }
    return null;
}

/***Function to find a task in the task array***/
function findTask(id) {
    return tasks.find(function(item) {
        return item.id == id;
    })
};


/***clear input field after adding text to to do list***/
function clearValueAfterAddingTaskToList() {
    listItem.value = '';

}
/***clear local storage***/
function clearTasksList() {
    window.localStorage.clear();
}


/***when to Show footer***/
function showFooter() {
    if (localStorage.getItem('tasks') !== null) {
        document.querySelector("footer").style.display = "block";
    }
}

/***When to hide footer***/
function hideFooter() {
    if (localStorage.getItem('tasks') === "[]") {
        document.querySelector("footer").style.display = "none";
        clearTasksList();

    }
}
/***count remaining tasks***/
function countTasks() {

    var count = 0;
    for (var j = 0; j < tasks.length; j++) {
        var getId = (tasks[j].id);
        var task = findTask(getId);
        if (task.checked !== true) {
            count++;
        }
    }
    document.getElementById("numberOfTasks").innerHTML = count + ` item(s) left`;
	
	if(count > 0){
		document.getElementById("numberOfTasks").style.color = 'red';
	}
	
	else {
		document.getElementById("numberOfTasks").style.color = '#5c5cd6';
	}
}




