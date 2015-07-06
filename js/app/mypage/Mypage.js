'use strict';

/**
 *  Shopper_bag Js : Main
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
//*  팝업 없을 때
//*************************************************

//*************************************************
// *  상품정보 위치(첫번째화면 / 두번째화면)
// *  0 : 첫번째화면 - 마이페이지 main         view_my
// *  1 : 두번째화면 - 장바구니           
// *  2 : 세번째화면 - 찜한상품                view_fav
// *  3 : 네번째화면 - 최근본상품              view_new
// *  4 : 다섯번째화면 - 취소/환불내역         view_ref
// *  5 : 여섯번째화면 - 취소/환불내역-상세1   view_ref_dt1
// *  6 : 일곱번째화면 - 취소/환불내역-상세2   view_ref_dt2
// *  7 : 여덟번째화면 - 주문내역              view_order
// *  8 : 아홉번째화면 - 주문내역 상세1        view_order_dt1
// *  9 : 열번째화면   - 주문내역 상세2        view_order_dt2
//*************************************************
var myView = 0;

//*************************************************
// *  이전페이지로 갈때 
// *  0 : 주문내역상세-> 마이페이지 
// *  1 : 주문내역상세-> 주문내역
//*************************************************
var myViewOrderPrev = 1;

//*******************************************************************************************************
//*  장바구니 목록 start
//*******************************************************************************************************

/** 
 *  현재 리스트 Focus 위치
 *  0 : 장바구니 최근본상품, 취소/환불내역
 *  1 : 주문내역
 *  2 : 버튼
 *  3 : 
 *  4 : 
 **/
var currentFocusList = 0;

/** 
 *  마이페이지메인 장바구니, 최근본상품, 취소/환불내역 버튼 list Focus 위치
 *  0 : 장바구니
 *  1 : 최근본상품
 *  2 : 
 *  3 : 
 **/    
var currentFocusMenu = 0;

/**
 * 마이페이지메인 주문내역 Focus 위치 0 1 2
  **/
var currentFocusMenu2 = 0;

/**
 * 마이페이지메인 버튼 Focus 위치
 * 0 : 이용안내
 * 1 : 공지사항
 * 2 : 자주묻는질문
 * 3 : GIGA마트소식
  **/
var currentFocusMenu3 = 0;

/**
 * 쥬문내역 더보기 focus여부
 * false : focus X
 * true  : focus O
 **/
var ordBtnFocus = false;

//*******************************************************************************************************
//*  장바구니 목록 end
//*******************************************************************************************************



//*******************************************************************************************************
//*  찜한상품 start
//*******************************************************************************************************

/** 
 *  찜한리스트 Focus 위치
 *  0 : 전체선택
 *  1 : 상품목록
 *  2 : 버튼
 *  3 : 상품이 없을때의 팝업
 *  4 : 
 **/
var favFocusList = 1;

//찜한리스트 상품목록 Focus 위치
//var favFocusMenu = 0;

/**찜한리스트 버튼 focus위치
*  0  : 선택삭제
**/
var favFocusMenu = 0;
/**
 * 찜한상품 행열의 위치 
 * horizonFocus    = 가로 0 1 2 3
 * verticalFocus   = 세로 0 1 2 3
 * favFocusMenu    = 현재 위치 0123
 *                             4567
 * arrFavList      = 찜한상품list 배열
 * currentPageCnt  = 현재 페이지의 상품 갯수
 **/
var horizonFocus  = 0;
var verticalFocus = 0;
var favFocusMenu = 0;
var arrFavList          = new Array();
var currentPageCnt = 0;

/**
 * 찜한상품 버튼위치 
 * 0   = 편집
 * 1   = 선택삭제
 **/
var favBtnFocus = 0;

/**
 * 찜한상품 편집모드 
 * false  = 편집모드 X
 * true   = 편집모드 O
 **/
var favUpdateMode = false;
//*************************************************
// *  찜한상품list page
// * currentFavListPage       = 찜한상품list 현재 페이지 (default : 0)
// * totalFavListPage         = 찜한상품list 전체 페이지
// * maxFavListPage           = 찜한상품list 한 페이지에 들어갈 쇼퍼 수 (default : 8)

//*************************************************
var currentFavListPage  = 0;
var totalFavListPage    = 0;
var maxFavListPage      = 8;

/**
 * 찜한상품이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevPageYN = false;
 var nextPageYN = false;

//*******************************************************************************************************
//*  찜한상품 end
//*******************************************************************************************************





//*******************************************************************************************************
//*  자주구매한상품 start
//*******************************************************************************************************

/** 
 *  자주구매한상품 리스트 Focus 위치
 *  0 : 상품목록
 *  1 : 상품이 없을때의 팝업
 *  2 : 
 **/
var newFocusList = 0;

//자주구매한상품 리스트 상품목록 Focus 위치
//var favFocusMenu = 0;

/**
 * 자주구매한상품 행열의 위치 
 * horizonNewFocus    = 가로 0 1 2 3
 * verticalNewFocus   = 세로 0 1 2 3
 * newFocusMenu    = 현재 위치 0123
 *                             4567
 * arrNewList      = 자주구매한상품 list 배열
 * currentNewPageCnt  = 현재 페이지의 상품 갯수
 **/
var horizonNewFocus  = 0;
var verticalNewFocus = 0;
var newFocusMenu = 0;
var arrNewList          = new Array();
var currentNewPageCnt = 0;

//*************************************************
// *  자주구매한상품list page
// * currentNewListPage       = 자주구매한상품list 현재 페이지 (default : 0)
// * totalNewListPage         = 자주구매한상품list 전체 페이지
// * maxNewListPage           = 자주구매한상품list 한 페이지에 들어갈 쇼퍼 수 (default : 8)

//*************************************************
var currentNewListPage  = 0;
var totalNewListPage    = 0;
var maxNewListPage      = 8;

/**
 * 자주구매한상품이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevNewPageYN = false;
 var nextNewPageYN = false;

//*******************************************************************************************************
//*  자주구매한상품 end
//*******************************************************************************************************






//*******************************************************************************************************
//*  주문내역 start
//*******************************************************************************************************

//*************************************************
// *  주문내역 list page
// * currentOrderListPage       = 주문내역 LIST 현재 페이지 (default : 0)
// * totalOrderListPage         = 주문내역 LIST 전체 페이지
// * maxOrderListPage           = 주문내역 LIST 한 페이지에 들어갈 쇼퍼 수 (default : 2)
// * arrOrderList               = 주문내역 LIST 배열
//*************************************************
var currentOrderListPage  = 0;
var totalOrderListPage    = 0;
var maxOrderListPage      = 2;
var arrOrderList          = new Array();

/** 
 *  현재 주문내역 리스트 Focus 위치
 *  0 : 조회기간
 *  1 : 주문내역 list
 *  2 : 
 *  3 : 
 **/
var orderFocusList = 1;
/** 
 *  주문내역list Focus 위치
 *  0 : 
 *  1 : 
 **/    
var orderFocusMenu = 0;
/**
 * 주문내역 이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevOrderPageYN = false;
 var nextOrderPageYN = false;


//*******************************************************************************************************
//*  주문내역 end
//*******************************************************************************************************



//*******************************************************************************************************
//*  주문내역상세1 start
//*******************************************************************************************************

//*************************************************
// *  주문내역상세 list page
// * currentOrderDtListPage       = 주문내역상세 LIST 현재 페이지 (default : 0)
// * totalOrderDtListPage         = 주문내역상세 LIST 전체 페이지
// * maxOrderDtListPage           = 주문내역상세 LIST 한 페이지에 들어갈 쇼퍼 수 (default : 2)
// * arrOrderDtList               = 주문내역상세 LIST 배열
// * arrOrderDtTotalList          = 주문내역상세 total LIST 배열
//*************************************************
var currentOrderDtListPage  = 0;
var totalOrderDtListPage    = 0;
var maxOrderDtListPage      = 2;
var arrOrderDtList          = new Array();
var arrOrderDtTotalList     = new Array();

/** 
 *  현재 주문내역 리스트 Focus 위치
 *  0 : 조회기간
 *  1 : 주문내역 list
 *  2 : 
 *  3 : 
 **/
var orderDtFocusList = 1;
/** 
 *  주문내역list Focus 위치
 *  0 : 
 *  1 : 
 **/    
var orderDtFocusMenu = 0;
/**
 * 주문내역 이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevOrderDtPageYN = false;
 var nextOrderDtPageYN = false;

/**
 * 주문내역상세 마지막 total페이지에 위치 true /false
*  true일 경우 total페이지(총금액 알수있는..)에 있는것
 **/
var orderDtTotalPageYN = false;

//*******************************************************************************************************
//*  주문내역상세1 end
//*******************************************************************************************************




//*******************************************************************************************************
//*  주문내역상세2 start
//*******************************************************************************************************


/** 
 *  현재 주문내역 리스트 Focus 위치
 *  0 : 주문내역 list
 *  1 : 버튼
 *  2 : 
 *  3 : 
 **/
var orderDt2FocusList = 0;
/** 
 *  주문내역상세2list Focus 위치
 *  0 : 
 *  1 : 
 *  2 : 
 **/    
var orderDt2FocusMenu = 0;

/**
 * 주문내역상세2 버튼위치 
 * 0   = 주문내역가기
 * 1   = 주문취소하기
 **/
var orderDt2BtnFocus = 0;

//*******************************************************************************************************
//*  주문내역상세2 end
//*******************************************************************************************************












//*******************************************************************************************************
//*  취소/환불내역 start
//*******************************************************************************************************

//*************************************************
// *  취소/환불내역 list page
// * currentRefListPage       = 취소/환불내역 LIST 현재 페이지 (default : 0)
// * totalRefListPage         = 취소/환불내역 LIST 전체 페이지
// * maxRefListPage           = 취소/환불내역 LIST 한 페이지에 들어갈 쇼퍼 수 (default : 2)
// * arrRefList               = 취소/환불내역 LIST 배열
//*************************************************
var currentRefListPage  = 0;
var totalRefListPage    = 0;
var maxRefListPage      = 2;
var arrRefList          = new Array();

/** 
 *  현재 취소/환불내역 리스트 Focus 위치
 *  0 : 조회기간
 *  1 : 취소/환불내역 list
 *  2 : 
 *  3 : 
 **/
var refFocusList = 1;
/** 
 *  취소/환불내역list Focus 위치
 *  0 : 
 *  1 : 
 **/    
var refFocusMenu = 0;
/**
 * 취소/환불내역 이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevRefPageYN = false;
 var nextRefPageYN = false;


//*******************************************************************************************************
//*  취소/환불내역 end
//*******************************************************************************************************



//*******************************************************************************************************
//*  취소/환불내역상세1 start
//*******************************************************************************************************

//*************************************************
// *  취소/환불내역상세 list page
// * currentRefDtListPage       = 취소/환불내역상세 LIST 현재 페이지 (default : 0)
// * totalRefDtListPage         = 취소/환불내역상세 LIST 전체 페이지
// * maxRefDtListPage           = 취소/환불내역상세 LIST 한 페이지에 들어갈 쇼퍼 수 (default : 2)
// * arrRefDtList               = 취소/환불내역상세 LIST 배열
// * arrOrderDtTotalList        = 취소/환불내역상세 total페이지 LIST 배열
//*************************************************
var currentRefDtListPage  = 0;
var totalRefDtListPage    = 0;
var maxRefDtListPage      = 2;
var arrRefDtList          = new Array();
var arrOrderDtTotalList   = new Array();

/** 
 *  현재 취소/환불내역 리스트 Focus 위치
 *  0 : 조회기간
 *  1 : 취소/환불내역 list
 *  2 : 
 *  3 : 
 **/
var refDtFocusList = 1;
/** 
 *  취소/환불내역list Focus 위치
 *  0 : 
 *  1 : 
 **/    
var refDtFocusMenu = 0;
/**
 * 취소/환불내역 이전/다음 페이지 true /false
 *  true일 경우 전/다음 페이지 있음
 **/
 var prevORefDtPageYN = false;
 var nextRefDtPageYN = false;

/**
 * 취소/환불내역상세 마지막 total페이지에 위치 true /false
*  true일 경우 total페이지(총금액 알수있는..)에 있는것
 **/
var refDtTotalPageYN = false;

//*******************************************************************************************************
//*  취소/환불내역상세1 end
//*******************************************************************************************************




//*******************************************************************************************************
//*  취소/환불내역상세2 start
//*******************************************************************************************************


/** 
 *  현재 취소/환불내역 리스트 Focus 위치
 *  0 : 취소/환불내역 list
 *  1 : 버튼
 *  2 : 
 *  3 : 
 **/
var refDt2FocusList = 0;
/** 
 *  취소/환불내역상세2list Focus 위치
 *  0 : 
 *  1 : 
 *  2 : 
 **/    
var refDt2FocusMenu = 0;

/**
 * 취소/환불내역상세2 버튼위치 
 * 0   = 주문내역가기
 * 1   = 주문취소하기
 **/
var refBtnFocus = 0;

//*******************************************************************************************************
//*  취소/환불내역상세2 end
//*******************************************************************************************************














/**
  * 찜한상품 : 확인/상세/담기 
  **/
  var btnokfill = '<img src="../images/btn_ok_fill.png" style="width : 152px; margin-top: 7px;"/>';


global.onload = function() {
    global.Shopper_bag = Gigamart.app.shopper_bag.Shopper_bag.create();
    global.Shopper_bag.init();
};
App.defineClass('Gigamart.app.shopper_bag.Shopper_bag', {
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

        $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
        global.stbService = Gigamart.app.shopper_bag.STBService.create(EventBus);

        // 음소거 on (영상 재생시 off)
        var appConfiguration = window.oipfObjectFactory.createConfigurationObject();
        appConfiguration.localSystem.mute = true;

        $('#popup_cart').load("easy_cart.html");
    }
});