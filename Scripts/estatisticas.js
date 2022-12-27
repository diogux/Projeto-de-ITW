
  var Counter2 = [];
  var Name2 = [];

  $.ajax({
  type: 'GET',
  url: 'http://192.168.160.58/Olympics/Help/Api/GET-api-Statistics-Games_Competitions',
  headers: {
  'Content-Type': 'application/json'
  },
  success: function (data, status, xhr) {

      var athData = data;

      athData.forEach(element => {
      Counter2.push(element.Counter);
      Name2.push(element.Name);
      });

      createBarGraph(Counter2, Name2);

      }
  });

  function createBarGraph(Counter2, Name2) {
  let barChart = new Chart("myChart2", {
      type: "bar",
      data: {
      labels: Name2,
      datasets: [{
      data: Counter2,
      label: 'Number of Athletes per Olympic Games edition',
      backgroundColor: ['rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)',],
      borderColor: ['rgb(75, 192, 192)','rgb(54, 162, 235)',],
      borderWidth: 1
      }]
      },
      options:{
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
