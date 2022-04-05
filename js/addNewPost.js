const addNewPost = document.getElementById("newBlog");

addNewPost.addEventListener('submit', e => {
    e.preventDefault();

    register();
})

async function register() {
    let blogTitle = document.getElementById("blogTitle").value
    let blogBody = document.getElementById("blogBody").value
    const user = JSON.parse(window.localStorage.getItem('user'))

    let data = {
        title: blogTitle,
        body: blogBody,

    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        })
    }
    fetch(`https://mybrand-backend-api.herokuapp.com/blogs`, fetchData)
        .then((response) => {
            return response.json()
        }).then((data) => {
            // show alert
            document.querySelector('.alert').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alert').style.display = 'none';
                addNewPost.reset();
                blogBody.value = '';
            }, 5000);
        })
        .catch(() => {
            // show alert
            document.querySelector('.alertError').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alertError').style.display = 'none';
            }, 5000);
        })
}