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
 *  0 : 상세 카테고리 열1
 *  1 : 상세 카테고리 열2
 *  2 : 상세 카테고리 열3
 *  3 : 앞으로 이동하여 다른 코너로 이동할수 있습니다.
 *  4 : 당일 판매현장 필요?
 **/
var currentFocusList = 0;
/**
 * 상세카테고리 Focus 위치 1열
 * 상세카테고리 Focus 위치 2열
 * 상세카테고리 Focus 위치 3열
 * 0 : 
 * 1 : 
 * 2 :
 * 3 :
  **/
var currentFocusDtl1 = 0;
var currentFocusDtl2 = 0;
var currentFocusDtl3 = 0;
/**
 * 현재 상세카테고리 화살표 button Focus 위치
 * 0 : 아래쪽
 * 1 : 위쪽
 **/
var currentFocusBtn = 0;


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
 *  현재 카테고리 Focus 위치
 *  0 : 사람 모양
 *  1 : 음성 인식
 *  2 : 동그란 사람 얼굴
 *  3 : 쇼퍼's Bag
 *  4 : 과일... 
 **/    
var currentFocusMenu = 3;



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
        //addClass(document.querySelectorAll('category_menu')[currentFocusMenu], 'focus');

        var me = this;
        //$('ul[name="li_discount"] li').eq(currentFocusDtl1).addClass('focus');        
        $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
        


        global.stbService = Gigamart.app.category_dtl.STBService.create(EventBus);


        //me.videoObject = document.querySelector('#cate_bag');
        //global.playerPanel = Gigamart.components.player.PlayerPanel.create();

    }
});