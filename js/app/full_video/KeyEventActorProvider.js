'use strict';

/**
 *  Full_video Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.full_video.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

    },

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;

        console.log("############ keyCode " + keyCode);
        
        // **************************************************
        // * 三 KEY (플로팅 장바구니)
        // **************************************************
        if(keyCode == VK_GREEN) {

        }

        // **************************************************
        // * ◀ KEY (플로팅 Go home)
        // **************************************************
        if(keyCode == VK_RED) {

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
                location.href = "/view/exhb.html"; // 기획전으로 이동
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
                    location.href = "/view/exhb.html"; // 기획전으로 이동
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