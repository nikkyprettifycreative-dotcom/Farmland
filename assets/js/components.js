document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/layout/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            document.dispatchEvent(new CustomEvent("headerLoaded"));
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('assets/layout/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});