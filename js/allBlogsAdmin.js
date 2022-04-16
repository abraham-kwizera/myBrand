// api url
const api_url = "https://mybrand-backend-api.herokuapp.com/blogs";

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

// Function to hide the loader
// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// }
// Function to define innerHTML for HTML table

function fetchAllPosts(data) {
    let post = `<h1><u> All Blog Posts </u></h1>
    <br> 
    <i>Note: Once click on delete it is deleted</i>
    `
        // Loop to access all rows
    for (let r of data.data.posts) {
        post += `
     <div class="blog-ancient">
        <div class="left">
            <img src="/images/unsplash_pJGA1LYp_lc.png" alt="Wallpaper">
        </div>
        <div class="right">
            <div class="blog-discription">
                <h3>Title: ${r.title}</h3>
                <p>Date: ${r.time}</p>
            </div>
            <div class="btns">
     <a href='../admin/singleBlogAdmin.html?=${r._id}'>  <input type="button" value="Read" id='${r._id}' onClick="getapi()"> </a>
     <a href='../admin/updateBlog.html?=${r._id}'>  <input type="button" value="Update" id="update"> </a>
        <input type="button" value="Delete" class="delete" id='${r._id}' onClick="delete_query(this.id)">

            </div>
        </div> 

    </div> 
    <div class="alert">Deleted post successfully</div>
    <div class="alertError">Error in deleting post, Try again...</div>
`;
    }

    // Setting innerHTML as post variable
    document.getElementById("blogs").innerHTML = post;
}

// delete Blog Query
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

    fetch(`https://mybrand-backend-api.herokuapp.com/blogs/${blogId}`, fetchData)
        .then((response) => {
            return response.json()

        }).then((data) => {
            // show alert
            document.querySelector('.alert').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alert').style.display = 'none';
                contactsMessage.reset();
                message.value = '';
            }, 5000);
        }).catch(() => {
            // show alert
            document.querySelector('.alertError').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alertError').style.display = 'none';
            }, 5000);

        })
}