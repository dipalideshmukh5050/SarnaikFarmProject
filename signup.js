document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        showNotification(data.message, data.success ? 'success' : 'error');
        if (data.success) {
            setTimeout(() => window.location.href = '/login.html', 3000); // Redirect after 3 seconds
        }
    })
    .catch(error => showNotification('An error occurred.', 'error'));
});

function showNotification(message, type) {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => notification.classList.remove('show'), 3000); // Hide after 3 seconds
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}
