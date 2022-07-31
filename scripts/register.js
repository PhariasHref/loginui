const uusername = document.querySelector('#username')
const eemail = document.querySelector('#email')
const ppassword = document.querySelector('#type-password')
const confirmPassword = document.querySelector('#confirm-password')
const registerForm = document.querySelector('#register-form')

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if(ppassword.value == confirmPassword.value){
        let ajax = new XMLHttpRequest()
        ajax.open('POST','http://localhost:3000/register')
        ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded')

        ajax.onreadystatechange = () => {
            if(ajax.status === 200 && ajax.readyState === 4) {
                alert(ajax.responseText)
            }
            if(ajax.status === 300 && ajax.readyState === 4) {
                alert(ajax.responseText)
            }
            if(ajax.status === 400 && ajax.readyState === 4) {
                alert(ajax.responseText)
            }
        }
        ajax.send(`email=${eemail.value}&username=${uusername.value}&password=${ppassword.value}`)
    } else {
        alert('As senhas não se correspondem!')
    }
})
