window.addEventListener("load", init);

function init() {
    const navBarButton = document.getElementById("nav-bar-button");
    const drawer = document.getElementById("drawer");

    // set drawer not to be active
    drawer.setAttribute("active", false);

    navBarButton.addEventListener("click", function () {
        let drawerActive = drawer.getAttribute("active");
        if (drawerActive === "false") {
            drawer.setAttribute("active", true);
        } else {
            drawer.setAttribute("active", false);
        }
    });
}
