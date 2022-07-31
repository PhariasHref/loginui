const username = document.querySelector('.input-username')
const password = document.querySelector('.input-password')
const submit = document.querySelector('.panel-login-button')

const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', (event) => {
	event.preventDefault()
	let ajax = new XMLHttpRequest()
	ajax.open('POST','http://localhost:3000/login')
	ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded')

	ajax.onreadystatechange = () => {
		if(ajax.status === 200 && ajax.readyState === 4) {
			alert(ajax.responseText)
		}
		if(ajax.status === 400 && ajax.readyState === 4) {
			alert(ajax.responseText)
		}
	}
	ajax.send(`username=${username.value}&password=${password.value}`)
})
