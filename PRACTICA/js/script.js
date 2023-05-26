let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    section.forEach(sec =>{

        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if(top => offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
            });
        };

    });
}

document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
  });

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    loop:true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
  });

// Function to add an item to the cart
function addToCart(name, price) {
    // Retrieve the cart items from localStorage or initialize an empty array
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the item already exists in the cart
    var existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        // If the item exists, update its quantity
        existingItem.quantity += 1;
    } else {
        // If the item doesn't exist, add it to the cart
        var newItem = {
            name: name,
            price: price,
            quantity: 1
        };
        cartItems.push(newItem);
    }

    // Save the updated cart items back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Refresh the page to update the cart display
    location.reload();
}

function displayCart() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    var cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear previous cart items

    var totalPrice = 0;

    cartItems.forEach(item => {
        var itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        var itemName = document.createElement('h3');
        itemName.textContent = item.name + " x" + item.quantity;

        var itemTotalPrice = document.createElement('h4');
        itemTotalPrice.textContent = 'Total: ' + itemTotal.toFixed(2) + ' MDL';

        cartItem.appendChild(itemName);
        cartItem.appendChild(itemTotalPrice);

        cartContainer.appendChild(cartItem);
    });

    var cartTotal = document.getElementById('cart-total');
    cartTotal.innerHTML = ''; // Clear previous total
    var totalHeading = document.createElement('h3');
    totalHeading.textContent = 'Total Price: ' + totalPrice.toFixed(2) + ' MDL';
    cartTotal.appendChild(totalHeading);
}