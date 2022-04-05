  // field declarations 
  const blogId = document.getElementById('blogId')

  let user = JSON.parse(localStorage.getItem('user'))
  let userToken = user.token;
  let latest = JSON.parse(localStorage.getItem('latest'))
  console.log(userToken);
  // get blog id from URL
  const blog_id = latest._id || location.href.split('?=')[1];
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

      like.addEventListener('click', async(e) => {
          e.preventDefault();
          try {
              const fd = new FormData();
              fd.append('likes', like.value);
              const res = await fetch(api_url, {
                  method: 'PUT',
                  headers: {
                      'Authorization': `Bearer ${userToken}`
                  },
                  body: fd,
              }, );
              const updates = await res.json();
              console.log(updates)
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