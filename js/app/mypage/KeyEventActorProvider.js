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

// 마이 찜한상품
function makeFavProduct() {

    var appendHtml =  '<div class="dl_menu_area">';
        appendHtml += '    <ul> ';
        appendHtml += '    <li class="dl_menu mg_r5" name="fav_menu">';
        appendHtml += '    <span class="dlm_checkbox"><img src="../images/checkbox.png" /></span>';
        appendHtml += '    <span class="dm_bdr"></span>';
        appendHtml += '       <ul>';
        appendHtml += '           <li class="dlm_img" name="fav_img"></li>';
        appendHtml += '           <li class="dlm_tit" name="fav_tit"></li>';
        appendHtml += '           <li class="dlm_price" name="fav_price"></li>';
        appendHtml += '      </ul>';
        appendHtml += '    </li>';
        appendHtml += '    </ul>';
        appendHtml += '</div>';

        // <div class="dl_menu_area">
        //     <ul>    
        //         <li class="dl_menu mg_r5" name="fav_menu">
        //             <span class="dlm_checkbox"><img src="../images/checkbox_sel.png" /></span>
        //             <span class="dm_bdr"></span>
        //             <ul>
        //                 <li class="dlm_img" name="fav_img"><img src="../images/sample_01.jpg" /></li>
        //                 <li class="dlm_tit" name="fav_tit">1달달한 사과</li>
        //                 <li class="dlm_price" name="fav_price">24,900원</li>
        //             </ul>
        //         </li>
        //     </ul>
        // </div>

    $('#div_fav').append(appendHtml);
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
                        //장바구니
                        if(currentFocusMenu == 0){

                        }
                        //찜한상품
                        else if(currentFocusMenu == 1){
                            $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                            $('div[name="view_my"]').hide();
                            myView = 2;
                            $('div[name="view_fav"]').show();
                            this.myFavList();

                            


                        }
                        //최근본상품
                        else if(currentFocusMenu == 2){
                            // $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                            // $('div[name="view_my"]').hide();
                            // myView = 3;
                            // $('div[name="view_new"]').show();
                        }
                        //취소 환불내역
                        else if(currentFocusMenu == 3){
                            $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                            $('div[name="view_my"]').hide();
                            myView = 4;
                            $('div[name="view_ref"]').show();  
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
                //마이페이지 메인
                if(myView == 0){
                    location.href="category.html";
                }
                //장바구니화면
                else if(myView == 1){

                }
                //찜한상품 화면
                else if(myView == 2){
                    $('div[name="view_fav"]').hide();
                    myView = 0;
                    $('div[name="view_my"]').show();
                    $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                }
                //최근본상품 화면
                else if(myView == 3){

                }
                //취소/환불내역 화면
                else if(myView == 4){
                    $('div[name="view_ref"]').hide();
                    myView = 0;
                    $('div[name="view_my"]').show();
                    $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                }

                
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
    // 조회 : 찜한상품
    myFavList: function() {
        var param = '';
        var appendHtml = '';
        var str = '';

        $.ajax({
            url         : cmsServerIp + "/BuyerFavoriteTask/Select",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                var resultLen  = result['favorite'].length;
                // 결과값이 8보다 크면 다음 페이지 존재
                if(resultLen > 8) { 
                    for(var i=0; i<8; i++){
                        makeFavProduct();  
                    }
                    $('a[name="arrow_top_fav"]').removeClass('arrow_top');
                    $('a[name="arrow_bottom_fav"]').addClass('arrow_bottom focus');
                }
                // 결과값이 8보다 작은경우 다음페이지 존재x
                else if(resultLen < 8){
                    for(var i=0; i<resultLen; i++){
                        makeFavProduct();  
                    }
                    $('a[name="arrow_top_fav"]').removeClass('arrow_top');
                    $('a[name="arrow_bottom_fav"]').removeClass('arrow_bottom');
                }
                console.log("##### 찜한상품 List json " + JSON.stringify(result));
                $.each(result['favorite'], function(index, entry) {
                    arrFavList = new Array(); // 리스트 초기화
                    var cnt = 0;
                    $('li[name="fav_img"]').eq(index).empty().append('<img src="' + cmsServerIp + entry["img"] + '" height="92" width="162" />');
                    $('li[name="fav_tit"]').eq(index).empty().append(entry['name']);
                    $('li[name="fav_price"]').eq(index).empty().append(cn_toPrice(entry['cost']) +"원");
                    
                    appendHtml = {
                                        "img" : entry['img'],
                                        "name" : entry['name'],
                                        "cost" : entry['cost']
                                     };
                    cnt                 = Math.floor(index / maxFavListPage);
                    var str             = appendHtml;
                    arrFavList[index]    = str;
                    console.log("index : " + index + " maxFavListPage : " + maxFavListPage + " cnt : " + cnt);
                    
                    totalFavListPage = cnt;

                    console.log("arrFavList[index]: " + arrFavList[index]);

                });
                console.log("#####################################");
                console.log("찜 총페이지수: " + totalFavListPage);
                console.log("######################################");
                $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
            }
        });
    },


});