
/***Click button to add task***/
document.getElementById('btn').addEventListener('click', add);


/***Add task using enter key on keyboard***/
function enterEvent(event){
	var x= event.which || event.keyCode;
	if(x == 13){
		add();
	}
}

/***Declare some variables***/
var task = [];
var listItem = document.getElementById('todotext');
var tasklist = document.getElementById('list');

/***Call show list function to load tasks from local storage on page load***/
showList();


/***Add task and store in local storage***/
function add(){
	task.push(listItem.value);
	console.log(task);
	
	localStorage.setItem('task', JSON.stringify(task));
	
	showList();
	clearvalue();
	removeTask();
}

/***function to clear input field after adding task***/
function clearvalue(){
	listItem.value = '';
}


/***Call remove task function***/
removeTask();

/***functon to remove a task when x is clicked***/
function removeTask(){
	var close = document.getElementsByClassName('deleteTask');
	for(var j = 0; j < close.length; j++){
		
	close[j].onclick = function(){
		
		
		event.currentTarget.parentElement.remove();
		
		var retrieveList = localStorage.getItem('task');
		var retrievedList = JSON.parse(retrieveList);
		task = retrievedList;
		
		task.splice(j, 0);
		task;
		console.log(task);
		
		/**var elem = document.getElementById('someId');
		elem.parentNode.removeChild(elem);
		console.log(elem);
		var d = this.parentElement;
		d.style.display = 'none';**/
	}
}
}

/**function to populate the todo list with values stored in local storage***/
function showList(){
	if(localStorage.getItem('task') !== null){
		
		var retrieveList = localStorage.getItem('task');
		var retrievedList = JSON.parse(retrieveList);
		task = retrievedList;
		
		var html = '<ul id="test">';
	for(var i = 0; i<task.length; i++){
		html+= '<li>' + '<input type="checkbox" name="task" value="selected" id="someId" class="checkTask">' + '<label for="someId" class="taskLabel">' + task[i] + '</label>' + '<button class="deleteTask">x</button>' + '</li>';
	};
	
	html+= '</ul>';
	tasklist.innerHTML = html;	
	}	
}

/***function to clear the todo list from local storage***/
function clearList(){
	window.localStorage.clear();
}


