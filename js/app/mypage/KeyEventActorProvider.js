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
                    //세번째 화면 -찜한상품
                    else if(myView == 2){
                        //전체선택 
                        if(favFocusList == 0){
                        }
                        //상품목록
                        else if(favFocusList == 1){
                            //상품목록의 1행일때 전체선택으로 이동
                            if(verticalFocus == 0){
                                $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();
                                favFocusList = 0;
                                $('div[name="fav_allSelect"]').addClass('focus');
                            }
                        }
                        //버튼
                        else if(favFocusList == 2){
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
                    //세번째 화면 -찜한상품
                    else if(myView == 2){
                        //전체선택 
                        if(favFocusList == 0){
                            $('div[name="fav_allSelect"]').removeClass('focus');
                            favFocusList = 1;
                            $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                            $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                                
                        }
                        //상품목록
                        else if(favFocusList == 1){

                            // 첫번째 행 일때
                            if(verticalFocus >= 0 && verticalFocus < 1) {
                                // 총 갯수에서 3을 뺀 수가 포커스보다 작을 때 아래로 이동 불가 
                                console.log("### 마이페이지 찜한상품 아래 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + favFocusMenu);

                                if(currentPageCnt - 4 <= favFocusMenu) {
                                    console.log("###### 마이페이지 찜한상품 아래로 이동 불가");
                                    return;
                                } else {
                                    console.log("###### 마이페이지 찜한상품 아래로 이동 가능");
                                }

                                $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();

                                verticalFocus   = verticalFocus + 1;    // 행 증가
                                horizonFocus    = horizonFocus;         // 열 증감 없음
                                favFocusMenu    = favFocusMenu + 4;     // 위치 변경
                                //updateProductInfo();                    // 우측 상품 정보 갱신

                                $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                            }

                            // 두번째 행 일때
                            else if(verticalFocus == 2) {
                                if(nextPageYN == true) {
                                    // 다음 페이지 조회
                                    console.log("마이페이지 찜한상품 : 다음 페이지 조회");
                                    
                                    // 페이지 이동했으므로 전 페이지 존재
                                    prevPageYN = true;
                                    $('#arrow_top').show();

                                    currentFavListPage = currentFavListPage + 1;
                                    //updateSubCategoryList();    // 페이지 변경
                                    verticalFocus   = verticalFocus - 2;    // 행 감소
                                    horizonFocus    = horizonFocus;         // 열 증감 없음
                                    favFocusMenu    = 0;  // 위치 변경

                                    // 아래로 이동했을때 아래 위치에 상품이 없으면 (이동할 포커스가 다음 페이지 상품 수 보다 큼)
                                    if(currentPageCnt <= favFocusMenu + 1) {
                                        favFocusMenu = currentPageCnt - 1;
                                        horizonFocus = currentPageCnt - 1;
                                    }

                                   //updateProductInfo();                    // 우측 상품 정보 갱신

                                    console.log("### 아래 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + favFocusMenu);
                                    
                                    console.log("### 아래 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + favFocusMenu);

                                    $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                    $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                                }
                                else if(nextPageYN == false) {
                                    // 다음 페이지 없음
                                    console.log("마이페이지 찜한상품 : 다음 페이지 없음");
                                }
                            }


                            //상품목록의 1행일때 2행으로 이동
                            // if(verticalFocus == 0){
                            //     $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                            //     $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();
                            //     verticalFocus   = verticalFocus + 1;        // 행 증가
                            //     horizonFocus    = horizonFocus;     // 열 증감 없음
                            //     favFocusMenu    = favFocusMenu + 4;  // 위치 변경
                            // }
                        }
                        //버튼
                        else if(favFocusList == 2){

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
                    //세번째 화면-찜한상품
                    else if(myView == 2){
                        //전체선택 
                        if(favFocusList == 0){

                        }
                        //상품목록
                        else if(favFocusList == 1){
                            // 상품 목록 두번째, 세번째, 네번째 열일 때
                            if(horizonFocus >= 1 && horizonFocus < 4) {
                                $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();

                                verticalFocus   = verticalFocus;        // 행 증감 없음
                                horizonFocus    = horizonFocus - 1;     // 열 감소
                                favFocusMenu    = favFocusMenu - 1;  // 위치 변경
                                //updateProductInfo();                    // 우측 상품 정보 갱신

                                $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                            }

                        }
                        //버튼->상품목록
                        else if(favFocusList == 2){
                            $('span[name="fav_btn_del"]').removeClass('focus');
                            favFocusList = 1;
                            $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                            $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
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
                    //세번째화면 찜한상품
                    else if(myView == 2){
                        //전체선택 
                        if(favFocusList == 0){

                        }
                        //상품목록
                        else if(favFocusList == 1){
                            console.log("fav menu 길이"+$('li[name="fav_menu"]').length);//3
                            var favMenuLen = $('li[name="fav_menu"]').length;
                            currentPageCnt = favMenuLen
                            // 총 갯수에서 1을 뺀 수가 포커스보다 작을 때 오른쪽으로 이동 불가 
                            console.log("### 우측 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + favFocusMenu);
                            // 상품 목록 첫번째, 두번째 세번째 열일 때
                            if(horizonFocus >= 0 && horizonFocus < 3) {
                                // 우측에 상품이 있을때
                                if(currentPageCnt > favFocusMenu+1) {
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                    $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();

                                    verticalFocus   = verticalFocus;        // 행 증감 없음
                                    horizonFocus    = horizonFocus + 1;     // 열 증가
                                    favFocusMenu    = favFocusMenu + 1;  // 위치 변경
                                    //updateProductInfo();                    // 우측 상품 정보 갱신

                                    $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                    $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                                // 우측에 상품이 없을 때
                                } else if(currentPageCnt == favFocusMenu+1) {
                                    console.log("### 우측에 상품이 없어서 삭제 버튼으로 이동");
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                    $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();

                                    favFocusList = 2; // 화살표 버튼으로

                                    $('span[name="fav_btn_del"]').addClass('focus');
                                }
                            }                   
                        }
                        //버튼
                        else if(favFocusList == 2){

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

                //찜한상품 페이지표시
                var totalFavListPage_html = totalFavListPage+1;
                if(totalFavListPage_html < 10){
                   totalFavListPage_html = "0"+totalFavListPage_html; 
                }
                $('b[name="fav_cur_pg"]').empty().html("01");
                $('span[name="fav_tot_pg"]').empty().html(totalFavListPage_html);
                $('span[name="tot_fav"]').empty().html(resultLen); //상단 찜한 상품 총 갯수
            }
        });
    },


});