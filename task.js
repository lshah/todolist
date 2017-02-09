
document.getElementById('btn').addEventListener('click', add);

var task = [];
var listItem = document.getElementById('todotext');
var tasklist = document.getElementById('list');
showList();

function add(){
	/**if(localStorage.getItem('task') !== null){
		var retrieveList = localStorage.getItem('task');
		var retrievedList = JSON.parse(retrieveList);
		task = retrievedList;
	}**/
	
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
		html+= '<li>' + task[i] + '</li>';
	};
	
	html+= '</ul>';
	tasklist.innerHTML = html;
		
		
	}
	
	
}