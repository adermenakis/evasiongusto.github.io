document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');

    grecaptcha.ready(function() {
        grecaptcha.execute('YOUR_SITE_KEY', { action: 'submit' }).then(function(token) {
            document.getElementById('g-recaptcha-response').value = token;
            submitButton.disabled = false; // Enable submit button after getting the token
        });
    });
});
