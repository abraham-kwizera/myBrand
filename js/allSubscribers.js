let user = JSON.parse(localStorage.getItem('user'))
let userToken = user.token;

// api url
const api_url = "https://mybrand-backend-api.herokuapp.com/blogs/subscribe";

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
    let user = `<h1><u> All Subscriber Report </u></h1>
    <br>  <i>Note: Once click on delete it is deleted</i>
    <div class="alert">Deleted Subscriber successfully</div>
    <div class="alertError">Error in deleting Subscriber, Try again...</div>
    `
        // Loop to access all rows
    for (let r of data.data.subscribers) {
        user += `
     <div class="blog-ancient">
        <div class="right">
            <div class="blog-discription">
                <h3>email: ${r.email}</h3>
                <p>Subscribed: ${r.time}</p>
            </div>
            <div class="btns">
        <input type="button" value="Delete" class="delete" id="${r._id}" onClick='delete_user(this.id)'>
            </div>
        </div> 
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

    fetch(`https://mybrand-backend-api.herokuapp.com/blogs/subscribe/${key}`, fetchData)
        .then((response) => {
            return response.json()
        }).then((data) => {
            // show alert
            document.querySelector('.alert').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alert').style.display = 'none';
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