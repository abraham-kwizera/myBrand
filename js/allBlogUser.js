// const latestBlog = document.getElementById('blogTitle')
// const blogTitle = document.getElementById('blogTitle')
// const blogDiscription = document.getElementById('blogDiscription')
// api url
const api_url = "https://mybrand-backend-api.herokuapp.com/blogs";

// Defining async function
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    // if (response) {
    //     hideloader();
    // }
    fetchAllPosts(data);
    fetchLatestBlog(data)
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// }

// Function to define innerHTML for HTML table
// latest blog
function fetchLatestBlog(data) {

    let latest = data.data.posts[0]
    window.localStorage.setItem('latest', JSON.stringify(latest))
    let latestBlog = `
    <h2>Latest Blog Post</h2>
                <img src="./images/unsplash_8yTyCF4epts.png" alt="Blog Wallpaper" />
                <p class="title blog-title" >${latest.title}</p>
                <p class="blog-discription" > ${latest.body}</p> <br>
                <p class="blog-discription" >Published on ${latest.time}</p> 
                <!-- like comment and share buttons section  -->
                <div class="blog-buttons">
                    <!-- like  -->
                    <div class="button">
                        <p>Like</p> <img src="./images/icons/ant-design_like-outlined.png" alt=""> ${latest.likes}
                    </div>
                    <!-- visited -->
                    <div class="button">
                        <p>Views ${latest.views} </p> 
                    </div>
                    <!-- visited -->
                    <div class="button">
                        <p>Commented ${latest.commentsCount} </p> 
                    </div>
                </div>
                <!-- end of like comment and share buttons section -->
                <!-- comment section -->
                <!--<div class="blog-comment form">
                    <h3>Your Comment:</h3>
                    <form id="commentForm">
                        <textarea name="comment" id="userComment"></textarea>
                        <input type="submit" value="Send" id="send"><br>
                    </form>
                    <div class="alert">Your comment has been successfully sent!</div>
                    <div class="alertError">Comment not sent please, Login first! </div>
                    <div class="comments">
                        <div class="comment" id="comment">
                        </div>
                    </div>-->
                </div>
    `;
    document.getElementById('latestBlog').innerHTML = latestBlog;
}


// recommendations
function fetchAllPosts(data) {
    let post = `<h1><u> Recommendations </u></h1>`

    // Loop to access all rows
    for (let r of data.data.posts) {
        post += `
     <div class="blog-ancient">
     <img src="./images/unsplash_3EkT6xb4K9w.png" alt="Wallpaper" class="right">
        <div class="left">
            <div class="blog-discription">
                <h3>${r.title}</h3>
                <p>Published: ${r.time}</p>
            </div>
            <div class="blog-buttons">
     <a href='../singleBlogUser.html?=${r._id}'> <div class="button readMore"> <p>Read More</p></div> </a>
            </div>
        </div> 
    </div> 
`;


    }

    // Setting innerHTML as post variable
    document.getElementById("blog-ancient").innerHTML = post;
}

// const comment = (id) => {
//     let userComment = document.getElementById("blogBody").value
//     const user = JSON.parse(window.localStorage.getItem('user'))

//     let data = {
//         title: blogTitle,
//         body: blogBody,

//     }
//     let fetchData = {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: new Headers({
//             'Content-Type': 'application/json; charset=UTF-8',
//             'Authorization': `Bearer ${user.token}`
//         })
//     }
//     fetch(`https://mybrand-backend-api.herokuapp.com/blogs`, fetchData)
//         .then((response) => {
//             return response.json()
//         }).then((data) => {
//             // show alert
//             document.querySelector('.alert').style.display = 'block';

//             //Hide alert after 5 seconds
//             setTimeout(function() {
//                 document.querySelector('.alert').style.display = 'none';
//                 addNewPost.reset();
//                 blogBody.value = '';
//             }, 5000);
//         })
//         .catch(() => {
//             // show alert
//             document.querySelector('.alertError').style.display = 'block';

//             //Hide alert after 5 seconds
//             setTimeout(function() {
//                 document.querySelector('.alertError').style.display = 'none';
//             }, 5000);
//         })
// }