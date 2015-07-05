'use strict';

var appConfiguration = window.oipfObjectFactory.createConfigurationObject();

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

//주문내역 상세 목록 
function makeOrderDtProduct() {

    var appendHtml =  '<tr class="mod_row" name="order_dt_menu">';
        appendHtml += '           <td class="mod_img" name="dt_img"></td>';
        appendHtml += '           <td class="mod_txt" name="dt_name"></td>';
        appendHtml += '           <td class="mod_price" name="dt_cost"></td>';
        appendHtml += '           <td class="mod_discount" name="dt_discount"></td>';
        appendHtml += '           <td class="mod_amount" name="dt_cnt"></td>';
        appendHtml += '           <td class="mod_delivery" name="dt_delivery"></td>';
        appendHtml += '           <td class="mod_store" name="dt_store"></td>';
        appendHtml += '           <td class="mod_order" name="dt_order"></td>';
        appendHtml += '           <td class="mod_btn" name="dt_btn">영상없음</td>';
        appendHtml += '</tr>';

        // <tr class="mod_row">
        //     <td class="mod_img" name="dt_img">
        //         <img src="../images/sample_03.jpg" width="100px" height="100px" /> 
        //     </td>
        //     <td class="mod_txt" name="dt_name">[아침마루] 바로 먹는 사과5-6입 / 봉</td>
        //     <td class="mod_price" name="dt_cost">8,800원ssssssss</td>
        //     <td class="mod_discount" name="dt_discount">300원</td>
        //     <td class="mod_amount" name="dt_cnt">1</td>
        //     <td class="mod_delivery" name="dt_delivery">1,000원</td>
        //     <td class="mod_store" name="dt_store">이마트 용산</td>
        //     <td class="mod_order" name="dt_order">32,000원</td>
        //     <td class="mod_btn" name="dt_btn"><span class="tb_btn">영상없음</span></td>
        // </tr>

    $('#mod_row_tit').after(appendHtml);
}

//주문내역 상세2 목록 
function makeOrderDtProduct2() {
    var appendHtml =  '<tr class="mod_row" name="order_dt_menu2">';
        appendHtml += '           <td class="mod_img" name="dt_img2"></td>';
        appendHtml += '           <td class="mod_txt" name="dt_name2"></td>';
        appendHtml += '           <td class="mod_price" name="dt_cost2"></td>';
        appendHtml += '           <td class="mod_discount" name="dt_discount2"></td>';
        appendHtml += '           <td class="mod_amount" name="dt_cnt2"></td>';
        appendHtml += '           <td class="mod_delivery" name="dt_delivery2"></td>';
        appendHtml += '           <td class="mod_store" name="dt_store2"></td>';
        appendHtml += '           <td class="mod_order" name="dt_order2"></td>';
        appendHtml += '           <td class="mod_btn" name="dt_btn2">영상없음</td>';
        appendHtml += '</tr>';

        // <tr class="mod_row">
        //     <td class="mod_img" name="dt_img">
        //         <img src="../images/sample_03.jpg" width="100px" height="100px" /> 
        //     </td>
        //     <td class="mod_txt" name="dt_name">[아침마루] 바로 먹는 사과5-6입 / 봉</td>
        //     <td class="mod_price" name="dt_cost">8,800원ssssssss</td>
        //     <td class="mod_discount" name="dt_discount">300원</td>
        //     <td class="mod_amount" name="dt_cnt">1</td>
        //     <td class="mod_delivery" name="dt_delivery">1,000원</td>
        //     <td class="mod_store" name="dt_store">이마트 용산</td>
        //     <td class="mod_order" name="dt_order">32,000원</td>
        //     <td class="mod_btn" name="dt_btn"><span class="tb_btn">영상없음</span></td>
        // </tr>

    $('#mod_row_tit2').append(appendHtml);
}









/**
 *  Shopper_bag Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.shopper_bag.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;
    	me.actors = [];
        
        // 플로팅 메뉴 장바구니 SET
        fltEasyCart();

        //마이페이지 메인에 상단메뉴의 
        this.totFav();
        //마이페이지 주문내역
        this.selectMyOrderList();
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
            // * ▶ KEY (쇼퍼리얼타임 테스트)
            // **************************************************
            if(keyCode === global.VK_BLUE) {
                //this.shopperRealTimeStart();
            }

            // **************************************************
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode === global.VK_GREEN) {
                isCart          = false;
                anchorFocus     = 0;
                chgVolumeFocus  = 0;
                cartFocus       = 0;
                location.href   = "#" + $('li[name="ec_li_list"]').eq(0).attr('id');
                $('#popup_cart').hide();
            }
            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {

                console.log("cartFocus : " + cartFocus);
                // 수량 변경 팝업 OFF 상태
                if(chgVolumeFocus == 0) {
                    // 장바구니 가기
                    if(cartFocus == 0) {
                        $('#p_videoDiv video').remove();
                        $('#span_videoDiv video').remove();
                        appConfiguration.localSystem.mute = true; // 음소거 설정
                        location.href = EXHB_PATH + 'order.html';
                    }
                    
                    // 결제
                    if(cartFocus == 1) {
                        
                    }

                    // 장바구니 리스트
                    if(cartFocus > 1) {
                        // 수량변경 팝업 off -> on
                        $('#wrap_chVolume_easyCart').show();

                        // 현재 선택된 상품의 수량을 수량변경팝업에 적용
                        $('span[name="ppr_num_numP"]').html($('input[name="ec_cnt"]').eq(cartFocus-2).val());

                        // + (수량증가)에 포커스
                        chgVolumeFocus = 2;
                        $('span[name="ppr_num_plusP"]').addClass('focus');
                    }
                }

                // 수량 변경 팝업 ON 상태
                else if(chgVolumeFocus > 0) {
                    // - (수량 감소)
                    if(chgVolumeFocus == 1) {
                        var cnt = Number($('span[name="ppr_num_numP"]').html());
                        if(cnt <= 1) return;
                        cnt--;
                        $('span[name="ppr_num_numP"]').html(cnt);
                    }

                    // + (수량 증가)
                    else if(chgVolumeFocus == 2) {
                        var cnt = Number($('span[name="ppr_num_numP"]').html());
                        cnt++;
                        $('span[name="ppr_num_numP"]').html(cnt);
                    }

                    // 확인
                    else if(chgVolumeFocus == 3) {

                        /*// 기존 장바구니 삭제
                        var deleteResult = deleteEasyCart("PRODUCT", $('input[name="ec_id"]').eq(cartFocus-2).val());

                        console.log("### 장바구니 삭제 이후 : " + deleteResult);
                        // 삭제 성공
                        if(deleteResult == 1) {*/

                        // 상품 1개의 금액을 구한다.
                        //var c_cost = Number($('input[name="ec_cost"]').eq(cartFocus-2).val()) / Number($('input[name="ec_cnt"]').eq(cartFocus-2).val());

                        // 변경된 갯수에 따른 금액을 구한다.
                        //var n_cost = c_cost * Number($('span[name="ppr_num_numP"]').html());
            
                        // 표시된 금액은 무조건 1개 금액임 (2015-07-06)
                        var n_cost = Number($('input[name="ec_cost"]').eq(cartFocus-2).val());

                        // 변경된 수량을 적용한다.
                        $('input[name="ec_cnt"]').eq(cartFocus-2).val($('span[name="ppr_num_numP"]').html());
                        $('td[name="sr_cnt"]').eq(cartFocus-2).html($('span[name="ppr_num_numP"]').html());

                        // 변경된 금액을 적용한다.
                        $('input[name="ec_cost"]').eq(cartFocus-2).val(n_cost);
                        $('td[name="sr_cost"]').eq(cartFocus-2).html(cn_toPrice(n_cost) + "원");

                        // 총 금액과 쇼퍼 수수료를 적용한다.
                        var ec_cost = 0, ec_comm = 0, ec_total = 0;

                        for(var i=0 ; i < $('input[name="ec_cost"]').length ; i++) {
                            ec_cost    += Number($('input[name="ec_cost"]').eq(i).val());
                            ec_comm    += Math.floor((Number($('input[name="ec_cost"]').eq(i).val()) * 5 / 100) / 10) * 10;
                        }

                        ec_total = ec_cost + ec_comm;
                        $('#cost').html(cn_toPrice(ec_cost) + "원");
                        $('#shopper_cost').html(cn_toPrice(ec_comm) + "원");
                        $('#total_cost').html(cn_toPrice(ec_total) + "원");

                        // 장바구니 수정
                        updateEasyCart($('input[name="ec_cnt"]').eq(cartFocus-2).val(), $('input[name="ec_id"]').eq(cartFocus-2).val());

                        // 수량변경 팝업 on -> off
                        $('#btn_volume_ok').removeClass('focus');
                        $('#wrap_chVolume_easyCart').hide();
                        chgVolumeFocus = 0;


                    }

                    // 취소
                    else if(chgVolumeFocus == 4) {
                        // 변경된 수량과 금액을 적용하지 않는다.

                        // 수량변경 팝업 on -> off
                        $('#btn_volume_close').removeClass('focus');
                        $('#wrap_chVolume_easyCart').hide();
                        chgVolumeFocus = 0;

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
                    // 수량 변경 팝업 OFF 상태
                    if(chgVolumeFocus == 0) {
                        // 장바구니 가기
                        if(cartFocus == 0) {
                            // 동작 없음
                        }
                        // 결제
                        else if(cartFocus == 1) {
                            $('#ecc_payments').removeClass('focus');
                            cartFocus = 0;
                            $('#go_cart').addClass('focus');
                        }

                        // 간편 장바구니 리스트 최상단
                        else if(cartFocus == 2) {
                            $('li[name="ec_li_list"]').eq(cartFocus-2).removeClass('focus');
                            cartFocus = 1;
                            $('#ecc_payments').addClass('focus');
                            location.href = "#" + $('li[name="ec_li_list"]').eq(0).attr('id');
                            console.log($('li[name="ec_li_list"]').eq(0).attr('id'));
                        }

                        // 간편 장바구니 리스트
                        else if(cartFocus > 2 || cartFocus < $('li[name="ec_li_list"]').length - 2) {
                            $('li[name="ec_li_list"]').eq(cartFocus-2).removeClass('focus');
                            cartFocus = cartFocus - 1;
                            $('li[name="ec_li_list"]').eq(cartFocus-2).addClass('focus');

                            if(anchorFocus == 0) {
                                // 앵커 감소 없이 포커스를 한칸씩 위로 이동시킨다.
                                location.href = "#" + $('li[name="ec_li_list"]').eq(cartFocus-2).attr('id');
                                console.log($('li[name="ec_li_list"]').eq(cartFocus-2).attr('id'));
                            }

                            else if(anchorFocus > 0) {
                                // 앵커 숫자를 감소시키고 앵커 이동 없이 포커스만 이동한다.
                                anchorFocus = anchorFocus - 1;    
                            }
                        }
                    }
                

                     // 수량 변경 팝업 ON 상태
                    else if(chgVolumeFocus > 0) {
                        // - (수량 감소)
                        if(chgVolumeFocus == 1) {
                            
                        }

                        // + (수량 증가)
                        else if(chgVolumeFocus == 2) {
                            
                        }

                        // 확인
                        else if(chgVolumeFocus == 3) {
                            $('#btn_volume_ok').removeClass('focus');
                            chgVolumeFocus = 1;
                            $('span[name="ppr_num_minusP"]').addClass('focus');
                        }

                        // 취소
                        else if(chgVolumeFocus == 4) {
                            $('#btn_volume_close').removeClass('focus');
                            chgVolumeFocus = 2;
                            $('span[name="ppr_num_plusP"]').addClass('focus');
                        }
                    }
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                    // 수량 변경 팝업 OFF 상태
                    if(chgVolumeFocus == 0) {
                        // 장바구니 가기 
                        if(cartFocus == 0) {
                            $('#go_cart').removeClass('focus');
                            cartFocus = 1;
                            $('#ecc_payments').addClass('focus');
                        }

                        // 결제
                        else if(cartFocus == 1) {
                            // 간편 장바구니 리스트로 이동
                            $('#ecc_payments').removeClass('focus');
                            cartFocus = 2;
                            $('li[name="ec_li_list"]').eq(cartFocus-2).addClass('focus');
                        }

                        // 간편 장바구니 리스트
                        else if(cartFocus >= 2 && cartFocus-2 < $('li[name="ec_li_list"]').length-1) {
                            $('li[name="ec_li_list"]').eq(cartFocus-2).removeClass('focus');
                            cartFocus = cartFocus + 1;
                            $('li[name="ec_li_list"]').eq(cartFocus-2).addClass('focus');

                            // 앵커 위치가 0,1,2이면
                            if(anchorFocus < 3) {
                                // 앵커 숫자를 증가시키고 앵커 이동 없이 포커스만 이동한다.
                                anchorFocus = anchorFocus + 1;    
                            } 

                            // 앵커 위치가 3이면 (최하단)
                            else if(anchorFocus == 3) {
                                // 앵커 숫자 증가 없이 한칸씩 앵커를 이동한다.
                                location.href = "#" + $('li[name="ec_li_list"]').eq(cartFocus-5).attr('id');
                                console.log($('li[name="ec_li_list"]').eq(cartFocus-5).attr('id'));
                            }
                        }

                        // 리스트 최대 수치 넘어가면
                        else if(cartFocus-2 >= $('li[name="ec_li_list"]').length-1) {
                            console.log("장바구니 리스트의 끝입니다.");
                        }
                    }

                    // 수량 변경 팝업 ON 상태
                    else if(chgVolumeFocus > 0) {
                        // - (수량 감소)
                        if(chgVolumeFocus == 1) {
                            $('span[name="ppr_num_minusP"]').removeClass('focus');
                            chgVolumeFocus = 3;
                            $('#btn_volume_ok').addClass('focus');
                            
                        }

                        // + (수량 증가)
                        else if(chgVolumeFocus == 2) {
                            $('span[name="ppr_num_plusP"]').removeClass('focus');
                            chgVolumeFocus = 4;
                            $('#btn_volume_close').addClass('focus');
                        }

                        // 확인
                        else if(chgVolumeFocus == 3) {
                            
                        }

                        // 취소
                        else if(chgVolumeFocus == 4) {

                        }
                    }
                }

                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {
                    // 수량 변경 팝업 OFF 상태
                    if(chgVolumeFocus == 0) {

                    }

                    // 수량 변경 팝업 ON 상태
                    else if(chgVolumeFocus > 0) {
                        // - (수량 감소)
                        if(chgVolumeFocus == 1) {
                            
                        }

                        // + (수량 증가)
                        else if(chgVolumeFocus == 2) {
                            $('span[name="ppr_num_plusP"]').removeClass('focus');
                            chgVolumeFocus = 1;
                            $('span[name="ppr_num_minusP"]').addClass('focus');
                        }

                        // 확인
                        else if(chgVolumeFocus == 3) {
                            
                        }

                        // 취소
                        else if(chgVolumeFocus == 4) {
                            $('#btn_volume_close').removeClass('focus');
                            chgVolumeFocus = 3;
                            $('#btn_volume_ok').addClass('focus');
                        }
                    }

                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                                        // 수량 변경 팝업 OFF 상태
                    if(chgVolumeFocus == 0) {

                    }

                    // 수량 변경 팝업 ON 상태
                    else if(chgVolumeFocus > 0) {
                        // - (수량 감소)
                        if(chgVolumeFocus == 1) {
                            $('span[name="ppr_num_minusP"]').removeClass('focus');
                            chgVolumeFocus = 2;
                            $('span[name="ppr_num_plusP"]').addClass('focus');
                        }

                        // + (수량 증가)
                        else if(chgVolumeFocus == 2) {
                            
                        }

                        // 확인
                        else if(chgVolumeFocus == 3) {
                            $('#btn_volume_ok').removeClass('focus');
                            chgVolumeFocus = 4;
                            $('#btn_volume_close').addClass('focus');
                        }

                        // 취소
                        else if(chgVolumeFocus == 4) {

                        }
                    }
                }
                
            } else if (keyCode === global.VK_BACK) {
                isCart          = false;
                anchorFocus     = 0;
                chgVolumeFocus  = 0;
                cartFocus       = 0;
                location.href   = "#" + $('li[name="ec_li_list"]').eq(0).attr('id');
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

                retrieveEasyCart(); // 간편 장바구니 조회

                $('#popup_cart').show();
                $('#ecc_payments').addClass('focus'); // 첫 포커스는 ecc_payments
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
                        //최근본상품 _ 자주구매한 상품
                        else if(currentFocusMenu == 2){
                            myView = 3;
                            newFocusList = 1;
                            $('div[name="pop_popnew_non"]').show();
                            // $('li[name="nm_menu"]').eq(currentFocusMenu).removeClass('focus');
                            // $('div[name="view_my"]').hide();
                            // myView = 3;
                            // $('div[name="view_new"]').show();
                            // this.myNewList();
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
                            var id = $('td[name="ord_num"]').eq(currentFocusMenu2).html();
                            console.log("id-->"+id+", currentFocusMenu2 : "+currentFocusMenu2);
                            $('div[name="view_my"]').hide();
                            myView = 8;
                            myViewOrderPrev = 0; // 어디에서주문상세로 이동했는지(마이페이지/주문내역  지금은 마이페이지에서 주문상세로 이동)
                            this.selectOrderDtList(id);
                            $('div[name="view_order_dt1"]').show();  
                            console.log("orderDtFocusMenu : "+orderDtFocusMenu);

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
                //자주구매한 상품
                else if(myView == 3){
                    //팝업일때
                    if(newFocusList == 1){
                        myView = 0;
                        $('div[name="pop_popnew_non"]').hide();
                    }
                }
                else if(myView == 4){

                }
                else if(myView == 5){

                }
                else if(myView == 6){

                }
                //주문내역
                else if(myView == 7){
                    //주문상세페이지 이동
                    var id = $('td[name="order_num"]').eq(orderFocusMenu).html();
                    console.log("id-->"+id);
                    $('div[name="view_order"]').hide();
                    myView = 8;
                    myViewOrderPrev = 1;
                    this.selectOrderDtList(id);
                    $('div[name="view_order_dt1"]').show();
                    $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');
                    //$('li[name="order_menu"]').eq(orderFocusMenu).removeClass('focus');
                    //orderFocusMenu = Number(orderFocusMenu)-1;
                    //$('li[name="order_menu"]').eq(orderFocusMenu).addClass('focus');
                }
                //주문내역 상세1
                else if(myView == 8){

                }
                //주문내역 상세2
                else if(myView == 9){

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
                        }
                        //버튼
                        else if(favFocusList == 2){
                            
                        }
                    }
                    else if(myView == 3){

                    }
                    else if(myView == 4){

                    }
                    else if(myView == 5){

                    }
                    else if(myView == 6){

                    }
                    //주문내역
                    else if(myView == 7){
                        //조회기간 list
                        if(orderFocusList == 0){
                        }
                        //주문내역 list
                        else if(orderFocusList == 1){
                            //페이징
                            if(orderFocusMenu == 0){
                                //첫페이지일때
                                if(currentOrderListPage == 0){
                                        console.log("##### 첫페이지임 ..");
                                        this.orderArrow();
                                }
                                // 마지막 페이지 아닐 때
                                else{
                                    console.log("#####이전 페이지 이동");
                                    $('li[name="order_menu"]').eq(orderFocusMenu).removeClass('focus');
                                    this.pagingOrderedProduct(Number(currentOrderListPage)-1);
                                    orderFocusMenu = 1;
                                    $('li[name="order_menu"]').eq(orderFocusMenu).addClass('focus');
                                    this.orderArrow();
                                }
                            }
                            //주문내역 2행->1행
                            else if(orderFocusMenu == 1){
                                $('li[name="order_menu"]').eq(orderFocusMenu).removeClass('focus');
                                orderFocusMenu = Number(orderFocusMenu)-1;
                                $('li[name="order_menu"]').eq(orderFocusMenu).addClass('focus');
                            }
                            

                        }
                    }
                    //주문내역 상세1
                    else if(myView == 8){
                        //리스트캣수 1개
                        if($('tr[name="order_dt_menu"]').length == 1){

                        }
                        //리스트갯수 2개일때
                        else{
                            //1행 -> 페이징
                            if(orderDtFocusMenu == 0){
                                //페이징
                            }
                            //2행 -> 1행
                            else{
                                $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).removeClass('focus');
                                orderDtFocusMenu = Number(orderDtFocusMenu)-1;
                                $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');     
                            }
                            
                        }

                    }
                    //주문내역 상세2
                    else if(myView == 9){
                        if(currentOrderListPage == 0){
                            if($('tr[name="order_dt_menu"]').length == 1){
                                console.log("##### 첫페이지인데 리스트갯수가 1개면 그다음페이지에 total이 보여줬으므로 이전페이지엔 리스트 한개 보여야됨 ..");    
                                myView = 8;
                                $('div[name="view_order_dt1"]').show();
                                $('div[name="view_order_dt2"]').hide();
                                orderDtFocusMenu = 0;
                                $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');
                            }
                            else{
                                console.log("##### 첫페이지임 ..");
                            }
                            
                                //this.orderArrow();
                        }
                                // 마지막 페이지 아닐 때
                        else{
                                    console.log("#####이전 페이지 이동");
                                    //this.pagingOrderedDtProduct(Number(currentOrderDtListPage)-1);
                                    //orderFocusMenu = 1;
                                    myView = 8;
                                    $('div[name="view_order_dt1"]').show();
                                    $('div[name="view_order_dt2"]').hide();
                                    //리스트갯수 1개일때 1행 focus
                                    if($('tr[name="order_dt_menu"]').length == 1){
                                        orderDtFocusMenu = 0;
                                        $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');
                                    }
                                    //리스트갯수 2개일때 2행 focus
                                    else{
                                        orderDtFocusMenu = 1;
                                        $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');
                                    }
                                    
                                    //this.orderArrow();
                                    //this.pagingOrderedDtProduct();
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
                    else if(myView == 3){

                    }
                    else if(myView == 4){

                    }
                    else if(myView == 5){

                    }
                    else if(myView == 6){

                    }
                    //주문내역
                    else if(myView == 7){
                        //조회기간 list
                        if(orderFocusList == 0){
                        }
                        //주문내역 list
                        else if(orderFocusList == 1){
                            //1행->2행
                            if(orderFocusMenu == 0){
                                $('li[name="order_menu"]').eq(orderFocusMenu).removeClass('focus');
                                orderFocusMenu = Number(orderFocusMenu)+1;
                                $('li[name="order_menu"]').eq(orderFocusMenu).addClass('focus');
                            }
                            //주문내역 2행->페이징
                            else if(orderFocusMenu == 1){
                                // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderListPage == totalOrderListPage){
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                    console.log("currentOrderListPage : "+currentOrderListPage);
                                    console.log("totalOrderListPage : "+totalOrderListPage);
                                    this.orderArrow();
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 다음페이지 이동..");
                                    $('li[name="order_menu"]').eq(orderFocusMenu).removeClass('focus');
                                    this.pagingOrderedProduct(Number(currentOrderListPage)+1);
                                    orderFocusMenu = Number(orderFocusMenu)-1;
                                    $('li[name="order_menu"]').eq(orderFocusMenu).addClass('focus');
                                    this.orderArrow();
                                }     
                            }
                            

                        }

                    }
                    //주문내역 상세1
                    else if(myView == 8){   
                        if(orderDtFocusList == 0){

                        }
                        //주문내역 list일때
                        else if(orderDtFocusList == 1){
                            //갯수 1개일때->페이징
                            if($('tr[name="order_dt_menu"]').length ==1){
                                //1행->페이징
                                if(orderDtFocusMenu == 0){
                                    console.log("리스트갯수 1개이므로 1행->페이징");
                                    // 현재 페이지가 마지막 페이지 일 때
                                        console.log("##### 더 이상 이동할 페이지 없음..totalpage보여줘야됨");
                                        console.log("currentOrderListPage : "+currentOrderDtListPage);
                                        console.log("totalOrderListPage : "+totalOrderDtListPage);
                                        orderDtTotalPageYN = true;
                                        myView = 9;
                                        $('div[name="view_order_dt1"]').hide();
                                        $('div[name="view_order_dt2"]').show();
                                        //토탈페이지 보여주기
                                        this.pagingOrderedDtTotalProduct();
                                        //주문내역가기 focus?
                                        //this.orderArrow();


                                    // $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).removeClass('focus');
                                    // $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');
                                }  
                            }
                            //리스트갯수 2개일때
                            else{
                               //1행->2행
                                if(orderDtFocusMenu == 0){
                                    console.log("리스트갯수 2개이므로 1행->2행");
                                    $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).removeClass('focus');
                                    orderDtFocusMenu = Number(orderDtFocusMenu)+1;
                                    $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');
                                }   
                                //2행->페이징  
                                else if(orderDtFocusMenu == 1){
                                    // 현재 페이지가 마지막 페이지 일 때
                                    if(currentOrderDtListPage == totalOrderDtListPage){
                                        console.log("##### 더 이상 이동할 페이지 없음..totalpage보여줘야됨");
                                        console.log("currentOrderListPage : "+currentOrderDtListPage);
                                        console.log("totalOrderListPage : "+totalOrderDtListPage);
                                        orderDtTotalPageYN = true;
                                        myView = 9;
                                        $('div[name="view_order_dt1"]').hide();
                                        $('div[name="view_order_dt2"]').show();
                                        //토탈페이지 보여주기
                                        this.pagingOrderedDtTotalProduct();
                                        //주문내역가기 focus?
                                        //this.orderArrow();
                                    }
                                    // 마지막 페이지 아닐 때
                                    else {
                                        if(nextOrderDtPageYN == true){
                                            console.log("##### 다음페이지 이동..");
                                            $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).removeClass('focus');
                                            myView = 9;
                                            $('div[name="view_order_dt1"]').hide();
                                            $('div[name="view_order_dt2"]').show();
                                            this.pagingOrderedDtProduct(Number(currentOrderDtListPage)+1);
                                            orderDtFocusMenu = 0;
                                            $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');
                                            //this.orderArrow();
                                        }else{
                                            console.log("##### 더 이상 이동할 페이지 없음..totalpage보여줘야됨");
                                            console.log("currentOrderListPage : "+currentOrderDtListPage);
                                            console.log("totalOrderListPage : "+totalOrderDtListPage);
                                            orderDtTotalPageYN = true;
                                            myView = 9;
                                            $('div[name="view_order_dt1"]').hide();
                                            $('div[name="view_order_dt2"]').show();
                                            //토탈페이지 보여주기
                                            this.pagingOrderedDtTotalProduct();
                                        }
                                        
                                    }
                                }
                            }
                        }
                    }
                    //주문내역 상세2
                    else if(myView == 9){

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
                    else if(myView == 3){

                    }
                    else if(myView == 4){

                    }
                    else if(myView == 5){

                    }
                    else if(myView == 6){

                    }
                    //주문내역
                    else if(myView == 7){

                    }
                    //주문내역 상세1
                    else if(myView == 8){

                    }
                    //주문내역 상세2
                    else if(myView == 9){

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
                    else if(myView == 3){

                    }
                    else if(myView == 4){

                    }
                    else if(myView == 5){

                    }
                    else if(myView == 6){

                    }
                    //주문내역
                    else if(myView == 7){

                    }
                    //주문내역 상세1
                    else if(myView == 8){

                    }
                    //주문내역 상세2
                    else if(myView == 9){

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
                //주문내역 상세1 -> 주문내역 / 주문내역상세1->마이페이지최신3개
                else if(myView == 8){
                    //주문내역상세1->마이페이지최신3개
                    if(myViewOrderPrev == 0){
                        $('tr[name="order_dt_menu"]').remove();
                        $('div[name="view_order_dt1"]').hide();
                        myView = 0;
                        $('div[name="view_my"]').show();
                        //$('li[name="nm_menu"]').eq(currentFocusMenu2).addClass('focus');  
                    }
                    //주문내역 상세1 -> 주문내역
                    else if(myViewOrderPrev == 1){
                        $('tr[name="order_dt_menu"]').remove();
                        $('div[name="view_order_dt1"]').hide();
                        myView = 7;
                        $('div[name="view_order"]').show();
                    }
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
    // 조회 : 주문내역-마이페이지메인
    selectMyOrderList: function() {
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

                    $.each(result['arr_order'], function(index, entry) { 
                        if(index ==0 || index == 1 || index == 2){
                            $('td[name="ord_date"]').eq(index).empty().append(entry['order_date']);
                            $('td[name="ord_num"]').eq(index).empty().append(entry['order_id']);
                            $('td[name="ord_cost"]').eq(index).empty().append(cn_toPrice(entry['ordered_cost'])+"원");
                            $('td[name="ord_state"]').eq(index).empty().append(entry['status']);
                            $('td[name="ord_name"]').eq(index).empty().append(entry['shopper_id']);
                                var obj = entry['ordered_product'][0];
                                console.log("i는 : "+index+" , obj : "+JSON.stringify(obj));
                                //상품정보 있을때
                                if(obj != undefined){
                                    $.each(entry['ordered_product'], function(pindex, pentry) {
                                        var obj = entry['ordered_product'];
                                        var obj_length = Object.keys(obj).length;
                                        console.log("obj_length---->"+obj_length);
                                        if(pindex == 0){
                                            console.log("있음I :"+index);
                                            $('td[name="ord_info"]').eq(index).empty().append(pentry['name'] +"외 ……"+obj_length+"건");
                                        }
                                    });
                                }
                                //상품정보 없을때
                                else{
                                    $('td[name="ord_info"]').eq(index).empty().append("없음");
                                }
                        }
                        
                    });
                }
            }
        });
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
    // 조회 : 자주구매한상품
    // myNewList: function() {
    //     var param = '';
    //     var appendHtml = '';
    //     var str = '';

    //     $.ajax({
    //         url         : cmsServerIp + "/BuyerFavoriteTask/Select",
    //         type        : "post",
    //         dataType    : "json",
    //         data        : param,
    //         async       : true,
    //         xhrFields   : {
    //                         withCredentials: true
    //         },
    //         success     : function(result) {
    //             var obj = result;
    //             var obj_length = Object.keys(obj).length;
    //             console.log("obj_length---->"+obj_length);
    //             //값이 없을때
    //             if(obj_length == 1){
    //                 console.log("값이 없다.!@@@@@@@@@@@@@!!!!!!!!");
    //                 $('a[name="arrow_top_new"]').removeClass('arrow_top');
    //                 $('a[name="arrow_bottom_new"]').removeClass('arrow_bottom');
    //                 $('span[name="tot_new"]').empty().html("0"); //상단 찜한 상품 총 갯수
    //                 //$('#pop_popfav_non').show();
    //                 $('div[name="pop_popnew_non"]').show();
    //                 favFocusList = 3;
    //                 return;
    //             }else{
    //                 var resultLen  = result['favorite'].length;
    //                 currentPageCnt = resultLen;
    //                 // 결과값이 8보다 크면 다음 페이지 존재
    //                 if(resultLen > 8) { 
    //                     for(var i=0; i<8; i++){
    //                         makeFavProduct();  
    //                         nextPageYN = true;
    //                     }
    //                     $('a[name="arrow_top_fav"]').removeClass('arrow_top');
    //                     $('a[name="arrow_bottom_fav"]').addClass('arrow_bottom focus');
    //                 }
    //                 // 결과값이 8보다 작은경우 다음페이지 존재x
    //                 else if(resultLen < 8){
    //                     for(var i=0; i<resultLen; i++){
    //                         makeFavProduct();  
    //                     }
    //                     $('a[name="arrow_top_fav"]').removeClass('arrow_top');
    //                     $('a[name="arrow_bottom_fav"]').removeClass('arrow_bottom');
    //                 }
    //                 console.log("##### 찜한상품 List json " + JSON.stringify(result));
    //                 $.each(result['favorite'], function(index, entry) {
    //                     arrFavList = new Array(); // 리스트 초기화
    //                     var cnt = 0;
    //                     $('li[name="fav_img"]').eq(index).empty().append('<img src="' + cmsServerIp + entry["img"] + '" height="92" width="162" />');
    //                     $('li[name="fav_tit"]').eq(index).empty().append(entry['name']);
    //                     $('li[name="fav_price"]').eq(index).empty().append(cn_toPrice(entry['cost']) +"원");
    //                     $('input[name="fav_pd_id"]').eq(index).val(entry['product_id']);
                        
    //                     appendHtml = {
    //                                         "img" : entry['img'],
    //                                         "name" : entry['name'],
    //                                         "cost" : entry['cost']
    //                                      };
    //                     cnt                 = Math.floor(index / maxFavListPage);
    //                     var str             = appendHtml;
    //                     arrFavList[index]    = str;
    //                     console.log("index : " + index + " maxFavListPage : " + maxFavListPage + " cnt : " + cnt);
                        
    //                     totalFavListPage = cnt;

    //                     console.log("arrFavList[index]: " + arrFavList[index]);

    //                 });
    //                 console.log("#####################################");
    //                 console.log("찜 총페이지수: " + totalFavListPage);
    //                 console.log("######################################");
    //                 $('li[name="new_menu"]').eq(favFocusMenu).addClass('focus');
    //                 $('li[name="new_menu"]:eq('+ favFocusMenu + ') > .dm_bdr').append(btnokfill);

    //                 //찜한상품 페이지표시
    //                 var totalFavListPage_html = totalFavListPage+1;
    //                 if(totalFavListPage_html < 10){
    //                    totalFavListPage_html = "0"+totalFavListPage_html; 
    //                 }
    //                 $('b[name="new_cur_pg"]').empty().html("01");
    //                 $('span[name="new_tot_pg"]').empty().html(totalFavListPage_html);
    //                 $('span[name="tot_new"]').empty().html(resultLen); //상단 찜한 상품 총 갯수
    //             }
    //         }
    //     });
    // },
    // // 조회 : 자주구매한상품
    // totNew: function() {
    //     var param = '';

    //     $.ajax({
    //         url         : cmsServerIp + "/BuyerFavoriteTask/Select",
    //         type        : "post",
    //         dataType    : "json",
    //         data        : param,
    //         async       : true,
    //         xhrFields   : {
    //                         withCredentials: true
    //         },
    //         success     : function(result) {
    //             var obj = result;
    //             var obj_length = Object.keys(obj).length;
    //             console.log("obj_length---->"+obj_length);
    //             //결과값 없을때 0
    //             if(obj_length == 1){
    //                 console.log("123");
    //                 $('span[name="new_tot"]').empty().html("0");
    //                 return;
    //             }
    //             //결과값 있을때
    //             else{
    //                 var resultLen = result['favorite'].length;
    //                 if(resultLen < 10){
    //                     resultLen = "0"+resultLen; 
    //                 }
    //                 $('span[name="new_tot"]').empty().html(resultLen);
    //             }
    //             // else if(result['favorite'].length < 10){
    //             //    var resultLen = result['favorite'].length;
    //             //    resultLen = "0"+resultLen; 
    //             // }
    //             // $('span[name="fav_tot"]').empty().html(resultLen);
                
    //         }
    //     });
    // },
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
                        console.log("결과값이 2보다 크면 다음 페이지 존재");
                        $('span[name="arrow_top_order"]').removeClass('arrow_top');
                        $('span[name="arrow_bottom_order"]').addClass('focus');
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
                                }
                                });

                    
                        appendHtml = {
                                            "order_date" : entry['order_date'],
                                            "order_id" : entry['order_id'],
                                            "ordered_cost" : entry['ordered_cost'],
                                            "ordered_product" : entry['ordered_product'],
                                            "status" : entry['status'],
                                            "shopper_id" : entry['shopper_id'],
                                            "name" : entry['ordered_product'],
                                            "obj_length" : obj_length
                                         }; 
            

                        
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
    // 주문내역 페이징
    pagingOrderedProduct : function(page) {
        // 현재 페이지
        currentOrderListPage = page;
        console.log("########주문내역 list리스트 페이지 이동 currentOrderListPage   : " + currentOrderListPage);
        //console.log("########arrOrderList.length : " + arrOrderList.length);
        //console.log("##### 쇼퍼 List json 페이지이동 " + JSON.stringify(arrOrderList));
        
        //쇼퍼list
        //마지막페이지아닐때
        if(currentOrderListPage != totalOrderListPage){
            console.log("마지막페이지아닐때");
            for(var i=0 ; i < 2 ; i++) {
            var obj = arrOrderList[Number((page*2)+i)].ordered_product[0];
            console.log("i는 : "+i+" , obj2222222 : "+JSON.stringify(obj));
            if(obj == undefined){
                console.log("undefined입니다요 : ");
                $('td[name="order_date"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].order_date);
                $('td[name="order_num"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].order_id);
                $('td[name="order_cost"]').eq(i).empty().append(cn_toPrice(arrOrderList[Number((page*2)+i)].ordered_cost)+"원");
                $('td[name="order_state"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].status);
                $('td[name="order_name"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].shopper_id);
                $('td[name="order_info"]').eq(i).empty().append("없음");
            }else{
                console.log("undefined아닙니다요 : ");
                console.log("obj3333333333 : "+obj.name);
                var obj2 = arrOrderList[Number((page*2)+i)].ordered_product;
                var obj_length = Object.keys(obj2).length;
                console.log("obj34343434 : "+obj_length);
                $('td[name="order_date"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].order_date);
                $('td[name="order_num"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].order_id);
                $('td[name="order_cost"]').eq(i).empty().append(cn_toPrice(arrOrderList[Number((page*2)+i)].ordered_cost)+"원");
                $('td[name="order_state"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].status);
                $('td[name="order_name"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].shopper_id);
                $('td[name="order_info"]').eq(i).empty().append(obj.name +"외 ……"+obj_length+"건");
            }
            console.log("22222222222222 : "+arrOrderList[Number((page*2)+i)]);
            }
        }
        //페이지가 9일땐 값이 하나임
        else{
            console.log("마지막페이지일때");
            for(var i=0 ; i < 1 ; i++) {
            var obj = arrOrderList[Number((page*2)+i)].ordered_product[0];
            console.log("i는 : "+i+" , obj2222222 : "+JSON.stringify(obj));
            if(obj == undefined){
                console.log("undefined입니다요 : ");
                $('td[name="order_date"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].order_date);
                $('td[name="order_num"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].order_id);
                $('td[name="order_cost"]').eq(i).empty().append(cn_toPrice(arrOrderList[Number((page*2)+i)].ordered_cost)+"원");
                $('td[name="order_state"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].status);
                $('td[name="order_name"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].shopper_id);
                $('td[name="order_info"]').eq(i).empty().append("없음");
            }else{
                console.log("undefined아닙니다요 : ");
                console.log("obj3333333333 : "+obj.name);
                var obj2 = arrOrderList[Number((page*2)+i)].ordered_product;
                var obj_length = Object.keys(obj2).length;
                console.log("obj34343434 : "+obj_length);
                $('td[name="order_date"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].order_date);
                $('td[name="order_num"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].order_id);
                $('td[name="order_cost"]').eq(i).empty().append(cn_toPrice(arrOrderList[Number((page*2)+i)].ordered_cost)+"원");
                $('td[name="order_state"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].status);
                $('td[name="order_name"]').eq(i).empty().append(arrOrderList[Number((page*2)+i)].shopper_id);
                $('td[name="order_info"]').eq(i).empty().append(obj.name +"외 ……"+obj_length+"건");
            }
            console.log("22222222222222 : "+arrOrderList[Number((page*2)+i)]);
            }
        }

        
        var currentOrderListPage_html = currentOrderListPage + 1;
        if(currentOrderListPage_html < 10){
            currentOrderListPage_html = "0"+currentOrderListPage_html;
        }
        //페이징변경
        $('b[name="order_cur_pg"]').empty().html(currentOrderListPage_html);//현재페이지
    },
    //주문 list 화살표 on / off
    orderArrow : function(){
        //첫번째 페이지이고 다음페이지가 없을때
        if(currentOrderListPage == 0 && currentOrderListPage == totalOrderListPage){
            console.log("첫페이지이고 다음페이지 없을때");
            $('span[name="arrow_top_order"]').removeClass('arrow_top');
            $('span[name="arrow_bottom_order"]').removeClass('arrow_bottom');
        }
        //첫번째 페이지이고 다음페이지가 있을때
        else if(currentOrderListPage == 0 && currentOrderListPage != totalOrderListPage){
            console.log("첫페이지이고 다음페이지 있을때");
            $('span[name="arrow_top_order"]').removeClass('arrow_top');
            $('span[name="arrow_bottom_order"]').addClass('arrow_bottom focus');
        }
        //첫번째 페이지가 아니고 다음페이지가 없을때
        else if(currentOrderListPage != 0 && currentOrderListPage == totalOrderListPage){
            console.log("첫번째 페이지가 아니고 다음페이지가 없을때");
            $('span[name="arrow_top_order"]').addClass('arrow_top focus');
            $('span[name="arrow_bottom_order"]').removeClass('arrow_bottom');
        }
        //첫번째 페이지가 아니고 다음페이지가 있을때
        else if(currentOrderListPage != 0 && currentOrderListPage != totalOrderListPage){
            console.log("첫번째 페이지가 아니고 다음페이지가 있을때");
            $('span[name="arrow_top_order"]').addClass('arrow_top focus');
            $('span[name="arrow_bottom_order"]').addClass('arrow_bottom focus'); 
        }
    },
    // 조회 : 주문상세_1
    selectOrderDtList: function(id) {
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
                //console.log("obj_length---->"+obj_length);
                //결과값 없을때 0
                if(obj_length == 1){
                    //주문내역 없습니다. 토스트메세지
                    $('#pop_order_non').show();
                    setTimeout("fn_popOrderNon()", 2000);
                }
                //결과값 있을때
                else{
                    //arrOrderDtList       = new Array(); // 구매 리스트 초기화
                    arrOrderDtTotalList       = new Array(); // 구매 리스트 초기화
                    var cnt = 0;
                    //console.log("##### 주문내역 List json " + JSON.stringify(result));

                    $.each(result['arr_order'], function(index, entry) { 
                        appendHtml = {
                                            "ordered_product" : entry['ordered_product']
                                            
                                         };
                        if(entry['order_id'] == id){
                            $('td[name="order_dt_date"]').empty().append(entry['order_date']);
                            $('td[name="order_dt_num"]').empty().append(entry['order_id']);
                            $('td[name="order_dt_cost"]').empty().append(cn_toPrice(entry['ordered_cost'])+"원");
                            $('td[name="order_dt_state"]').empty().append(entry['status']);
                            $('span[name="order_dt_name"]').empty().append(entry['shopper_id']); 

                            appendHtml2 = {
                                            "total_cost" : entry['total_cost'],
                                            "shopper_cost" : entry['shopper_cost'],
                                            "delivery_cost" : entry['delivery_cost'],
                                            "ordered_cost" : entry['ordered_cost']
                                         };


                            if(entry['status'] == "배송 완료"){
                                $('span[name="order_dt_name"]').after('<span class="tb_btn focus" name="dt1_star">평점주기</span>');
                            }else{
                                $('span[name="dt1_star"]').remove();
                            }

                            // $.each(entry['ordered_product'], function(pindex, pentry) {
                            //   appendHtml = {
                            //                 "image" : pentry['image'],
                            //                 "name" : pentry['name'],
                            //                 "cost" : pentry['cost'],
                            //                 "cnt" : pentry['cnt'],
                            //                 "delivery_cost" : pentry['delivery_cost']
                                            
                            //              };  
                            // });
                            // $.each(entry['ordered_product'], function(pindex, pentry) {
                                var obj2 = entry['ordered_product'];
                                var obj_length = Object.keys(obj2).length;
                                console.log("obj_length-->"+obj_length);
                                // appendHtml = {
                                //             "image" : obj2.image,
                                //             "name" : obj2.name,
                                //             "cost" : obj2.cost,
                                //             "cnt" : obj2.cnt,
                                //             "delivery_cost" : obj2.delivery_cost
                                            
                                //          };     
                                
                                
                                //console.log("##### 주문내역 List  obj2 json " + JSON.stringify(obj2));
                                // 결과값이 2보다 크면 다음 페이지 존재 / 결과값이 2이면ㄴ 다음페이지에 total보임
                                if(obj_length > 2 || obj_length == 2) { 
                                    $('span[name="arrow_top_order_dt1"]').removeClass('arrow_top');
                                    $('span[name="arrow_bottom_order_dt1"]').addClass('arrow_bottom focus');
                                    if(obj_length > 2){nextOrderDtPageYN = true;}
                                    for(var i=0; i<2; i++){
                                        makeOrderDtProduct();
                                        console.log("i : "+i +",image : "+obj2[i].image);
                                        console.log("i : "+i +",name : "+obj2[i].name);
                                        console.log("i : "+i +",cost : "+obj2[i].cost);
                                        console.log("i : "+i +",cnt : "+obj2[i].cnt); 
                                        
                                    }
                                        $('td[name="dt_img"]').eq(0).empty().append('<img src="' + cmsServerIp + obj2[0].image + '" height="100" width="100" />'); 
                                        $('td[name="dt_name"]').eq(0).empty().append(obj2[0].name);    
                                        $('td[name="dt_cost"]').eq(0).empty().append(cn_toPrice(obj2[0].cost)+"원"); 
                                        $('td[name="dt_discount"]').eq(0).empty().append(""); 
                                        $('td[name="dt_cnt"]').eq(0).empty().append(obj2[0].cnt); 
                                        $('td[name="dt_delivery"]').eq(0).empty().append(cn_toPrice(obj2[0].delivery_cost)+"원");    //배송비
                                        $('td[name="dt_store"]').eq(0).empty().append("양재점"); 
                                        $('td[name="dt_order"]').eq(0).empty().append(cn_toPrice(Number(obj2[0].cost)*Number(obj2[0].cnt))+"원"); 

                                        $('td[name="dt_img"]').eq(1).empty().append('<img src="' + cmsServerIp + obj2[1].image + '" height="100" width="100" />'); 
                                        $('td[name="dt_name"]').eq(1).empty().append(obj2[1].name);    
                                        $('td[name="dt_cost"]').eq(1).empty().append(cn_toPrice(obj2[1].cost)+"원"); 
                                        $('td[name="dt_discount"]').eq(1).empty().append(""); 
                                        $('td[name="dt_cnt"]').eq(1).empty().append(obj2[1].cnt); 
                                        $('td[name="dt_delivery"]').eq(1).empty().append(cn_toPrice(obj2[1].delivery_cost)+"원");    //배송비
                                        $('td[name="dt_store"]').eq(1).empty().append("양재점"); 
                                        $('td[name="dt_order"]').eq(1).empty().append(cn_toPrice(Number(obj2[1].cost)*Number(obj2[1].cnt))+"원"); 

                                }else if(obj_length < 2){
                                    console.log("결과값이 2보다 작거나 2이면 다음 페이지 존재안함=total보여지므로 화살표 표시 o");
                                    nextOrderDtPageYN = false;
                                    if(obj_length != 0){
                                        $('span[name="arrow_top_order_dt1"]').removeClass('arrow_top');
                                        $('span[name="arrow_bottom_order_dt1"]').addClass('arrow_bottom focus');
                                    }else if(obj_length == 0){
                                        $('span[name="arrow_bottom_order_dt1"]').removeClass('arrow_bottom');
                                    }
                                    for(var i=0; i<obj_length; i++){
                                        makeOrderDtProduct();
                                        $('td[name="dt_img"]').eq(i).empty().append('<img src="' + cmsServerIp + obj2[i].image + '" height="100" width="100" />'); 
                                        $('td[name="dt_name"]').eq(i).empty().append(obj2[i].name);    
                                        $('td[name="dt_cost"]').eq(i).empty().append(cn_toPrice(obj2[i].cost)+"원"); 
                                        $('td[name="dt_discount"]').eq(i).empty().append(""); 
                                        $('td[name="dt_cnt"]').eq(i).empty().append(obj2[i].cnt); 
                                        $('td[name="dt_delivery"]').eq(i).empty().append(cn_toPrice(obj2[i].delivery_cost)+"원");    //배송비
                                        $('td[name="dt_store"]').eq(i).empty().append("양재점"); 
                                        $('td[name="dt_order"]').eq(i).empty().append(cn_toPrice(Number(obj2[i].cost)*Number(obj2[i].cnt))+"원"); 
                                        
                                    }
                                }
                                $('tr[name="order_dt_menu"]').eq(orderDtFocusMenu).addClass('focus');
                        }
                        cnt                 = Math.floor(index / maxOrderDtListPage);
                        var str             = appendHtml;
                        arrOrderDtList[index]    = str;
                        arrOrderDtTotalList[0] = appendHtml2;
                        //console.log("index : " + index + " maxOrderDtListPage : " + maxOrderDtListPage + " cnt : " + cnt);
                        //console.log("appendHtml22222 : "+JSON.stringify(appendHtml));
                        totalOrderDtListPage = cnt;
                        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@arrOrderDtList: " + JSON.stringify(arrOrderDtList));

                    });
                    //console.log("#####################################");
                    //console.log("총페이지수: " + totalOrderDtListPage);
                    //console.log("######################################");
                }
            }
        });
    },
    // 주문내역상세_2로가는 페이징
    pagingOrderedDtProduct : function(page) {
        // 현재 페이지
        currentOrderDtListPage = page;
        console.log("########주문내역 상세2222list리스트 페이지 이동 currentOrderDtListPage   : " + currentOrderDtListPage);
        //console.log("########arrOrderList.length : " + arrOrderList.length);
        //console.log("##### 쇼퍼 List json 페이지이동 " + JSON.stringify(arrOrderList));
        //쇼퍼list
        //마지막페이지아닐때
        if(currentOrderDtListPage != totalOrderDtListPage){
            console.log("마지막페이지아닐때");
            for(var i=0 ; i < 3 ; i++) {
            var obj = arrOrderDtList[Number((page*2)+i)];
            console.log("i는 : "+i+" , obj2222222 : "+JSON.stringify(obj));
                if(obj == undefined){
                    console.log("undefined입니다요 : ");
                }else{
                    console.log("undefined아닙니다요 : ");
                    var obj2 = arrOrderDtList[Number((page*2)+i)];
                    console.log("obj2 json : "+JSON.stringify(obj2));
                    var obj3 = arrOrderDtList[currentOrderDtListPage].ordered_product[Number(currentOrderDtListPage*2)+i];
                    console.log("obj3 json : "+JSON.stringify(obj3));

                    $('div[name="order_dt1_total_view"]').hide();
                    makeOrderDtProduct2();
                    $('td[name="dt_img2"]').eq(i).empty().append('<img src="' + cmsServerIp + obj3.image + '" height="100" width="100" />'); 
                    $('td[name="dt_name2"]').eq(i).empty().append(obj3.name);    
                    $('td[name="dt_cost2"]').eq(i).empty().append(cn_toPrice(obj3.cost)+"원"); 
                    $('td[name="dt_discount2"]').eq(i).empty().append(""); 
                    $('td[name="dt_cnt2"]').eq(i).empty().append(obj3.cnt); 
                    $('td[name="dt_delivery2"]').eq(i).empty().append(cn_toPrice(obj3.delivery_cost)+"원");    //배송비
                    $('td[name="dt_store2"]').eq(i).empty().append("양재점"); 
                    $('td[name="dt_order2"]').eq(i).empty().append(cn_toPrice(Number(obj3.cost)*Number(obj3.cnt))+"원"); 
                    //첫번째 페이지가 아니고 다음페이지가 없을때
                    if(currentOrderDtListPage != 0 && currentOrderDtListPage == 3){
                        console.log("첫번째 페이지가 아니고 다음페이지가 없을때");
                        $('span[name="arrow_top_order_dt2"]').addClass('arrow_top focus');
                        $('span[name="arrow_bottom_order_dt2"]').removeClass('arrow_bottom');
                    }
                    //첫번째 페이지가 아니고 다음페이지가 있을때
                    else if(currentOrderDtListPage != 0 && currentOrderDtListPage != 3){
                        console.log("첫번째 페이지가 아니고 다음페이지가 있을때");
                        $('span[name="arrow_top_order_dt2"]').addClass('arrow_top focus');
                        $('span[name="arrow_bottom_order_dt2"]').addClass('arrow_bottom focus'); 
                    }   

                    //첫번째 리스트 포커스   
                    $('tr[name="order_dt_menu2"]').eq(orderDt2FocusMenu).addClass('focus');              
                }
            }
        }
        else{
            console.log("마지막페이지일때");
            for(var i=0 ; i < 2 ; i++) {
            var obj = arrOrderDtList[Number((page*2)+i)];
            console.log("i는 : "+i+" , obj2222222 : "+JSON.stringify(obj));
                if(obj == undefined){
                    console.log("undefined입니다요 : total sum 보여줘야됨111");


                }else{
                    console.log("undefined아닙니다요 : ");
                    console.log("obj3333333333 : "+obj.name);
                    var obj2 = arrOrderList[Number((page*2)+i)].ordered_product;
                    var obj_length = Object.keys(obj2).length;
                    console.log("obj34343434 : "+obj_length);
                    makeOrderDtProduct();
                    $('td[name="dt_img"]').eq(i).empty().append('<img src="' + cmsServerIp + obj2[i].image + '" height="100" width="100" />'); 
                    $('td[name="dt_name"]').eq(i).empty().append(obj2[i].name);    
                    $('td[name="dt_cost"]').eq(i).empty().append(cn_toPrice(obj2[i].cost)+"원"); 
                    $('td[name="dt_discount"]').eq(i).empty().append(""); 
                    $('td[name="dt_cnt"]').eq(i).empty().append(obj2[i].cnt); 
                    $('td[name="dt_delivery"]').eq(i).empty().append(cn_toPrice(obj2[i].delivery_cost)+"원");    //배송비
                    $('td[name="dt_store"]').eq(i).empty().append("양재점"); 
                    $('td[name="dt_order"]').eq(i).empty().append(cn_toPrice(Number(obj2[i].cost)*Number(obj2[i].cnt))+"원"); 
                    console.log("total sum 보여줘야됨2222");

                
                }
            
            }
        }

    },
    // 주문내역상세_2로가는 페이징인데 리스트 갯수가 하나라서 다음페이지에 보여줄게 없다 total 보여줌
    pagingOrderedDtTotalProduct : function() {
        // 현재 페이지
        //currentOrderDtListPage = page;
        console.log("########주문내역 상세 total보여줌");
        
        $('div[name="order_dt1_total_view"]').show();
        console.log("arrOrderDtTotalList" + arrOrderDtTotalList);
        console.log(JSON.stringify(arrOrderDtTotalList));
        $('span[name="dt2_total_cost"]').empty().append(cn_toPrice(arrOrderDtTotalList[0].total_cost)+"원");
        $('span[name="dt2_shopper_cost"]').empty().append(cn_toPrice(arrOrderDtTotalList[0].shopper_cost)+"원"); 
        $('span[name="dt2_delivery_cost"]').empty().append(cn_toPrice(arrOrderDtTotalList[0].delivery_cost)+"원"); 
        $('span[name="dt2_ordered_cost"]').empty().append(cn_toPrice(arrOrderDtTotalList[0].ordered_cost)+"원"); 
    },


});