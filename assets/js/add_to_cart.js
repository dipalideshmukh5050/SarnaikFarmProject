document.addEventListener('DOMContentLoaded', () => {
    let cart = {};

    // Function to add an item to the cart
    function addToCart(button) {
        const itemId = button.id.split('-').pop(); // Extract itemId from button id
        const itemElement = document.getElementById(`crop-item-${itemId}`);
        
        if (!itemElement) {
            console.error(`Item element with ID crop-item-${itemId} not found.`);
            return;
        }

        const itemName = itemElement.querySelector('.crop-title').innerText;
        const itemPrice = parseFloat(itemElement.querySelector('.crop-price').innerText.replace('Price: ₹', ''));
        const itemImage = itemElement.querySelector('.crop-image').src;

        // Check if the item already exists in the cart
        if (cart[itemId]) {
            cart[itemId].quantity += 1;
        } else {
            // Add new item to the cart
            cart[itemId] = {
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1,
                totalPrice: itemPrice // Initialize total price
            };
        }

        updateCart();
        openCartSidebar(); // Open sidebar after adding product
    }

    // Function to update the cart UI
    function updateCart() {
        const cartItems = document.getElementById('cartSidebarItems');
        const cartEmptyMessage = document.getElementById('cartEmptyMessage');

        if (!cartItems || !cartEmptyMessage) {
            console.error('Cart elements not found.');
            return;
        }

        cartItems.innerHTML = '';

        if (Object.keys(cart).length === 0) {
            cartEmptyMessage.style.display = 'block';
        } else {
            cartEmptyMessage.style.display = 'none';

            for (const [id, item] of Object.entries(cart)) {
                const cartItem = document.createElement('li');
                cartItem.classList.add('cart-item');

                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">Price: ₹${item.price}</p>
                        <p class="cart-item-total-price">Total: ₹${item.totalPrice}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity('${id}', -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${id}', 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${id}')">Remove</button>
                    </div>
                `;

                cartItems.appendChild(cartItem);
            }
        }
    }

    // Function to update the quantity of an item and its total price
    window.updateQuantity = function(itemId, change) {
        if (cart[itemId]) {
            cart[itemId].quantity += change;

            // Update total price based on quantity
            cart[itemId].totalPrice = cart[itemId].quantity * cart[itemId].price;

            // If the quantity is less than or equal to 0, remove the item
            if (cart[itemId].quantity <= 0) {
                delete cart[itemId];
            }

            updateCart();
        }
    };

    // Function to remove an item from the cart
    window.removeFromCart = function(itemId) {
        delete cart[itemId];
        updateCart();
    };

    // Function to start the checkout process
    function startCheckout(button) {
        const itemName = button.getAttribute('data-name');
        const itemPrice = button.getAttribute('data-price');
        const itemImage = button.getAttribute('data-image');

        console.log(`Checkout for ${itemName} at ₹${itemPrice}`);
        // Redirect to checkout page or perform additional actions
    }

    // Add event listeners to "Add to Cart" and "Buy Now" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => addToCart(button));
    });

    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', () => startCheckout(button));
    });

    // Handle cart icon click
    const cartIcon = document.getElementById('cartIcon');
    const closeCartSidebarBtn = document.getElementById('closeCartSidebar');

    if (cartIcon) {
        cartIcon.addEventListener('click', openCartSidebar);
    } else {
        console.error('Cart icon not found.');
    }

    if (closeCartSidebarBtn) {
        closeCartSidebarBtn.addEventListener('click', closeCartSidebar);
    } else {
        console.error('Close cart sidebar button not found.');
    }

    // Function to open the cart sidebar
    function openCartSidebar() {
        const sidebar = document.getElementById('cartSidebarUnique');
        if (sidebar) {
            sidebar.classList.add('open');
            sidebar.style.backgroundColor = '#ffffff'; //  background color is white
        } else {
            console.error('Cart sidebar not found.');
        }
    }

    // Function to close the cart sidebar
    function closeCartSidebar() {
        const sidebar = document.getElementById('cartSidebarUnique');
        if (sidebar) {
            sidebar.classList.remove('open');
        } else {
            console.error('Cart sidebar not found.');
        }
    }
});














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
