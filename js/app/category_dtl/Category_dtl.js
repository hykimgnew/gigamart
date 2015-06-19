'use strict';

/**
 *  Category Js : Main
 **/
var global = window;

//*************************************************
// * 넘어온 전체카테고리, 상세카테고리 코드
//*************************************************
var requestCategoryCode     = request.getParameter("categoryCode");
var requestCategoryDtlCode  = request.getParameter("categoryDtlCode");
var requestCategoryDtlPage  = request.getParameter("categoryDtlPage");

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
/** 
 *  현재 리스트 Focus 위치
 *  0 : 상세 카테고리
 *  3 : 앞으로 이동하여 다른 코너로 이동할수 있습니다.
 *  4 : 당일 판매현장 필요?
 **/
var currentFocusList = 0;

/**
 * 상세카테고리에서 행열의 위치 
 * horizonFocus    = 가로 0 1 2
 * verticalFocus   = 세로 0 1 2
 * currentFocusDtl = 현재 위치 012
 *                             345
 *                             678
 * productList     = 상품 배열
 **/
var horizonFocus  = 0;
var verticalFocus = 0;
var currentFocusDtl = 0;
var productList   = new Array();

/**
 * 현재 상세카테고리 화살표 button Focus 위치
 * 0 : 아래쪽
 * 1 : 위쪽
 **/
var currentFocusBtn = 0;

/** 
 * 현재 상세카테고리의 페이지
 * 0 : 1페이지
 * 1 : 2페이지... 
 **/
var currentFocusDtlPage = 0;

/**
 * 이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevPageYN = false;
 var nextPageYN = false;

/**
 * 상세카테고리 : 확인/상세/담기 
 **/
var btnokfill = '<img src="../images/btn_ok_fill.png"/>';


global.onload = function() {
    global.Category_dtl = Gigamart.app.category_dtl.Category_dtl.create();
    global.Category_dtl.init();
};
App.defineClass('Gigamart.app.category_dtl.Category_dtl', {
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
        global.stbService = Gigamart.app.category_dtl.STBService.create(EventBus);
    }
});