const registerForm = document.getElementById("registerForm");

registerForm.addEventListener('submit', e => {
    e.preventDefault();

    register();
})

async function register() {
    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    let userName = document.getElementById("userName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmPassword = document.getElementById("confirmPassword").value

    let data = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
        })
    }
    fetch(`https://mybrand-backend-api.herokuapp.com/users/register/`, fetchData)
        .then((response) => {
            return response.json()
        }).then((data) => {
            // show alert
            document.querySelector('.alert').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alert').style.display = 'none';
                registerForm.reset();
                location.href = `../login.html`
            }, 5000);
        })
        .catch(() => {

        })
}