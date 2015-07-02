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
// *  1 : 두번째화면 - 장바구니
// *  2 : 세번째화면 - 찜한상품
// *  3 : 네번째화면 - 최근본상품
// *  4 : 다섯번째화면 - 취소/환불내역
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
 *  마이페이지메인 장바구니, 최근본상품, 취소/환불내역 버튼 list Focus 위치
 *  0 : 
 *  1 : 
 *  2 : 
 *  3 : 
 **/    
var currentFocusMenu = 0;

/**
 * 마이페이지메인 주문내역 Focus 위치
  **/
var currentFocusMenu2 = 0;

/**
 * 마이페이지메인 버튼 Focus 위치
 * 0 : 이용안내
 * 1 : 공지사항
 * 2 : 자주묻는질문
 * 3 : GIGA마트소식
  **/
var currentFocusMenu3 = 0;

/** 
 *  찜한리스트 Focus 위치
 *  0 : 전체선택
 *  1 : 상품목록
 *  2 : 버튼
 *  3 : 
 *  4 : 
 **/
var favFocusList = 1;

//찜한리스트 상품목록 Focus 위치
//var favFocusMenu = 0;

/**찜한리스트 버튼 focus위치
*  0  : 선택삭제
**/
var favFocusMenu = 0;
/**
 * 찜한상품 행열의 위치 
 * horizonFocus    = 가로 0 1 2 3
 * verticalFocus   = 세로 0 1 2 3
 * favFocusMenu    = 현재 위치 0123
 *                             4567
 * arrFavList      = 찜한상품list 배열
 * currentPageCnt  = 현재 페이지의 상품 갯수
 **/
var horizonFocus  = 0;
var verticalFocus = 0;
var favFocusMenu = 0;
var arrFavList          = new Array();
var currentPageCnt = 0;



//*************************************************
// *  찜한상품list page
// * currentFavListPage       = 찜한상품list 현재 페이지 (default : 0)
// * totalFavListPage         = 찜한상품list 전체 페이지
// * maxFavListPage           = 찜한상품list 한 페이지에 들어갈 쇼퍼 수 (default : 8)

//*************************************************
var currentFavListPage  = 0;
var totalFavListPage    = 0;
var maxFavListPage      = 8;

/**
  * 찜한상품 : 확인/상세/담기 
  **/
  var btnokfill = '<img src="../images/btn_ok_fill.png" style="width : 152px; margin-top: 7px;"/>';


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