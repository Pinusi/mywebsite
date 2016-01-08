'use strict';

define(['Model', 'jquery', 'q', 'View'],
    function(Model, $, Q, View) {
      function controller(_model, _view) {
        this.props = {
          event: (window.ontouchstart) ? 'touchstart' : 'click'
        };
      }

      return controller;

    });
