
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
var obj = {'taskLabel':'', 'checkIndex': '', 'checkTask': ''};


showTasksList();
removeTaskFromTaskList();

/***Add task and store in local storage***/
function addTaskToTaskList(){
	obj["taskLabel"] = listItem.value;
	tasks.push(obj);	
	localStorage.setItem('tasks', JSON.stringify(tasks));
	showTasksList();
	clearValueAfterAddingTaskToList();
	removeTaskFromTaskList();
}

function showTasksList(){
	if(JSON.parse(localStorage.getItem('tasks')) !== null){
		console.log(localStorage.getItem('tasks'));
		var retrieveList = localStorage.getItem('tasks');
		var retrievedList = JSON.parse(retrieveList);
		tasks = retrievedList;		
		
		var html = '<ul id="test">';
		for(var i=0; i<tasks.length; i++){
			html+='<li>' + '<input type="checkbox" name="task" value="" id="someId" class="checkTask">' + '<label for="someId" class="taskLabel">' + tasks[i]['taskLabel'] + '</label>' + '<button class="deleteTask"></button>' + '</li>'
			
		}
		
		html+='</ul>'
		tasklist.innerHTML = html;
	}
}


function removeTaskFromTaskList(){
	var removeTask = document.getElementsByClassName('deleteTask');
	for(var j=0; j<removeTask.length; j++){
		removeTask[j].onclick = function(){
			var d = this.parentElement.textContent;
			console.log(d);
			var index = findIndexOf(tasks,"taskLabel", d);
			console.log(index);
		}
	}
}

	function findIndexOf (arrayToSearch, key, valueToSeek){
				for(var i = 0; i<arrayToSearch.length; i++){
					if(arrayToSearch[i][key] === valueToSeek){
						return i;
						console.log(i);
					}
					else{
						return null;
					}
				}
			}

			
function clearValueAfterAddingTaskToList(){
	listItem.value = '';
}

function clearTasksList(){
	window.localStorage.clear();
}

