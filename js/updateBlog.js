  // field declarations 
  const blogId = document.getElementById('blogId')
  const blogTitle = document.getElementById('blogTitle')
      // const blogImage = document.getElementById('blogImage')
  const blogBody = document.getElementById('blogBody')
      // const resetForm = document.getElementById('resetForm')
  const updateBlogForm = document.getElementById('updateBlogForm')

  let user = JSON.parse(localStorage.getItem('user'))
  let userToken = user.token;

  console.log(userToken);
  // get blog id from URL
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
      blogId.innerHTML = data.data._id;
      blogTitle.value = data.data.title;
      // blogImage.value = data.data.imageUrl;
      blogBody.value = data.data.body;
      // postForm.title.value = post.title;
      updateBlogForm.addEventListener('submit', async(e) => {
          e.preventDefault();
          try {
              const fd = new FormData();
              fd.append('title', blogTitle.value);
              fd.append('body', blogBody.value);
              const res = await fetch(api_url, {
                  method: 'PATCH',
                  headers: {
                      'Authorization': `Bearer ${userToken}`
                  },
                  body: fd,
              }, );
              const updates = await res.json();
              console.log(updates)

              // show alert
              document.querySelector('.alert').style.display = 'block';

              //Hide alert after 5 seconds
              setTimeout(function() {
                  document.querySelector('.alert').style.display = 'none';
                  contactsMessage.reset();
                  message.value = '';
              }, 5000);
          } catch (error) {
              console.log(error);
          }
      });

  }

  function resetForm() {
      blogTitle.value = ''
      blogBody.value = ''
      location.href = '/admin/index.html';
  }