'use strict';

/**
 *  Category Js : Main
 **/
var global = window;
var EXHB_PATH = "";
var EXHB_IMAGE_PATH = "../images/";

//*************************************************
// * 넘어온 전체카테고리, 상세카테고리 코드
//*************************************************
var requestCategoryCode     = request.getParameter("categoryCode");
var requestCategoryDtlCode  = request.getParameter("categoryDtlCode");
var requestCategoryDtlPage  = request.getParameter("categoryDtlPage");


//*************************************************
// * requestDtlPage =  상세카테고리 -> 상품상세정보 -> 상세카테고리의 현재 페이지가 무엇인지 확인위해
// * requestDtlMenu =  상세카테고리 -> 상품상세정보 -> 상세카테고리의 현재 포커스된 위치가 무엇인지 확인위해
// * requestDtlCnt  =  상세카테고리 -> 상품상세정보 -> 상세카테고리의 현재 포커스된 위치의 상품갯수가 무엇인지 확인위해
//*************************************************
var requestDtlPage  = request.getParameter("requestDtlPage");
var requestDtlMenu  = request.getParameter("requestDtlMenu");
var requestDtlCnt  = request.getParameter("requestDtlCnt");


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
 * currentPageCnt  = 현재 페이지의 상품 갯수
 **/
var horizonFocus  = 0;
var verticalFocus = 0;
var currentFocusDtl = 0;
var productList   = new Array();
var currentPageCnt = 0;
/**
*key 이벤트로 페이징 했을때(상품정보->상세 갔을때 request가지고있어서 focus가 겹침)
 **/
var statusFocus     = false;

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
var btnokfill = '<img src="../images/btn_ok_fill3.png"/>';

/**
 * 상세카테고리 : 메뉴 배열
 **/
var arrSubCategory = new Array();



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

        // 음소거 on (영상 재생시 off)
        var appConfiguration = window.oipfObjectFactory.createConfigurationObject();
        appConfiguration.localSystem.mute = true;

        $('#popup_cart').load("easy_cart.html");
    }
});