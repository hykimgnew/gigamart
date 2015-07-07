'use strict';

/**
 *  Order Js : Main
 **/
var global = window;
var EXHB_PATH = "";

//*************************************************
// * Popup
// * isCart       : 간편 장바구니
//*************************************************
 var isCart = false;

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
//* Request getParameter
//*************************************************
var REQUEST_SCREEN = request.getParameter("orderScreen");

//*************************************************
//*  현재 주문/결제 화면 위치
//*  0 : 장바구니
//*  1 : 배송지 선택
//*  2 :
//*************************************************
var orderScreen = 0;
//*************************************************

//*************************************************
//*  장바구니 화면 Focus  orderScreen = 0 
//*                     
//*  orderCartFocus - 장바구니 포커스 위치
//*         1 : 장바구니 상품 목록
//*         5 : 배송지 선택
//*         6 : 결제 버튼
//*
//*  orderCartPage - 장바구니 상품 페이지 위치
//*         0 : 1페이지, 1 : 2페이지 ...
//*
//*  orderCartMaxPage - 장바구니 상품 전체 페이지
//* 
//*  orderCartListFocus - 장바구니 상품 목록의 화면 상 선택 위치
//*         -1 : 전체 체크박스, 0 : 첫번째 항목, 1 : 두번째 항목, 2 : 세번째 항목, 3 : 선택상품 삭제, 4 : 전체 삭제, 5 : 선택 상품 찜하기
//*
//*  orderCartCheckYN    - true면 체크박스에 포커스 위치 false면 상품 리스트에 포커스 위치
//*  orderCartPrevPageYN - 장바구니 상품 목록 이전페이지 유무
//*  orderCartNextPageYN - 장바구니 상품 목록 다음페이지 유무
//*         true: 있음, false: 없음
//*************************************************
var orderCartFocus          = 1;
var orderCartPage           = 0;
var orderCartMaxPage        = 0;
var orderCartListFocus      = 0;
var orderCartCheckYN        = false;
var orderCartPrevPageYN     = false;
var orderCartNextPageYN     = false;





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

        // 음소거 on (영상 재생시 off)
        var appConfiguration = window.oipfObjectFactory.createConfigurationObject();
        appConfiguration.localSystem.mute = true;
    
        $('#popup_cart').load("easy_cart.html");

    }
});