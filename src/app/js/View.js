'use strict';

define(['jquery', 'q', 'Snap', 'tpl!../templates/home', 'tpl!../templates/projects', 'tpl!../templates/skills'],
  function($, Q, Snap, homeTmp, projectsTmp, skillsTmp) {
    function view() {
      var props = {
        elems: {
          home: $('#home'),
          projects: $('#projects'),
          skills: $('#skills')
        }
      };

      this.render = function(_data) {
        props.elems.home.find('.content').append(homeTmp(_data.home));
        props.elems.projects.find('.content').append(projectsTmp({projects: _data.projects}));
        props.elems.skills.find('.content').append(skillsTmp(_data.skills));
      };
    }

    return view;

  });
