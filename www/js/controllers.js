angular.module('starter.controllers', [])

.controller('mainController', function ($scope, $cordovaCamera, $cordovaImagePicker){
  
  var colorThief = new ColorThief();

  $scope.palette = [];

  document.addEventListener("deviceready", function () {

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 600,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    var optionsPicker = {
     maximumImagesCount: 10,
     width: 800,
     height: 800,
     quality: 80
    };

    $scope.getCamera = function (){
      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('imgDemo');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });
    }

    $scope.getPicker = function (){
      $cordovaImagePicker.getPictures(optionsPicker)
      .then(function (results) {
        var image = document.getElementById('imgDemo');
        if(results.length){
          image.src = results[0];
        } else {
          alert("Select an image!");
        }

      }, function(error) {
        // error getting photos
      });
    }

  }, false);

  $scope.getColors = function (){
    var a = document.getElementById("imgDemo");
    if(a.src){
      var c = colorThief.getColor(a);
      var p = colorThief.getPalette(a, 5);
      $scope.palette = p;
    } else {
      alert("Take a picture first!");
    }
  }

});