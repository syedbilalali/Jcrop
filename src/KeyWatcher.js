  /**
   *  KeyWatcher
   *  provides keyboard support
   */
  var KeyWatcher = function(core){
    this.core = core;
    this.init();
  };

  KeyWatcher.defaults = {
    passthru: [ 9 ],
    debug: false
  };

  $.extend(KeyWatcher.prototype,{
    init: function(){
      $.extend(this,KeyWatcher.defaults);
      this.enable();
    },
    disable: function(){
      this.core.container.off('keydown.jcrop');
    },
    enable: function(){
      var t = this, m = t.core;
      m.container.on('keydown.jcrop',function(e){
        var nudge = e.shiftKey? 16: 2;

        if ($.inArray(e.keyCode,t.passthru) >= 0)
          return true;

        switch(e.keyCode){
          case 37: m.nudge(-nudge,0); break;
          case 38: m.nudge(0,-nudge); break;
          case 39: m.nudge(nudge,0); break;
          case 40: m.nudge(0,nudge); break;

          case 46:
          case 8:
            m.requestDelete();
            return false;
            break;

          default:
            if (t.debug) console.log('keycode: ' + e.keyCode);
            break;
        }

        if (!e.metaKey && !e.ctrlKey)
          e.preventDefault();
      });
    }
  });
