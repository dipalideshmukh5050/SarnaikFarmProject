let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchmove', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    closeSidebarOnScroll(); // Close sidebar instantly on any touch movement
    handleSwipe();
}, false);

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) { // Detect left swipe
        closeSidebarUnique(); // Close the sidebar on left swipe
        closeCartSidebarUnique(); // Close the cart sidebar on left swipe
    }
}

// Sidebar functions (existing functionality)
function closeSidebarUnique() {
    const sidebar = document.querySelector('.sidebar-unique');
    sidebar.classList.remove('open');
}

function closeCartSidebarUnique() {
    const cartSidebar = document.getElementById('cartSidebarUnique');
    cartSidebar.classList.remove('open');
}

// Close sidebar when clicking outside of it
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar-unique');
    const toggleButton = document.querySelector('.menu-toggle-unique');

    // Check if the sidebar is open and the click is outside the sidebar and toggle button
    if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
        closeSidebarUnique();
    }
});

// Close sidebar instantly on touch move (scrolling)
function closeSidebarOnScroll() {
    const sidebar = document.querySelector('.sidebar-unique');

    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
}
