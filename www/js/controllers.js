/**
 * Archivo de funciones a utilizar en la obtención de los colores y fotografía.
 *
 * Aquí se desarrollan y declaran las funciones generales a utilizar en la página para
 * la obtención de los colores, y cambio de estilos.
 *
 * Javascript
 *
 * LICENSE: Este archivo fuente está sujeto a la licencia MIT
 * que está disponible a través del siguiente URI:
 * https://github.com/AngelCareaga/OneColors/blob/master/LICENSE
 *
 * @category   Javascript
 * @package    js/
 * @file       controllers.js
 * @author     Ángel Careaga <dev.angelcareaga@gmail.com>
 * @copyright  2018
 * @license    MIT
 * @version    1.0
 */

angular.module('starter.controllers', [])

  /**
   * CONTROLLER: CONTIENE TODAS LAS FUNCIONES A SER UTILIZADAS POR LA APLICACIÓN.
   */
  .controller('mainController', function ($scope, $cordovaCamera, $cordovaImagePicker) {

    var colorThief = new ColorThief(); // Objeto para poder obtener los colores dominantes.
    $scope.palette = [];
    $scope.paletteTitulo = [];

    /**
     * GETCAMERA: OBTIENE LA FOTOGRAFÍA Y LA CARGA AL CONTENEDOR.
     */
    $scope.getCamera = function () {
      // Valores por defecto a utilizar en la opción de cámara.
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 600,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: false
      };
      $cordovaCamera.getPicture(options).then(function (imageData) {
        var image = document.getElementById('imgDemo');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        console.log('CAMERA ERROR: ' + err);
      });
    }

    /**
     * GETCOLORS: OBTIENE LOS COLORES DE LA IMAGEN CARGADA EN EL CONETEDOR.
     */
    $scope.getColors = function () {
      var a = document.getElementById("imgDemo");
      try {
        if (a.src) {

          /**
           * Convierte color RGB a HEX.
           * @param {*} R VALOR EN RED.
           * @param {*} G VALOR EN GREEN.
           * @param {*} B VALOR EN BLUE.
           */
          function rgbToHex(R, G, B) {
            return toHex(R) + toHex(G) + toHex(B)
          }

          /**
           * CONVIERTE VALOR EN RED, GREEN O BLUE A HEX.
           * @param {*} n VALOR RED, GREEN, BLUE.
           */
          function toHex(n) {
            n = parseInt(n, 10);
            if (isNaN(n)) return "00";
            n = Math.max(0, Math.min(n, 255));
            return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
              "0123456789ABCDEF".charAt(n % 16);
          }

          // Realiza la obtención de los colores a partir del obteto y la imagen.
          var p = colorThief.getPalette(a);
          var pTitulo = colorThief.getPalette(a, 2);
          $scope.palette = p;
          $scope.paletteTitulo = pTitulo;
          var nuevoColor = rgbToHex(pTitulo[0][0], pTitulo[0][1], pTitulo[0][2]);

          // Cambia el color del fondo del contenedor de la imagen.
          $scope.estiloTitulo = {
            color: "white",
            backgroundColor: '#' + nuevoColor + ''
          }

        } else {
          alert("Toma una imagen primero.");
        }
      } catch (err) {
        console.log("GETCOLORS ERROR: " + err);
      }
    }

  });
