const url = 'https://mybrand-backend-api.herokuapp.com/users/login'

let loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', e => {
    e.preventDefault()

    login()
})
const login = () => {

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    let data = {
        email: email,
        password: password
    }
    let fetchData = {
        // mode: "no-cors",
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(url, fetchData)
        .then((response) => {
            return response.json()
        }).then((data) => {
            let user = {
                message: data.status,
                UserName: data.UserName,
                email: data.email,
                role: data.role,
                token: data.token
            }
            console.log(data.data.user[0].role)
            localStorage.setItem('user', JSON.stringify(user))
            if (data.data.user[0].role === 'admin') {
                location.href = '../admin/'
            }
            if (data.data.user[0].role === 'user') {
                location.href = '../blog.html'
            }

        }).catch(() => {
            // show alert
            document.querySelector('.alertError').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alertError').style.display = 'none';
            }, 5000);

        })
}