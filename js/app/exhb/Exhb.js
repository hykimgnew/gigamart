'use strict';

/**
 *  Exhb Js : Main
 **/
var global = window;

// 인트로 화면(index.html)일때는 스크립트상 경로에 ../ 이 존재하고
// 일반 기획전 화면(view/exhb.html)일때는 스크립트상 경로에 ../ 이 존재하지 않음
var EXHB_PATH = "";
var EXHB_IMAGE_PATH = "../images/";
var INTRO_SCREEN = false;
var GO_EXHB       = request.getParameter("GO_EXHB");


//*************************************************
// * 전체영상보기 -> 상품상세정보 -> 기획전 지금 이상품 이가격 포커싱 
//*************************************************
var requestExhbFocus  = request.getParameter("requestExhbFocus");
var requestExhbPage   = request.getParameter("requestExhbPage");

//*************************************************
// * Popup
// * isFullVideo           : 전체 영상보기
// * isCart                : 간편 장바구니
// * isLogout              : 로그아웃
// *    0 : 팝업 없음, 1 : 확인포커스 2 : 취소포커스
// * isRealTime            : 쇼퍼 리얼 타임
// * isRealTimeStart       : 쇼퍼 리얼 타임 시작
// * isRealTimeEnd         : 쇼퍼 리얼 타임 종료
// * isRealTimeEndComplete : 쇼퍼 리얼 타임 종료 완료
//*************************************************
 var isFullVideo           = false;
 var isCart                = false;
 var isLogout              = 0;
 var isRealTime            = false;
 var isRealTimeStart       = false;
 var isRealTimeEnd         = false;
 var isRealTimeEndComplete = false;


//*************************************************
// *  전체 영상보기 팝업
// * fvFocus    : 현재 포커스 위치
// *  0 : 토스트 팝업
// *  1 : 장바구니 담기
// *  2 : 상품정보 보기
// *  3 : 닫기
// * fvCode   : 현재 선택된 상품 코드
// * fvUrl    : 현재 선택된 상품의 관련 url(상품정보보기에 parameter값 때문)--안써
// * fvId     : 현재 선택된 상품의 관련 id(상품정보보기에 parameter값 때문)
//*************************************************
var fvFocus = 1;
var fvCode  = 0;
var fvUrl   = "";
var fvId    = "";

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
// *  쇼퍼 리얼 타임 팝업
// * rtHtml             : 쇼퍼 리얼 타임 HTML
// * rtFocus            : 현재 포커스 위치
// *  0 : 닫기
//*************************************************
var rtHtml    = "";
var rtFocus   = 0;

//*************************************************
// *  쇼퍼 리얼 타임 시작 팝업
// * rtStartHtml        : 쇼퍼 리얼 타임 시작 HTML
// * rtStartFocus       : 현재 포커스 위치
// *  0 : 영상요청
// *  1 : 닫기
//*************************************************
var rtStartHtml    = "";
var rtStartFocus   = 0;

//*************************************************
// *  쇼퍼 리얼 타임 종료 팝업
// * rtEndHtml          : 쇼퍼 리얼 타임 종료 HTML
// * rtEndocus          : 현재 포커스 위치
// *  0 : 영상요청
// *  1 : 닫기
//*************************************************
var rtEndHtml    = "";
var rtEndFocus   = 0;

//*************************************************
// *  쇼퍼 리얼 타임 종료 완료 팝업
// * rtEndCompleteHtml  : 쇼퍼 리얼 타임 종료 완료 HTML
// * rtEndCompleteFocus : 현재 포커스 위치
// *  0 : 영상요청
// *  1 : 닫기
//*************************************************
var rtEndCompleteHtml    = "";
var rtEndCompleteFocus   = 0;


//*************************************************
// * 지금 이상품 이가격 하단? : 페이징
// * currentOrderedProductPage1    = 상품 리스트 현재 페이지 (default : 0)
// * totalOrderedPage1             = 상품 리스트 전체 페이지
// * maxOrderedPage1               = 상품 리스트 한 페이지에 표시할 최대 상품 수 (default : 4)
//*************************************************
var currentOrderedProductPage1 = 0;
var totalOrderedPage1          = 0;
var maxOrderedPageView1        = 4;

/**
 * 지금 이상품 이가격(하단)
 *  이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevPageYN1 = false;
 var nextPageYN1 = false;



//*************************************************
// * 내가 늘 사는 상품 지금 얼마? : 페이징
// * currentOrderedProductPage2   =상품 리스트 현재 페이지 (default : 0)
// * totalOrderedPage2            = 상품 리스트 전체 페이지
// * maxOrderedPage2              = 상품 리스트 한 페이지에 표시할 최대 상품 수 (default : 2)
// 
// * orderedPage1                 = 저렴한 상품 추천 페이지 수
// * orderedPage2                 = 할인율 최고 페이지 수
//*************************************************
var currentOrderedProductPage2 = 0;
var totalOrderedPage2          = 0;
var maxOrderedPageView2        = 2;

var orderedPage1               = 0;
var orderedPage2               = 0;

/**
 * 저렴한 상품 추천 / 할인율 최고 / 추천 세트
 *  이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevPageYN2 = false;
 var nextPageYN2 = false;




//*************************************************
// *  저렴한 상품 추천
// * productList                  = 상품 리스트 배열
//*************************************************
var productList               = new Array();

//*************************************************
// *  할인율 최고
// * productList2                  = 상품 리스트 배열
//*************************************************
var productList2               = new Array();

//*************************************************
// *  지금 이상품 이가격 하단
// * productList3                  = 상품 리스트 배열
//*************************************************
var productList3               = new Array();


//*************************************************
//*  팝업 없을 때
//*************************************************
/** 
 *  현재 리스트 Focus 위치
 *  0 : 전체 카테고리
 *  1 : 지금 이 상품 이 가격
 *  2 : 지금 이 상품 이 가격 하단 동영상
 *  3 : 저렴한 상품 추천
 *  4 : 할인율 초괴
 *  5 : 추천 세트
 **/
var currentFocusList = 2;

/** 
 *  지금 이 상품 이 가격 하단 동영상 Focus 위치
 *  0 : 
 *  1 : 
 *  2 : 
 *  3 : 
 **/    
var currentFocusMenu = 0;

/**
 * 저렴한 상품 추천 Focus 위치
 * 할인율 최고 Focus 위치
 * 추천 세트 Focus 위치
 * 0 : 
 * 1 : 
 * 2 :
 * 3 :
  **/
var currentFocusDtl1 = 0;
var currentFocusDtl2 = 0;
var currentFocusDtl3 = 0;



/** 
 * 현재 상세카테고리의 페이지
 * 0 : 1페이지
 * 1 : 2페이지... (차후에는 페이징 모듈 필요함)
 **/
var currentFocusDtlPage = 0;
 /**
  * 내가 늘 사는 상품 지금 얼마? : 확인/상세/담기 
  **/
  var btnokfill = '<img src="' + EXHB_IMAGE_PATH + 'btn_ok_fill.png"/>';

/**
  * 지금 이상품 이가격 하단 페이지 Λ V 커서 focus
 true일경우 Λ 에 focus
 false일경우 V 에 focus
 **/
 var slArrow = false;


global.onload = function() {
    global.Exhb = Gigamart.app.exhb.Exhb.create();
    global.Exhb.init();
};
App.defineClass('Gigamart.app.exhb.Exhb', {
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

        /*if(GO_EXHB == 'Y') {
            $('div[name="screen_intro"]').hide();
            $('div[name="screen_exhb"]').show();
        } else {
            go_login(); 
        }*/

        //$('#pj_left').addClass("focus");
        $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
        $('li[name="sl_menu"]').eq(currentFocusMenu).children('.sl_play').addClass('focus');
        $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').addClass('focus');
        
        global.stbService = Gigamart.app.exhb.STBService.create(EventBus);

        // 음소거 on (영상 재생시 off)
        var appConfiguration = window.oipfObjectFactory.createConfigurationObject();
        appConfiguration.localSystem.mute = true;
    
        // 팝업 Load
        $('#popup_fv').load("full_video.html");
        $('#popup_cart').load("easy_cart.html");
    }

    
});

// 로그인
function go_login() {
    setTimeout(Gigamart.app.exhb.KeyEventActorProvider.login, 2000);
}