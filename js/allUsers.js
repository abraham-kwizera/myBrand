let user = JSON.parse(localStorage.getItem('user'))
let userToken = user.token;

// api url
const api_url = "https://mybrand-backend-api.herokuapp.com/users";

// Defining async function
async function getapi(url) {

    // Storing response
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
    });

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    // if (response) {
    //     hideloader();
    // }
    fetchAllUsers(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// }
// Function to define innerHTML for HTML table
function fetchAllUsers(data) {
    let user = `<h1><u> All Users Report </u></h1>
    <br>  <i>Note: Once click on delete it is deleted</i>`
        // Loop to access all rows
    for (let r of data.data.users) {
        user += `
     <div class="blog-ancient">
        <div class="right">
            <div class="blog-discription">
                <h3>Names: ${r.firstName} ${r.lastName}</h3>
                <p>email: ${r.email}</p>
            </div>
            <div class="btns">
     <a href='../admin/singleUser.html?=${r._id}'>  <input type="button" value="About" id='${r._id}'> </a>
     <a href='../admin/updateUser.html?=${r._id}'>  <input type="button" value="Update" id="${r._id}"> </a>
        <input type="button" value="Delete" class="delete" id="${r._id}" onClick='delete_user(this.id)'>

            </div>
        </div> 
        <div class="alert">Deleted message successfully</div>
        <div class="alertError">Error in deleting message, Try again...</div>
    </div> 
`;
    }
    // Setting innerHTML as user variable
    document.getElementById("blogs").innerHTML = user;
}

const delete_user = (key) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    let userToken = user.token;
    let fetchData = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${userToken}`
        })
    }

    fetch(`https://mybrand-backend-api.herokuapp.com/users/${key}`, fetchData)
        .then((response) => {
            return response.json()
        }).then((data) => {
            // show alert
            document.querySelector('.alert').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alert').style.display = 'none';
                message.value = '';
            }, 5000);

        }).catch((err) => {
            // console.error(err)

            // show alert
            document.querySelector('.alertError').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alertError').style.display = 'none';
            }, 5000);
        })
}