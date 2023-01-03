// ViewModel KnockOut
var vm = function () {
  console.log("ViewModel initiated...");
  //---Variáveis locais
  var self = this;
  self.baseUri = ko.observable(
    "http://192.168.160.58/Olympics/api/Games/FullDetails?id="
  );
  self.displayName = "Olympic Games edition Details";
  self.error = ko.observable("");
  self.passingMessage = ko.observable("");
  //--- Data Record
  self.Id = ko.observable("");
  self.CountryName = ko.observable("");
  self.Logo = ko.observable("");
  self.Name = ko.observable("");
  self.City = ko.observable("");
  self.Photo = ko.observable("");
  self.Season = ko.observable("");
  self.Year = ko.observable("");
  self.Url = ko.observable("");
  self.Athletes = ko.observableArray([]);
  self.Medals = ko.observableArray([]);
  self.Competitions = ko.observableArray([]);
  self.Modalities = ko.observableArray([]);
  self.Lat = ko.observable("");
  self.Lon = ko.observable("");

  self.formatSex = function (sex) {
    const iconName = sex == "M" ? "mars" : "venus";
    let sexo = sex == "M" ? "M" : "F";
    const icon = `${sexo}  <i class="fa fa-${iconName}" aria-hidden="true"></i>`;
    return icon;
  };

  self.formatImage = function (image) {
    if (image == null)
      return '<img class="competitions-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" />';
    if (image != null)
      return '<img class="competitions-img"  src="' + image + '" />';
  };

  self.formatPosition = function (med) {
    if (med == "1")
      return '<img style="width:40px;height:37px;" src="/images/Medal1.png" />';
    if (med == "2")
      return '<img style="width:40px;height:37px " src="/images/Medal2.png" />';
    if (med == "3")
      return '<img style="width:40px;height:37px;" src="/images/Medal3.png" />';
    if (med == "4") return "No Medal";
  };

  self.formatMedal = function (med) {
    if (med == "1")
      return '<img style="width:40px;height:37px;" src="/images/Medal1.png" />';
    if (med == "2")
      return '<img style="width:40px;height:37px " src="/images/Medal2.png" />';
    if (med == "3")
      return '<img style="width:40px;height:37px;" src="/images/Medal3.png" />';
  };

  //--- Page Events
  self.activate = function (id) {
    console.log("CALL: getGame...");
    var composedUri = self.baseUri() + id;
    ajaxHelper(composedUri, "GET").done(function (data) {
      console.log(data);
      hideLoading();
      self.Id(data.Id);
      self.CountryName(data.CountryName);
      self.Logo(data.Logo);
      self.Name(data.Name);
      self.Photo(data.Photo);
      self.Season(data.Season);
      self.Year(data.Year);
      self.Url(data.Url);
      self.Athletes(data.Athletes);
      self.Medals(data.Medals);
      self.Competitions(data.Competitions);
      self.Modalities(data.Modalities);
      self.City(data.City);
      self.Lat(data.Lat);
      self.Lon(data.Lon);
    });
  };
  self.Title = ko.computed(function () {
    return "Game of" + " " + self.Name();
  }, self);

  //--- Internal functions
  function ajaxHelper(uri, method, data) {
    self.error(""); // Clear error message
    return $.ajax({
      type: method,
      url: uri,
      dataType: "json",
      contentType: "application/json",
      data: data ? JSON.stringify(data) : null,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("AJAX Call[" + uri + "] Fail...");
        hideLoading();
        self.error(errorThrown);
      },
    });
  }

  function showLoading() {
    $("#myModal").modal("show", {
      backdrop: "static",
      keyboard: false,
    });
  }
  function hideLoading() {
    $("#myModal").on("shown.bs.modal", function (e) {
      $("#myModal").modal("hide");
    });
  }

  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
  }

  //--- start ....
  showLoading();
  var pg = getUrlParameter("id");
  console.log(pg);
  if (pg == undefined) self.activate(1);
  else {
    self.activate(pg);
  }
  console.log("VM initialized!");
};
var Counter = [];
var CountryName = [];

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
}

var pg = getUrlParameter("id");
$.ajax({
  type: "GET",
  url: "http://192.168.160.58/Olympics/api/statistics/Medals_Country?id=" + pg,
  headers: {
    "Content-Type": "application/json",
  },
  success: function (data, status, xhr) {
    var medData = data;

    medData.forEach((element) => {
      Counter.push(
        element.Medals.reduce((accum, ele) => ele.Counter + accum, 0)
      );
      CountryName.push(element.CountryName);
    });

    createBarGraph(Counter, CountryName);
  },
});

function createBarGraph(Counter, CountryName) {
  let barChart = new Chart("myChart", {
    type: "bar",
    data: {
      labels: CountryName,
      datasets: [
        {
          data: Counter,
          label: "Number of Medals per country in this Olympic Games edition",
          backgroundColor: ["#F1F743", "#F294F2"],
          borderColor: ["rgba(249, 160, 58, 0.4)", "#C05AC0"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      indexAxis: "y",
    },
  });
}

$(document).ready(function () {
  console.log("document.ready!");
  ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
  $("#myModal").modal("hide");
});
