$().ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 1000

    
    });
    $('.carousel').carousel({interval:2000});
});
$(".Toggler").click(function () {

    $(this).children().toggleClass("fa-sun-o fa-moon-o");
    $(this).toggleClass("btn-dark");
    $(".navbar").toggleClass("navbar-dark bg-dark");
    $(".nav-items").toggleClass("nav-items-dark");
    $("body").toggleClass("dark-mode");
    $("table").toggleClass("nav-items-dark table-striped");
    $(".nome").toggleClass("text-white");

});










