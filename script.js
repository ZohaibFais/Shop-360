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

function logout() {
    localStorage.removeItem('IsLoggedIn');
    localStorage.removeItem('LoggedInUser');
    window.location.href = "http://127.0.0.1:5500/login.html"; // Redirect to the login page after logout
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
}
else {
    var isLoggedIn = localStorage.getItem('IsLoggedIn');
    if (isLoggedIn) {
        hideButtons();
    }
}

var dropdownIcon = document.getElementById('dropdownIcon');
var dropdownContent = document.getElementById('dropdownContent');

dropdownIcon.addEventListener('click', function() {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

var options = document.querySelectorAll('.option');
options.forEach(function(option) {
    option.addEventListener('click', function() {
        var value = this.getAttribute('data-value');
        
        if (value === 'profile') {
          
        } else if (value === 'logout') {
            logout(); 
        }
        dropdownContent.style.display = 'none';
    });
});

function add() {
    var productNameInput = document.querySelector('.productName input');
    var categoryInput = document.querySelector('.category select');
    var aboutProductInput = document.getElementById('about');
    var quantityInput = document.querySelector('.quantity input');
    var priceInput = document.querySelector('.price input');
    var descriptionInput = document.getElementById('descriptioninput');
    var fileInput = document.getElementById('fileinput');

    var productName = productNameInput.value.trim();
    var category = categoryInput.value.trim();
    var aboutProduct = aboutProductInput.value.trim();
    var quantity = quantityInput.value.trim();
    var price = priceInput.value.trim();
    var description = descriptionInput.value.trim();
    var file = fileInput.files[0]; 

    if (!productName || !category || !aboutProduct || !quantity || !price || !description || !file) {
        alert("Please fill in all fields");
        return;
    }

    // Create a unique random ID
    var id = '_' + Math.random().toString(36).substr(2, 9);

    // Get logged-in user's email from local storage
    var loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    var loggedInEmail = loggedInUser.registeremail;

    // Get current timestamp
    var timestamp = new Date().getTime();

    var productData = {
        id: id,
        loggedInEmail: loggedInEmail,
        timestamp: timestamp,
        productName: productName,
        category: category,
        aboutProduct: aboutProduct,
        quantity: quantity,
        price: price,
        description: description
    };

    // Convert the file to base64 string
    var reader = new FileReader();
    reader.onload = function(event) {
        var base64Image = event.target.result;
        productData.image = base64Image; // Include base64 encoded image in productData object

        // Get existing products array from local storage or create a new one if it doesn't exist
        var products = JSON.parse(localStorage.getItem('products')) || [];

        // Push the new product data into the products array
        products.push(productData);

        // Store the updated products array back to local storage
        localStorage.setItem('products', JSON.stringify(products));

        // Reset form fields
        productNameInput.value = "";
        categoryInput.value = "";
        aboutProductInput.value = "";
        quantityInput.value = "";
        priceInput.value = "";
        descriptionInput.value = "";
        fileInput.value = "";

        alert("Successfully added");
    };
    reader.readAsDataURL(file); // Read the file as data URL
}


function remove(){
    alert("Are you sure you want to delete")
}

function redirect1(){
    window.location.href = "http://127.0.0.1:5500/register.html"   //register page
}

function redirect2(){
    window.location.href = "http://127.0.0.1:5500/login.html"  // login page
}
function redirect3(){
    window.location.href = "http://127.0.0.1:5500/home.html"  // home page
}
function redirect4(){
    window.location.href = "http://127.0.0.1:5500/addproduct.html" // add product
}
function redirect5(){
    window.location.href = "http://127.0.0.1:5500/myproduct.html" // My product page
}


document.addEventListener("DOMContentLoaded", function() {
    // Check if the current page is 'myproduct.html'
    if (window.location.pathname.includes('myproduct.html')) {
        // Retrieve product data from local storage
        var products = JSON.parse(localStorage.getItem('products')) || [];

        // Get the container where you want to display the products
        var productsContainer = document.querySelector('.products');

        // Clear existing product boxes
        productsContainer.innerHTML = '';

        // Iterate over each product in the products array
        products.forEach(function(product) {
            // Create a new product box element
            var productBox = document.createElement('div');
            productBox.classList.add('console'); // Apply class to style the product box

            // Create the image element
            var imageContainer = document.createElement('div');
            imageContainer.classList.add('image');
            var image = document.createElement('img');
            image.src = product.image; // Set the source of the image
            image.alt = product.productName; // Set alt attribute for accessibility
            imageContainer.appendChild(image); // Append the image to its container

            // Create the detail section (edit and trash buttons)
            var detail = document.createElement('div');
            detail.classList.add('detail');

            // Create the edit button
            var editButton = document.createElement('button');
            editButton.classList.add('edit'); // Add edit class to edit button
            editButton.id = 'edit'; // Add id for styling
            editButton.innerHTML = '<img src="/assets/edit.png" alt="Edit">'; // Set the inner HTML with the edit image

            // Create the trash button
            var trashButton = document.createElement('button');
            trashButton.classList.add('trash'); // Add trash class to delete button
            trashButton.id = 'trash'; // Add id for styling
            trashButton.innerHTML = '<img src="/assets/trash.png" alt="Trash">'; // Set the inner HTML with the trash image

            // Add event listener to delete button
            trashButton.addEventListener('click', function() {
                productBox.remove(); // Remove the product box when delete button is clicked
            });

            // Append the edit and trash buttons to the detail section
            detail.appendChild(editButton);
            detail.appendChild(trashButton);

            // Append the image and detail section to the product box
            productBox.appendChild(imageContainer);
            productBox.appendChild(detail);

            // Create elements for product details (name, category, price)
            var productName = document.createElement('div');
            productName.classList.add('prname'); // Add class for styling
            productName.textContent = product.productName; // Set product name

            var category = document.createElement('div');
            category.classList.add('category'); // Add class for styling
            category.textContent = product.category; // Set category

            var price = document.createElement('div');
            price.classList.add('price'); // Add class for styling
            price.textContent = 'Rs. ' + product.price; // Set price

            // Append product details to the product box
            productBox.appendChild(productName);
            productBox.appendChild(category);
            productBox.appendChild(price);

            // Append the product box to the products container
            productsContainer.appendChild(productBox);
        });
    }
});
