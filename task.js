
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
	checkingTasks();
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
		var d = this.parentElement.textContent;
		
		var index = findIndexOf(task, d);
		
		
		task.splice(index, 1);
		localStorage.setItem('task', JSON.stringify(task));
		showList();
		
			
		}
	}
}

/***checked tasks***/
function checkingTasks(){
	var check = document.getElementsByTagName('input');
	for(var j=0; j<check.length; j++){
		check[j].onchange = function(){
			
			/***get index of task***/
			var d = this.parentElement.textContent;
			console.log(d);
			var index = findIndexOf(task, d);
			console.log(index);
			/***create object with index of task and checked state***/
			var obj = {'taskLabel':d, 'checkIndex': index, 'checkTask': this.checked};
			console.log(obj);
			
			/***store obj to local storage***/
			/***Note to self: i probably need to make this an array***/
			
			localStorage.setItem('checkObject', JSON.stringify(obj));
			
			/***get obj from local storage and display***/			
			if(this.checked === true){
				console.log('yes, it is checked');
			}
			else{
				console.log('not checked');
			}
		}
	}

function checkThis(){
	var obj = JSON.parse(localStorage.getItem('checkObject'));
	console.log(obj);
	
	if(Object["checkTask"] === true){
		console.log('yes it is true');
		document.getElementsByTagName('input').style.color = 'red';
	}
}

checkThis();
}

/***find index of task***/
		
			var findIndexOf = function (task, valueToSeek){
				for(var i = 0; i<task.length; i++){
					if(task[i] === valueToSeek){
						return i;
						console.log(i);
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
		html+= '<li>' + '<input type="checkbox" name="task" value="" id="someId" class="checkTask">' + '<label for="someId" class="taskLabel">' + task[i] + '</label>' + '<button class="deleteTask"></button>' + '</li>';
	};
	
	html+= '</ul>';
	tasklist.innerHTML = html;	
	removeTask();
	
	
	}	
}

/***function to clear the todo list from local storage***/
function clearList(){
	window.localStorage.clear();
}


