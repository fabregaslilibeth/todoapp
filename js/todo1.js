let task = document.querySelector('#todo')
let taskList = document.querySelector('.todo-list')
let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let delAllBtn = document.querySelector('#deleteAll')
let deleteComp = document.querySelector('#deleteComp')

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
}

//display tasks on HTML side
function displayTasks(tasks = [], taskList) {
	taskList.innerHTML = tasks.map( (task, i )=> {
		return `
			<li> 
				<input type="checkbox" id="task${i}" data-index="${i}"  ${task.isDone ? "checked" : ""} />
				<label for="task${i}">${task.newTask}</label> 
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
	
}

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
	
task.addEventListener('submit', addTask)
//taskList.addEventListener('click', deleteTask)
taskList.addEventListener('click', toggleDone)

delAllBtn.addEventListener('click', function() {
	if (!confirm("Are you sure you want to delete all tasks")) {
		return false
	}

	localStorage.removeItem('tasks')	
	displayTasks(tasks, taskList)
	location.reload()
})

deleteComp.addEventListener('click', function(e) {
	if (!confirm("Are you sure you want to delete all completed tasks?")) {
		return false
	}
	//console.log(tasks)
	if (tasks.every(task => task.isDone)) {
		console.log("all is completed")
	} else {
		let pending = tasks.filter(e => e.isDone === false)
		//console.log(pending)
		localStorage.setItem('tasks', JSON.stringify(pending))
		displayTasks(tasks, taskList)
		location.reload()
	}

//	localStorage.removeItem('tasks')	
	displayTasks(tasks, taskList)
})


displayTasks(tasks, taskList)


