
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

/***Add task and store in local storage***/
function addTaskToTaskList(){
	obj["taskLabel"] = listItem.value;
	tasks.push(obj);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	showTasksList();
	clearvalue();
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

function findIndexOf(tasks, valueToSeek){
	for (var i=0; i<tasks.length; i++){
		if(tasks[i] === valueToSeek){
			return i;
			console.log(i);
		}
	}
}

function clearvalue(){
	listItem.value = '';
}

function clearTasksList(){
	window.localStorage.clear();
}

