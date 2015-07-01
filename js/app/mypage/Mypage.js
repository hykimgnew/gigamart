'use strict';

/**
 *  Shopper_bag Js : Main
 **/
var global = window;

//*************************************************
// * Popup
// * isCart       : 간편 장바구니
//*************************************************
 var isCart = false;

//*************************************************
// *  간편 장바구니 팝업
// * cartHtml = 장바구니 HTML
// * cartFocus = 장바구니 Focus 값
//*************************************************
var cartHtml = "";
var cartFocus = 0;

//*************************************************
//*  팝업 없을 때
//*************************************************

//*************************************************
// *  상품정보 위치(첫번째화면 / 두번째화면)
// *  0 : 첫번째화면 - 마이페이지 main
// *  1 : 두번째화면 - 
//*************************************************
var myView = 0;


/** 
 *  현재 리스트 Focus 위치
 *  0 : 장바구니 최근본상품, 취소/환불내역
 *  1 : 주문내역
 *  2 : 버튼
 *  3 : 
 *  4 : 
 **/
var currentFocusList = 0;



/** 
 *  장바구니, 최근본상품, 취소/환불내역 버튼 list Focus 위치
 *  0 : 
 *  1 : 
 *  2 : 
 *  3 : 
 **/    
var currentFocusMenu = 0;

/**
 * 주문내역 Focus 위치
 * 0 : 
 * 1 : 
 * 2 :
 * 3 :
 * 4 :
 * 5 :
 * 6 :
  **/
var currentFocusMenu2 = 0;

/**
 * 버튼 Focus 위치
 * 0 : 이용안내
 * 1 : 공지사항
 * 2 : 자주묻는질문
 * 3 : GIGA마트소식
  **/
var currentFocusMenu3 = 0;




/**
  * 쇼퍼 추천세트 : 확인/상세/담기 
  **/
  var btnokfill = '<img src="../images/btn_ok_fill.png"/>';


global.onload = function() {
    global.Shopper_bag = Gigamart.app.shopper_bag.Shopper_bag.create();
    global.Shopper_bag.init();
};
App.defineClass('Gigamart.app.shopper_bag.Shopper_bag', {
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

        $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
        global.stbService = Gigamart.app.shopper_bag.STBService.create(EventBus);
    }
});