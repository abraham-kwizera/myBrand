const delete_query = (blogId) => {
    let user = JSON.parse(localStorage.getItem('user'))
    let userToken = user.token;
    console.log(userToken);
    let fetchData = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${userToken}`
        })
    }

    fetch(`https://my-capstone-project-api.herokuapp.com/blogs/${blogId}`, fetchData)
        .then((response) => {
            return response.json()
        }).then((data) => {
            Toastify({
                text: `${data.message}`,
                title: data.message,
                style: {
                    background: "linear-gradient(to left, #00b09b, #96c93d)",
                }
            }).showToast();

        }).catch((err) => {
            console.error(err)
        })
}