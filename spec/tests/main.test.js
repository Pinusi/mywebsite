'use strict';

(function() {

  require.config({
    paths: {
      jquery:   '../../vendor/jquery/dist/jquery.min',
      q:   '../../vendor/q/q',
      underscore:   '../../vendor/underscore/underscore-min',
      text:   '../../vendor/require-text',
      templates:   '../templates',
      tpl:   '../../vendor/require-tpl',
      owlCarousel:   '../../vendor/owl-carousel/owl-carousel/owl.carousel.min',
      Snap: '../../vendor/snap.svg/dist/snap.svg',
      controllerTest: '../../../spec/tests/controller.test',
      modelTest: '../../../spec/tests/model.test'
    }
  });

  require(['controllerTest'],
    function() {
      if (typeof mochaPhantomJS !== 'undefined') {
        mochaPhantomJS.run();
      } else {
        mocha.run();
      }
    });

}());
