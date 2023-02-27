window.addEventListener("load", init);

function init() {
    const navBarButton = document.getElementById("nav-bar-button");
    const drawer = document.getElementById("drawer");

    navBarButton.addEventListener("click", function () {
        drawer.classList.toggle("active");
    });
}
