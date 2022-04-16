const commentForm = document.getElementById("add-comment");

if (commentForm) {
    commentForm.addEventListener('submit', e => {
        e.preventDefault();

        comment();
    })
}

window.onload = async function comment() {
    // get token 
    let user = JSON.parse(localStorage.getItem('user'))
    let userToken = user.token;
    let userName = user.userName
    let email = user.email
    let latest = JSON.parse(localStorage.getItem('latest'))
    console.log(latest)

    let userComment = document.getElementById("userComment")

    let data = {
        name: userName,
        email: email,
        comment: userComment
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${userToken}`
        })
    }
    fetch(`https://mybrand-backend-api.herokuapp.com/blogs/${latest._id}/comment`, fetchData)
        .then((response) => {
            return response.json()
        }).then(() => {
            // show alert
            document.querySelector('.alert').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alert').style.display = 'none';
                userComment.value = '';
            }, 5000);
        })
        .catch((error) => {
            // show alert
            document.querySelector('.alertError').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alertError').style.display = 'none';
                userComment.value = '';
            }, 5000);
        })
}