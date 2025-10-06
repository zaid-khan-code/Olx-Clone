// FireBase here
const auth = firebase.auth();


// All ellements 

const form = document.getElementById('loginForm');
const emailEl = document.querySelector('.emailElement');
const passwordEl = document.querySelector('.passwordElement');
const messageEl = document.getElementById('message');
// All Elements Value



function login(email,password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged in:', user.email);
            showMessage('Login successful!', 'green');


            console.log(auth.currentUser.uid);

            window.location.href = "./home.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);

            if (errorCode === 'auth/invalid-email') {
                showMessage('Invalid email format.');
            } else if (errorCode === 'auth/user-not-found') {
                showMessage('No account found with this email.');
            } else if (errorCode === 'auth/user-disabled') {
                showMessage('This Account is disabled. Try another Account.');
            } else if (errorCode === 'auth/wrong-password') {
                showMessage('Incorrect password. Try again.');
            } else if (errorCode === 'auth/too-many-requests') {
                showMessage('Too many attempts. Please wait a bit.');
            } else if (errorCode === 'auth/network-request-failed') {
                showMessage('Network error. Check your connection.');
            } else {
                showMessage('Something went wrong. Please try again.');
            }
        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();

    if (!email || !password) {
        showMessage('Please fill in both email and password.');
        return;
    }

    login(email, password);
});





function showMessage(message) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.color = 'red'; // always red
    } else {
        alert(message);
    }
}