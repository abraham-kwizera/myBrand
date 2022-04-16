const contactsMessage = document.getElementById("contactsMessage")

contactsMessage.addEventListener('submit', e => {
    e.preventDefault();
    sendMessage();
})
async function sendMessage() {

    const name = document.getElementById("names").value
    const email = document.getElementById("email").value
    const location = document.getElementById("location").value
    const message = document.getElementById("message").value

    // const url = 'http:127.0.0.1:3000/contactsMessage'
    // post body data 
    const newMessage = {
        name: name,
        email: email,
        location: location,
        message: message
    };

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(newMessage),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
        })
    }

    fetch(`https://mybrand-backend-api.herokuapp.com/contactsMessage`, fetchData)
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
        })
        .catch((error) => {
            console.error(error.stack)
                // show alert
            document.querySelector('.alertError').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alertError').style.display = 'none';
                contactsMessage.reset();
                message.value = '';

            }, 5000);
        })


    // create request object
    // const request = new Request(url, {
    //     method: 'POST',
    //     body: JSON.stringify(newMessage),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // });

    // pass request object to `fetch()`
    // fetch(request).then(res => res.json()).then(data => console.log(data)).catch(error => console.log(error))


}