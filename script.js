function register() {
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
    } else if (!registeremail.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        alert("Please enter a valid email");
    } else if (!(registerPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) || !(confirmPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))) {
        alert("Password is not up to the criteria");
    } else if (registerPassword.value !== confirmPassword.value) {
        alert("Password does not match");
    } else {
        let registersData = JSON.parse(localStorage.getItem('RegisterUser')) || [];

        // Ensure registersData is an array
        if (!Array.isArray(registersData)) {
            registersData = [];
        }

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
    window.location.href = "http://127.0.0.1:5500/login.html"; 
}
// login
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

// Assuming dropdownIcon and dropdownContent are defined elsewhere in your code
const dropdownIcon = document.getElementById('dropdownIcon');
const dropdownContent = document.getElementById('dropdownContent');

dropdownIcon.addEventListener('click', function() {
    // Toggle the display property of dropdownContent
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
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

function redirect13(){
    window.location.href = "http://127.0.0.1:5500/fav.html" // favpage
}
function redirect14(){
    window.location.href = "http://127.0.0.1:5500/cart.html"  //cart page
}


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
            document.querySelector('.category').innerHTML = product.category;
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


// Contact

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sendbutton').addEventListener('click', storeContactFormData);

    // Check if the user is logged in on page load
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (loggedInUser) {
        // Load and display contact data for the logged-in user
        loadContactData();
    }
});

function storeContactFormData() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const contactEmail = document.getElementById('email').value.trim(); // Email entered in the contact form
    const number = document.getElementById('number').value.trim();
    const message = document.getElementById('message').value.trim();

    // Check if any field is empty
    if (!firstName || !lastName || !contactEmail || !number || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Retrieve the logged-in user's email from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    let loggedInUserEmail = "";
    if (loggedInUser && loggedInUser.registeremail) {
        loggedInUserEmail = loggedInUser.registeremail;
    }

    // Create a contact object including both emails
    const contactData = {
        firstName,
        lastName,
        contactEmail, // Email entered in the contact form
        loggedInEmail: loggedInUserEmail, // Email of the logged-in user
        number,
        message
    };

    // Get existing contact data
    const existingContacts = JSON.parse(localStorage.getItem('ContactUser')) || [];

    // Add the new contact data to the array
    existingContacts.push(contactData);

    // Store the updated contact data in Local Storage
    localStorage.setItem('ContactUser', JSON.stringify(existingContacts));

    // Optionally clear the form fields after saving
    document.querySelectorAll('.userform input').forEach(input => input.value = '');

    alert("Your message has been saved!");
}

function loadContactData() {
    const contactList = document.getElementById('contactList');
    const existingContacts = JSON.parse(localStorage.getItem('ContactUser')) || [];

    // Clear the existing contact list
    contactList.innerHTML = '';

    // Display the contact data
    existingContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.textContent = `${contact.firstName} ${contact.lastName}: ${contact.email} - ${contact.number}`;
        contactList.appendChild(contactElement);
    });
}


//////////// Load User Data

document.addEventListener('DOMContentLoaded', function() {
    // Check if the current URL is the profile page
    if (window.location.href === 'http://127.0.0.1:5500/profile.html') {
        // If it is the profile page, then execute the code
        displayUserData();

        const saveButton = document.getElementById('sendbutton');
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            saveUserData();
        });
    }
});

function displayUserData() {
    const userData = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (userData) {
        document.getElementById('firstName').value = userData.firstname;
        document.getElementById('lastName').value = userData.lastname || '';
        document.getElementById('registerEmail').value = userData.registeremail || '';
        document.getElementById('number').value = userData.number || '';
        document.getElementById('country').value = userData.country || '';
        document.getElementById('city').value = userData.city || '';
        document.getElementById('password').value = userData.registerPassword || '';
        document.getElementById('confiirmPassword').value = userData.registerPassword || '';
    }
}

function saveUserData() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const number = document.getElementById('number').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const password = document.getElementById('password').value;

    // Retrieve the existing register users from localStorage
    let registerUsers = JSON.parse(localStorage.getItem('RegisterUser')) || [];

    // Find the index of the logged-in user in the register users array
    const userIndex = registerUsers.findIndex(user => user.registeremail === registerEmail);

    if (userIndex !== -1) {
        // Update the user data at the found index
        registerUsers[userIndex] = {
            firstname: firstName,
            lastname: lastName,
            registeremail: registerEmail,
            number: number,
            country: country,
            city: city,
            registerPassword: password
        };

        // Update the localStorage entry for register users
        localStorage.setItem('RegisterUser', JSON.stringify(registerUsers));

        // If there is a logged-in user, update the LoggedInUser entry as well
        const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
        if (loggedInUser && loggedInUser.registeremail === registerEmail) {
            localStorage.setItem('LoggedInUser', JSON.stringify(registerUsers[userIndex]));
        }

        alert('User data updated successfully!');
    } else {
        alert('User not found in the register list!');
    }
}


/////// END //////


// code to store products to favorites LS

document.addEventListener('DOMContentLoaded', function() {
    const favItem = document.getElementById('favitem');

    favItem.addEventListener('click', function(event) {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            handleProductWithId(productId);
        } else {
            handleProductWithoutId();
        }
    });

    function handleProductWithId(productId) {
        // Retrieve product data from localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(item => item.id === productId);
    
        if (!product) {
            alert('Product not found in localStorage!');
            return;
        }
    
        const { productName, category, price, image } = product;
    
        const favoriteProduct = {
            id: productId, // Add product ID to the favorite product object
            name: productName,
            category: category,
            price: price,
            imageUrl: image, // Assuming 'image' is the property containing the image URL
            userEmail: getUserEmail() // Get login user's email
        };

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
        const productIndex = favorites.findIndex(item => item.id === productId && item.userEmail === favoriteProduct.userEmail);
    
        if (productIndex === -1) {
            favorites.push(favoriteProduct);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Product added to favorites!');
        } else {
            alert('This product is already in your favorites.');
        }
    }
    
    
    function handleProductWithoutId() {
        const productName = document.getElementById('productname').textContent.trim();
        const category = document.querySelector('.category').textContent.trim();
        const price = document.querySelector('.price').textContent.trim();
        const imageUrl = document.querySelector('.pic img').getAttribute('src');

        if (!productName || !category || !price || !imageUrl) {
            alert('Product information not found!');
            return;
        }

        const product = {
            name: productName,
            category: category,
            price: price,
            imageUrl: imageUrl,
            userEmail: getUserEmail() // Get login user's email
        };

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const productIndex = favorites.findIndex(item => item.name === productName && item.userEmail === product.userEmail);

        if (productIndex === -1) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Product added to favorites!');
        } else {
            alert('This product is already in your favorites.');
        }
    }

    // Function to get login user's email
   
});

//get login email 
function getUserEmail() {
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    return loggedInUser ? loggedInUser.registeremail : null;
}

//display fav

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('/fav.html')) {
        const userEmail = getUserEmail();

        if (!userEmail) {
            alert('Please log in to view favorites.');
            return;
        }

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Display favorites specific to the logged-in user
        favorites = favorites.filter(product => product.userEmail === userEmail);

        // Display favorites...
        const productsContainer = document.querySelector('.products');

        productsContainer.innerHTML = '';

        favorites.forEach(function(product) {
            const priceText = product.price.includes('Rs.') ? product.price : 'Rs. ' + product.price;

            const productBox = document.createElement('div');
            productBox.classList.add('productBoxes');

            const consoleDiv = document.createElement('div');
            consoleDiv.classList.add('console');

            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image');

            const image = document.createElement('img');
            image.src = product.imageUrl; 
            image.alt = product.name; 

            image.addEventListener('click', function() {
                if (product.id) { 
                    window.location.href = 'http://127.0.0.1:5500/myproduct.html';
                } else {
                    window.location.href = 'http://127.0.0.1:5500/allprdoucts.html';
                }
            });

            imageDiv.appendChild(image);

            consoleDiv.appendChild(imageDiv);

            const detailDiv = document.createElement('div');
            detailDiv.classList.add('consoletext');

            const productNameDiv = document.createElement('div');
            productNameDiv.classList.add('textmain');
            productNameDiv.textContent = product.name;

            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('prname');
            categoryDiv.textContent = product.category;

            const priceDiv = document.createElement('div');
            priceDiv.classList.add('price');
            priceDiv.textContent = priceText; 

            detailDiv.appendChild(productNameDiv);
            detailDiv.appendChild(categoryDiv);
            detailDiv.appendChild(priceDiv);

            consoleDiv.appendChild(detailDiv);

            productBox.appendChild(consoleDiv);

            productsContainer.appendChild(productBox);
        });
    }
});


///////////FAV END 



/// CART 

function addToCart() {
    // Get the quantity from the input field
    const quantityInput = document.getElementById("ordercount").value.trim();
    const quantity = parseInt(quantityInput);

    // Check if quantity is NaN or less than or equal to 0
    if (isNaN(quantity) || quantity <= 0) {
        alert("Quantity must be a valid positive number");
        return;
    }

    // Initialize variables for productName, imageUrl, and price
    let productName = "";
    let imageUrl = "";
    let price = 0;

    // Get the current URL
    const currentURL = window.location.href;

    // Set productName, imageUrl, and price based on the current URL
    if (currentURL.includes("myprodescription.html")) {
        // If it's the product description page, get data from local storage
        const productId = (new URLSearchParams(window.location.search)).get('id');
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(item => item.id === productId);
        
        // Check if the product is found in local storage
        if (product) {
            productName = product.productName;
            imageUrl = product.image;
            price = parseFloat(product.price);
        } else {
            console.error("Product not found in local storage.");
            return;
        }
    } else if (currentURL.includes("controller")) {
        // For Controller page
        productName = document.getElementById("productname").textContent.trim();
        imageUrl = document.getElementById("productpic").src;
        price = parseFloat(document.getElementById("productprice").textContent.trim());
    } else if (currentURL.includes("led")) {
        // For LED page
        productName = document.getElementById("productname").textContent.trim();
        imageUrl = document.getElementById("productpic").src;
        price = document.getElementById("productprice").innerText
    } else if (currentURL.includes("chair")) {
        // For Chair page
        productName = document.getElementById("productname").textContent.trim();
        imageUrl = document.getElementById("productpic").src;
        price = parseFloat(document.getElementById("productprice").textContent.trim());
    } else if (currentURL.includes("pot")) {
        // For Pot page
        productName = document.getElementById("productname").textContent.trim();
        imageUrl = document.getElementById("productpic").src;
        price = parseFloat(document.getElementById("productprice").textContent.trim());
    } else {
        console.error("Unknown product page.");
        return;
    }

    // Debugging: Log the retrieved values
    console.log("ProductName:", productName);
    console.log("ImageUrl:", imageUrl);
    console.log("Price:", price);

    // Retrieve existing cart items from local storage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Create a new cart item object
    const cartItem = {
        productName: productName,
        quantity: quantity,
        price: price,
        imageUrl: imageUrl
    };

    // Push the new cart item to the existing cart items array
    existingCartItems.push(cartItem);

    // Store the updated cart items array back into local storage
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

    alert("Item added to cart successfully!");
}
