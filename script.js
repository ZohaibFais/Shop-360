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

    var id = '_' + Math.random().toString().substring(2, 10);

    var loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    var loggedInEmail = loggedInUser.registeremail;

    // Get current timestamp
    var timestamp = new Date().getTime();

    var productData = {
        id: id,
        createdBy: loggedInEmail,
        createdAt: timestamp,
        productName: productName,
        category: category,
        aboutProduct: aboutProduct,
        quantity: quantity,
        price: price,
        description: description
    };

    var reader = new FileReader();
    reader.onload = function(event) {
        var base64Image = event.target.result;
        productData.image = base64Image; 
        var products = JSON.parse(localStorage.getItem('products')) || [];

        products.push(productData);

        localStorage.setItem('products', JSON.stringify(products));

        productNameInput.value = "";
        categoryInput.value = "";
        aboutProductInput.value = "";
        quantityInput.value = "";
        priceInput.value = "";
        descriptionInput.value = "";
        fileInput.value = "";

        alert("Successfully added");
    };
    reader.readAsDataURL(file);
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

function redirect6(){
    window.location.href = "http://127.0.0.1:5500/allprdoucts.html"  // All product
}

function remove(){
    var confirmation = confirm("Are you sure you want to delete this product . This action can not be undone?");
                if (confirmation) {
                    removeProduct(console,productBox);
                }
}


document.addEventListener("DOMContentLoaded", function() {
  
    if (window.location.pathname.includes('myproduct.html')) {

        var loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
        var loggedInEmail = loggedInUser.registeremail;

        var products = JSON.parse(localStorage.getItem('products')) || [];

        var productsContainer = document.querySelector('.products');

        productsContainer.innerHTML = '';

        function removeProduct(product, productBox) {
            var index = products.indexOf(product);
            if (index !== -1) {
                products.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(products));
                productBox.remove(); 
            } else {
                console.error("Product not found in local storage.");
            }
        }

        var userProducts = products.filter(function(product) {
            return product.loggedInEmail === loggedInEmail;
        });

        userProducts.forEach(function(product) {
            var productBox = document.createElement('div');
            productBox.classList.add('console'); 
            var imageContainer = document.createElement('div');
            imageContainer.classList.add('image');
            var image = document.createElement('img');
            image.src = product.image; 
            image.alt = product.productName; 
            imageContainer.appendChild(image); 

            var detail = document.createElement('div');
            detail.classList.add('detail');

            var editButton = document.createElement('button');
            editButton.classList.add('edit'); 
            editButton.id = 'edit'; 
            editButton.innerHTML = '<img src="/assets/edit.png" alt="Edit">'; 
        
            var trashButton = document.createElement('button');
            trashButton.classList.add('trash'); 
            trashButton.id = 'trash'; 
            trashButton.innerHTML = '<img src="/assets/trash.png" alt="Trash">'; 

            trashButton.addEventListener('click', function() {
                var confirmation = confirm("Are you sure you want to remove the product?");
                if (confirmation) {
                    removeProduct(product, productBox);
                }
            });

        
            detail.appendChild(editButton);
            detail.appendChild(trashButton);

            productBox.appendChild(imageContainer);
            productBox.appendChild(detail);

            var productName = document.createElement('div');
            productName.classList.add('prname'); 
            productName.textContent = product.productName; 

            var category = document.createElement('div');
            category.classList.add('category'); 
            category.textContent = product.category; 

            var price = document.createElement('div');
            price.classList.add('price'); 
            price.textContent = 'Rs. ' + product.price; 

          
            productBox.appendChild(productName);
            productBox.appendChild(category);
            productBox.appendChild(price);

            
            productsContainer.appendChild(productBox);
        });
    }
});
