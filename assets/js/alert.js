// Function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true'; // Adjust according to your login status storage
}

// Function to show notification and redirect
function showNotificationAndRedirect(message, redirectUrl) {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = 'notification error show'; // Adjust class names based on your styling
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('show'); // Hide notification after 2 seconds
    }, 2000);

    setTimeout(() => {
        window.location.href = redirectUrl; // Redirect after 2 seconds
    }, 2000);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

// Function to handle add-to-cart button clicks
function handleAddToCartClick(event) {
    if (isLoggedIn()) {
        // Proceed with adding to cart
        console.log('Item added to cart');
    } else {
        showNotificationAndRedirect('Please login to add items to the cart.', '../login.html');
    }
}


function startCheckout(button) {
    // Get product details from button attributes
    const name = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');
    const image = button.getAttribute('data-image');

    //  price is converted to the correct format if needed
    const amount = parseInt(price, 10) * 100; // Convert to smallest currency unit (e.g., cents)

    // Construct URL with query parameters
    const checkoutUrl = new URL('checkout.html', window.location.origin);
    checkoutUrl.searchParams.set('name', encodeURIComponent(name));
    checkoutUrl.searchParams.set('price', amount);
    checkoutUrl.searchParams.set('image', encodeURIComponent(image));

    // Redirect to the payment form page
    
    window.location.href = checkoutUrl.toString();
}