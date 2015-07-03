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

// 찜하기_삭제 / 토스트 팝업 닫기
function fn_popFavDel() {
    $('#pop_popfav_del_ok').hide();
    //초기화
    $('#div_fav').empty();
    $('div[name="fav_allSelect"]').removeClass('focus');
    $('span[name="fav_btn_ud"]').removeClass('focus');
    $('.all_chkA').attr('src','../images/checkbox.png');
    favFocusList = 1;
    favFocusMenu = 0;
    horizonFocus = 0;
    verticalFocus = 0;
    currentPageCnt = 0;
    favUpdateMode = false;
    $('span[name="fav_btn_ud"]').empty().html("편집");
    $('span[name="bl_cancel"]').css("display","none");
    $('span[name="fav_checkbox"]').empty();

    //fvFocus = 1;
    Gigamart.app.shopper_bag.KeyEventActorProvider.myFavList();
}
//주문내역 없습니다. 토스트 팝업닫기
function fn_popOrderNon() {
    $('#pop_order_non').hide();
}


// 마이 찜한상품
function makeFavProduct() {

    var appendHtml =  '<div class="dl_menu_area">';
        appendHtml += '    <ul> ';
        appendHtml += '    <li class="dl_menu mg_r5" name="fav_menu">';
        appendHtml += '    <span class="dlm_checkbox" name="fav_checkbox"></span>';
        appendHtml += '    <span class="dm_bdr"></span>';
        appendHtml += '       <ul>';
        appendHtml += '           <li class="dlm_img" name="fav_img"></li>';
        appendHtml += '           <li class="dlm_tit" name="fav_tit"></li>';
        appendHtml += '           <li class="dlm_price" name="fav_price"></li>';
        appendHtml += '      </ul>';
        appendHtml += '      <input type="hidden" name="fav_pd_id" class="fav_pd_id" id=""/>';
        appendHtml += '    </li>';
        appendHtml += '    </ul>';
        appendHtml += '</div>';

        // <div class="dl_menu_area">
        //     <ul>    
        //         <li class="dl_menu mg_r5" name="fav_menu">
        //             <span class="dlm_checkbox"><img src="../images/checkbox_sel.png" /></span> 또는<img src="../images/checkbox.png" />
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
        //마이페이지 메인에 상단메뉴의 
        this.totFav();
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
                        //주문내역 더보기 click -> 주문내역 view
                        if(ordBtnFocus == true){
                            $('span[name="ord_etc"]').removeClass('focus'); 
                            $('div[name="view_my"]').hide();
                            myView = 7;
                            $('div[name="view_order"]').show(); 
                            this.selectOrderList();
                            $('li[name="order_menu"]').eq(orderFocusMenu).addClass('focus');  
                        }
                        //주문내역 list 각각의 click
                        else if(ordBtnFocus == false){
                            $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');  
                            $('div[name="view_my"]').hide();
                            myView = 8;
                            $('div[name="view_order_dt1"]').show();  
                        }
                    }
                    //버튼
                    else if(currentFocusList == 2){
                        
                    }
                }
                //세번째 화면-찜한상품
                else if(myView == 2){
                    //전체선택 
                        if(favFocusList == 0){
                            if(favUpdateMode == false){ 
                            }
                            //퍈집모드일때
                            else{
                                var a = $('.all_chkA').attr('src');
                                console.log("a ->"+a);
                                if(a == "../images/checkbox_sel.png"){
                                    //체크박스 전체선택 해제
                                    $('.all_chkA').attr('src','../images/checkbox.png');
                                    $('.all_chk').attr('src','../images/checkbox.png');
                                }else{
                                    //체크박스 전체선택
                                    $('.all_chkA').attr('src','../images/checkbox_sel.png');
                                    $('.all_chk').attr('src','../images/checkbox_sel.png');
                                }
                                
                            }
                        }
                        //상품목록
                        else if(favFocusList == 1){
                            //편집모드아닐때
                            if(favUpdateMode == false){ 
                            }
                            //퍈집모드일때
                            else{
                                //선택된것의 체크박스 src
                                var curenter = $('li[name="fav_menu"]').eq(favFocusMenu).children().children('.all_chk').attr('src');
                                console.log("curenter->"+curenter);
                                //선택되어 있다면
                                if(curenter == "../images/checkbox_sel.png"){
                                    //선택해제
                                    $('li[name="fav_menu"]').eq(favFocusMenu).children().children('.all_chk').attr('src','../images/checkbox.png');
                                }else{
                                    $('li[name="fav_menu"]').eq(favFocusMenu).children().children('.all_chk').attr('src','../images/checkbox_sel.png');
                                }
                            }
                        }
                        //버튼
                        else if(favFocusList == 2){
                            //편집모드아닐때 편집모드로 전환
                            if(favUpdateMode == false){
                                //편집모드 true
                                favUpdateMode = true;
                                $('span[name="fav_btn_ud"]').empty().html("선택삭제");
                                $('span[name="bl_cancel"]').css("display","block");
                                //체크박스 추가
                                $('span[name="fav_checkbox"]').empty().append('<img class="all_chk" src="../images/checkbox.png" />');
                                
                            }
                            //편집모드일때
                            else{
                                var a = $('li[name="fav_menu"]').length;
                                console.log("a : "+a);
                                for(var i=0; i<a; i++){
                                    var curenter = $('li[name="fav_menu"]').eq(i).children().children('.all_chk').attr('src');
                                    console.log("curenter : "+curenter);
                                    //선택된 id면 삭제
                                    if(curenter == "../images/checkbox_sel.png"){
                                        var productId = $('li[name="fav_menu"]').eq(i).children('.fav_pd_id').val();
                                        console.log("선택된 pd i : "+i+" ,id : "+productId);
                                        this.deleteFavProduct(productId);
                                    }
                                }
                            }

                        }
                        //상품 없을때의 팝업
                        else if(favFocusList == 3){
                            this.totFav();
                            favFocusList = 1;
                            myView = 0;
                            favFocusMenu = 0;
                            horizonFocus = 0;
                            verticalFocus = 0;
                            currentPageCnt = 0;
                            $('#div_fav').empty();
                            $('div[name="pop_popfav_non"]').hide();
                            $('div[name="view_my"]').show();
                            $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
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
                            //주문내역더보기에 focus되어있으면 상단 버튼으로focus이동
                            if(ordBtnFocus == true && currentFocusMenu2 == 0){
                                $('span[name="ord_etc"]').removeClass('focus'); 
                                ordBtnFocus = false;
                                currentFocusList = 0;
                                $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');   
                               
                            }
                            //주문내역 1행->주문내역 더보기 focus
                            else if(ordBtnFocus == false && currentFocusMenu2 == 0){
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).removeClass('focus');  
                                ordBtnFocus = true
                                $('span[name="ord_etc"]').addClass('focus'); 
                            }
                            //주문내역 2행->1행
                            else if(ordBtnFocus == false && currentFocusMenu2 == 1){
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).removeClass('focus');  
                                currentFocusMenu2 = Number(currentFocusMenu2) - 1;
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).addClass('focus');
                            }
                            //주문내역 3행->2행
                            else if(ordBtnFocus == false && currentFocusMenu2 == 2){
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).removeClass('focus');  
                                currentFocusMenu2 = Number(currentFocusMenu2) - 1;
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).addClass('focus');
                                //$('tr[name="ord_menu"]').eq(currentFocusMenu2).addClass('focus');
                            }

                        }
                        //버튼
                        else if(currentFocusList == 2){
                            //하단버튼->주문내역3행
                            $('li[name="nm_menu2"]').eq(currentFocusMenu3).removeClass('focus');
                            currentFocusList = 1;
                            $('tr[name="ord_menu"]').eq(currentFocusMenu2).addClass('focus');
                        }
                    }
                    //세번째 화면 -찜한상품
                    else if(myView == 2){
                        //전체선택 
                        if(favFocusList == 0){
                        }
                        //상품목록
                        else if(favFocusList == 1){
                            console.log("verticalFocus : "+verticalFocus+" ,현재 포커스 위치(favFocusMenu) : " + favFocusMenu);
                            console.log("prevPageYN : "+prevPageYN+" ,nextPageYN : " + nextPageYN);
                            console.log("currentFavListPage : "+currentFavListPage+" ,nextPageYN : " + nextPageYN);
                            // 첫번째 행 일때
                            if(verticalFocus == 0) {
                                //편집모드아닐때
                                if(favUpdateMode == false){
                                    if(prevPageYN == true) {
                                        // 전 페이지 조회
                                        console.log("### 상세카테고리 : 전 페이지 조회");
                                        currentFavListPage = currentFavListPage - 1;

                                        if(currentFavListPage <= 0) {
                                            // 현재 페이지가 0이면 이전 페이지 없음 처리
                                            prevPageYN = false;
                                            // $('#arrow_top').hide();
                                        } 
                                        //updateSubCategoryList();                // 페이지 변경
                                        verticalFocus   = verticalFocus + 2;    // 행 증가(전페이지의 마지막으로 위치)
                                        horizonFocus    = horizonFocus;         // 열 증감 없음
                                        favFocusMenu    = favFocusMenu - 4;   // 위치 변경
                                        //updateProductInfo();                    // 우측 상품 정보 갱신

                                        $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                        $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                                    }
                                    else if(prevPageYN == false && currentFavListPage <= 0) {
                                        // 전 페이지 없음
                                        console.log("상세카테고리 : 전 페이지 없음");
                                    }
                                }
                                //편집모드일때
                                else{
                                    console.log("전체선택으로 이동");
                                    //전체선택으로 이동
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                    favFocusList = 0;
                                    $('div[name="fav_allSelect"]').addClass('focus');
                                }
                            }

                            // 두번째 행 일때
                            else if(verticalFocus >= 1 && verticalFocus < 2) {
                                //편집모드아닐때
                                if(favUpdateMode == false){
                                    console.log("두번째 행 일때");
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                    $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();
                                    verticalFocus   = verticalFocus - 1;    // 행 감소
                                    horizonFocus    = horizonFocus;         // 열 증감 없음
                                    favFocusMenu    = favFocusMenu - 4;  // 위치 변경
                                    //updateProductInfo();                    // 우측 상품 정보 갱신
                                    $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                    $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                                //편집모드일때
                                }else{
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                    //$('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();
                                    verticalFocus   = verticalFocus - 1;    // 행 감소
                                    horizonFocus    = horizonFocus;         // 열 증감 없음
                                    favFocusMenu    = favFocusMenu - 4;  // 위치 변경
                                    $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                    //$('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                                }

                            }




                            //상품목록의 1행일때 전체선택으로 이동
                            // if(verticalFocus == 0){
                            //     $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                            //     $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();
                            //     favFocusList = 0;
                            //     $('div[name="fav_allSelect"]').addClass('focus');
                            // }
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
                        //상단메뉴->주문내역 더보기
                        if(currentFocusList == 0){
                            $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');   
                            currentFocusList = 1;
                            //주문내역 더보기 focus
                            ordBtnFocus = true;
                            $('span[name="ord_etc"]').addClass('focus'); 
                        }
                        //주문내역
                        else if(currentFocusList == 1){
                            //주문내역더보기에 focus되어있으면 그아래 주문내역 리스트로 focus이동
                            if(ordBtnFocus == true && currentFocusMenu2 == 0){
                                $('span[name="ord_etc"]').removeClass('focus'); 
                                ordBtnFocus = false;
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).addClass('focus');   
                            }
                            //주문내역 1행->2행
                            else if(ordBtnFocus == false && currentFocusMenu2 == 0){
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).removeClass('focus');  
                                currentFocusMenu2 = Number(currentFocusMenu2) + 1;
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).addClass('focus'); 
                            }
                            //주문내역 2행->3행
                            else if(ordBtnFocus == false && currentFocusMenu2 == 1){
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).removeClass('focus');  
                                currentFocusMenu2 = Number(currentFocusMenu2) + 1;
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).addClass('focus');
                            }
                            //주문내역 3행->하단 버튼(이용안내, 공지사항..)
                            else if(ordBtnFocus == false && currentFocusMenu2 == 2){
                                $('tr[name="ord_menu"]').eq(currentFocusMenu2).removeClass('focus');  
                                currentFocusList = 2
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).addClass('focus');
                                //$('tr[name="ord_menu"]').eq(currentFocusMenu2).addClass('focus');
                            }
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
                            //$('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                                
                        }
                        //상품목록
                        else if(favFocusList == 1){
                            // 첫번째 행 일때
                            if(verticalFocus >= 0 && verticalFocus < 1) {
                                //편집모드아닐때
                                if(favUpdateMode == false){
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
                                //편집모드일때
                                else{
                                    if(currentPageCnt - 4 <= favFocusMenu) {
                                        console.log("###### 마이페이지 찜한상품 아래로 이동 불가");
                                        return;
                                    } else {
                                        console.log("###### 마이페이지 찜한상품 아래로 이동 가능");
                                    }
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');

                                    verticalFocus   = verticalFocus + 1;    // 행 증가
                                    horizonFocus    = horizonFocus;         // 열 증감 없음
                                    favFocusMenu    = favFocusMenu + 4;     // 위치 변경
                                    //updateProductInfo();                    // 우측 상품 정보 갱신

                                    $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');

                                }
                            }

                            // 두번째 행 일때
                            else if(verticalFocus == 2) {

                                //편집모드아닐때
                                if(favUpdateMode == false){
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
                                //편집모드일때
                                else{
                                    console.log("편집모드일때 아래로 이동X");
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
                            //하단메뉴 2번째->1번째
                            if(currentFocusMenu3 == 1){
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).removeClass('focus');
                                currentFocusMenu3= Number(currentFocusMenu3) - 1;
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).addClass('focus');
                            }//하단메뉴 3번째->2번째
                            else if(currentFocusMenu3 == 2){
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).removeClass('focus');
                                currentFocusMenu3= Number(currentFocusMenu3) - 1;
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).addClass('focus');
                            }
                            //하단메뉴 4번째->3번째
                            else if(currentFocusMenu3 == 3){
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).removeClass('focus');
                                currentFocusMenu3= Number(currentFocusMenu3) - 1;
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).addClass('focus');
                            }


                        }
                    }
                    //세번째 화면-찜한상품
                    else if(myView == 2){
                        //전체선택 
                        if(favFocusList == 0){

                        }
                        //상품목록
                        else if(favFocusList == 1){

                            //편집모드아닐때
                            if(favUpdateMode == false){
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
                            //편집모드일때
                            else{
                                // 상품 목록 두번째, 세번째, 네번째 열일 때
                                if(horizonFocus >= 1 && horizonFocus < 4) {
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');

                                    verticalFocus   = verticalFocus;        // 행 증감 없음
                                    horizonFocus    = horizonFocus - 1;     // 열 감소
                                    favFocusMenu    = favFocusMenu - 1;  // 위치 변경
                                    //updateProductInfo();                    // 우측 상품 정보 갱신

                                    $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                }
                            }



                        }
                        //버튼->상품목록
                        else if(favFocusList == 2){
                            //편집모드아닐때
                            if(favUpdateMode == false){
                                $('span[name="fav_btn_ud"]').removeClass('focus');
                                favFocusList = 1;
                                $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                            }
                            //편집모드일때
                            else{
                                $('span[name="fav_btn_ud"]').removeClass('focus');
                                favFocusList = 1;
                                $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                            }
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
                            //하단메뉴 1번째->2번째
                            if(currentFocusMenu3 == 0){
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).removeClass('focus');
                                currentFocusMenu3= Number(currentFocusMenu3) + 1;
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).addClass('focus');
                            }//하단메뉴 2번째->3번째
                            else if(currentFocusMenu3 == 1){
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).removeClass('focus');
                                currentFocusMenu3= Number(currentFocusMenu3) + 1;
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).addClass('focus');
                            }
                            //하단메뉴 3번째->4번째
                            else if(currentFocusMenu3 == 2){
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).removeClass('focus');
                                currentFocusMenu3= Number(currentFocusMenu3) + 1;
                                $('li[name="nm_menu2"]').eq(currentFocusMenu3).addClass('focus');
                            }
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
                            console.log("### 우측 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + favFocusMenu+",horizonFocus : "+horizonFocus);
                            // 상품 목록 첫번째, 두번째 세번째 열일 때
                            if(horizonFocus >= 0 && horizonFocus < 3) {
                                // 우측에 상품이 있을때
                                if(currentPageCnt > favFocusMenu+1) {

                                    //편집모드아닐때
                                    if(favUpdateMode == false){
                                        $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                        $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();

                                        verticalFocus   = verticalFocus;        // 행 증감 없음
                                        horizonFocus    = horizonFocus + 1;     // 열 증가
                                        favFocusMenu    = favFocusMenu + 1;  // 위치 변경
                                        //updateProductInfo();      
                                        $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                        $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);
                                    //편집모드일때
                                    }else{
                                        $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');

                                        verticalFocus   = verticalFocus;        // 행 증감 없음
                                        horizonFocus    = horizonFocus + 1;     // 열 증가
                                        favFocusMenu    = favFocusMenu + 1;  // 위치 변경
                                        //updateProductInfo();      
                                        $('li[name="fav_menu"]').eq(favFocusMenu).addClass('focus');
                                    }


                                // 우측에 상품이 없을 때
                                }else if(currentPageCnt == favFocusMenu+1) {
                                    //편집모드아닐때
                                    if(favUpdateMode == false){
                                        console.log("### 우측에 상품이 없어서 삭제 버튼으로 이동");
                                        $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                        $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();
                                        favFocusList = 2; // 화살표 버튼으로
                                        $('span[name="fav_btn_ud"]').addClass('focus');
                                    }
                                    //편집모드일때
                                    else{
                                        $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                        favFocusList = 2; // 화살표 버튼으로
                                        $('span[name="fav_btn_ud"]').addClass('focus');
                                    }

                                }
                            }
                            // 상품 목록 네번째열일때
                            else if(horizonFocus == 3){
                                //편집모드아닐때
                                if(favUpdateMode == false){
                                    console.log("###4번째열 있을때-> 삭제 버튼으로 이동");
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                    $('li[name="fav_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').empty();

                                    favFocusList = 2; // 화살표 버튼으로
                                    $('span[name="fav_btn_ud"]').addClass('focus');
                                }
                                //편집모드일때
                                else{
                                    $('li[name="fav_menu"]').eq(favFocusMenu).removeClass('focus');
                                    favFocusList = 2; // 화살표 버튼으로
                                    $('span[name="fav_btn_ud"]').addClass('focus');
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
                    //편집모드 아닐때
                    if(favUpdateMode == false){
                        $('div[name="fav_allSelect"]').removeClass('focus');
                        $('span[name="fav_btn_ud"]').removeClass('focus');
                        $('div[name="view_fav"]').hide();
                        $('.all_chkA').attr('src','../images/checkbox.png');
                        myView = 0;
                        favFocusList = 1;
                        favFocusMenu = 0;
                        horizonFocus = 0;
                        verticalFocus = 0;
                        currentPageCnt = 0;
                        $('#div_fav').empty();
                        $('div[name="view_my"]').show();
                        $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                    }
                    //편집모드일때
                    else{
                        favUpdateMode = false;
                        $('span[name="fav_btn_ud"]').empty().html("편집");
                        $('span[name="bl_cancel"]').css("display","none");
                        $('span[name="fav_checkbox"]').empty();
                    }
                    
                }
                //자주구매상품 화면
                else if(myView == 3){

                }
                //취소/환불내역 화면
                else if(myView == 4){
                    $('div[name="view_ref"]').hide();
                    myView = 0;
                    $('div[name="view_my"]').show();
                    $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                }
                //취소/환불내역-상세1 화면 -> 취소/환불내역
                else if(myView == 5){
                }
                //취소/환불내역-상세1 화면 -> 취소/환불내역-상세2
                else if(myView == 6){
                }
                //주문내역 -> 마이페이지(주문내역 더보기 버튼 focus)
                else if(myView == 7){
                    $('div[name="view_order"]').hide();
                    myView = 0;
                    $('div[name="view_my"]').show();
                    ordBtnFocus = true;
                    $('span[name="ord_etc"]').addClass('focus'); 
                    //$('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');
                }
                //주문내역 상세1 -> 마이페이지(주문내역 리스트 focus)
                else if(myView == 8){
                    $('div[name="view_order_dt1"]').hide();
                    myView = 0;
                    $('div[name="view_my"]').show();
                    $('li[name="nm_menu"]').eq(currentFocusMenu).addClass('focus');  
                }
                //주문내역 상세2 -> 주문내역 상세1
                else if(myView == 9){
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
                var obj = result;
                var obj_length = Object.keys(obj).length;
                console.log("obj_length---->"+obj_length);
                //값이 없을때
                if(obj_length == 1){
                    console.log("값이 없다.!@@@@@@@@@@@@@!!!!!!!!");
                    $('a[name="arrow_top_fav"]').removeClass('arrow_top');
                    $('a[name="arrow_bottom_fav"]').removeClass('arrow_bottom');
                    $('span[name="tot_fav"]').empty().html("0"); //상단 찜한 상품 총 갯수
                    //$('#pop_popfav_non').show();
                    $('div[name="pop_popfav_non"]').show();
                    favFocusList = 3;
                    return;
                }else{
                    var resultLen  = result['favorite'].length;
                    currentPageCnt = resultLen;
                    // 결과값이 8보다 크면 다음 페이지 존재
                    if(resultLen > 8) { 
                        for(var i=0; i<8; i++){
                            makeFavProduct();  
                            nextPageYN = true;
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
                        $('input[name="fav_pd_id"]').eq(index).val(entry['product_id']);
                        
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
            }
        });
    },
    // 조회 : 찜한상품
    totFav: function() {
        var param = '';

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
                var obj = result;
                var obj_length = Object.keys(obj).length;
                console.log("obj_length---->"+obj_length);
                //결과값 없을때 0
                if(obj_length == 1){
                    console.log("123");
                    $('span[name="fav_tot"]').empty().html("0");
                    return;
                }
                //결과값 있을때
                else{
                    var resultLen = result['favorite'].length;
                    if(resultLen < 10){
                        resultLen = "0"+resultLen; 
                    }
                    $('span[name="fav_tot"]').empty().html(resultLen);
                }
                // else if(result['favorite'].length < 10){
                //    var resultLen = result['favorite'].length;
                //    resultLen = "0"+resultLen; 
                // }
                // $('span[name="fav_tot"]').empty().html(resultLen);
                
            }
        });
    },
    //선택한상품 삭제 : 찜한상품
    deleteFavProduct: function(productId) {
        var param = {
                        "product_id" : productId
                    };
        $.ajax({
            url         : cmsServerIp + "/BuyerFavoriteTask/Delete",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                /*console.log("######## 상세카테고리 파라미터 : " + requestCategoryDtlCode);*/
                var resultCode = JSON.stringify(result);
                console.log("######################################################################");
                console.log("######## param  : " + JSON.stringify(param));
                console.log("######## result  : " + JSON.stringify(result));
                console.log("###### JSON read 1 : " + result['resultCode']);
                console.log("###### JSON read 2 : " + resultCode);
                console.log("###### JSON read 3 : " + result.resultCode);
                console.log("######################################################################");
                 $('#pop_popfav_del_ok').show();
                setTimeout("fn_popFavDel()", 2000);

            },
            error : function(){
                    console.log("에러");
            }
        });
    },
    // 조회 : 주문내역
    selectOrderList: function() {
        var appendHtml = '';
        var appendHtml2 = '';
        var str = '';
        var param = {
                        "interval" : 1
                    };
        $.ajax({
            url         : cmsServerIp + "/BuyerOrderTask/Select",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                
                var obj = result;
                var obj_length = Object.keys(obj).length;
                console.log("obj_length---->"+obj_length);
                //결과값 없을때 0
                if(obj_length == 1){
                    //주문내역 없습니다. 토스트메세지
                    $('#pop_order_non').show();
                    setTimeout("fn_popOrderNon()", 2000);
                }
                //결과값 있을때
                else{
                    //하단에 페이징 뿌려줌
                    var resultLen = result['arr_order'].length;
                    console.log("resultLen========>"+resultLen);
                    console.log("resultLen % 2========>"+resultLen % 2);
                    //갯수가 짝수개이면 그냥 뿌려주고
                    if(resultLen % 2 == 0){
                        resultLen = resultLen/2;
                    }
                    //홀수개면 + 1 해서 / 2
                    else{
                        resultLen = (resultLen+1)/2;
                    }
                    if(resultLen < 10){
                        resultLen = "0"+resultLen; 
                    }
                    $('b[name="order_cur_pg"]').empty().html("01");//현재페이지
                    $('span[name="order_tot_pg"]').empty().html(resultLen);//총페이지
                
                    // 결과값이 2보다 크면 다음 페이지 존재
                    if(resultLen > 2) { 
                        $('a[name="arrow_top_order"]').removeClass('arrow_top');
                        $('a[name="arrow_bottom_order"]').addClass('arrow_bottom focus');
                        nextOrderPageYN = true;
                    }

                    arrOrderList = new Array(); // 구매 리스트 초기화
                    var cnt = 0;
                    //console.log("##### 주문내역 List json " + JSON.stringify(result));

                    $.each(result['arr_order'], function(index, entry) { 
                        $('td[name="order_date"]').eq(index).empty().append(entry['order_date']);
                        $('td[name="order_num"]').eq(index).empty().append(entry['order_id']);
                        $('td[name="order_cost"]').eq(index).empty().append(cn_toPrice(entry['ordered_cost'])+"원");
                        $('td[name="order_state"]').eq(index).empty().append(entry['status']);
                        $('td[name="order_name"]').eq(index).empty().append(entry['shopper_id']);

                        
                        $.each(entry['ordered_product'], function(pindex, pentry) {
                            var obj = entry['ordered_product'];
                            var obj_length = Object.keys(obj).length;
                            //console.log("obj_length---->"+obj_length);
                            if(pindex == 0){
                                $('td[name="order_info"]').eq(index).empty().append(pentry['name'] +"외 ……"+obj_length+"건");
                                appendHtml = {
                                            "order_date" : entry['order_date'],
                                            "order_id" : entry['order_id'],
                                            "ordered_cost" : entry['ordered_cost'],
                                            "ordered_product" : entry['ordered_product'],
                                            "status" : entry['status'],
                                            "shopper_id" : entry['shopper_id'],
                                            "name" : pentry['name'],
                                            "length" : obj_length
                                         }; 
                            console.log("appendHtml111111 : "+appendHtml);
                            }   
                            //cnt                 = Math.floor(pindex / maxOrderedPageView);
                            //var str             = Number(pindex+1) + ". " + pentry['name']  + " " + pentry['standard'] + " " +  cn_toPrice(pentry['cost']) + "원 (수량 : " +  pentry['cnt'] + ")<br /><br />";
                            //productList[cnt]    = (productList[cnt] + str).replace("undefined", "");
                        });

                        // $.each(result2['ordered_product'], function(index2, entry2) { 
                        //     var obj = result2;
                        //     var obj_length = Object.keys(obj).length;
                        //     console.log("obj_length---->"+obj_length);
                        //     $('td[name="order_info"]').eq(index).empty().append(entry2['name'] +"외 ……"+obj_length+"건");
                        // });


                        
                        cnt                 = Math.floor(index / maxOrderListPage);
                        var str             = appendHtml;
                        arrOrderList[index]    = str;
                        console.log("index : " + index + " maxOrderListPage : " + maxOrderListPage + " cnt : " + cnt);
                        console.log("appendHtml22222 : "+JSON.stringify(appendHtml));
                        totalOrderListPage = cnt;


                    });
                    console.log("#####################################");
                    console.log("총페이지수: " + totalOrderListPage);
                    console.log("######################################");
                }
            }
        });
    },


});