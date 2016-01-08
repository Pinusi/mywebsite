'use strict';

(function() {

  require.config({

    baseUrl:   '../src/app/js/',
    paths: {
      jquery:   '../../vendor/jquery/dist/jquery.min',
      q:   '../../vendor/q/q',
      underscore:   '../../vendor/underscore/underscore-min',
      text:   '../../vendor/require-text',
      templates:   '../templates',
      tpl:   '../../vendor/require-tpl',
      Snap: '../../vendor/snap.svg/dist/snap.svg'
    },
    include: ['../../vendor/almond/almond', 'Main.js']
  });

  require(['Controller', 'Model', 'View', 'jquery'],
    function(Controller, Model, View, $) {

      var model = new Model();
      var view = new View();
      var controller = new Controller(model,view);

      // model.getJSON().then(function() {
      //     return view.init(model.getDataForInit());
      //   })
      //   .then(function() {
      //     controller.init();
      //     controller.attachEvents();
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   })
      //   .done();
    });

}());
