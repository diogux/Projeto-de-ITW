let barChart;

// Declare variables to store the original data and labels
let originalData;
let originalLabels;

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

        // Store the original data and labels in separate variables
        originalData = Counter1.slice();
        originalLabels = Name1.slice();

        // Sort the data and labels arrays by value
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

    // Assign the chart object to the global barChart variable
    barChart = new Chart("bar-chart", {
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

$(document).ready(function () {
    var Counter3 = [];
    var Name3 = [];
    let pieChart;

    $.ajax({
        type: 'GET',
        url: 'http://192.168.160.58/Olympics/api/statistics/Medals_Country',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data, status, xhr) {
            // Retrieve the country name and counter for each item in the data array
            data.forEach(item => {
                Name3.push(item.CountryName);
                // Sum the counters for all medals for each country
                let totalCounter = item.Medals.reduce((acc, medal) => acc + medal.Counter, 0);
                Counter3.push(totalCounter);
            });

            // Sort the data in descending order by counter
            Name3.sort(function (a, b) {
                return Counter3[Name3.indexOf(b)] - Counter3[Name3.indexOf(a)];
            });

            // Call the createPieChart function with the updated data
            createThirdChart(Counter3, Name3, 100);
        }
    });

    function createThirdChart(Counter, Name, minMedals, maxMedals, pieChart) {
        // Filter the data based on the minMedals and maxMedals parameters
        let filteredCounter = Counter.filter(counter => counter >= minMedals && counter <= maxMedals);
        let filteredName = Name.filter((name, index) => Counter[index] >= minMedals && Counter[index] <= maxMedals);

        let colors = [];

        for (let i = 0; i < filteredCounter.length; i++) {
            if (i % 3 === 0) {
                colors.push('rgba(255, 255, 255, 1)');
            } else if (i % 3 === 1) {
                colors.push('rgba(0, 0, 255, 0.2)');
            } else {
                colors.push('rgba(128, 128, 128, 1)');
            }
        }

        // If a pie chart object already exists, update its data and options
        if (pieChart) {
            pieChart.data.labels = filteredName;
            pieChart.data.datasets[0].data = filteredCounter;
            pieChart.data.datasets[0].backgroundColor = colors;
            pieChart.update();
            return;
        }

        // Otherwise, create a new pie chart object
        pieChart = new Chart("medals", {
            type: "pie",
            data: {
                labels: filteredName,
                datasets: [{
                    data: filteredCounter,
                    label: 'Number of Medals per Country',
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


    // Add a submit event listener to the form
    var viewModel = {
        minMedals: ko.observable(),
        maxMedals: ko.observable(),
        submit: function () {
            // Call the createThirdChart function with the updated data
            createThirdChart(Counter3, Name3, this.minMedals(), this.maxMedals());
        }
    };

    // Apply the Knockout bindings
    ko.applyBindings(viewModel);


    
    window.onload = function () {
        createPieChart(Counter2, Name2);
    }

});
