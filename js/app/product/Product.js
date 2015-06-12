'use strict';

/**
 *  Product Js : Main
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
/** 
 *  현재 리스트 Focus 위치
 *  0 : 버튼들-상세보기 찜하기 장바구니담기 +-
 *  1 : 상품정보 전체화면
 *  2 : 같은종류 추천상품
 *  3 : 다른사람이 구매한 연관상품
 *  4 :
 **/
var currentFocusList = 0;

//*************************************************
// *  전체 영상보기 팝업
// * fvFocus    : 현재 포커스 위치
// *  1 : 장바구니 담기
// *  2 : 상품정보 보기
// *  3 : 닫기
// * fvCode     : 현재 선택된 상품 코드
//*************************************************
var fvFocus = 1;

/** 
 *  버튼 focus 위치
 *  0 : 상세보기 
 *  1 : 찜하기
 *  2 : 장바구니 담기
 *  3 : +
 *  4 : -
 **/
var btFocus = 2;

/** 
 *  같은종류 추천상품 Focus 위치
 *  0 : 
 *  1 : 
 *  2 : 
 *  3 : 
 **/    
var currentFocusMenu = 0;
/** 
 *  다른사람이 구매한 연관상품 Focus 위치
 *  0 : 
 *  1 : 
 *  2 : 
 *  3 : 
 **/    
var currentFocusMenul = 0;
/**
 * 현재 상세카테고리 Focus 위치
 * 0 : 사과/배
 * 1 : 참외/토마토...
 **/
var currentFocusDtl = 0;



/**
 * 같은종류 추천상품 Focus 위치 1행
 * 같은종류 추천상품 Focus 위치  2행
 * 같은종류 추천상품 Focus 위치 3행
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
    global.Product = Gigamart.app.product.Product.create();
    global.Product.init();
};
App.defineClass('Gigamart.app.product.Product', {
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
        //addClass(document.querySelectorAll('category_menu')[currentFocusMenu], 'focus');

        var me = this;
        //$('ul[name="li_discount"] li').eq(currentFocusDtl1).addClass('focus');        
        $('li[name="add_cart"]').addClass('focus');
        


        global.stbService = Gigamart.app.product.STBService.create(EventBus);


        //me.videoObject = document.querySelector('#cate_bag');
        //global.playerPanel = Gigamart.components.player.PlayerPanel.create();

    }
});