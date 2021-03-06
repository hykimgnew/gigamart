'use strict';

/**
 *  Shopper_bag Js : Main
 **/
var global = window;
var EXHB_PATH = "";
var EXHB_IMAGE_PATH = "../images/";

//*************************************************
// * 외부 수신 코드
//*************************************************
// 기획전 쇼퍼추천세트
var requestSetMenu      = request.getParameter("setName");

//*************************************************
// * Popup
// * isCart       : 간편 장바구니
// * isLogout     : 로그아웃
// *    0 : 팝업 없음, 1 : 확인포커스 2 : 취소포커스
//*************************************************
 var isCart   = false;
 var isLogout = 0;

//*************************************************
// *  간편 장바구니 팝업
// * cartHtml           - 간편 장바구니 HTML
// * cartFocus          - 간편 장바구니 Focus 값
// *   0                : 장바구니 가기
// *   1                : 간편 장바구니 결제
// *   2~n              : 간편 장바구니 리스트 내 상품 Focus
// *  chgVolumeFocus    - 수량 변경 팝업
// *   0                : 팝업 off
// *   1                : Minus
// *   2                : Plus
// *   3                : 확인
// *   4                : 취소
// * histPage           - 상품페이지
// * anchorFocus        - 앵커 위치 (0~3)
//*************************************************
var cartHtml        = "";
var cartFocus       = 0;
var chgVolumeFocus  = 0;
var histPage        = 1;
var anchorFocus     = 0;


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
// *  쇼퍼 추천list page
// * currentShopperRcListPage       = 쇼퍼추천 LIST 현재 페이지 (default : 0)
// * totalShopperRcListPage         = 쇼퍼추천 LIST 전체 페이지
// * maxShopperRcListPage           = 쇼퍼추천 LIST 한 페이지에 들어갈 쇼퍼 수 (default : 6)
// * arrShopperRcList               = 쇼퍼추천 LIST 배열
//*************************************************
var currentShopperRcListPage  = 0;
var totalShopperRcListPage    = 0;
var maxShopperRcListPage      = 6;
var arrShopperRcList          = new Array();


//*************************************************
// *  마트는지금? list page
// * currentMartListPage       = 마트는지금? LIST 현재 페이지 (default : 0)
// * totalMartListPage         = 마트는지금? LIST 전체 페이지
// * maxMartListPage           = 마트는지금? LIST 한 페이지에 들어갈 마트 수 (default : 1)
// * arrMartList               = 마트는지금? LIST 배열
//*************************************************
var currentMartListPage  = 0;
var totalMartListPage    = 0;
var maxMartListPage      = 2;
var arrMartList          = new Array();

//*************************************************
//*  팝업 없을 때
//*************************************************
/** 
 *  현재 리스트 Focus 위치
 *  0 : 쇼퍼 list(인기순)
 *  1 : 쇼퍼 추천세트 list(인기순)
 *  2 : 마트는 지금?
 *  3 : 쇼퍼 list popup
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

/**
 * 쇼퍼 상세 Focus 
 * 0 : 닫기
 * 1 : 쇼퍼후기
  **/
var shpPopFocus = 0;


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
        global.stbService = Gigamart.app.shopper_bag.STBService.create(EventBus);

        // 음소거 on (영상 재생시 off)
        var appConfiguration = window.oipfObjectFactory.createConfigurationObject();
        appConfiguration.localSystem.mute = true;

        $('#popup_cart').load("easy_cart.html");
    }
});