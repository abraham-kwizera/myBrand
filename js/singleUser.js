let user = JSON.parse(localStorage.getItem('user'))
let userToken = user.token;
// const user_id = window.localStorage.getItem('_id')
const user_id = location.href.split('?=')[1];
// api url
const api_url = `https://mybrand-backend-api.herokuapp.com/users/${user_id}`;

console.log(api_url);
// Defining async function
async function getapi(url) {
    // location.href = `./admin/singleBlogAdmin.html`;
    // Storing response
    const response = await fetch(url, {
        method: 'PATCH',
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
    fetchAllPosts(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// }
// Function to define innerHTML for HTML table
function fetchAllPosts(data) {
    let user = `
        <div class="latest-post" id="blog-post">
        <img src="../images/noProfile.png" alt="User Profile Picture" />
        <p class="title blog-title" id="blog-title">Names: ${data.data.user.firstName} ${data.data.user.lastName}</p>
        <p class="blog-discription"> <b>User ID:</b> ${data.data.user._id} </p> 
        <p class="blog-discription"> <b>Data Version:</b> ${data.data.user.__v} </p> 
        <p class="blog-discription"> <b>First Name:</b> ${data.data.user.firstName} </p> 
        <p class="blog-discription"> <b>Last Name:</b> ${data.data.user.lastName} </p>
        <p class="blog-discription"> <b>User Name:</b> ${data.data.user.userName} </p>
        <p class="blog-discription"> <b>User Email:</b> ${data.data.user.email} </p>
        <p class="blog-discription"> <b>Password:</b> ${data.data.user.password} </p>
        <p class="blog-discription"> <b>User Role:</b> ${data.data.user.role} </p>

    </div> 
`;
    // }
    // Setting innerHTML as post variable
    document.getElementById("singleBlog").innerHTML = user;
}