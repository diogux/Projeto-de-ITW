$('document').ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 10000
    });
$(".darkToggle").click(function() {
   $(".navbar").toggleClass("navbar-dark bg-dark");
   $(".nav-items").css("color", "white");
   $(body).css("background-color", "black", "color", "white");
   
});
});
