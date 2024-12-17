document.getElementById('forgotPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    
    fetch('/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        const notificationContainer = document.querySelector('.notification-container');
        if (data.success) {
            notificationContainer.innerHTML = `<p>${data.message}</p>`;
        } else {
            notificationContainer.innerHTML = `<p style="color: red;">${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.querySelector('.notification-container').innerHTML = '<p style="color: red;">An error occurred while sending the reset link.</p>';
    });
});
