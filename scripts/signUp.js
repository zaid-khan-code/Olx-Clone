// FireBase here
const auth = firebase.auth();
const db = firebase.firestore();

// All ellements 

const form = document.getElementById('signupForm');
const nameEl = document.querySelector('.nameElement');
const emailEl = document.querySelector('.emailElement');
const numberEl = document.querySelector('.numberElement');
const passwordEl = document.querySelector('.passwordElement');
const confirmEl = document.querySelector('.confirmPasswordElement');
const agreeEl = document.getElementById('agree');
const messageEl = document.getElementById('message');


// All Elements Value



form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop actual form submission

    // basic validations
    if (!nameEl.value.trim()) return showError('Please enter your full name');
    if (!emailEl.value.trim()) return showError('Please enter your email');
    if (!numberEl.value.trim()) return showError('Please enter your phone number');
    if (!passwordEl.value.trim()) return showError('Please enter a password');
    if (passwordEl.value.length < 6) return showError('Password must be at least 6 characters');
    if (confirmEl.value !== passwordEl.value) return showError('Passwords do not match');
    if (!agreeEl.checked) return showError('Please agree to the terms before continuing');

    // if all valid
    messageEl.style.color = 'green';
    messageEl.textContent = 'All fields valid! Submitting...';

    // here you can call Firebase or submit the form
    signUp()


});
// Event Listener
function signUp() {
    auth.createUserWithEmailAndPassword(emailEl.value, passwordEl.value)
        .then((userCredential) => {
            // user info save        
            let userPassword = passwordEl.value;
            let userName = nameEl.value;
            let userNumber = numberEl.value;
            let userEmail = emailEl.value;

            console.log(auth.currentUser.uid);
            db.collection("User Info").doc(`${auth.currentUser.uid}`).set({
                name: nameEl.value,
                email: emailEl.value,
                number:numberEl.value,
                password:passwordEl.value,

            })
                .then((res) => {
                    console.log("Document successfully written!" + res);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            // Sign In 
            var user = userCredential.user;
            console.log(`create user Sussecfully`);
            messageEl.innerHTML = `Account Created Sussecfully`;
            messageEl.style.color = "green"
            window.location.href = "./login.html";
            
        })
        .catch((error) => {

            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            if (errorCode === "auth/invalid-email") {
                messageEl.innerHTML = "Please enter a valid email.";
                messageEl.style.color = "red";
            } else if (errorCode === "auth/user-disabled") {
                messageEl.innerHTML = "This account has been disabled.";
                messageEl.style.color = "red";
            } else if (errorCode === "auth/user-not-found") {
                messageEl.innerHTML = "No account found. Please sign up first.";
                messageEl.style.color = "red";
            } else if (errorCode === "auth/wrong-password") {
                messageEl.innerHTML = "Incorrect password. Try again.";
                messageEl.style.color = "red";
            } else if (errorCode === "auth/too-many-requests") {
                messageEl.innerHTML = "Too many attempts. Please wait a bit.";
                messageEl.style.color = "red";
            } else if (errorCode === "auth/network-request-failed") {
                messageEl.innerHTML = "Network error. Please check your connection.";
                messageEl.style.color = "red";
            } else if (errorCode === "auth/missing-password") {
                messageEl.innerHTML = "Please enter Password.";
                messageEl.style.color = "red";
            } else if (errorCode === "auth/weak-password") {
                messageEl.innerHTML = "Please enter a Strong Password.";
                messageEl.style.color = "red";
            } else {
                messageEl.innerHTML = "Something went wrong. Please try again.";
                messageEl.style.color = "red";
            }
        });

}

function showError(message) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.color = 'red';
    } else {
        alert(message); // fallback if the message element doesn’t exist
    }
}