
/***Click button to add task***/
document.getElementById('btn').addEventListener('click', addTaskToTaskList);

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
removeTaskFromTaskList();

/***Add task and store in local storage***/
function addTaskToTaskList(){
	tasks.push({taskLabel: listItem.value, id: Date.now()});	
	localStorage.setItem('tasks', JSON.stringify(tasks));
	showTasksList();
	clearValueAfterAddingTaskToList();
	removeTaskFromTaskList();
	checkCompletedTasks();
}

function readTasksFromStorage(){
		var retrieveList = localStorage.getItem('tasks');
		var retrievedList = JSON.parse(retrieveList);
		tasks = retrievedList;
}

function showTasksList(){
	if(JSON.parse(localStorage.getItem('tasks')) !== null){
			
		readTasksFromStorage();
		
		var html = '<ul id="test">';
		for(var i=0; i<tasks.length; i++){
			html+=`
			<li>
				<input type="checkbox" id="${tasks[i].id}" name="task" value="" class="checkTask">
				<label for="${tasks[i].id}" class="taskLabel">${tasks[i].taskLabel}</label>
				<button class="deleteTask"></button>
			</li>
		`;
		}
		
		html+='</ul>'
		tasklist.innerHTML = html;
		removeTaskFromTaskList();
	}
	
	
}


function removeTaskFromTaskList(){
	var removeTask = document.getElementsByClassName('deleteTask');
	
	for(var j=0; j < removeTask.length; j++){
		removeTask[j].onclick = function(){
			var d = this.parentElement.textContent;
			var index = findIndexOf(tasks,"taskLabel", d);
			console.log(index);
			tasks.splice(index, 1);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			showTasksList();
			
		}
	}
}

function checkCompletedTasks(){
	var completedTask = document.getElementsByClassName('checkTask');
	
	for(var j=0; j<completedTask.length; j++){
		completedTask[j].onclick = function(){
			var d = this.id;
			console.log(d);
			readTasksFromStorage();
			
			var task = findTask(d);
			var a = task.checked=true;
			
			if(a === true){
				tasks.splice(2, a);
				localStorage.setItem('tasks', JSON.stringify(tasks));
			}
			else if(a === false){
				
			}
			
		}
	}
}

checkCompletedTasks();


	function findIndexOf (arrayToSearch, key, valueToSeek){
				for(var i = 0; i < arrayToSearch.length; i++){
					if(arrayToSearch[i][key] === valueToSeek){
						return i;
					}
					
				}
				return null;
			}
	
	
	var findTask = function (id) {
   return tasks.find(function (item) {
       return item.id == id;
	})};	
		
function clearValueAfterAddingTaskToList(){
	listItem.value = '';
}

function clearTasksList(){
	window.localStorage.clear();
}

