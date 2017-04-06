
/***Click button to add task***/
document.getElementById('btn').addEventListener('click', addTaskToTaskList);
document.addEventListener("DOMContentLoaded", showFooter, false);
document.addEventListener("DOMContentLoaded", countTasks, false);
/***Add task using enter key on keyboard***/
function enterEvent(event){
	var x= event.which || event.keyCode;
	if(x == 13){
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
function addTaskToTaskList(){
	tasks.push({taskLabel: listItem.value, id: `task-${Date.now()}`});
	localStorage.setItem('tasks', JSON.stringify(tasks));
	showTasksList();
	clearValueAfterAddingTaskToList();
	removeTaskFromTaskList();
	checkCompletedTasks();
	showFooter();
	countTasks();
}


function readTasksFromStorage(){
		var retrieveList = localStorage.getItem('tasks');
		var retrievedList = JSON.parse(retrieveList);
		tasks = retrievedList;
		
		
}

function writeTasksToTaskList(a, b){
	tasks.splice(a, b);
}



function showTasksList(){
	
	if(JSON.parse(localStorage.getItem('tasks')) !== null){
			
		readTasksFromStorage();
		
		var html = '<ul id="test">';
		for(var i=0; i<tasks.length; i++){
			html+=`
			<div class="listdiv">
			<li>
				<input type="checkbox" id="${tasks[i].id}" name="task" value="" class="checkTask">
				<label for="${tasks[i].id}" class="taskLabel">${tasks[i].taskLabel}</label>
				<button class="deleteTask"></button>
			</li>
			</div>
		`;
		
		}
		
		html+='</ul>'
		tasklist.innerHTML = html;
		
		checkTask();
		
		removeTaskFromTaskList();
		
		
	}

	
}


function removeTaskFromTaskList(){
	var removeTask = document.getElementsByClassName('deleteTask');
	
	for(var j=0; j < removeTask.length; j++){
		removeTask[j].onclick = function(){
			var d = this.parentNode.firstElementChild.id;
			console.log(d);
			
			var index = findIndexOf(tasks,"id", d);
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

function checkCompletedTasks(){
	var completedTask = document.getElementsByClassName('checkTask');
	
	for(var j=0; j<completedTask.length; j++){
		completedTask[j].onclick = function(){
			var d = this.id;
			
			readTasksFromStorage();
			
			var task = findTask(d);
					
			if(this.checked === true){
				
				task.checked = true;
			writeTasksToTaskList(2, 0);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			}
			else{
				
				task.checked = false;
			writeTasksToTaskList(2, 0);
			localStorage.setItem('tasks', JSON.stringify(tasks));
				
			}
			countTasks();
			
		}
		
	}
}

/**function that will check checkbox state in local storage and update on page load**/
function checkTask(){
	readTasksFromStorage();
		
	for(var j=0; j<tasks.length; j++){
		
		var getId = (tasks[j].id);
		
		var task = findTask(getId);
		
			if(task.checked === true){
				
			var a = document.querySelector(`#${getId}`);
					a.checked = true;
					
				
			}
			
			
			
		}
}



	function findIndexOf (arrayToSearch, key, valueToSeek){
				for(var i = 0; i < arrayToSearch.length; i++){
					if(arrayToSearch[i][key] === valueToSeek){
						return i;
					}
					
				}
				return null;
			}
	
	
	function findTask(id) {
   return tasks.find(function (item) {
       return item.id == id;
	})};	

function checkAllTasks(){
	var a = document.getElementsByClassName('checkTask');
	
	
}
	
function clearValueAfterAddingTaskToList(){
	listItem.value = '';
	
}

function clearTasksList(){
	window.localStorage.clear();
}



function showFooter(){
	if(localStorage.getItem('tasks') !== null){
		document.querySelector("footer").style.display = "block";
	}
}

function hideFooter() {
	if(localStorage.getItem('tasks') === "[]"){
			document.querySelector("footer").style.display = "none";
			clearTasksList();
			
		}
}

function countTasks(){
	
	var count = 0;
	for(var j=0; j<tasks.length; j++){
		var getId = (tasks[j].id);
		var task = findTask(getId);
			if(task.checked !== true || task.checked === null){
				count++;
			}
}
	document.getElementById("numberOfTasks").innerHTML = count + ` item(s) left`;
}

