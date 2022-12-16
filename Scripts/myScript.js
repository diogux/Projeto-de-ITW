$('document').ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 10000
    });
$(".Toggler").click(function() {
    $(".navbar").toggleClass("navbar-dark bg-dark");
    $(".nav-items").toggleClass("nav-items-dark");
    $("body").toggleClass("dark-mode");
    $("table").toggleClass("nav-items-dark table-striped");
   
});
});
