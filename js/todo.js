let todo = document.querySelector('#todo')
let todolist = document.querySelector('.todo-list')
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTask(e) {
	e.preventDefault()

	const taskName = (this.querySelector('[name=task]')).value

	const tasks = {
		task: taskName,
		isDone: false
	} 
		
	todos.push(tasks)	
	populateList(todos,todolist)
	localStorage.setItem("todos", JSON.stringify(todos))
	this.reset()

}

function populateList(todos = [], todolist) {
	console.log(todos)
	todolist.innerHTML = todos.map((task, i) => {
		return `
			<li>
				<input type="checkbox" data-index="${i}" ${task.isDone ? "checked" : ""}/>
				<label for="task${i}">${task.task}</label>
			</li>
			`
	})
}

function toggleDone(e) {
	if (!e.target.matches('input')) return
		const i = e.target.dataset.index
		todos[i].isDone = !todos[i].isDone
		localStorage.setItem('todos', JSON.stringify(todos))
		populateList(todos, todolist)
}


todo.addEventListener('submit', addTask)
todolist.addEventListener('click', toggleDone)
populateList(todos, todolist)
