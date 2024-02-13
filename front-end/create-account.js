function processForm() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var password = document.getElementById('pword').value;
    var confirmPass = document.getElementById('confirm-pword').value;
    var email = document.getElementById('email').value;

    if(!fname || !lname || !password) {
        alert("Error: Fields cannot be empty.");
        return false;
    }

    if(!email.includes("@")) {
        alert("Error: Please enter a valid email address.");
        return false;
    }

    if(password != confirmPass) {
        alert("Error: Passwords do not match.");
        return false;
    }

    // TO DO: instead of log, add a new entry to the database
    console.log("Fname: " + fname);
    console.log("Lname: " + lname);
    console.log("Password: " + password);
    console.log("ConfirmPass: " + confirmPass);
    console.log("Email: " + email);

    return false;
}