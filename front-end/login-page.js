function processForm() {
    var email = document.getElementById('Email Address').value;
    var password = document.getElementById('pword').value;

    if(!email || !password) {
        alert("Fields cannot be empty.")
    }

    // instead of log, do a query
    console.log("Email: " + email);
    console.log("Password: " + password);

    return false;
}

function navigateToCreateAccount() {
    alert("Create account works!");
    return false
}

function navigateToForgotPassword() {
    alert("Forgot password works!");
}