'use strict';


// 숫자 -> 금액
function cn_toPrice(n) {
    if(isNaN(n)){return 0;}
    var reg = /(^[+-]?\d+)(\d{3})/;   
    n += '';
    while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

/**
 *  KeyEventActorProvider Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.order.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        // 1. 장바구니 조회
        this.selectCartList();

    },

    // ************************************************************************
    // ** 공통 키 이벤트
    // ************************************************************************

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;

        console.log("############ 전체 영상보기 keyCode " + keyCode);
        
        // **************************************************
        // * 三 KEY (플로팅 장바구니)
        // **************************************************
        if(keyCode === global.VK_GREEN) {

        }

        // **************************************************
        // * ◀ KEY (플로팅 Go home)
        // **************************************************
        if(keyCode === global.VK_RED) {
            location.href ="exhb.html" ; // 기획전 이동
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
            // 장바구니 담기
            if(currentFocus == 1) {
                console.log("장바구니 담기..");
            }

            // 상품 상세보기
            if(currentFocus == 2) {
                console.log("상품 상세보기..");
            }

            // 닫기
            if(currentFocus == 3) {
                location.href ="../index.html?GO_EXHB=Y" ; // 기획전 이동
            }

        } 

        // **************************************************
        // * 좌 우 위 아래 KEY
        // **************************************************
        else if (keyCode >= global.VK_LEFT && keyCode <= global.VK_DOWN) {
            // **************************************************
            // * 위 KEY
            // **************************************************
            if(keyCode === global.VK_UP) {
               // 상품 상세보기
                if(currentFocus == 2) {
                    console.log("상품 상세보기..");
                }

                // 닫기
                if(currentFocus == 3) {
                    location.href ="../index.html?GO_EXHB=Y" ; // 기획전 이동
                }
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
            window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
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
    },

    // ************************************************************************
    // ** 장바구니
    // ************************************************************************

    // 장바구니 조회
    selectCartList: function() {
        var param = {
                        
                    };
        $.ajax({
            url         : cmsServerIp + "/BuyerCartTask/Select",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                console.log("####### 장바구니 조회 result : " + JSON.stringify(result));
            },
            complete    : function(result) {

            }
        });
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
    }

});