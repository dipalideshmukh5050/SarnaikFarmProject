document.getElementById('submit-review').addEventListener('click', function() {
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review-text').value;
    const reviewRating = document.getElementById('review-rating').value;

    if (reviewerName && reviewText && reviewRating) {
        const reviewsContainer = document.getElementById('reviews-container');

        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');

        reviewDiv.innerHTML = `
            <div class="reviewer">${reviewerName}</div>
            <div class="rating">${'★'.repeat(reviewRating)}${'☆'.repeat(5 - reviewRating)}</div>
            <div class="review-text">${reviewText}</div>
            <button class="delete-review">Delete</button>
        `;

        reviewsContainer.appendChild(reviewDiv);

        // Clear the form
        document.getElementById('reviewer-name').value = '';
        document.getElementById('review-text').value = '';
        document.getElementById('review-rating').value = '5';

        // Add delete functionality
        reviewDiv.querySelector('.delete-review').addEventListener('click', function() {
            reviewsContainer.removeChild(reviewDiv);
        });
    }
});