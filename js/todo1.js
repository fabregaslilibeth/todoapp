let task = document.querySelector('#todo')
let taskList = document.querySelector('.todo-list')
let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let delAllBtn = document.querySelector('#deleteAll')
let deleteComp = document.querySelector('#deleteComp')
let selectAll = document.querySelector('#selectAll')
let btnContainer = document.querySelector('.btn-container')
let deselectAll = document.querySelector('#deselectAll')

// add tasks and persist them
function addTask(e) {
	e.preventDefault()
	let newTask = this.querySelector('[name=task]').value

	let taskArray = {
		newTask,
		isDone: false
	}

	tasks.push(taskArray)
	//console.log(tasks)
	localStorage.setItem('tasks', JSON.stringify(tasks))
	
	this.reset()
	displayTasks(tasks, taskList)
	location.reload()
}

//display tasks on HTML side
function displayTasks(tasks = [], taskList) {
	taskList.innerHTML = tasks.map( (task, i )=> {
		return `
			<li class="list-group-item lists"> 
				<input type="checkbox" class="col-lg-2" id="task${i}" data-index="${i}"  ${task.isDone ? "checked" : ""} />
				<label for="task${i}" draggable="true" class="col-lg-8">${task.newTask}</label> 
				<button class="delBtn" data-id="${i}">Delete</button>
			</li>
		` 
	}).join("")
}

function toggleDone(e) {

	if (!e.target.matches('input')) return
		let i = e.target.dataset.index
		//console.log(i)
		tasks[i].isDone = !tasks[i].isDone 
		//console.log(tasks[i].isDone)
		localStorage.setItem('tasks', JSON.stringify(tasks))
 		displayTasks(tasks, taskList)
 		location.reload()
}


//delete individual task
document.querySelector('.todo-list').addEventListener('click', function(e) {
	//console.log(e.target)
	if (e.target.className == "delBtn") {

		if (!confirm('Are you sure you want to delete this?')) {
			return false
		} 
		let i = e.target.dataset.id
		console.log(i)
		tasks.splice(i,1)
		console.log(tasks)
		localStorage.setItem('tasks', JSON.stringify(tasks))
 		displayTasks(tasks, taskList)
	} 
})

// event listener for adding tasks
task.addEventListener('submit', addTask)

//event listener to change the task to done or not
taskList.addEventListener('click', toggleDone)

//delete all tasks
delAllBtn.addEventListener('click', function() {
	if (!confirm("Are you sure you want to delete all tasks")) {
		return false
	}

	localStorage.removeItem('tasks')	
	displayTasks(tasks, taskList)
	location.reload()
})

//delete all completed tasks
deleteComp.addEventListener('click', function(e) {
	if (!confirm("Are you sure you want to delete all completed tasks?")) {
		return false
	}

	let pending = tasks.filter(e => e.isDone === false)
	//console.log(pending)
	localStorage.setItem('tasks', JSON.stringify(pending))
	displayTasks(tasks, taskList)
	location.reload()
})

//check all 
selectAll.addEventListener('click', function() {
	tasks.every(task => task.isDone = true);
	localStorage.setItem('tasks', JSON.stringify(tasks))
	displayTasks(tasks, taskList)
	location.reload()
})

//uncheck all 
deselectAll.addEventListener('click', function() {
	tasks.forEach(task => task.isDone = false);
	localStorage.setItem('tasks', JSON.stringify(tasks))
	displayTasks(tasks, taskList)
	location.reload()
})

//to hide the buttons when there is no items
if (tasks.length === 0) {
	btnContainer.style.opacity = 0
} 
 
let done = tasks.filter(e => e.isDone === true)
if (done.length === 0) {
	console.log('was')
	deleteComp.style.display = 'none';
	deselectAll.style.display = 'none';
}

let pending = tasks.filter(e => e.isDone === false)
if (pending.length === 0) {
	console.log('was')
	deleteComp.style.display = 'none';
	selectAll.style.display = 'none';
}
//tasks.filter


displayTasks(tasks, taskList)


