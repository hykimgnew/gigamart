'use strict';

/**
 *  Order Js : Main
 **/
var global = window;

/** 현재 화면
 *  0 : 장바구니
 *  1 : 배송지 선택
 *  2 :
 **/
var currentScreen = 0;

/** 
 *  현재 Focus 위치
 *  0 : 장바구니 목록
 *  1 : 장바구니 목록 기능 버튼
 **/
var currentFocus = 0;

//*************************************************
// * Popup
// * isCart       : 간편 장바구니
//*************************************************
 var isCart = false;

//*************************************************
// *  간편 장바구니 팝업
// * cartHtml           : 간편 장바구니 HTML
// * cartFocus          : 간편 장바구니 Focus 값
// *  0                 : 장바구니 가기
// *  1                 : 간편 장바구니 결제
// *  2                 : 간편 장바구니 리스트
// *  3                 : 간편 장바구니 리스트 페이지
// * histPage           : 상품페이지
//*************************************************
var cartHtml  = "";
var cartFocus = 0;
var cartPage  = 0;
var histPage  = 1;





global.onload = function() {
    global.Order = Gigamart.app.order.Order.create();
    global.Order.init();
};
App.defineClass('Gigamart.app.order.Order', {
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
        var me = this;
        global.stbService = Gigamart.app.order.STBService.create(EventBus);

        $('#popup_cart').load("easy_cart.html");

    }
});