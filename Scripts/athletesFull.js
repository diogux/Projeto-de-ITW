// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Athletes/FullDetails?id=');
    self.displayName = 'Olympic Athletes Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Name = ko.observable('');
    self.Sex = ko.observable('');
    self.Height = ko.observable('');
    self.Weight = ko.observable('');
    self.BornPlace = ko.observable('');
    self.BornDate = ko.observable('');
    self.DiedDate = ko.observable('');
    self.DiedPlace = ko.observable('');
    self.Photo = ko.observable('');
    self.Url = ko.observable('');
    self.Games = ko.observableArray([]);
    self.Modalities = ko.observableArray([]);
    self.Competitions = ko.observableArray([]);
    self.Medals = ko.observableArray([]);

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getGame...');
        console.log(id)
        var composedUri = self.baseUri() + id;
    
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Name(data.Name);
            self.Weight(data.Weight);
            self.Height(data.Height);
            self.Photo(data.Photo);
            self.Games(data.Games);
            self.Modalities(data.Modalities);
            self.Competitions(data.Competitions);
            self.Medals(data.Medals);
            self.Url(data.OlympediaLink);
            self.BornPlace(data.BornPlace)
            self.BornDate(data.BornDate)
            self.DiedPlace(data.DiedPlace)
            self.DiedDate(data.DiedDate)
            self.Sex(data.Sex)
            if (data.OlympediaLink == null) {
                $("#Olympedia").hide();
            }
            if (data.Height == "NA") {
                $("#Height").hide()
            }
            if (data.Weight == "NA") {
                $("#Weight").hide();
            }
            if (data.Sex === "F") {
            $("#sex").html('<i class="Female fa fa-venus" aria-hidden="true"></i>');
            }
            if (data.Sex === "M") {
                $("#sex").html('Male <i class="fa fa-mars" aria-hidden="true"></i>');
            }
            if (data.medals == null) {
                $("#medals").hide();
            }
        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})