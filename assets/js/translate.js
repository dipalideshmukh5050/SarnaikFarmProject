let isTranslated = false;

function initGoogleTranslate() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'mr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

function toggleTranslate() {
    const translateButton = document.getElementById('translate-toggle');

    if (isTranslated) {
        // Revert to English
        revertToOriginal();
        translateButton.innerText = 'Translate to Marathi';
        translateButton.classList.remove('off');
    } else {
        // Apply translation to Marathi
        loadGoogleTranslate();
        translateButton.innerText = 'Translate to English';
        translateButton.classList.add('off');
    }
    isTranslated = !isTranslated;
}

function loadGoogleTranslate() {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate';
    document.body.appendChild(script);
}

function revertToOriginal() {
    // Reload the page to its original language
    location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
    const translateButton = document.getElementById('translate-toggle');
    if (translateButton) {
        translateButton.addEventListener('click', toggleTranslate);
    } else {
        console.error('Translate button not found');
    }
});















// Function to open the cart sidebar
function openCartSidebarUnique() {
    const cartSidebar = document.getElementById('cartSidebarUnique');
    if (cartSidebar) {
        cartSidebar.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when cart is open
    }
}

// Function to close the cart sidebar
function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebarUnique');
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
        document.body.style.overflow = 'auto'; // Restore scrolling when cart is closed
    }
}

// Setup mouse leave event for closing the sidebar
function setupMouseLeaveEvent() {
    const cartSidebar = document.getElementById('cartSidebarUnique');
    if (cartSidebar) {
        cartSidebar.addEventListener('mouseleave', closeCartSidebar);
    }
}

// Initialize event listeners
function initializeEventListeners() {
    const cartIcon = document.getElementById('cartIcon');
    const closeCartBtn = document.getElementById('closeCartSidebar');

    if (cartIcon) {
        cartIcon.addEventListener('click', openCartSidebarUnique);
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartSidebar);
    }

    setupMouseLeaveEvent(); // Initialize mouse leave event
}

// Set up event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
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











// Prevent touchmove default action if horizontal scroll is detected
document.addEventListener('touchstart', function(e) {
    var touchStartX = e.touches[0].pageX;
    var touchStartY = e.touches[0].pageY;
  
    document.addEventListener('touchmove', function(e) {
      var touchMoveX = e.touches[0].pageX;
      var touchMoveY = e.touches[0].pageY;
  
      // Calculate the difference in the X and Y axis
      var diffX = touchMoveX - touchStartX;
      var diffY = touchMoveY - touchStartY;
  
      // If horizontal scroll is greater than vertical scroll, prevent default
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault();
      }
    }, { passive: false });
  }, { passive: false });
  