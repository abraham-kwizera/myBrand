  // field declarations 
  const userId = document.getElementById('userId')
  const firstName = document.getElementById('firstName')
  const lastName = document.getElementById('lastName')
  const userName = document.getElementById('userName')
  const email = document.getElementById('email')
  const role = document.getElementById('role')
      // const blogImage = document.getElementById('blogImage')
      //   const blogBody = document.getElementById('blogBody')
      // const resetForm = document.getElementById('resetForm')
  const updateUserForm = document.getElementById('updateUserForm')

  let user = JSON.parse(localStorage.getItem('user'))
  let userToken = user.token;
  console.log(userToken);
  // get blog id from URL
  const user_id = location.href.split('?=')[1];
  // api url
  const api_url = `https://mybrand-backend-api.herokuapp.com/users/${user_id}`;
  console.log(api_url);
  // Defining async function
  async function getapi(url) {
      // location.href = `./admin/singleBlogAdmin.html`;
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
      userId.innerHTML = data.data.user._id;
      firstName.value = data.data.user.firstName;
      lastName.value = data.data.user.lastName;
      userName.value = data.data.user.userName;
      email.value = data.data.user.email;
      role.value = data.data.user.role;

      updateUserForm.addEventListener('submit', async(e) => {
          e.preventDefault();
          try {
              const fd = new FormData();
              fd.append('firstName', firstName.value);
              fd.append('lastName', lastName.value);
              fd.append('userName', userName.value);
              fd.append('email', email.value);
              fd.append('role', role.value);
              const res = await fetch(api_url, {
                  method: 'PATCH',
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
      userId.innerHTML = ''
      firstName.value = ''
      lastName.value = ''
      userName.value = ''
      email.value = ''
      location.href = '/admin/allUsers.html';
  }