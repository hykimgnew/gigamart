'use strict';

/**
 *  Order Js : Main
 **/
var global = window;
var EXHB_PATH = "";
var EXHB_IMAGE_PATH = "../images/";

//*************************************************
// * Popup
//*************************************************
 
//*************************************************
//* Request getParameter
//* REQUEST_SCREEN - 이전 버튼을 누르면 돌아갈 페이지
//*     ex) exhb.html
//*
//* 상세 카테고리
//* requestCategoryDtlCode - category_dtl.html서 가져온 상세카테고리 코드
//* 
//* 상품 정보
//* 너무 많아 생략.. 그냥 가져다 씀
//*************************************************
var REQUEST_SCREEN = request.getParameter("requestOrderScreen");
//-------------------------------------------------
// 상세카테고리에서 넘어온 코드
var requestCategoryCode     = request.getParameter("categoryCode");
var requestCategoryDtlCode  = request.getParameter("categoryDtlCode");
var requestCategoryDtlPage  = request.getParameter("categoryDtlPage");
//-------------------------------------------------
//페이지-첫페이지 두번째페이지
var requestProductView      = request.getParameter("productView");
//같은종류추천/다른사람이 구매한 연관상품
var requestCurrentFocusList = request.getParameter("currentFocusList");
//같은종류추천일때 menu focus
var requestCurrentFocusMenu = request.getParameter("currentFocusMenu");
//다른사람이 구매한 연관상품일때 menu focus
var requestCurrentFocusMenul = request.getParameter("currentFocusMenul");

// * 넘어온 전체카테고리, 상세카테고리 코드 (포커스 보전용)
var requestCategoryCode     = request.getParameter("categoryCode");
var requestCategoryDtlCode  = request.getParameter("categoryDtlCode");
var requestCategoryDtlPage  = request.getParameter("categoryDtlPage");
var requestCategoryDtlId  = request.getParameter("id");

// * 기획전에서 넘어온 카테고리 코드
var requestExhbFocus  = request.getParameter("requestExhbFocus");
var requestExhbPage   = request.getParameter("requestExhbPage");
//-------------------------------------------------




//*************************************************
//*  현재 주문/결제 화면 위치
//*  0 : 장바구니
//*  1 : 배송지 선택
//*  2 :
//*************************************************
var orderScreen = 0;
//*************************************************

//*************************************************
// 배송지 목록
// arrAddrList : 배송지 목록 배열
// addrPopFocus : 배송지 팝업 포커스
//          0 : 셀렉트박스    1 : 확인    2 : 취소 
// addrListFocus : 배송지 팝업 리스트 포커스
//          0 : 첫번째 주소  ~ n : n번째 주소
// addrPopToggle : 배송지 목록 토글
//          true : 펼쳐짐,   false : 안펼쳐짐
//*************************************************
var arrAddrList = new Array();
var addrPopFocus = 0;
var addrListFocus = 0;
var addrPopToggle = false;

//*************************************************
//*  장바구니 화면 Focus  orderScreen = 0 
//*                     
//*  orderCartFocus - 장바구니 포커스 위치
//*         1 : 장바구니 상품 목록
//*         5 : 배송지 선택
//*         6 : 결제 버튼
//*         7 : 선택 삭제 확인 팝업
//*         8 : 배송지 선택 팝업
//*
//*  orderCartPage - 장바구니 상품 페이지 위치
//*         0 : 1페이지, 1 : 2페이지 ...
//*
//*  orderCartMaxPage - 장바구니 상품 전체 페이지
//* 
//*  orderCartListFocus - 장바구니 상품 목록의 화면 상 선택 위치
//*         -1 : 전체 체크박스, 0 : 첫번째 항목, 1 : 두번째 항목, 2 : 세번째 항목, 3 : 선택상품 삭제, 4 : 선택 상품 찜하기
//*
//*  orderCartProductYN  - true면 장바구니에 상품이 있음, false면 장바구니에 상품이 없음
//*  orderCartCheckYN    - true면 체크박스에 포커스 위치 false면 상품 리스트에 포커스 위치
//*  orderCartPrevPageYN - 장바구니 상품 목록 이전페이지 유무
//*  orderCartNextPageYN - 장바구니 상품 목록 다음페이지 유무
//*         true: 있음, false: 없음
//*
//*-------------------------------------------------
//*  orderCartDeleteFocus - 장바구니 선택 삭제 확인 팝업 포커스
//*         0 : 확인,  1 : 취소
//*
//*  orderCartResultSet - 장바구니 조회 resultSet
//*  orderCartResultScreenSet - 장바구니 조회 현재 페이지 resultSet
//*  orderCartResultCheckStatus - 장바구니 전체 체크박스 상태, true : 체크
//*  orderCartResultLen - 현재 페이지의 상품 갯수
//*************************************************
var orderCartFocus          = 1;
var orderCartPage           = 0;
var orderCartMaxPage        = 0;
var orderCartListFocus      = 0;
var orderCartProductYN      = false;
var orderCartCheckYN        = false;
var orderCartPrevPageYN     = false;
var orderCartNextPageYN     = false;
var orderCartDeleteFocus    = 0;

var orderCartResultSet;                          
var orderCartResultScreenSet    = new Array();   // 장바구니 조회 현재 페이지 resultSet
var orderCartResultCheckStatus  = new Array();   // 장바구니 조회 전체 페이지 checkbox 저장값, false, true로 구분, true : 체크
var orderCartAllCheck           = false;         // 장바구니 전체 체크박스 상태, true : 체크
var orderCartResultLen          = 0;             // 현재 페이지의 상품 갯수





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
    
        //$('#popup_cart').load("easy_cart.html");

    }
});