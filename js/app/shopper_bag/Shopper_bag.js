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
// *  쇼퍼 list page
// * currentShopperListPage       = 쇼퍼 LIST 현재 페이지 (default : 0)
// * totalShopperListPage         = 쇼퍼 LIST 전체 페이지
// * maxShopperListPage           = 쇼퍼 LIST 한 페이지에 들어갈 쇼퍼 수 (default : 2)
// * arrShopperList               = 쇼퍼 LIST 배열
//*************************************************
var currentShopperListPage  = 0;
var totalShopperListPage    = 0;
var maxShopperListPage      = 2;
var arrShopperList          = new Array();


//*************************************************
//*  팝업 없을 때
//*************************************************
/** 
 *  현재 리스트 Focus 위치
 *  0 : 쇼퍼 list(인기순)
 *  1 : 쇼퍼 추천세트 list(인기순)
 *  2 : 마트는 지금?
 *  3 : 
 *  4 : 
 **/
var currentFocusList = 0;



/** 
 *  쇼퍼 list Focus 위치
 *  0 : 
 *  1 : 
 *  2 : 
 *  3 : 
 **/    
var currentFocusMenu = 0;

/**
 * 쇼퍼 추천세트 Focus 위치
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
 * 마트는지금 Focus 위치
 * 0 : 
 * 1 : 
  **/
var currentFocusMenu3 = 0;




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
        global.stbService = Gigamart.app.shopper_bag.STBService.create(EventBus);
    }
});