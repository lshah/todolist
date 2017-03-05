
/***Click button to add task***/
document.getElementById('btn').addEventListener('click', add);
show();
/***Add task using enter key on keyboard***/
function enterEvent(event){
	var x= event.which || event.keyCode;
	if(x == 13){
		add();
	}
}

/***Declare some variables***/
var listItem = document.getElementById('todotext');
var tasklist = document.getElementById('list');
var task = [];
var obj = {'taskLabel':'', 'checkIndex': '', 'checkTask': ''};
obj["taskLabel"] = listItem.value;


/***Add task and store in local storage***/
function add(){
	obj["taskLabel"] = listItem.value;
	task.push(obj);
	localStorage.setItem('task', JSON.stringify(task));
	show();
	clearvalue();
}

function show(){
	if(JSON.parse(localStorage.getItem('task')) !== null){
		
		console.log(localStorage.getItem('task'));
		var html = '<ul id="test">';
		for(var i=0; i<task.length; i++){
			html+='<li>' + '<input type="checkbox" name="task" value="" id="someId" class="checkTask">' + '<label for="someId" class="taskLabel">' + obj["taskLabel"] + '</label>' + '<button class="deleteTask"></button>' + '</li>'
			
		}
		
		html+='</ul>'
		tasklist.innerHTML = html;
	}
}

function findIndexOf(task, valueToSeek){
	for (var i=0; i<task.length; i++){
		if(task[i] === valueToSeek){
			return i;
			console.log(i);
		}
	}
}

function clearvalue(){
	listItem.value = '';
}

function clearList(){
	window.localStorage.clear();
}

