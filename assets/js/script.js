
// Open the sidebar
function openSidebar() {
    document.querySelector('.sidebar').style.width = '250px';
}

// Close the sidebar
function closeSidebar() {
    document.querySelector('.sidebar').style.width = '0';
}

// Toggle sidebar visibility
function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

// Toggle dropdown menus on mobile
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });
});


document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.add('shake-horizontal');
    setTimeout(() => this.classList.remove('shake-horizontal'), 800); // Remove class after animation ends
});







document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.count');

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/k/, '000'); // Convert 'k' to '000'

            const increment = target / 200;
            if (count < target) {
                counter.innerText = formatNumber(Math.ceil(count + increment));
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = formatNumber(target);
            }
        };

        const formatNumber = (num) => {
            if (num >= 1000) {
                return (num / 1000).toFixed(0) + 'k';
            }
            return num;
        };

        updateCount();
    });
});














// scripts.js
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Example: Validate form data here and then proceed with payment processing
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    if (validatePayment(cardNumber, expiryDate, cvv)) {
        // Here you would send the payment data to the payment gateway's API
        alert('Payment processed successfully!');
        window.location.href = 'thank-you.html'; // Redirect to a thank you page
    } else {
        alert('Invalid payment details. Please check and try again.');
    }
});

function validatePayment(cardNumber, expiryDate, cvv) {
    // Example validation - in a real application, this should be more comprehensive
    return cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3;
}













function openCartSidebar() {
    document.getElementById("cartSidebar").style.width = "300px";
}

function closeCartSidebar() {
    document.getElementById("cartSidebar").style.width = "0";
}
































































// script.js

document.addEventListener('DOMContentLoaded', () => {
    const buyNowButtons = document.querySelectorAll('.buy-now');

    buyNowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const cropItem = event.target.closest('.crop-item');
            const imageUrl = cropItem.querySelector('.crop-image').src;
            const checkoutPageUrl = 'checkout.html'; // Update with your checkout page URL
            
            // Redirect to checkout page with image URL as a query parameter
            window.location.href = `${checkoutPageUrl}?image=${encodeURIComponent(imageUrl)}`;
        });
    });
});
