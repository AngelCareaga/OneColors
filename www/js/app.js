/**
 * Archivo de configuraciones generales y carga de modulos.
 *
 * Aquí puede especificar las URL de las páginas a utilizar, por ejemplo; 
 * - HOME
 * - ABOUT
 *
 * Javascript
 *
 * LICENSE: Este archivo fuente está sujeto a la licencia MIT
 * que está disponible a través del siguiente URI:
 * https://github.com/AngelCareaga/OneColors/blob/master/LICENSE
 *
 * @category   Javascript
 * @package    js/
 * @file       app.js
 * @author     Ángel Careaga <dev.angelcareaga@gmail.com>
 * @copyright  2018
 * @license    MIT
 * @version    1.0
 */

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

  /**
   * RUN: REALIZA LAS PRIMERAS EJECUCIONES SOBRE LOS PLUGINS DE CORDOVA.
   */
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.disableScroll(true);
      }
      try {
        if (window.statusbar) {
          window.statusbar.show();
          window.statusbar.backgroundColorByHexString("#2980b9");
          window.statusbar.styleDefault();
        }
        if (window.statusbar.isVisible) {
          //console.log("La barra funciona");
        }
      } catch (error) {
        console.warn('Error: ' + error);
      }
    });
  })

  /**
   * CONFIG: CREA LA CONFIGURACIÓN DE LAS RUTAS, Y EL USO DEL CONTROLLER.
   */
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'pages/menu.html',
        controller: 'mainController'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'pages/home.html'
          }
        }
      })

      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'pages/about.html'
          }
        }
      });
    $urlRouterProvider.otherwise('/app/home'); // Configura por defecto home como la pantalla principal.
    $ionicConfigProvider.tabs.position('bottom'); // Obliga a posicionar las 'Tabs', en la parte inferior de la pantalla.
  })
