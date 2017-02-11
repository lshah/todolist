
document.getElementById('btn').addEventListener('click', add);


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
}



function clearvalue(){
	listItem.value = '';
	
}

function showList(){
	if(localStorage.getItem('task') !== null){
		
		var retrieveList = localStorage.getItem('task');
		var retrievedList = JSON.parse(retrieveList);
		task = retrievedList;
		
		var html = '<ul id="test">';
	for(var i = 0; i<task.length; i++){
		html+= '<li>' + task[i] + '<button id="deleteTask">x</button>' + '<a href id="editTask">edit</a>' + '</li>';
	};
	
	html+= '</ul>';
	tasklist.innerHTML = html;
		
		
	}
	
	
}

function clearList(){
	window.localStorage.clear();
}