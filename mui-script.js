document.addEventListener('DOMContentLoaded', function() {
    const { Button } = window['MaterialUI'];

    const exploreButtonContainer = document.getElementById('exploreButtonContainer');

    ReactDOM.render(
        React.createElement(Button, {
            variant: "contained",
            color: "primary",
            size: "large",
            onClick: () => scrollToSection('services'),
            style: {
                backgroundColor: "#86C232", // Accent color
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }
        }, "Explore Our Services"),
        exploreButtonContainer
    );
});
