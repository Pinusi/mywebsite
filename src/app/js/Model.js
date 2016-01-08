'use strict';

define(['jquery', 'q'],
    function($, Q) {
      function model() {
        var props = {};

        this.getJSON = function() {
          var loadCompleated = Q.defer();
          var path = window.relativePath ? window.relativePath : '..';

          $.ajax({
                method: 'GET',
                url: path + '/api/data.json',
                dataType: 'json',
                success: function(_data) {
                  props.data = _data;
                  loadCompleated.resolve();
                },
                error: function(err) {
                  console.log(err);
                }
              });

          return loadCompleated.promise;
        };
      }

      return model;

    });
