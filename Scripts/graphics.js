var Counter1 = [];
var Name1 = [];

$.ajax({
    type: 'GET',
    url: 'http://192.168.160.58/Olympics/api/statistics/Games_Modalities',
    headers: {
        'Content-Type': 'application/json'
    },
    success: function (data, status, xhr) {

        var athData = data;

        athData.forEach(element => {
            Counter1.push(element.Counter);
            Name1.push(element.Name);
        });


        Name1.sort(function (a, b) {
            return Counter1.indexOf(b) - Counter1.indexOf(a);
        });

        createBarChart(Counter1, Name1);

    }
});

function createBarChart(Counter, Name) {
    let colors = [];

    for (let i = 0; i < Counter.length; i++) {
        if (i % 3 === 0) {
            colors.push('rgba(255, 255, 255, 1)');
        } else if (i % 3 === 1) {
            colors.push('rgba(0, 0, 255, 0.2)');
        } else {
            colors.push('rgba(128, 128, 128, 1)');
        }
    }

    let barChart = new Chart("bar-chart", {
        type: "bar",
        data: {
            labels: Name,
            datasets: [{
                data: Counter,
                label: 'Number of Modalities per Olympic Games edition',
                backgroundColor: colors,
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
            },
        }
    });
}

var Counter2 = [];
var Name2 = [];

$.ajax({
    type: 'GET',
    url: 'http://192.168.160.58/Olympics/api/statistics/Games_Athletes',
    headers: {
        'Content-Type': 'application/json'
    },
    success: function (data, status, xhr) {

        var athData = data;

        athData.forEach(element => {
            Counter2.push(element.Counter);
            Name2.push(element.Name);
        });



        Name2.sort(function (a, b) {
            return Counter2.indexOf(b) - Counter2.indexOf(a);
        });

        createPieChart(Counter2, Name2);

    }
});

function createPieChart(Counter, Name) {
    let colors = [];

    for (let i = 0; i < Counter.length; i++) {
        if (i % 3 === 0) {
            colors.push('rgba(255, 255, 255, 1)');
        } else if (i % 3 === 1) {
            colors.push('rgba(0, 0, 255, 0.2)');
        } else {
            colors.push('rgba(128, 128, 128, 1)');
        }
    }

    let pieChart = new Chart("pie-chart", {
        type: "bar",
        data: {
            labels: Name,
            datasets: [{
                data: Counter,
                label: 'Number of Athletes per Olympic Games edition',
                backgroundColor: colors,
                backgroundColor: colors,
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
            },
        }
    });
}

window.onload = function () {
    createPieChart(Counter2, Name2);
}


