 const commentForm = document.getElementById("commentForm");

 const pageTitle = document.getElementById('pageTitle');
 // const blog_id = window.localStorage.getItem('_id')
 const blog_id = location.href.split('?=')[1];
 // api url
 const api_url = `https://mybrand-backend-api.herokuapp.com/blogs/${blog_id}`;

 console.log(api_url);
 // Defining async function
 async function getapi(url) {
     // location.href = `./admin/singleBlogAdmin.html`;
     // Storing response
     const response = await fetch(url);

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
     pageTitle.innerHTML = `More About: ${data.data.title}`
     let post = `
        <div class="latest-post" id="blog-post">
        <img src="../images/unsplash_8yTyCF4epts.png" alt="Blog Wallpaper" />
        <p class="title blog-title" id="blog-title">Title: ${data.data.title}</p>
        <p class="blog-discription">
            ${data.data.body}
        </p>

        <!-- like comment and share buttons section  -->
        <div class="blog-buttons">
            <!-- like  -->
            <div class="button">
            <img src="../images/icons/ant-design_like-outlined.png" alt=""> ${data.data.likes}
            </div>

            <!-- Comment -->
            <div class="button">
                <img src="../images/icons/fluent_comment-28-regular.png" alt=""> ${data.data.commentsCount}
            </div>
            <!-- visited -->
            <div class="button">
                <p>Views ${data.data.views} </p> 
            </div>
        </div>
        <!-- end of like comment and share buttons section -->
        <!-- comment section -->
                <div class="blog-comment form">
                    <h3>Your Comment:</h3>
                    <form id="commentForm">
                        <textarea id="userComment"></textarea>
                        <input type="button" value="Send" id='${data.data._id}' onClick="comment(this.id)"><br>
                    </form>
                    <div class="alert">Your comment has been successfully sent!</div>
                    <div class="alertError">Comment not sent please, Login first! </div>
                    <div class="comments">
                        <div class="comment" id="comment">
                        </div>
                    </div>
                </div>
    </div> 
`;

     // Setting innerHTML as post variable
     document.getElementById("singleBlog").innerHTML = post;

 }

 // get token 
 let user = JSON.parse(localStorage.getItem('user'))
 let userToken = user.token;
 let userName = user.userName
 let email = user.email
     // commenting 
 let comment = async(id) => {
     if (!user) {
         // show alert
         document.querySelector('.alertError').style.display = 'block';

         //Hide alert after 5 seconds
         setTimeout(function() {
             document.querySelector('.alertError').style.display = 'none';
             userComment.value = '';
         }, 5000);
     } else {


         let userComment = document.getElementById("userComment").value

         let data = {
             name: userName,
             email: email,
             message: userComment
         }
         let fetchData = {
             method: 'POST',
             body: JSON.stringify(data),
             headers: new Headers({
                 'Content-Type': 'application/json; charset=UTF-8',
                 'Authorization': `Bearer ${userToken}`
             })
         }
         fetch(`https://mybrand-backend-api.herokuapp.com/blogs/${id}/comment`, fetchData)
             .then((response) => {
                 return response.json()
             }).then((data) => {
                 //  console.log("api data: ", data)
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
 }