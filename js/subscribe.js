const subscribeForm = document.getElementById("subscribeForm")

subscribeForm.addEventListener('submit', e => {
    e.preventDefault();
    subscribe();
})
async function subscribe() {

    const email = document.getElementById("email").value


    // const url = 'http:127.0.0.1:3000/contactsMessage'
    // post body data 
    const newSubscriber = {
        email: email,
    };

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(newSubscriber),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
        })
    }

    fetch(`https://mybrand-backend-api.herokuapp.com/blogs/subscribe`, fetchData)
        .then((response) => {
            return response.json()
        }).then((data) => {

            console.log(data)
                // show alert
            document.querySelector('.alertSubscribe').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alertSubscribe').style.display = 'none';
                subscribeForm.reset();

            }, 5000);
        })
        .catch((error) => {
            console.error(error.stack)
                // show alert
            document.querySelector('.alertErrorSubscribe').style.display = 'block';

            //Hide alert after 5 seconds
            setTimeout(function() {
                document.querySelector('.alertErrorSubscribe').style.display = 'none';
                subscribeForm.reset();
            }, 5000);
        })

}