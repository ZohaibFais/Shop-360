function register() {
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var registeremail = document.getElementById('registeremail');
    var number = document.getElementById('number');
    var country = document.getElementById('country');
    var city = document.getElementById('city');
    var registerPassword = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    if (!firstname.value || !lastname.value || !registeremail.value || !number.value || !country.value || !city.value || !registerPassword.value || !confirmPassword.value) {
        alert("Please fill all the fields");
    }
    else if (!registeremail.value.match((/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))) {
        alert("Please enter a valid email");
    }
    else if (!(registerPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) ||
        !(confirmPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))) {
        alert("Password is not up to the criteria");
    }
    else if (registerPassword.value !== confirmPassword.value) {
        alert("Password does not match");
    }
    else {
        var registersData = JSON.parse(localStorage.getItem('Data')) || [];
        if (!Array.isArray(registersData)) {
            registersData = [];
        }

        var alreadylogin = registersData.find(function(user) {
            return user.registeremail == registeremail.value
        }); 
        
        if(alreadylogin){
            alert("Email is already register")
        }
        else{
            var registerData = {
                firstname: firstname.value,
                lastname: lastname.value,
                registeremail: registeremail.value,
                number: number.value,
                country: country.value,
                city: city.value,
                registerPassword: registerPassword.value
            };
    
            registersData.push(registerData);
    
            localStorage.setItem('Data', JSON.stringify(registersData));
    
            firstname.value = "";
            lastname.value = "";
            registeremail.value = "";
            number.value = "";
            country.value = "";
            city.value = "";
            registerPassword.value = "";
            confirmPassword.value = "";
    
            alert("Your account has been successfully registered");
            window.location.href = "http://127.0.0.1:5500/login.html"
        }
        }

      
}

function hideButtons() {
    var signupButton = document.getElementById('signupButton');
    var loginButton = document.getElementById('loginButton');
    if (signupButton) {
        signupButton.style.display = 'none';
    }
    if (loginButton) {
        loginButton.style.display = 'none';
    }
}

if (window.location.href.includes("login.html")) {
    function login() {
        var loginemail = document.getElementById('loginemail').value;
        var loginpassword = document.getElementById('loginpassword').value;

        var registersData = JSON.parse(localStorage.getItem('Data')) || [];

        if (!Array.isArray(registersData)) {
            registersData = [];
        }

        var loggedinuser = registersData.find(function(user) {
            return user.registeremail === loginemail && user.registerPassword === loginpassword;
        });

        if (loginemail === "" || loginpassword === "") {
            alert("Empty form");
        } else if (loggedinuser) {
            alert("Successfully logged in");
            localStorage.setItem('LoggedInUser', JSON.stringify(loggedinuser));
            localStorage.setItem('IsLoggedIn', true); 

            window.location.href = "http://127.0.0.1:5500/home.html";
        } else {
            alert("Invalid email or password");
        }
    }
} else {
    var isLoggedIn = localStorage.getItem('IsLoggedIn');
    if (isLoggedIn) {
        hideButtons();
    }
}



function redirect1(){
    window.location.href = "http://127.0.0.1:5500/register.html"
}


function redirect2(){
    window.location.href = "http://127.0.0.1:5500/login.html"
}