skillup.controller("HomeCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var home = this;

    home.user = {};
    home.newGame = {};

    $http.get("/users/current").then(function(res){
        home.user = res.data;
    }, function(res){
        window.location.href = "#/login";
    });

    home.addGame = function(){
        $http.post("/users/current/games", home.newGame).then(function(res){
            home.user.games.push(home.newGame);
            home.newGame = {};
        }, function(res){
            alert("Game could not be added");
        });
    };

    home.logout = function(){
        $http.post("/logout").then(function (res) {
            window.location.href = "#/login";
        });
    };

    home.changeGameStatus = function(game){
        $http.put("/users/current/games/", game).then(function(){
            game.beat = !game.beat;
        });
    }

    $scope.onEnter = function($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            home.addGame();
        }
    }

}]);
