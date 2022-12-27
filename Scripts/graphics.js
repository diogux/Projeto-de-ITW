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

        Counter1.sort(function (a, b) {
            return b - a;
        });

        Name1.sort(function (a, b) {
            return Counter1.indexOf(b) - Counter1.indexOf(a);
        });

        createPieChart(Counter1, Name1);

    }
});

function createPieChart(Counter, Name) {
    let colors = [];

    for (let i = 0; i < Counter.length; i++) {
        if (i % 3 === 0) {
            colors.push('rgba(255, 0, 0, 0.8)');
        } else if (i % 3 === 1) {
            colors.push('rgba(0, 0, 255, 0.8)');
        } else {
            colors.push('rgba(255, 255, 0, 0.8)');
        }
    }

    let pieChart = new Chart("myChart", {
        type: "pie",
        data: {
            labels: Name,
            datasets: [{
                data: Counter,
                label: 'Number of Modalities per Olympic Games edition',
                backgroundColor: colors,
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
    createPieChart(Counter1, Name1);
}



