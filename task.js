
document.getElementById('btn').addEventListener('click', add);

var task = [];
var listItem = document.getElementById('todotext');
var tasklist = document.getElementById('list');
showList();

function add(){
	if(localStorage.getItem('task') !== null){
		var retrieveList = localStorage.getItem('task');
		var retrievedList = JSON.parse(retrieveList);
		task = retrievedList;
	}
	
	task.push(listItem.value);
	console.log(task);
	localStorage.setItem('task', JSON.stringify(task));
	
	show();
	clearvalue();
}

function show(){
	
	var content;
	for(var i = 0; i<task.length; i++){
		content+= task[i] + '<br>';
	}
	tasklist.innerHTML = content;
}

function clearvalue(){
	listItem.value = '';
	showList();
}

function showList(){
	if(localStorage.getItem('task') !== null){
		var retrieveList = localStorage.getItem('task');
		var retrievedList = JSON.parse(retrieveList);
		tasklist.innerHTML = retrievedList;
		
	}
}