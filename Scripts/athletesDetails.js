// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Athletes/');
    self.displayName = 'Olympic Games edition Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.CountryName = ko.observable('');
    self.Sex = ko.observable('');
    self.Name = ko.observable('');
    self.Photo = ko.observable('');
    self.Sex = ko.observable('');
    self.Height = ko.observable('');
    self.Weight = ko.observable('');
    self.Url = ko.observable('');
    self.BornDate = ko.observable('');
    self.DiedDate = ko.observable('');
    self.BornPlace = ko.observable('');
    self.DiedPlace = ko.observable('');


    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getGame...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.CountryName(data.CountryName);
            self.Sex(data.Sex);
            self.Name(data.Name);
            self.Photo(data.Photo);
            self.Weight(data.Weight);
            self.Height(data.Height);
            self.Url(data.OlympediaLink);
            self.DiedPlace(data.DiedPlace);
            self.BornPlace(data.BornPlace);
            self.DiedDate(data.DiedDate);
            self.BornDate(data.BornDate);
            // if height is null, then hide the div
            if (data.Height == "NA") {
                $("#Height").hide();
            }
            if (data.Weight == "NA") {
                $("#Weight").hide();
            }
            if (data.OlympediaLink == null) {
                $("#Olympedia").hide();
            }
            if (data.DiedDate != null) {
                $("#DiedDate").show();
                $("#age").text(new Date(data.DiedDate).getFullYear() - new Date(data.BornDate).getFullYear() + " (Passed Away)")
                $("#DiedD").text( new Date(data.DiedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))

            }
            if (data.BornDate != null) {
                $("#BornD").text( new Date(data.BornDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))


            }
            if (data.DiedDate == null) {
                $("#DiedDate").hide();
                let age = new Date().getFullYear() - new Date(data.BornDate).getFullYear() + " years old"
                if (age > 130) {
                    $("#age").text("Unknown")}
                $("#age").text(new Date().getFullYear() - new Date(data.BornDate).getFullYear() + " years old")

            }
            if (data.DiedPlace == null) {
                $("#DiedPlace").hide();
            }
            if (data.BornPlace == null) {
                $("#BornPlace").hide();
            }
            if (data.BornDate == null) {
                $("#BornDate").hide();
                $("#age").text("Unknown");
                
            }
            if (data.Sex === "F") {
                $("#sex").html('<i class="Female fa fa-venus" aria-hidden="true"></i>');
                }
                if (data.Sex === "M") {
                    $("#sex").html('Male <i class="fa fa-mars" aria-hidden="true"></i>');
                }
            if (data.Photo != null) {
                $("#fotinha").attr("src", data.Photo);
            } else {
                $("#fotinha").attr("src", "https://media.tenor.com/uM4ITVkcSnIAAAAC/maria-leal-mary-loyal.gif");
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