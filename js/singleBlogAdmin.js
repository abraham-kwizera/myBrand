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
            <!-- views -->
            <div class="button">
                <p>Visited: </p> ${data.data.views}
            </div>
        </div>
        <!-- end of like comment and share buttons section -->
        <!-- comment section -->
        <div class="blog-comment form">
            <h3>All Comments:</h3>
            <div class="alert">Your comment has been successfully sent!</div>
            <div class="comments">
                <div class="comment" id="comment">
                <p> ${data.data.comments.name} Said  ${data.data.comments.message} 
                </div>
            </div>
        </div>
    </div> 
`;
        // }
        // Setting innerHTML as post variable
        document.getElementById("singleBlog").innerHTML = post;
    }