// checkout.js
document.addEventListener("DOMContentLoaded", function() {
    // Replace with your own publishable key
    var stripe = Stripe('pk_test_51PiDYURvvBvD9AXG10enU2afNEseTjFwxudPH1AO85o8gb2edPqtWwMeYQzMv7U5DyFmkWZGvLwI1Zxfoz5NFFbo00KgVTL6Wa');
    var elements = stripe.elements();

    // Set up Stripe.js and Elements to use in checkout form
    var style = {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    };

    var card = elements.create("card", { style: style });
    card.mount("#card-element");

    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Inform the customer that there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server (you'll need server-side code for this part)
                // Here, we'll just log it to the console for demonstration purposes.
                console.log(result.token);
                alert('Token created: ' + result.token.id);
            }
        });
    });
});
