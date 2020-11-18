function validation () {
    var name = document.getElementById("name").nodeValue;
    var subject = document.getElementById("subject").nodeValue;
    var phone = document.getElementById("phone").nodeValue;
    var email = document.getElementById("email").nodeValue;
    var message = document.getElementById("message").nodeValue;
    var error_message = document.getElementById("error_message");
    var text = "";

    error_message.style.padding = "10px";

    if(name.length < 0) {
        text = "please enter valid name";
        error_message.innerHTML = text;
        return false;
    }

    if(subject.length < 0) {
        text = "please enter correct subject";
        error_message.innerHTML = text;
        return false;
    }

    if(isNaN(phone) || phone.length !=10 ) {
        text = "please enter valid phone number";
        error_message.innerHTML = text;
        return false;
    }

    if(email.indexOf("@") == -1 || email.length < 6) {
        text = "please enter valid email";
        error_message.innerHTML = text;
        return false;
    }

    if(message.length >= 140) {
        text = "you have reached your limit";
        error_message.innerHTML = text;
        return false;
    }
    alert("form submitted sucessfully!")
    return true; 
}