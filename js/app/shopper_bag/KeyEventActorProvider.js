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

// 마트는 지금 레이아웃 생성
function makeTweetList() {
    var appendHtml =  '<li class="rt_list" name="rt_list">';
        appendHtml += '<ul>';
        appendHtml += '<li class="smtc_person">';
        appendHtml += ' <span name="shopper_img"></span>';
        appendHtml += '     <ul name="rt_f">';
        appendHtml += '         <li name="shopper_id"></li>';
        appendHtml += '         <li name="tweet_date"></li>';
        appendHtml += '     </ul>';
        appendHtml += '</li>';
        appendHtml += '<li name="tweet" class="smtc_txt"></li>';
        appendHtml += '<li name="product_img" class="smtc_img"></li>';
        appendHtml += '</ul>'
        appendHtml += '</li>'

    $('#ul_tweet').append(appendHtml);
}

// 쇼퍼 추천세트 list(인기순)
function makeShopperProduct() {

    var appendHtml =  '<li class="pl_menu" name="pl_menu">';
        appendHtml += '    <a href="#" class="dlm_rank"><b name="dlm_rankNm">1</b>위</a>';
        appendHtml += '    <span class="polygon_l">100원 <img src="../images/icon_order.png" /></span>';
        appendHtml += '    <span class="dm_bdr"></span>';
        appendHtml += '    <ul>';
        appendHtml += '       <li class="dlm_img" name="dl_img"></li>';
        appendHtml += '       <li class="dlm_tit" name="dl_setName"></li>';
        appendHtml += '       <li class="dlm_price" name="dl_cost"></li>';
        appendHtml += '    </ul>';
        appendHtml += '</li>';

        /*<li class="pl_menu mg_r10" name="pl_menu">
            <a href="#" class="dlm_rank"><b>1</b>위</a>
            <span class="polygon_l">100원 <img src="../images/icon_order.png" /></span>
            <span class="dm_bdr"></span><!-- <span class="dm_bdr"><img src="../images/btn_ok_fill.png"/></span> -->
            <ul>
                <li class="dlm_img" name="dl_img"><!-- <img src="../images/sample_01.jpg" /> --></li>
                <li class="dlm_tit" name="dl_setName"><!-- 날렵한 갈치 --></li>
                <li class="dlm_price" name="dl_cost"><!-- 15,900원 --></li>
            </ul>
        </li>*/

    $('#ul_tweet2').append(appendHtml);
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

        // 쇼퍼 추천세트List
        this.selectShopperList2();


        // 마트는 지금
        this.selectTweetList();
        
        //쇼퍼 list 화살표 on / off
        this.shopperArrow();

        //마트는지금 list 화살표 on / off
        this.martArrow();

        $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
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
                $('#popup_cart').hide();
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
                $('#popup_cart').hide();
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
                isCart      = true;
                cartFocus   = 1;    // 결제 버튼 Focus
                cartPage    = 0;    // 첫 페이지로
                $('#popup_cart').show();
                $('#ecc_payments').addClass('focus'); // 첫 포커스-결제버튼
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
                //쇼퍼list일때 팝업 show
                if(currentFocusList == 0){
                    $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');
                    currentFocusList = 3;
                    $('div[name="shopper_detail"]').show();
                    $('.btn_close').addClass('focus');  
                }
                //쇼퍼 상세팝업일때
                else if(currentFocusList == 3){
                    //닫기버튼
                    if(shpPopFocus == 0){
                        $('.btn_close').removeClass('focus');  
                        $('div[name="shopper_detail"]').hide();
                        currentFocusList = 0;
                        $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
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
                    //쇼퍼 list
                    if(currentFocusList == 0){
                        if(currentFocusMenu == 0){
                            //첫페이지일때
                            if(currentShopperListPage == 0){
                                    console.log("##### 첫페이지임 ..");
                                    this.shopperArrow();
                            }
                            // 마지막 페이지 아닐 때
                            else{
                                console.log("#####이전 페이지 이동");
                                $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');
                                this.pagingOrderedProduct(Number(currentShopperListPage)-1);
                                currentFocusMenu = 1;
                                $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                                this.shopperArrow();
                            }
                            // console.log("페이지 이동");
                            // $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');
                            // currentFocusMenu = 1;
                            // $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                        }
                        else if(currentFocusMenu == 1){
                            //쇼퍼 list2행->1행
                            $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusMenu = Number(currentFocusMenu)-1;
                            $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                        }
                    }
                   //쇼퍼 추천세트 list
                    else if(currentFocusList == 1){
                        //쇼퍼 추천세트 1행1열->이전페이지
                        if(currentFocusMenu2 == 0){

                            //첫페이지일때
                            if(currentShopperListPage == 0){
                                    console.log("##### 첫페이지임 ..");
                                    this.shopperArrow();
                            }
                            // 마지막 페이지 아닐 때
                            else{
                                console.log("#####이전 페이지 이동");
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                                this.pagingOrderedProduct(Number(currentShopperListPage)-1);
                                currentFocusMenu2 = 4;
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                                this.shopperArrow();
                            }
                            //1행1열->이동X
                            // if($('li[name="pl_menu"]').length == 1){

                            // }else{
                            //     console.log("이전페이지");
                            //     $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            //     $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            //     $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            //     currentFocusMenu2 = 4;
                            //     $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            //     $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            //     $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                            // }
                        }
                        //쇼퍼 추천세트1행2열->이전페이지
                        else if(currentFocusMenu2 == 1){
                            //첫페이지일때
                            if(currentShopperListPage == 0){
                                    console.log("##### 첫페이지임 ..");
                                    this.shopperArrow();
                            }
                            // 마지막 페이지 아닐 때
                            else{
                                console.log("#####이전 페이지 이동");
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                                this.pagingOrderedProduct(Number(currentShopperListPage)-1);
                                currentFocusMenu2 = 5;
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                                this.shopperArrow();
                            }
                            // console.log("이전페이지");
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            // $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            // currentFocusMenu2 = 5;
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            // $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트 2행1열->1행1열
                        else if(currentFocusMenu2 == 2){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)-2;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트 2행2열->1행2열
                        else if(currentFocusMenu2 == 3){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)-2;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트3행1열->2행1열
                        else if(currentFocusMenu2 == 4){
                            console.log("다음페이지");
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)-2;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트3행2열->2행2열
                        else if(currentFocusMenu2 == 5){
                            console.log("다음페이지");
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)-2;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }

                    }
                   //마트는 지금?
                    else if(currentFocusList == 2){
                        //첫페이지일때
                        if(currentMartListPage == 0){
                                console.log("##### 첫페이지임 ..");
                                this.martArrow();
                        }
                        // 마지막 페이지 아닐 때
                        else{
                            console.log("#####이전 페이지 이동");
                            console.log("currentMartListPage : "+currentMartListPage);
                            console.log("totalMartListPage : "+totalMartListPage);
                            this.pagingOrderedProduct2(Number(currentMartListPage)-1);
                            $('li[name="rt_list"]').eq(currentFocusMenu3).addClass('focus');
                            this.martArrow();
                        }
                    }   
                    //쇼퍼 상세팝업    
                    else if(currentFocusList == 3){
                        //닫기버튼->쇼퍼후기
                        if(shpPopFocus == 0){
                            $('.btn_close').removeClass('focus');
                            shpPopFocus = 1;
                            $('.sd_content').addClass('focus'); 
                        }

                    }
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                   //쇼퍼 list
                    if(currentFocusList == 0){
                        if(currentFocusMenu == 0){
                            //쇼퍼 list1행->2행
                            $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusMenu = Number(currentFocusMenu)+1;
                            $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                        }
                        else if(currentFocusMenu == 1){
                            // 현재 페이지가 마지막 페이지 일 때
                            if(currentShopperListPage == totalShopperListPage){
                                console.log("##### 더 이상 이동할 페이지 없음..");
                                console.log("currentShopperListPage : "+currentShopperListPage);
                                console.log("totalShopperListPage : "+totalShopperListPage);
                                this.shopperArrow();
                            }
                            // 마지막 페이지 아닐 때
                            else {
                                console.log("##### 다음페이지 이동..");
                                $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');
                                this.pagingOrderedProduct(Number(currentShopperListPage)+1);
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                                this.shopperArrow();
                            }  
                            // console.log("페이지 이동");
                            // $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');
                            // currentFocusMenu = Number(currentFocusMenu)-1;
                            // $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                        }
                    }
                   //쇼퍼 추천세트 list
                    else if(currentFocusList == 1){
                        //쇼퍼 추천세트 
                        if(currentFocusMenu2 == 0){
                            //1행1열->이동X
                            if($('li[name="pl_menu"]').length == 1){

                            }
                            //쇼퍼 추천세트 1행1열->2행1열
                            else{
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                                currentFocusMenu2 = Number(currentFocusMenu2)+2;
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                            }
                        }
                        //쇼퍼 추천세트1행2열->2행2열
                        else if(currentFocusMenu2 == 1){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)+2;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트 2행1열->3행1열
                        else if(currentFocusMenu2 == 2){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)+2;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트 2행2열->3행2열
                        else if(currentFocusMenu2 == 3){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)+2;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트3행1열->다음페이지
                        else if(currentFocusMenu2 == 4){
                            // 현재 페이지가 마지막 페이지 일 때
                            if(currentShopperListPage == totalShopperListPage){
                                console.log("##### 더 이상 이동할 페이지 없음..");
                                console.log("currentShopperRcListPage : "+currentShopperRcListPage);
                                console.log("totalShopperRcListPage : "+totalShopperRcListPage);
                                this.shopperArrow();
                            }
                            // 마지막 페이지 아닐 때
                            else {
                                console.log("##### 다음페이지 이동..");
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                                this.pagingOrderedProduct(Number(currentShopperListPage)+1);
                                currentFocusMenu2 = 0;
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                                this.shopperArrow();
                            } 
                            // console.log("다음페이지");
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            // $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            // currentFocusMenu2 = 0;
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            // $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트3행2열->다음페이지
                        else if(currentFocusMenu2 == 5){
                            if(currentShopperListPage == totalShopperListPage){
                                console.log("##### 더 이상 이동할 페이지 없음..");
                                console.log("currentShopperRcListPage : "+currentShopperRcListPage);
                                console.log("totalShopperRcListPage : "+totalShopperRcListPage);
                                this.shopperArrow();
                            }
                            // 마지막 페이지 아닐 때
                            else {
                                console.log("##### 다음페이지 이동..");
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                                this.pagingOrderedProduct(Number(currentShopperListPage)+1);
                                currentFocusMenu2 = 1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                                this.shopperArrow();
                            }
                            // console.log("다음페이지");
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            // $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            // currentFocusMenu2 = 1;
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            // $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            // $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }

                    }
                   //마트는 지금?
                    else if(currentFocusList == 2){
                        // 현재 페이지가 마지막 페이지 일 때
                            if(currentMartListPage == totalMartListPage){
                                console.log("##### 더 이상 이동할 페이지 없음..");
                                console.log("currentMartListPage : "+currentMartListPage);
                                console.log("totalMartListPage : "+totalMartListPage);
                                this.martArrow();
                            }
                            // 마지막 페이지 아닐 때
                            else {
                                console.log("##### 다음페이지 이동..");
                                console.log("##### currentMartListPage.."+currentMartListPage);
                                console.log("##### totalMartListPage.."+totalMartListPage);
                                this.pagingOrderedProduct2(Number(currentMartListPage)+1);
                                $('li[name="rt_list"]').eq(currentFocusMenu3).addClass('focus');
                                this.martArrow();
                            }
                    }
                    //쇼퍼 상세팝업    
                    else if(currentFocusList == 3){
                        //쇼퍼후기->닫기
                        if(shpPopFocus == 1){
                            $('.sd_content').removeClass('focus'); 
                            shpPopFocus = 0;
                            $('.btn_close').addClass('focus');
                        }

                    }
                }
                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {
                    //쇼퍼 list
                    if(currentFocusList == 0){
                        
                    }
                   //쇼퍼 추천세트 list
                    else if(currentFocusList == 1){
                        //쇼퍼 추천세트 1행1열->쇼퍼 list
                        if(currentFocusMenu2 == 0){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 0;
                            currentFocusMenu2 = 0;
                            $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                        }
                        //쇼퍼 추천세트1행2열->1행1열
                        else if(currentFocusMenu2 == 1){
                            console.log("이전페이지");
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)-1;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트 2행1열->쇼퍼 list
                        else if(currentFocusMenu2 == 2){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 0;
                            currentFocusMenu2 = 0;
                            $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                        }
                        //쇼퍼 추천세트 2행2열->2행1열
                        else if(currentFocusMenu2 == 3){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)-1;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트3행1열->쇼퍼 list
                        else if(currentFocusMenu2 == 4){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 0;
                            currentFocusMenu2 = 0;
                            $('li[name="sbl_list"]').eq(currentFocusMenu).addClass('focus');
                        }
                        //쇼퍼 추천세트3행2열->3행1열
                        else if(currentFocusMenu2 == 5){
                            console.log("다음페이지");
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)-1;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }

                    }
                   //마트는 지금?
                    else if(currentFocusList == 2){
                        //마트는지금->쇼퍼 추천세트
                        $('li[name="rt_list"]').eq(currentFocusMenu3).removeClass('focus');
                        currentFocusList = 1;
                        $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                        $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                        $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                    }

                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    //쇼퍼 list
                    if(currentFocusList == 0){
                        //쇼퍼list->쇼퍼 추천세트
                        $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');
                        currentFocusList = 1;
                        $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                        $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        
                    }
                   //쇼퍼 추천세트 list
                    else if(currentFocusList == 1){
                        //쇼퍼 추천세트1행1열->2열
                        if(currentFocusMenu2 == 0){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            //추천세트1행1열->마트는지금
                            if($('li[name="pl_menu"]').length == 1){
                                currentFocusList = 2;
                                $('li[name="rt_list"]').eq(currentFocusMenu3).addClass('focus');
                            }
                            //추천세트1행1열->2열
                            else{
                                currentFocusMenu2 = Number(currentFocusMenu2)+1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                                $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                            }
                        }
                        //쇼퍼 추천세트1행2열->마트는지금
                        else if(currentFocusMenu2 == 1){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 2;
                            $('li[name="rt_list"]').eq(currentFocusMenu3).addClass('focus');

                        }
                        //쇼퍼 추천세트2행1열->2열
                        else if(currentFocusMenu2 == 2){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)+1;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트2행2열->마트는지금
                        else if(currentFocusMenu2 == 3){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 2;
                            $('li[name="rt_list"]').eq(currentFocusMenu3).addClass('focus');
                        }
                        //쇼퍼 추천세트3행1열->2열
                        else if(currentFocusMenu2 == 4){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusMenu2 = Number(currentFocusMenu2)+1;
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                        }
                        //쇼퍼 추천세트3행2열->마트는지금
                        else if(currentFocusMenu2 == 5){
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).removeClass('focus');
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 2;
                            $('li[name="rt_list"]').eq(currentFocusMenu3).addClass('focus');
                        }

                    }
                   //마트는 지금?
                    else if(currentFocusList == 2){

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
    },


    // 조회 : 쇼퍼 List (인기순)
    selectShopperList: function() {
        var param = '';
        var appendHtml = '';
        var str = '';
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
                var resultLen  = result['shopper'].length;
                // 결과값이 2보다 크면 다음 페이지 존재
                if(resultLen > 2) { 
                    $('a[name="arrow_top_s"]').removeClass('arrow_top');
                    $('a[name="arrow_bottom_s"]').addClass('arrow_bottom focus');
                }

                arrShopperList = new Array(); // 구매 리스트 초기화
                var cnt = 0;
                console.log("##### 쇼퍼 List (인기순) List json " + JSON.stringify(result));

                console.log("#쇼퍼 List (인기순) result : " + JSON.stringify(result['shopper']));
                $.each(result['shopper'], function(index, entry) { 
                    $('p[name="shopper_img"]').eq(index).empty().append("<img src=" + cmsServerIp + entry['img'] + " width='160' height='120' />");
                    $('span[name="shopper_name"]').eq(index).empty().append("ID : " + entry['shopper_id']);
                    $('span[name="epilogue"]').eq(index).empty().append("(후기 : " + entry['reply_cnt'] + ")");
                    $('p[name="description"]').eq(index).empty().append(entry['description']);
                    $('span[name="popular_order"]').eq(index).empty().append("인기 주문 :  " + entry['shopping_main'] + "");


                    appendHtml = {
                                        "img" : entry['img'],
                                        "shopper_id" : entry['shopper_id'],
                                        "reply_cnt" : entry['reply_cnt'],
                                        "description" : entry['description'],
                                        "shopping_main" : entry['shopping_main'] 
                                     };
                    cnt                 = Math.floor(index / maxShopperListPage);
                    var str             = appendHtml;
                    arrShopperList[index]    = str;
                    console.log("index : " + index + " maxShopperListPage : " + maxShopperListPage + " cnt : " + cnt);
                    
                    totalShopperListPage = cnt;


                });
                console.log("#####################################");
                console.log("총페이지수: " + totalShopperListPage);
                console.log("######################################");
                 // $('p[name="shopper_img"]').eq(0).empty().append("<img src=" + cmsServerIp + result['shopper']['img'] + " width='160' height='120' />");
                 // $('span[name="shopper_name"]').eq(0).empty().append("ID : " + result['shopper']['shopper_id']);
                 // $('span[name="epilogue"]').eq(0).empty().append("(후기 : " + result['shopper']['reply_cnt'] + ")");
                 // $('p[name="description"]').eq(0).empty().append(result['shopper']['description']);
                 // $('span[name="popular_order"]').eq(0).empty().append("인기 주문 :  " + result['shopper']['shopping_main'] + "");

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
    selectShopperList2: function() {
        var param = '';
        var appendHtml = '';
        var str = '';
        $.ajax({
            url         : cmsServerIp + "/TVShopperBag/set",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                arrShopperRcList = new Array(); // 구매 리스트 초기화
                var cnt = 0;
                console.log("##### 쇼퍼 추천세트List (인기순) List json " + JSON.stringify(result));
                console.log("result~~~~ : " + JSON.stringify(result['set']));
                console.log("길이~~~~ AA: " + result['set'].length);

                var resultLen  = result['set'].length;
                for(var i=0; i<6; i++){
                  makeShopperProduct();  
                }
                //for(var i=0 ; i < result['set'].length ; i++) {
                $.each(result['set'], function(index, entry) { 
                    $('li[name="dl_img"]').eq(index).empty().append('<img src="' + cmsServerIp + entry["img"] + '" height="92" width="162" />');
                    $('li[name="dl_setName"]').eq(index).empty().append(entry['set_name']);
                    $('li[name="dl_cost"]').eq(index).empty().append(cn_toPrice(entry['cost']) +"원");
                    
                    appendHtml = {
                                        "img" : entry['img'],
                                        "set_name" : entry['set_name'],
                                        "cost" : entry['cost']
                                     };
                    cnt                 = Math.floor(index / maxShopperRcListPage);
                    var str             = appendHtml;
                    arrShopperRcList[index]    = str;
                    console.log("index : " + index + " maxShopperListPage : " + maxShopperRcListPage + " cnt : " + cnt);
                    
                    totalShopperRcListPage = cnt;


                });
                //쇼퍼 추천세트 margin
                $('li[name="pl_menu"]').eq(0).addClass('mg_r10');
                $('li[name="pl_menu"]').eq(2).addClass('mg_r10');
                $('li[name="pl_menu"]').eq(4).addClass('mg_r10');

            }, 
            complete    : function(result) {
                console.log("닭볶음탕??? : " + requestSetMenu);
                if(requestSetMenu == '닭볶음탕') {

                    console.log("보끔탕?");
                    $('li[name="sbl_list"]').eq(currentFocusMenu).removeClass('focus');

                    currentFocusList = 1;
                    currentFocusMenu2 = 1;

                    $('li[name="pl_menu"]').eq(currentFocusMenu2).addClass('focus');
                    $('li[name="pl_menu"]:eq('+ currentFocusMenu2 + ') > .dm_bdr').append(btnokfill);
                    $('li[name="pl_menu"]').eq(currentFocusMenu2).children().children('.dlm_tit').addClass('focus');
                }
            }
        });
    },


    // 조회 : 마트는 지금?
    selectTweetList: function() {
        var param = '';
        var appendHtml = '';
        var str = '';

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
                var resultLen  = result['tweet'].length;
                // 결과값이 2보다 크면 다음 페이지 존재
                if(resultLen > 1) { 
                    $('a[name="arrow_top_m"]').removeClass('arrow_top');
                    $('a[name="arrow_bottom_m"]').addClass('arrow_bottom focus');
                }
                console.log("##### 마트는 지금 List json " + JSON.stringify(result));
                $.each(result['tweet'], function(index, entry) {
                    arrMartList = new Array(); // 리스트 초기화
                    var cnt = 0;
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
                    $('li[name="product_img"]').eq(index).empty().append("<img src=" + cmsServerIp + entry['tweet_img'] + "  height='180' />"); //width='393'

                    appendHtml = {
                                        "shopper_img" : entry['shopper_img'],
                                        "shopper_id" : entry['shopper_id'],
                                        "tweet_date" : entry['tweet_date'],
                                        "tweet" : entry['tweet'],
                                        "tweet_img" : entry['tweet_img'] 
                                     };
                    cnt                 = Math.floor(index / maxMartListPage);
                    var str             = appendHtml;
                    arrMartList[index]    = str;
                    console.log("index : " + index + " maxMartListPage : " + maxMartListPage + " cnt : " + cnt);
                    
                    totalMartListPage = cnt;

                    console.log("arrMartList[index]: " + JSON.stringify(arrMartList[index]));

                });
                console.log("#####################################");
                console.log("총페이지수: " + totalMartListPage);
                console.log("######################################");
            }
        });
    },
    // 쇼퍼 list페이지 이동 / 쇼퍼추천세트 같이
    pagingOrderedProduct : function(page) {
        // 현재 페이지
        currentShopperListPage = page;
        currentShopperRcListPage = page;
        console.log("########쇼퍼 list리스트 페이지 이동 currentShopperListPage   : " + currentShopperListPage);
        console.log("########arrShopperList.length : " + arrShopperList.length);
        console.log("##### 쇼퍼 List json 페이지이동 " + arrShopperList);

        //쇼퍼list
        for(var i=0 ; i < 2 ; i++) {
            $('p[name="shopper_img"]').eq(i).empty().append("<img src=" + cmsServerIp + arrShopperList[Number((page*2)+i)].img + " width='160' height='120' />");
            $('span[name="shopper_name"]').eq(i).empty().append("ID : " + arrShopperList[Number((page*2)+i)].shopper_id);
            $('span[name="epilogue"]').eq(i).empty().append("(후기 : " + arrShopperList[Number((page*2)+i)].reply_cnt + ")");
            $('p[name="description"]').eq(i).empty().append(arrShopperList[Number((page*2)+i)].description);
            $('span[name="popular_order"]').eq(i).empty().append("인기 주문 :  " + arrShopperList[Number((page*2)+i)].shopping_main + "");
        }
        //쇼퍼추천세트list
        for(var i=0 ; i < 6 ; i++) {
            //makeShopperProduct();
            $('li[name="dl_img"]').eq(i).empty().append('<img src="' + cmsServerIp + arrShopperRcList[Number((page*6)+i)].img + '" height="92" width="162" />');
            $('li[name="dl_setName"]').eq(i).empty().append(arrShopperRcList[Number((page*6)+i)].set_name);
            $('li[name="dl_cost"]').eq(i).empty().append(cn_toPrice(arrShopperRcList[Number((page*6)+i)].cost) +"원");
                    
        }
        //쇼퍼 추천세트 margin
        $('li[name="pl_menu"]').eq(0).addClass('mg_r10');
        $('li[name="pl_menu"]').eq(2).addClass('mg_r10');
        $('li[name="pl_menu"]').eq(4).addClass('mg_r10');
    },
    // 마트는 지금? 페이지 이동
    pagingOrderedProduct2 : function(page) {
        // 현재 페이지
        currentMartListPage = page;
        console.log("########마트는지금리스트 페이지 이동 currentMartListPage   : " + currentMartListPage);
        console.log("########arrShopperList.length : " + JSON.stringify(arrMartList));
        //이전페이지(첫페이지로 이동할때)
        if(currentMartListPage == 0){
            console.log("########마트는지금(첫페이지로 이동할때)");
            this.selectTweetList();
        }
        //이전페이지(첫페이지는 아님)
        else{
           for(var i=0 ; i < 2 ; i++) {
            console.log("########마트는지금(첫페이지는 아님)");
            console.log("i : "+i);
            console.log("page : "+page);
            console.log("##### 마트는 지금 List json 페이지이동 " + JSON.stringify(arrMartList));
            //console.log("00@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+arrMartList.shopper_id);
            //console.log("arrMartList[currentMartListPage].shopper_id : "+arrMartList[currentMartListPage].shopper_id);
            console.log("쇼퍼아이디@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+arrMartList[Number((page+i)].shopper_id);
            makeTweetList();
            // *** 쇼퍼 이미지 ***/
            $('span[name="shopper_img"]').eq(i).empty().append("<img src=" + cmsServerIp + arrMartList[Number((page+i)].shopper_img + " width='60' height='68' />");
            // *** 쇼퍼 ID ***/
            $('li[name="shopper_id"]').eq(i).empty().append(arrMartList[Number((page+i)].shopper_id);
            // *** 트윗 일시 ***/
            $('li[name="tweet_date"]').eq(i).empty().append(arrMartList[Number((page+i)].tweet_date);
            // *** 트윗 내용 ***/
            $('li[name="tweet"]').eq(i).empty().append(arrMartList[Number((page+i)].tweet);
            // *** 제품 이미지 ***/
            $('li[name="product_img"]').eq(i).empty().append("<img src=" + cmsServerIp + arrMartList[Number((page+i)].tweet_img + "  height='180' />"); //width='393'
            } 
        }
        

    },
    //쇼퍼 list 화살표 on / off
    shopperArrow : function(){
        //첫번째 페이지이고 다음페이지가 없을때
        if(currentShopperListPage == 0 && currentShopperListPage == totalShopperListPage){
            console.log("첫페이지이고 다음페이지 없을때");
            $('a[name="arrow_top_s"]').removeClass('arrow_top');
            $('a[name="arrow_bottom_s"]').removeClass('arrow_bottom');
        }
        //첫번째 페이지이고 다음페이지가 있을때
        else if(currentShopperListPage == 0 && currentShopperListPage != totalShopperListPage){
            console.log("첫페이지이고 다음페이지 있을때");
            $('a[name="arrow_top_s"]').removeClass('arrow_top');
            $('a[name="arrow_bottom_s"]').addClass('arrow_bottom focus');
        }
        //첫번째 페이지가 아니고 다음페이지가 없을때
        else if(currentShopperListPage != 0 && currentShopperListPage == totalShopperListPage){
            console.log("첫번째 페이지가 아니고 다음페이지가 없을때");
            $('a[name="arrow_top_s"]').addClass('arrow_top focus');
            $('a[name="arrow_bottom_s"]').removeClass('arrow_bottom');
        }
        //첫번째 페이지가 아니고 다음페이지가 있을때
        else if(currentShopperListPage != 0 && currentShopperListPage != totalShopperListPage){
            console.log("첫번째 페이지가 아니고 다음페이지가 있을때");
            $('a[name="arrow_top_s"]').addClass('arrow_top focus');
            $('a[name="arrow_bottom_s"]').addClass('arrow_bottom focus'); 
        }
    },
    //마트 list 화살표 on / off
    martArrow : function(){
        //첫번째 페이지이고 다음페이지가 없을때
        if(currentMartListPage == 0 && currentMartListPage == totalMartListPage){
            console.log("첫페이지이고 다음페이지 없을때");
            $('a[name="arrow_top_m"]').removeClass('arrow_top');
            $('a[name="arrow_bottom_m"]').removeClass('arrow_bottom');
        }
        //첫번째 페이지이고 다음페이지가 있을때
        else if(currentMartListPage == 0 && currentMartListPage != totalMartListPage){
            console.log("첫페이지이고 다음페이지 있을때");
            $('a[name="arrow_top_m"]').removeClass('arrow_top');
            $('a[name="arrow_bottom_m"]').addClass('arrow_bottom focus');
        }
        //첫번째 페이지가 아니고 다음페이지가 없을때
        else if(currentMartListPage != 0 && currentMartListPage == totalMartListPage){
            console.log("첫번째 페이지가 아니고 다음페이지가 없을때");
            $('a[name="arrow_top_m"]').addClass('arrow_top focus');
            $('a[name="arrow_bottom_m"]').removeClass('arrow_bottom');
        }
        //첫번째 페이지가 아니고 다음페이지가 있을때
        else if(currentMartListPage != 0 && currentMartListPage != totalMartListPage){
            console.log("첫번째 페이지가 아니고 다음페이지가 있을때");
            $('a[name="arrow_top_m"]').addClass('arrow_top focus');
            $('a[name="arrow_bottom_m"]').addClass('arrow_bottom focus'); 
        }

    }
});