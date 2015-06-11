'use strict';

/**
 *  Full_video Js : Main
 **/
var global = window;

/** 
 *  현재 Focus 위치
 *  0 : 전체 영상
 *  1 : 장바구니 담기
 *  2 : 상품정보 보기
 *  3 : 닫기
 **/
var currentFocus = 0;


global.onload = function() {
    global.Full_video = Gigamart.app.full_video.Full_video.create();
    global.Full_video.init();
};
App.defineClass('Gigamart.app.full_video.Exhb', {
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
        $('#btn_cart').addClass("focus");

        var me = this;
        global.stbService = Gigamart.app.full_video.STBService.create(EventBus);

    }
});