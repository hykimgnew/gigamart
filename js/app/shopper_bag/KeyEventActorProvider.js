'use strict';


// 마트는 지금 레이아웃 생성
function makeTweetList() {

    var appendHtml =  '<li class="smtc_person">';
        appendHtml += ' <span name="shopper_img"></span>';
        appendHtml += '     <ul>';
        appendHtml += '         <li name="shopper_id"></li>';
        appendHtml += '         <li name="tweet_date"></li>';
        appendHtml += '     </ul>';
        appendHtml += '</li>';
        appendHtml += '<li name="tweet" class="smtc_txt"></li>';
        appendHtml += '<li name="product_img" class="smtc_img"></li>';

    $('#ul_tweet').append(appendHtml);
}


/**
 *  Shopper_bag Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.shopper_bag.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        // 쇼퍼 List
        this.selectShopperList();

        // 마트는 지금
        this.selectTweetList();

    },

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;

        console.log("############ 전체 영상보기 keyCode " + keyCode);
        
        // *****************************************************************************
        // * 간편 장바구니 팝업
        // *****************************************************************************
        if(isCart == true) {
            console.log("# 간편 장바구니 팝업 : " + keyCode);
            // **************************************************
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode === global.VK_GREEN) {
                isCart = false;
                $('#wrap').html(cartHtml); // 백업한 html 을 다시 복구
            }

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                
            } 

            // **************************************************
            // * 좌 우 위 아래 KEY
            // **************************************************
            else if (keyCode >= global.VK_LEFT && keyCode <= global.VK_DOWN) {
                // **************************************************
                // * 위 KEY
                // **************************************************
                if(keyCode === global.VK_UP) {
                    
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {

                }

                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {
                    
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {

                }
                
            } else if (keyCode === global.VK_BACK) {
                isCart = false;
                $('#wrap').html(cartHtml); // 백업한 html 을 다시 복구
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                
            }
        }








        // *****************************************************************************
        // * 팝업 없을 때
        // *****************************************************************************
        else if(isCart == false) {
            // **************************************************
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode === global.VK_GREEN) {
                isCart = true;
                cartHtml = $('#wrap').html(); // 간편 장바구니에 들어갈 부분의 html 백업 (간편 장바구니 해제 후에 다시 돌려두어야함)
                $('#wrap').load("easy_cart.html");
                $('#ecc_payments').addClass('focus');
            }

            // **************************************************
            // * ◀ KEY (플로팅 Go home)
            // **************************************************
            if(keyCode === global.VK_RED) {
                /** 기획전으로 이동 */
                location.href = "exhb.html";
            }

            // **************************************************
            // * PLAY KEY (메뉴/카테고리)
            // **************************************************
            if(keyCode === global.VK_PLAY) {
                /** 전체 카테고리로 이동 */
                location.href = "category.html";
            }

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {

            } 

            // **************************************************
            // * 좌 우 위 아래 KEY
            // **************************************************
            else if (keyCode >= global.VK_LEFT && keyCode <= global.VK_DOWN) {
                // **************************************************
                // * 위 KEY
                // **************************************************
                if(keyCode === global.VK_UP) {

                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                   
                }
                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {

                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    
                }
                
            } else if (keyCode === global.VK_BACK) {
                location.href="category.html";
                //window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
            } else if (keyCode === global.VK_ESCAPE) {
                /*if(isPopup){
                    isPopup = false;
                    reservationPopup.closePopup();
                }else {
                    destroyed();
                }*/
                window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                
            }
        }
    },

    addKeyEventActor: function (instance, conditionFunction) {
    	this.actors.push({
    		instance: instance,
    		conditionFunction: conditionFunction
    	});
    },

    destroyed: function () {
        /** 팝업? 종료 시 호출 */
        window.document.removeEventListener('keydown', keyDownEventReceivedForDetail, false);
        changeWindow(WindowType.main);
        initIndexFocus();
    },


    // 조회 : 쇼퍼 List (인기순)
    selectShopperList: function() {
        var param = '';
        
        $.ajax({
            url         : cmsServerIp + "/TVShopperBag/popular",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                 console.log("##### 쇼퍼 List (인기순) List json " + JSON.stringify(result));

                 console.log("#~~~~ : " + JSON.stringify(result['shopper']));

                 $('p[name="shopper_img"]').eq(0).empty().append("<img src=" + cmsServerIp + result['shopper']['img'] + " width='160' height='120' />");
                 $('span[name="shopper_name"]').eq(0).empty().append("ID : " + result['shopper']['shopper_id']);
                 $('span[name="epilogue"]').eq(0).empty().append("(후기 : " + result['shopper']['reply_cnt'] + ")");
                 $('p[name="description"]').eq(0).empty().append(result['shopper']['description']);
                 $('span[name="popular_order"]').eq(0).empty().append("인기 주문 :  " + result['shopper']['shopping_main'] + "");

                /*$.each(result['shopper'], function(index, entry) { 
                    // *** 쇼퍼 별점 ***
                    var shopperRating   = Number(entry['rating']);       // 쇼퍼 평점
                    var shopperStar     = "";                           // 쇼퍼 별점 HTML

                    if(shopperRating >= 20) shopperStar += '<img src="../images/icon_star.png" />';
                    else                    shopperStar += '<img src="../images/icon_star_blank.png" />';
                    if(shopperRating >= 40) shopperStar += '<img src="../images/icon_star.png" />';
                    else                    shopperStar += '<img src="../images/icon_star_blank.png" />';
                    if(shopperRating >= 60) shopperStar += '<img src="../images/icon_star.png" />';
                    else                    shopperStar += '<img src="../images/icon_star_blank.png" />';
                    if(shopperRating >= 80) shopperStar += '<img src="../images/icon_star.png" />';
                    else                    shopperStar += '<img src="../images/icon_star_blank.png" />';
                    if(shopperRating >= 100)shopperStar += '<img src="../images/icon_star.png" />';
                    else                    shopperStar += '<img src="../images/icon_star_blank.png" />';

                    $('span[name="shopper_rating"]').eq(index).empty().append(shopperStar);

                    // *** 쇼퍼 이미지 ***
                    //$('p[name="shopper_img"]').eq(index).empty().append("<img src=" + cmsServerIp + entry['img'] + " width='160' height='120' />");
                    
                    // *** 쇼퍼 ID ***
                    //$('span[name="shopper_name"]').eq(index).empty().append("ID : " + entry['shopper_id']);
                    
                    // *** 쇼퍼 후기 ***
                    $('span[name="epilogue"]').eq(index).empty().append("(후기 : " + "API누락" + ")");

                    // *** 쇼퍼 설명 ***
                    //$('p[name="description"]').eq(index).empty().append(entry['description']);
                    
                    // *** 인기주문 ***
                    $('span[name="popular_order"]').eq(index).empty().append("인기 주문 :  " + "API 누락" + "");
                }); */

            }
        });
    },

    // 조회 : 쇼퍼 추천세트 (인기순) (TODO: GUI만 표시..)
    /*selectShopperList: function() {
        var param = '';
        
        $.ajax({
            url         : cmsServerIp + "/ShopperTask/Select/Popular/",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
            }
        });
    },*/


    // 조회 : 마트는 지금?
    selectTweetList: function() {
        var param = '';
        
        $.ajax({
            url         : cmsServerIp + "/mart_now/tv_api",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {

                //console.log("##### mart List json " + JSON.stringify(result));  

                console.log("################## " + result['tweet'].length);

                /*for(var i=0 ; i < result['tweet'].length ; i++) {
                    makeTweetList();
                }*/

                $.each(result['tweet'], function(index, entry) {
                    makeTweetList();

                    // *** 쇼퍼 이미지 ***/
                    $('span[name="shopper_img"]').eq(index).empty().append("<img src=" + cmsServerIp + entry['shopper_img'] + " width='60' height='68' />");
                    // *** 쇼퍼 ID ***/
                    $('li[name="shopper_id"]').eq(index).empty().append(entry['shopper_id']);
                    // *** 트윗 일시 ***/
                    $('li[name="tweet_date"]').eq(index).empty().append(entry['tweet_date']);
                    // *** 트윗 내용 ***/
                    $('li[name="tweet"]').eq(index).empty().append(entry['tweet']);
                    // *** 제품 이미지 ***/
                    $('li[name="product_img"]').eq(index).empty().append("<img src=" + cmsServerIp + entry['product_img'] + " width='393' height='180' />");
                });
            }
        });
    } 
});