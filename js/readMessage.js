// window.setTimeout(function() {
//     window.location.reload();
// }, 10000);

let readMessages = document.getElementById("messages")
const api_url = 'https://mybrand-backend-api.herokuapp.com/contactsMessage'
    // get token 
let user = JSON.parse(localStorage.getItem('user'))
let userToken = user.token;

// Defining async function
async function getapi(url) {

    let fetchData = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${userToken}`
            })
        }
        // Storing response
    const response = await fetch(url, fetchData);

    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);
    // if (response) {
    //     hideloader();
    // }
    fetchAllPosts(data);
}
// Calling that async function
getapi(api_url);

function fetchAllPosts(data) {
    let message = `<h1><u> All Message Wall </u><i>Note: Once click on delete it is deleted</i></h1>
    `
        // Loop to access all rows
    for (let query of data.data.messages) {
        message += ` 
        <div class="alert">Deleted message successfully</div>
        <div class="alertError">Error in deleting message, Try again...</div>
         <div class="message-container">
            <div class="user-info">
                <label for="name">Names: ${query.name}</label>
                <label for="location">From: ${query.location}</label>
                <label for="email">Email: ${query.email}</label>
            </div>
            <div class="user-message">
                <label for="message"> ${query.message} </label>
                <label for="message">Received: ${query.time} </label>

            </div>
            <div class="btns">
                <input type="button" value="Delete" id='${query._id}' onClick='delete_query(this.id)'>
            </div>
        </div>
        `;

    }
    readMessages.innerHTML = message
}


const delete_query = (id) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    fetch(`https://mybrand-backend-api.herokuapp.com/contactsMessage/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        })
    }).then(() => {
        // show alert
        document.querySelector('.alert').style.display = 'block';

        //Hide alert after 5 seconds
        setTimeout(function() {
            document.querySelector('.alert').style.display = 'none';
        }, 5000);

    }).catch(() => {
        // console.error(err)
        // show alert
        document.querySelector('.alertError').style.display = 'block';

        //Hide alert after 5 seconds
        setTimeout(function() {
            document.querySelector('.alertError').style.display = 'none';
        }, 5000);
    })
}