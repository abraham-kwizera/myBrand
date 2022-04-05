const logoutUser = document.getElementById('userLogout')

logoutUser.addEventListener('click', (e) => {
    e.preventDefault()
    window.localStorage.removeItem('user')
    localStorage.clear();
    location.href = `../login.html`
})