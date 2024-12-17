document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();  // Prevent default form submission

            const formData = {
                first_name: document.getElementById('ijowk-6').value,
                last_name: document.getElementById('indfi-4').value,
                email: document.getElementById('ipmgh-6').value,
                phone_number: document.getElementById('imgis-5').value,
                query: document.getElementById('i5vyy-6').value,
            };

            console.log('Submitting form data:', formData);

            fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response from backend:', data);
                showNotification(data.success);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                showNotification(false); // Handle fetch errors
            });
        });
    }

    function showNotification(success) {
        let notification = document.getElementById('form-notification');

        // Create notification element if it doesn't exist
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'form-notification';
            document.body.appendChild(notification); // Append to body for centering
        }
// Update notification text and style
notification.textContent = success ? 'Form submitted successfully!' : 'Submission failed.';
notification.style.color = success ? 'green' : 'red';
notification.style.position = 'fixed';
notification.style.bottom = '25%';  // Increase this value for more padding from the bottom
notification.style.left = '50%';
notification.style.transform = 'translateX(-50%)';  // Center horizontally
notification.style.padding = '10px 20px';
notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
notification.style.color = 'white';
notification.style.borderRadius = '5px';
notification.style.zIndex = '1000';
notification.style.textAlign = 'center';
notification.style.fontWeight = 'bold';
notification.style.opacity = '1';  //  the notification is visible

        // Hide the notification after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';  // Fade out the notification
            setTimeout(() => {
                notification.remove(); // Remove from DOM after fade out
            }, 500); // Match this with the transition duration
        },2000); // 5 seconds
    }
});
