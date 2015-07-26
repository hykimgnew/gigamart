'use strict';

/**
 *  Category Js : Main
 **/
var global = window;
var EXHB_PATH = "";
var EXHB_IMAGE_PATH = "../images/";

//*************************************************
// * 넘어온 전체카테고리, 상세카테고리 코드 (포커스 보전용)
//*************************************************
var requestCategoryCode     = request.getParameter("categoryCode");
var requestCategoryDtlCode  = request.getParameter("categoryDtlCode");
var requestCategoryDtlPage  = request.getParameter("categoryDtlPage");

//**************************************************
// * requestKeywordYN = 이 값에 Y가 들어있으면 키워드 검색결과에서 넘어옴
// * requestKeyword = 키워드 검색결과에서 넘어온 키워드
// * requestKeywordFocus = 키워드 포커스 위치
// * requestKeywordPage = 키워드 검색 결과의 현재 페이지
//***************************************************
var requestKeywordYN = request.getParameter("requestKeywordYN");
var requestKeyword = request.getParameter("requestKeyword");
var requestKeywordFocus = request.getParameter("requestKeywordFocus");
var requestKeywordPage = request.getParameter("requestKeywordPage");

//*************************************************
// * Popup
// * isCart       : 간편 장바구니
// * isLogout     : 로그아웃
// *    0 : 팝업 없음, 1 : 확인포커스 2 : 취소포커스
// * isKeyword    : 키워드 검색
// *    0 : 팝업 없음, 1 : 입력창, 2 : 검색, 3 : 닫기
//*************************************************
 var isCart     = false;
 var isLogout   = 0;
 var isKeyword  = 0;
 

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
// *  쇼퍼 주문 이력 팝업
// * histHtml                     = 쇼퍼 주문 이력 HTML
// * histFocus                    = 쇼퍼 주문 이력 Focus 값
// *  0 : 선택 안됐을 때
// *  1 : 주문 이력
// *  2 : 쇼퍼 리얼 타임 버튼
// *  3 : 닫기
// * histPage                     = 주문 이력 페이지
// * currentOrderedProductPage    = 구매 상품 리스트 현재 페이지 (default : 0)
// * totalOrderedPage             = 구매 상품 리스트 전체 페이지
// * maxOrderedPage               = 구매 상품 리스트 한 페이지에 표시할 최대 상품 수 (default : 5)
// * productList                  = 구매 상품 리스트 배열
//*************************************************
var histHtml = "";
var histFocus = 0;
var histPage = 1;

var currentOrderedProductPage = 0;
var totalOrderedPage          = 0;
var maxOrderedPageView        = 5;
var productList               = new Array();

/** 
 *  현재 리스트 Focus 위치
 *  0 : 카테고리
 *  1 : 상세 카테고리
 *  2 : 쇼퍼's bag
 *  3 : 쇼퍼 주문 이력
 *  4 : 쇼퍼 리얼 타임
 *  5 : 음성 검색
 **/
var currentFocusList = 0;

/** 
 *  현재 카테고리 Focus 위치
 *  0 : 사람 모양
 *  1 : 음성 인식
 *  2 : 동그란 사람 얼굴
 *  3 : 쇼퍼's Bag
 *  4 : 과일... 
 **/    
var currentFocusMenu = 4;

/**
 * 현재 상세카테고리 Focus 위치
 * 0 : 사과/배
 * 1 : 참외/토마토...
 **/
var currentFocusDtl = 0;

/** 
 * 현재 상세카테고리의 페이지
 * 0 : 1페이지
 * 1 : 2페이지... (차후에는 페이징 모듈 필요함)
 **/
var currentFocusDtlPage = 0;

/**
 * 이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
var prevPageYN = false;
var nextPageYN = false;

/**
 * 검색결과
 *
 * keywordFocus - 검색결과 포커스
 * 0 : 검색결과 팝업 없음
 * 1 : 할인율순
 * 2 : 가격낮은 순
 * 3 : 가격높은 순
 * 4 : 인기순
 * 5 : 기획전 상품만 보기 체크박스
 * 9 : 상품 목록
 
 * keywordListFocus - 검색 리스트 포커스
 * 0 1 2 3
 * 4 5 6 7 

 * keywordListArray   : 검색 결과의 리스트 배열
 * keywordListScreenArray : 검색 결과의 현재 리스트 배열
 * keywordListPage    : 검색 결과 현재 페이지
 * keywordListLen     : 현재 페이지의 상품 개수
 * keywordPrevPageYN  : 검색결과 이전페이지 유무
 * keywordNextPageYN  : 검색결과 다음페이지 유무
 **/
var keywordFocus      = 0;
var keywordListFocus  = 0;
var keywordListArray  = new Array();
var keywordListScreenArray = new Array();
var keywordListPage   = 0;
var keywordListLen    = 0;
var keywordPrevPageYN = false;
var keywordNextPageYN = false;
var btnokfill = '<img src="../images/btn_ok_fill3.png"/>';


// 쇼퍼 리얼 타임
var rtspPlayer = window.oipfObjectFactory.createVideoMpegObject();    // 실시간 영상보기

/***********************************
 * CMS API 조회 데이터 
 ***********************************/
var shopperHistoryContent = ""; // 쇼퍼 주문 이력

global.onload = function() {
    global.Category = Gigamart.app.category.Category.create();
    global.Category.init();
};
App.defineClass('Gigamart.app.category.Category', {
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
        $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");

        var me = this;
        global.stbService = Gigamart.app.category.STBService.create(EventBus);

        $('#popup_cart').load("easy_cart.html");

    }
        
       
});