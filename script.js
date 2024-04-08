function register() { //register
    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let registeremail = document.getElementById('registeremail');
    let number = document.getElementById('number');
    let country = document.getElementById('country');
    let city = document.getElementById('city');
    let registerPassword = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');

    if (!firstname.value || !lastname.value || !registeremail.value || !number.value || !country.value || !city.value || !registerPassword.value || !confirmPassword.value) {
        alert("Please fill all the fields");
    } else if (!registeremail.value.match((/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))) {
        alert("Please enter a valid email");
    } else if (!(registerPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) ||
        !(confirmPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))) {
        alert("Password is not up to the criteria");
    } else if (registerPassword.value !== confirmPassword.value) {
        alert("Password does not match");
    } else {
        let registersData = JSON.parse(localStorage.getItem('RegisterUser')) || [];

        let alreadyLogin = registersData.find(function(user) {
            return user.registeremail === registeremail.value;
        });

        if (alreadyLogin) {
            alert("Email is already registered");
        } else {
            let registerData = {
                firstname: firstname.value,
                lastname: lastname.value,
                registeremail: registeremail.value,
                number: number.value,
                country: country.value,
                city: city.value,
                registerPassword: registerPassword.value
            };

            registersData.push(registerData);

            localStorage.setItem('RegisterUser', JSON.stringify(registersData));

            firstname.value = "";
            lastname.value = "";
            registeremail.value = "";
            number.value = "";
            country.value = "";
            city.value = "";
            registerPassword.value = "";
            confirmPassword.value = "";

            alert("Your account has been successfully registered");
            window.location.href = "http://127.0.0.1:5500/login.html";
        }
    }
}

function hideButtons() {   //hide of sign up and login
    let signupButton = document.getElementById('signupButton');
    let loginButton = document.getElementById('loginButton');
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
    // localStorage.removeItem('products')
    window.location.href = "http://127.0.0.1:5500/login.html"; 
    localStorage.removeItem('ContactUser');
}

if (window.location.href.includes("login.html")) {
    // Only define the login function if on the login page
    function login() {
        let loginemail = document.getElementById('loginemail').value;
        let loginpassword = document.getElementById('loginpassword').value;

        let registersData = JSON.parse(localStorage.getItem('RegisterUser')) || [];

        if (!Array.isArray(registersData)) {
            registersData = [];
        }

        let loggedInUser = registersData.find(function(user) {
            return user.registeremail === loginemail && user.registerPassword === loginpassword;
        });

        if (loginemail === "" || loginpassword === "") {
            alert("Empty form");
        } else if (loggedInUser) {
            alert("Successfully logged in");
            localStorage.setItem('LoggedInUser', JSON.stringify(loggedInUser));
            localStorage.setItem('IsLoggedIn', true); 

            window.location.href = "http://127.0.0.1:5500/home.html";
        } else {
            alert("Invalid email or password");
        }
    }
} else {
    // Hide buttons if user is already logged in
    let isLoggedIn = localStorage.getItem('IsLoggedIn');
    if (isLoggedIn) {
        hideButtons();
    }
}

let dropdownIcon = document.getElementById('dropdownIcon');     //dropdown
let dropdownContent = document.getElementById('dropdownContent');

dropdownIcon.addEventListener('click', function() {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

let options = document.querySelectorAll('.option');
options.forEach(function(option) {
    option.addEventListener('click', function() {
        let value = this.getAttribute('data-value');
        
        if (value === 'profile') {
          
        } else if (value === 'logout') {
            logout(); 
        }
        dropdownContent.style.display = 'none';
    });
});

function add() {
    let productNameInput = document.querySelector('.productName input');
    let categoryInput = document.querySelector('.category select');
    let aboutProductInput = document.getElementById('about');
    let quantityInput = document.querySelector('.quantity input');
    let priceInput = document.querySelector('.price input');
    let descriptionInput = document.getElementById('descriptioninput');
    let fileInput = document.getElementById('fileinput');

    let productName = productNameInput.value.trim();
    let category = categoryInput.value.trim();
    let aboutProduct = aboutProductInput.value.trim();
    let quantity = quantityInput.value.trim();
    let price = priceInput.value.trim();
    let description = descriptionInput.value.trim();
    let file = fileInput.files[0]; 

    if (!productName || !category || !aboutProduct || !quantity || !price || !description || !file) {
        alert("Please fill in all fields");
        return;
    }

    let id = '_' + Math.random().toString().substring(2, 10);

    let loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    let loggedInEmail = loggedInUser.registeremail;

    // Get current timestamp
    let timestamp = new Date().getTime();

    let productData = {
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

    let reader = new FileReader();
    reader.onload = function(event) {
        let base64Image = event.target.result;
        productData.image = base64Image; 
        let products = JSON.parse(localStorage.getItem('products')) || [];

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
function remove() {    //remove product 
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    let confirmation = confirm("Are you sure you want to delete this product? This action cannot be undone.");
    if (confirmation) {
        // Remove the product from Local Storage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let updatedProducts = products.filter(item => item.id !== productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        // Redirect to myproduct.html
        window.location.href = "http://127.0.0.1:5500/myproduct.html";

        // Optionally, you can also remove the product from the screen
        let productBox = document.getElementById(productId);
        if (productBox) {
            productBox.remove();
        } else {
            // console.error('Product box not found.');
        }
    }
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

function redirect7(){
    window.location.href = "http://127.0.0.1:5500/controller.html"  // Controller page
}

function redirect8(){
    window.location.href = "http://127.0.0.1:5500/led.html"  // LED page
}

function redirect9(){
    window.location.href = "http://127.0.0.1:5500/chair.html"  // Chair page
}

function redirect10(){
    window.location.href = "http://127.0.0.1:5500/pot.html"  //pot page
}

function redirect11(){
    window.location.href = "http://127.0.0.1:5500/profile.html"   //profile Setting
}
function redirect12(){
    window.location.href = "http://127.0.0.1:5500/contact.html"  //contact page
}

// myproductshow

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes('myproduct.html')) {
        let loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
        let loggedInEmail = loggedInUser.registeremail;
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let productsContainer = document.querySelector('.products');

        productsContainer.innerHTML = '';

        function removeProduct(product, productBox) {
            let index = products.indexOf(product);
            if (index !== -1) {
                products.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(products));
                productBox.remove();
            } else {
                // console.error("Product not found in local storage.");
            }
        }

        function redirectToEditProductPage(productId) {
            window.location.href = "http://127.0.0.1:5500/editproduct.html?id=" + productId;
        }

        let userProducts = products.filter(function(product) {
            return product.createdBy === loggedInEmail;
        });

        userProducts.forEach(function(product) {
            let productBox = document.createElement('div');
            productBox.classList.add('console');
            let imageContainer = document.createElement('div');
            imageContainer.classList.add('image');
            let image = document.createElement('img');
            image.src = product.image;
            image.alt = product.productName;
            imageContainer.appendChild(image);

            // Add click event listener to the image
            image.addEventListener('click', function() {
                redirectToProductDetailsPage(product.id); // Function to redirect
            });

            let detail = document.createElement('div');
            detail.classList.add('detail');

            let editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.id = 'edit';
            editButton.innerHTML = '<img src="/assets/edit.png" alt="Edit">';

            editButton.addEventListener('click', function() {
                redirectToEditProductPage(product.id); // Function to redirect to editproduct.html
            });

            let trashButton = document.createElement('button');
            trashButton.classList.add('trash');
            trashButton.id = 'trash';
            trashButton.innerHTML = '<img src="/assets/trash.png" alt="Trash">';

            trashButton.addEventListener('click', function() {
                let confirmation = confirm("Are you sure you want to remove the product?");
                if (confirmation) {
                    removeProduct(product, productBox);
                }
            });

            detail.appendChild(editButton);
            detail.appendChild(trashButton);

            productBox.appendChild(imageContainer);
            productBox.appendChild(detail);

            let productName = document.createElement('div');
            productName.classList.add('prname');
            productName.textContent = product.productName;

            let category = document.createElement('div');
            category.classList.add('category');
            category.textContent = product.category;

            let price = document.createElement('div');
            price.classList.add('price');
            price.textContent = 'Rs. ' + product.price;

            productBox.appendChild(productName);
            productBox.appendChild(category);
            productBox.appendChild(price);

            productsContainer.appendChild(productBox);
        });
    }
});


//////////////////// MY PRODUCT DESCRIPTION PAGE


// Function to redirect to the product details page
function redirectToProductDetailsPage(productId) {
    window.location.href = "http://127.0.0.1:5500/myprodescription.html?id=" + productId;
}


function decreaseNumber() {
    let input = document.getElementById('ordercount');
    let value = parseInt(input.value);

    if (value > 0) {
        input.value = value - 1;
    } else {
        input.value = 0; 
    }
}

function increaseNumber() {
    let input = document.getElementById('ordercount');
    let value = parseInt(input.value);

    input.value = value + 1;
}

// Myproduct description
document.addEventListener("DOMContentLoaded", function() {
    loadProductDetails();
});

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(item => item.id === productId);

        if (product) {
            document.querySelector('.htext').textContent = product.productName;
            document.querySelector('.pic').innerHTML = '<img src="' + product.image + '" alt="">';
            document.querySelector('.category').value =  product.category;
            document.querySelector('.price').innerHTML = 'Price: Rs. ' + product.price;
            document.querySelector('.shortDescription').innerText = product.aboutProduct;
            document.querySelector('.deText').innerText = product.description;
        } else {
            // console.error('Product not found.');
        }
    } else {
        // console.error('Product ID not found in URL parameter.');
    }
}

//edit button
function editProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        window.location.href = "http://127.0.0.1:5500/editproduct.html?id=" + productId;
    } else {
        // console.error('Product ID not found in URL parameter.');
    }
}

///////////////////////////////////////////////////////// END


function loadProductDetailsEditPage(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(item => item.id === productId);

    if (product) {
        document.getElementById('productName').value = product.productName;
        document.getElementById('about').value = product.aboutProduct;
        document.getElementById('quantity').value = product.quantity;
        document.getElementById('pricevalue').value = product.price;
        document.getElementById('descriptioninput').value = product.description;

        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = '';
        const categories = [...new Set(products.map(item => item.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            if (category === product.category) {
                option.selected = true;
            }
            categorySelect.appendChild(option);
        });

    } else {
        // console.error('Product with ID ' + productId + ' not found.');
    }
}


// Call the function to load product details when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log('Product ID:', productId);
    loadProductDetailsEditPage(productId);
})


