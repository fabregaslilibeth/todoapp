let fruits = ["Banana", "Orange", "Apple", "Mango"];
let values = fruits.entries()
console.log(values)

for (keys of values) {
	document.querySelector('.demo').innerHTML += `<li> ${keys} </li>`
}