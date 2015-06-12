'use strict';

/**
 *  Exhb Js : Main
 **/
var global = window;

//*************************************************
// * Popup
// * isFullVideo  : 전체 영상보기
// * isCart       : 간편 장바구니
//*************************************************
 var isFullVideo = false;
 var isCart = false;

//*************************************************
// *  전체 영상보기 팝업
// * fvFocus    : 현재 포커스 위치
// *  1 : 장바구니 담기
// *  2 : 상품정보 보기
// *  3 : 닫기
// * fvCode     : 현재 선택된 상품 코드
//*************************************************
var fvFocus = 1;
var fvCode = 1; 

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
 *  0 : 전체 카테고리
 *  1 : 지금 이 상품 이 가격
 *  2 : 지금 이 상품 이 가격 하단 동영상
 *  3 : 저렴한 상품 추천
 *  4 : 할인율 초괴
 *  5 : 추천 세트
 **/
var currentFocusList = 0;

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
 * 지금 이상품 이가격(하단)
 *  이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevPageYN1 = false;
 var nextPageYN1 = false;

/**
 * 저렴한 상품 추천 / 할인율 최고 / 추천 세트
 *  이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevPageYN2 = false;
 var nextPageYN2 = false;


 /**
  * 내가 늘 사는 상품 지금 얼마? : 확인/상세/담기 
  **/
  var btnokfill = '<img src="../images/btn_ok_fill.png"/>';



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
        
        $('#pj_left').addClass("focus");
        global.stbService = Gigamart.app.exhb.STBService.create(EventBus);

        // 팝업 Load
        $('#popup_fv').load("full_video.html");
    }

    
});