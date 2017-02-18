
document.getElementById('btn').addEventListener('click', add);

/**document.getElementById('deleteTask').addEventListener('click', deleteTask);**/

function enterEvent(event){
	var x= event.which || event.keyCode;
	if(x == 13){
		add();
	}
}

var task = [];
var listItem = document.getElementById('todotext');
var tasklist = document.getElementById('list');
showList();




function add(){
	task.push(listItem.value);
	console.log(task);
	
	localStorage.setItem('task', JSON.stringify(task));
	
	showList();
	clearvalue();
	removeTask();
}


function clearvalue(){
	listItem.value = '';
	
}

removeTask();
function removeTask(){
	var close = document.getElementsByClassName('deleteTask');
	for(var j = 0; j < close.length; j++){
		
	close[j].onclick = function(){
		
		var d = this.parentElement;
		d.style.display = 'none';
	}
}
}


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

function clearList(){
	window.localStorage.clear();
}


