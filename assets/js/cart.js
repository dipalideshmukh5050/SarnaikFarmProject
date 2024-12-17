
document.addEventListener('DOMContentLoaded', () => {
    const cartSidebar = document.getElementById('cartSidebarUnique');
    const cartItemsList = document.getElementById('cart-sidebar-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const placeOrderButton = document.getElementById('place-order-button');
    const buyProductsButton = document.querySelector('.buy-products-button-unique');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartSidebar() {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
            if (placeOrderButton) placeOrderButton.style.display = 'none';
            if (buyProductsButton) buyProductsButton.style.display = 'none';
        } else {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
            if (placeOrderButton) placeOrderButton.style.display = 'block';
            if (buyProductsButton) buyProductsButton.style.display = 'block';
            cart.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'cart-item';
                listItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h2 class="crop-title">${item.name}</h2>
                     
                        <p class="cart-item-price">Price: ₹${item.price}</p>
                        <div class="quantity-control">
                            <button class="quantity-decrease" data-index="${index}">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-increase" data-index="${index}">+</button>
                        </div>
                        <div class="product-actions-row">
                            <button class="remove-button-unique" data-index="${index}">Remove</button>
                            <button class="buy-now" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}" onclick="startCheckout(this)">Buy Now</button>
                        </div>
                    </div>
                `;
                cartItemsList.appendChild(listItem);
            });
            attachRemoveEventListeners();
            attachQuantityControlEventListeners();
        }
    }

    function addToCart(product) {
        // Check if the exact product (matching id) is already in the cart
        const existingProduct = cart.find(item => item.id === product.id && item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.price = existingProduct.basePrice * existingProduct.quantity;
        } else {
            product.quantity = 1;
            product.basePrice = product.price;
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSidebar();
        openCartSidebarUnique();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSidebar();
    }

    function updateQuantity(index, change) {
        const item = cart[index];
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(index);
        } else {
            item.price = item.basePrice * item.quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSidebar();
        }
    }

    function placeOrder() {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        cart = [];  // Clear the cart array
        updateCartSidebar();
    }

    function attachRemoveEventListeners() {
        document.querySelectorAll('.remove-button-unique').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    function attachQuantityControlEventListeners() {
        document.querySelectorAll('.quantity-decrease').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                updateQuantity(index, -1);
            });
        });

        document.querySelectorAll('.quantity-increase').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                updateQuantity(index, 1);
            });
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.crop-item');
            const product = {
                id: productElement.id,
                image: productElement.querySelector('img').src,
                name: productElement.querySelector('.crop-title').textContent,
                description: productElement.querySelector('.crop-description').textContent,
                price: parseInt(productElement.querySelector('.crop-price').textContent.replace('Price: ₹', ''), 10)  // Convert price to number
            };
            addToCart(product);
        });
    });

    window.openCartSidebarUnique = () => {
        if (cartSidebar) cartSidebar.classList.add('open');
        updateCartSidebar();
    };

    window.closeCartSidebarUnique = () => {
        if (cartSidebar) cartSidebar.classList.remove('open');
    };

    window.placeOrder = placeOrder;

    updateCartSidebar();
});




















function search() {
    // Get the search input value and convert it to uppercase for case-insensitive comparison
    let filter = document.getElementById('searchBar').value.toUpperCase();
    
    // Get all product items
    let items = document.querySelectorAll('.crop-item');
    let found = false; // Flag to check if any item matches the search

    // Loop through each product item
    items.forEach(item => {
        // Get the product title and convert it to uppercase
        let title = item.querySelector('.crop-title').innerText || item.querySelector('.crop-title').textContent;
        
        // Check if the title includes the filter text
        if (title.toUpperCase().indexOf(filter) > -1) {
            // Show the item if it matches the filter
            item.style.display = "";
            found = true;
        } else {
            // Hide the item if it does not match the filter
            item.style.display = "none";
        }
    });
    
    // Show or hide the no products message based on whether any items were found
    let noProductsMessage = document.getElementById('no-products-message');
    if (!found) {
        noProductsMessage.style.display = "block";
    } else {
        noProductsMessage.style.display = "none";
    }
}











document.addEventListener('DOMContentLoaded', function() {
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.closest('.crop-item');
            const id = parent.getAttribute('data-id');
            const name = parent.getAttribute('data-name');
            const price = parent.getAttribute('data-price');
            const image = parent.getAttribute('data-image');
            
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            
            const item = {
                id: id,
                name: name,
                price: price,
                image: image
            };
            
            // Check if item already exists in wishlist
            const itemExists = wishlist.some(wishlistItem => wishlistItem.id === item.id);
            
            if (!itemExists) {
                wishlist.push(item);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                alert(`${name} has been added to your wishlist!`);
            } else {
                alert(`${name} is already in your wishlist.`);
            }
        });
    });
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
