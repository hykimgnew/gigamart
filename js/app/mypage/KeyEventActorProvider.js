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
 *  Shopper_bag Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.shopper_bag.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;
    	me.actors = [];
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
                //첫번째 화면-마이페이지
                if(myView == 0){
                    //상단메뉴
                    if(currentFocusList == 0){
                    }
                    //주문내역
                    else if(currentFocusList == 1){
                    }
                    //버튼
                    else if(currentFocusList == 2){

                    }
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
                    //첫번째 화면-마이페이지
                    if(myView == 0){
                        //상단메뉴
                        if(currentFocusList == 0){
                        }
                        //주문내역
                        else if(currentFocusList == 1){
                        }
                        //버튼
                        else if(currentFocusList == 2){

                        }
                    }
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                   //첫번째 화면-마이페이지
                    if(myView == 0){
                        //상단메뉴
                        if(currentFocusList == 0){
                        }
                        //주문내역
                        else if(currentFocusList == 1){
                        }
                        //버튼
                        else if(currentFocusList == 2){

                        }
                    }
                   
                }
                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {
                    //첫번째 화면-마이페이지
                    if(myView == 0){
                        //상단메뉴
                        if(currentFocusList == 0){
                            //상단메뉴 2번째->1번째
                            if(currentFocusMenu == 1){
                                $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu) - 1;
                                $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                            }
                            //상단메뉴 3번째->2번째
                            else if(currentFocusMenu == 2){
                                $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu) - 1;
                                $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                            }
                            //상단메뉴 4번째->3번째
                            else if(currentFocusMenu == 3){
                                $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu) - 1;
                                $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                            }
                        }
                        //주문내역
                        else if(currentFocusList == 1){
                        }
                        //버튼
                        else if(currentFocusList == 2){

                        }
                    }
                   

                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    //첫번째 화면-마이페이지
                    if(myView == 0){
                        //상단메뉴
                        if(currentFocusList == 0){
                            //상단메뉴 1번째->2번째
                            if(currentFocusMenu == 0){
                                $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu) + 1;
                                $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                            }
                            //상단메뉴 2번째->3번째
                            else if(currentFocusMenu == 1){
                                $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu) + 1;
                                $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                            }
                            //상단메뉴 3번째->4번째
                            else if(currentFocusMenu == 2){
                                $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu) + 1;
                                $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                            }
                        }
                        //주문내역
                        else if(currentFocusList == 1){
                        }
                        //버튼
                        else if(currentFocusList == 2){

                        }
                    }
                    
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
    }


});