// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.show();
            StatusBar.backgroundColorByHexString("#2980b9");
            StatusBar.styleDefault();
        }
        if (StatusBar.isVisible) {
            console.log("La barra funciona");
        }

    });
})



.controller('mainController', function($scope, $cordovaCamera, $cordovaImagePicker) {

    var colorThief = new ColorThief();

    $scope.palette = [];
    $scope.paletteTitulo = [];

    document.addEventListener("deviceready", function() {

        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 600,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: false
        };

        var optionsPicker = {
            maximumImagesCount: 10,
            width: 800,
            height: 800,
            quality: 100
        };

        $scope.getCamera = function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                var image = document.getElementById('imgDemo');
                image.src = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // error
            });
        }

        $scope.getPicker = function() {
            $cordovaImagePicker.getPictures(optionsPicker)
                .then(function(results) {
                    var image = document.getElementById('imgDemo');
                    if (results.length) {
                        image.src = results[0];
                    } else {
                        alert("Selecciona una imagen.");
                    }

                }, function(error) {
                    // error getting photos
                });
        }

    }, false);

    $scope.getColors = function() {
        var a = document.getElementById("imgDemo");
        try {
            if (a.src) {

                function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
                function toHex(n) {
                 n = parseInt(n,10);
                 if (isNaN(n)) return "00";
                 n = Math.max(0,Math.min(n,255));
                 return "0123456789ABCDEF".charAt((n-n%16)/16)
                      + "0123456789ABCDEF".charAt(n%16);
                }

                console.log("Obteniendo...");
                var c = colorThief.getColor(a);
                var p = colorThief.getPalette(a, 8);
                var pTitulo = colorThief.getPalette(a, 2);
                $scope.palette = p;
                $scope.paletteTitulo = pTitulo;
                //var nuevoColor = pTitulo[0];
                var nuevoColor = rgbToHex(pTitulo[0][0],pTitulo[0][1],pTitulo[0][2]);
                console.log("Nuevo color: " + pTitulo + ' Otro: ' + nuevoColor);
                $scope.estiloTitulo={
                    color:"white",
                    backgroundColor:'#'+nuevoColor+''
                  }

            } else {
                console.log("Toma una imagen primero.");
                alert("Toma una imagen primero.");
            }
        }catch(err)
        {
          console.log("Error en: " + err);
        }
    }

})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'mainController'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/search');
})

