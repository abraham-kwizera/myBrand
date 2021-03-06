function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}

// firebase 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUjGTYBTk3js4Hwp7AFxsyHs_0AqV3jWU",
    authDomain: "my-brand-d03cc.firebaseapp.com",
    databaseURL: "https://my-brand-d03cc-default-rtdb.firebaseio.com",
    projectId: "my-brand-d03cc",
    storageBucket: "my-brand-d03cc.appspot.com",
    messagingSenderId: "151739858374",
    appId: "1:151739858374:web:5e70e989b5b9ff75a6c6c7",
    measurementId: "G-MW1QKJNYZ4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// initialize variables 
const auth = firebase.auth();
const database = firebase.database();

// setup register
function register() {
    // get all inputs fields
    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    userName = document.getElementById('userName').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    confirmPassword = document.getElementById('confirmPassword').value;

    // validate input fields    
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Please enter a valid email or Password.');
        return
        // stops running 
    }
    if (validate_field(firstName) == false || validate_field(lastName) == false || validate_field(userName) == false) {
        alert('One or more extra fields fault.');
        // stops running 
        return
    }

    // move in auth 
    auth.createUserWithEmailAndPassword(email, password).then(function() {
        var user = auth.currentUser;
        //  add user to database
        var database_ref = database.ref();

        // create user data
        var user_data = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            lastLogin: Date.now()
        }
        database_ref.child('users/' + user.uid).set(user_data);
        alert('Registered successfully.');
        window.location.href = 'http://localhost:5500/login.html';

    }).catch(function(error) {
        // firebase error
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + "" + errorMessage)
    });

}

// Validation functions
// validate email
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        //    email is valid
        return true;
    } else {
        // email is not valid 
        return false;
    }
}

// password validation 
function validate_password(password) {
    // Firebase accepts only lengths greater than 6
    if (password.length < 6) {
        return false;
    }
}

// validate fields 
function validate_field(field) {
    if (field == null) {
        return false;
    }
    if (field.length <= 0) {
        return false;
    } else {
        return true;
    }
}