'use strict';

/**
 *  Category Js : Main
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
// *  쇼퍼 주문 이력 팝업
// * histHtml = 쇼퍼 주문 이력 HTML
// * histFocus = 쇼퍼 주문 이력 Focus 값
// *  0 : 선택 안됐을 때
// *  1 : 주문 이력
// *  2 : 쇼퍼 리얼 타임 버튼
// *  3 : 닫기
// * histPage = 주문 이력 페이지
//*************************************************
var histHtml = "";
var histFocus = 0;
var histPage = 1;

/** 
 *  현재 리스트 Focus 위치
 *  0 : 카테고리
 *  1 : 상세 카테고리
 *  2 : 쇼퍼's bag
 *  3 : 쇼퍼 주문 이력
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

    }
        
       
});