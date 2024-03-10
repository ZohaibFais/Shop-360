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
    else if (registerPassword.value != confirmPassword.value) {
        alert("Password does not match");
    }
    else {
        var registersuser = JSON.parse(localStorage.getItem('Data')) || [];

        var registerData = {
            firstname: firstname.value,
            lastname: lastname.value,
            registeremail: registeremail.value,
            number: number.value,
            country: country.value,
            city: city.value,
            registerPassword: registerPassword.value
        };

        registersuser.push(registerData);

        localStorage.setItem('Data', JSON.stringify(registersuser));

        firstname.value = "";
        lastname.value = "";
        registeremail.value = "";
        number.value = "";
        country.value = "";
        city.value = "";
        registerPassword.value = "";
        confirmPassword.value = "";

        alert("Your account has been successfully registered");
    }
}
