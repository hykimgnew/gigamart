'use strict';

/**
 *  Intro JS : Main
 **/
var global = window;
var currentFocusMenu = 0;    // 현재 메뉴 Focus 위치

global.onload = function() {
    global.Intro = Gigamart.app.intro.Intro.create();
    global.Intro.init();
};
App.defineClass('Gigamart.app.intro.Intro', {
    _construct: function() {
        var me = this,
            viewMode = Gigamart.enums.ViewMode.LIST;

      me.__defineGetter__('viewMode', function () {
            return viewMode;
      });

      EventBus.register(me, 'changeViewMode', function (targetViewMode, movieDatum) {
            viewMode = targetViewMode;
            EventBus.fire('completeToChangeViewMode', movieDatum);
      });

    },
    init: function() {
        $('#intro_skip').addClass("focus");

        var me = this;
        global.stbService = Gigamart.app.intro.STBService.create(EventBus);

        //javascript:sleep(3000);Gigamart.app.intro.KeyEventActorProvider.login();
        // 시간이 지나면 자동으로 페이지 이동
        //sleep(3000);
        //clearTimeout();

        //setTimeout(Gigamart.app.intro.KeyEventActorProvider.login(), 1000);
        
    }
});