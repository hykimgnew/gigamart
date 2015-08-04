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
// 찜하기 / 토스트 팝업 닫기
function fn_popFav() {
    $('#pop_popfav_ok').hide();
    fvFocus = 1;
}
var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();

/**
 *  Product Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.product.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        // 공통 실행
        common_init();

        // 플로팅 메뉴 장바구니 SET
        fltEasyCart();

        //마이페이지에서->상품상세로 넘어갈때 찜한상품인지 최근본상품에서 상세로 넘어가는지..)
        var requestMyStatus  = request.getParameter("requestMyStatus");

        //마이페이지에서->상품상세로 넘어갈때 현재 페이지
        var requestMyPage  = request.getParameter("requestMyPage");
        //마이페이지에서->상품상세로 넘어갈때 현재포커스된 위치
        var requestMyMenu  = request.getParameter("requestMyMenu");
        //마이페이지에서->상품상세로 넘어갈때 현재포커스된 위치의 상품갯수
        var requestMyCnt  = request.getParameter("requestMyCnt");

        //상세카테고리에서->상품상세로 넘어갈때 현재 페이지
        var requestDtlPage  = request.getParameter("requestDtlPage");
        //상세카테고리에서->상품상세로 넘어갈때 현재포커스된 위치
        var requestDtlMenu  = request.getParameter("requestDtlMenu");
        //상세카테고리에서->상품상세로 넘어갈때 현재포커스된 위치의 상품갯수
        var requestDtlCnt  = request.getParameter("requestDtlCnt");



        console.log("requestMyStatus : " + requestMyStatus);
        console.log("requestMyPage : " + requestMyPage);
        console.log("requestMyMenu : " + requestMyMenu);
        console.log("requestMyCnt : " + requestMyCnt);

        console.log("requestDtlPage : " + requestDtlPage);
        console.log("requestDtlMenu : " + requestDtlMenu);
        console.log("requestDtlCnt : " + requestDtlCnt);

        console.log("requestMyStatus : " + requestMyStatus);
        console.log("지금 이상품 이가격 포커스 : " + requestExhbFocus);
        console.log("지금 이상품 이가격 페이지 : " + requestExhbPage);
        console.log("###################################################################################################################");
        console.log("############# requestProductView : " + requestProductView);
        console.log("############# requestCurrentFocusList : " + requestCurrentFocusList);
        console.log("############# requestCurrentFocusMenu : " + requestCurrentFocusMenu);
        console.log("############# requestCurrentFocusMenul : " + requestCurrentFocusMenul);
        console.log("###################################################################################################################");
        console.log("############# requestCategoryCode : " + requestCategoryCode);
        console.log("############# requestCategoryDtlCode : " + requestCategoryDtlCode);
        console.log("############# requestCategoryDtlPage : " + requestCategoryDtlPage);
        console.log("############# requestCategoryDtlId : " + requestCategoryDtlId);
        console.log("###################################################################################################################");

        //상세정보관련
        if(requestProductView != null && requestProductView != '' && requestProductView != 'undefined') {
            //2번째페이지일때
            if(requestProductView == '2'){
                //같은종류추천 
                if(requestCurrentFocusList == '2') {
                    //focus위치 가져옴 requestCurrentFocusMenu
                    productView = 2;
                    currentFocusList = 1;
                    currentFocusMenu = requestCurrentFocusMenu;
                    $('li[name="pl_menu"]').eq(requestCurrentFocusMenu).addClass('focus');  
                    $('li[name="pl_menu"]:eq('+ requestCurrentFocusMenu + ') > .pm_bdr').append(btnokfill);
                    $('li[name="pl_menu"]').eq(requestCurrentFocusMenu).children().children('.plm_tit').addClass('focus');
                }
                //다른사람이 구매한 연관상품
                else{
                    //focus위치 가져옴 requestCurrentFocusMenul
                    productView = 2;
                    currentFocusList = 0;
                    currentFocusMenul = requestCurrentFocusMenul;
                        $('li[name="pl_menul"]').eq(requestCurrentFocusMenul).addClass('focus');  
                        $('li[name="pl_menul"]:eq('+ requestCurrentFocusMenul + ') > .pm_bdr').append(btnokfill);
                        $('li[name="pl_menul"]').eq(requestCurrentFocusMenul).children().children('.plm_tit').addClass('focus');
                }     
            }else if(requestProductView == '1'){
                //같은종류추천 
                if(requestCurrentFocusList == '2') {
                    console.log("같은종류추천 #################################################################같은종류추천 ");
                    //focus위치 가져옴 requestCurrentFocusMenu
                    productView = 1;
                    currentFocusList = 2;
                    currentFocusMenu = requestCurrentFocusMenu;
                    $('li[name="pl_menu"]').eq(requestCurrentFocusMenu).addClass('focus');  
                    $('li[name="pl_menu"]:eq('+ requestCurrentFocusMenu + ') > .pm_bdr').append(btnokfill);   
                    $('li[name="pl_menu"]').eq(requestCurrentFocusMenu).children().children('.plm_tit').addClass('focus');
                }
                //다른사람이 구매한 연관상품
                else{
                    console.log("다른사람이 구매한 연관상품 ###########################################다른사람이 구매한 연관상품 ");
                    //focus위치 가져옴 requestCurrentFocusMenul
                    productView = 1;
                    currentFocusList = 3;
                    currentFocusMenul = requestCurrentFocusMenul;
                        $('li[name="pl_menul"]').eq(requestCurrentFocusMenul).addClass('focus');  
                        $('li[name="pl_menul"]:eq('+ requestCurrentFocusMenul + ') > .pm_bdr').append(btnokfill);
                        $('li[name="pl_menul"]').eq(requestCurrentFocusMenul).children().children('.plm_tit').addClass('focus');
                }  
            }
            
            
        }
        else{
            //장바구니 버튼에 focus
            $('li[name="add_cart"]').addClass('focus');
        }
        //첫번째페이지에 상세정보 관련이미지/관련정보
        this.selectProductSubCategory();

        //최근본상품 add count
        this.addCountNewProduct();


    },

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;

        console.log("############ keyCode " + keyCode);

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
                // 수량변경 팝업 on -> off
                $('#btn_volume_close').removeClass('focus');
                $('#wrap_chVolume_easyCart').hide();
                chgVolumeFocus = 0;

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
                        location.href = EXHB_PATH + 'order.html?SHOPPER_STATUS=' + SHOPPER_STATUS + '&requestOrderScreen=product1.html'
                                      + '&productView=' + requestProductView 
                                      + '&currentFocusList=' + requestCurrentFocusList
                                      + '&currentFocusMenu=' + requestCurrentFocusMenu
                                      + '&currentFocusMenul=' + requestCurrentFocusMenul
                                      + '&categoryCode=' + requestCategoryCode
                                      + '&categoryDtlCode=' + requestCategoryDtlCode
                                      + '&categoryDtlPage=' + requestCategoryDtlPage
                                      + '&id=' + requestCategoryDtlId
                                      + '&requestExhbFocus=' + requestExhbFocus
                                      + '&requestExhbPage=' + requestExhbPage+ '&userID='+ userID + '&userName=' + userName;
                                      
                    }
                    
                    // 결제
                    if(cartFocus == 1) {
                        console.log("장바구니 담긴 개수 : " + $('#ec_list > li[name="ec_li_list"]').size());

                        if($('#ec_list > li[name="ec_li_list"]').size() > 0) {
                            $('#p_videoDiv video').remove();
                            $('#span_videoDiv video').remove();
                            appConfiguration.localSystem.mute = true; // 음소거 설정
                            location.href = EXHB_PATH + 'order.html?SHOPPER_STATUS=' + SHOPPER_STATUS + '&requestOrderScreen=product1.html'
                                      + '&productView=' + requestProductView 
                                      + '&currentFocusList=' + requestCurrentFocusList
                                      + '&currentFocusMenu=' + requestCurrentFocusMenu
                                      + '&currentFocusMenul=' + requestCurrentFocusMenul
                                      + '&categoryCode=' + requestCategoryCode
                                      + '&categoryDtlCode=' + requestCategoryDtlCode
                                      + '&categoryDtlPage=' + requestCategoryDtlPage
                                      + '&id=' + requestCategoryDtlId
                                      + '&requestExhbFocus=' + requestExhbFocus
                                      + '&requestExhbPage=' + requestExhbPage + '&userID='+ userID + '&userName=' + userName + '&startScreen=2';   
                        } else {
                            console.log("#상품이 존재하지 않아 결제 화면으로 이동하지 않음");
                        }
                    }

                    // 장바구니 리스트
                    if(cartFocus > 1) {
                        // 수량변경 팝업 off -> on
                        $('#wrap_chVolume_easyCart').show();
                        //$('#wrap_chVolume_easyCart').removeClass('bg_alpha');

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
                        updateEasyCart($('input[name="ec_id"]').eq(cartFocus-2).val(), Number($('input[name="ec_cnt"]').eq(cartFocus-2).val()));

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
                            if($('li[name="ec_li_list"]').length != 0) {
                                $('#ecc_payments').removeClass('focus');
                                cartFocus = 2;
                                $('li[name="ec_li_list"]').eq(cartFocus-2).addClass('focus');
                            }
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
            // * 三 KEY (간편 장바구니)
            // **************************************************
            if(keyCode == VK_GREEN) {

                isCart      = true;
                cartFocus   = 1;    // 결제 버튼 Focus

                retrieveEasyCart(); // 간편 장바구니 조회

                $('#popup_cart').show();
                $('#ecc_payments').addClass('focus'); // 첫 포커스는 ecc_payments
            }

            // **************************************************
            // * ◀ KEY (플로팅 Go home)
            // **************************************************
            if(keyCode == VK_RED) {
                location.href ="exhb.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName; // 기획전 이동
            }
            // **************************************************
            // * ◀|| KEY (카테고리 Go home)
            // 
            if(keyCode == VK_PLAY) {
                location.href ="category.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName; // 기획전 이동
            }    
            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                //상품정보의 첫번째 화면일때
                if(productView ==1){
                    //상세보기, 찜하기, 장바구니담기 버튼들..
                    if(currentFocusList == 0) {
                        if(btFocus == 0) { //+/-일때 popup
                            var num = Number($('span[name="pr_num_num"]').html());
                            //-에 포커스일때
                            if(pFocus == 0){
                                if(num > 1){
                                    num = num - 1;
                                    $('span[name="pr_num_num"]').html(num);
                                }
                                else if(num == 1){

                                }
                            }
                            //+에 포커스일때
                            else if(pFocus == 1){
                                var num = Number($('span[name="pr_num_num"]').html());
                                if(num == 1 || num>1){
                                    num = num + 1;
                                    $('span[name="pr_num_num"]').html(num);
                                }else{

                                }
                            }
                            // currentFocusList = 4;
                            // $('span[name="pr_num_minus"]').removeClass('focus'); 
                            // $('span[name="pr_num_plus"]').removeClass('focus'); 
                            // popFocus = 1;
                            // $('div[name="wrap_chVolume"]').show();
                            // $('span[name="pr_num_numP"]').html(num);
                            // $('span[name="pr_num_plusP"]').addClass('focus');  
                        }
                        // 장바구니 담기 
                        else if(btFocus == 1) {
                            var idx = currentFocusDtl1 + (2 * currentFocusDtlPage);
                    
                            console.log("############ 장바구니에 담는 product_id : " + requestCategoryDtlId);
                            console.log("장바구니에 담겼습니다..");
                            
                            // 장바구니 담기
                            console.log("######## 장바구니에 담을 수량 : " + Number($('span[name="pr_num_num"]').html()));

                            appendEasyCart(Number($('span[name="pr_num_num"]').html()), requestCategoryDtlId);
                            $('#cart_message').html("장바구니에 현재 상품이 " + $('span[name="pr_num_num"]').html() + "개 담겼습니다.");
                            $('#wrap_cart').show();
                            // 플로팅 메뉴 장바구니 SET
                            fltEasyCart();
                            setTimeout("fn_popEasyCart()", 1500);       
                        }
                        //찜하기 버튼
                        else if(btFocus == 2){
                            this.selectFavList();
                        }
                        //상세보기버튼-> 팝업
                        else if(btFocus == 3){
                            currentFocusList = 5;
                            this.selectProductSubCategory();
                            $('div[name="product_pop"]').show();
                        }
                    }
                    else if(currentFocusList == 1){

                    }
                    else if(currentFocusList == 2){

                    }
                    else if(currentFocusList == 3){

                    }
                    //+ - 팝업
                    else if(currentFocusList == 4) {
                        //-에 포커스일때
                        if(popFocus == 0){
                            var num = Number($('span[name="pr_num_num"]').html());
                            var numP = Number($('span[name="pr_num_numP"]').html());
                            if(numP > 1){
                                numP = numP - 1;
                                $('span[name="pr_num_numP"]').html(numP);
                            }else if(numP == 1){

                            }
                        }
                        //+에 포커스일때
                        else if(popFocus == 1){
                            var num = Number($('span[name="pr_num_num"]').html());
                            var numP = Number($('span[name="pr_num_numP"]').html());
                            if(numP == 1 || numP>1){
                                numP = numP + 1;
                                $('span[name="pr_num_numP"]').html(numP);
                            }else{

                            }
                        }
                        //확인에 포커스일때
                        else if(popFocus == 2){
                            $('span[id="btn_ok"]').removeClass('focus');
                            var numP = Number($('span[name="pr_num_numP"]').html());
                            $('span[name="pr_num_num"]').html(numP);

                            currentFocusList = 0;
                            pFocus = pFocus;
                            $('span[name="pr_num_minus"]').addClass('focus');
                            $('span[name="pr_num_plus"]').addClass('focus');
                            /*if(pFocus == 0){
                                //팝업전화면에서 pFocus포커스가 - 였을때
                                $('span[name="pr_num_minus"]').addClass('focus');
                            }else{
                                //팝업전화면에서 pFocus포커스가 + 였을때
                                $('span[name="pr_num_plus"]').addClass('focus');
                            }*/
                            
                            $('div[name="wrap_chVolume"]').hide();


                        }
                        //취소에 포커스일때
                        else if(popFocus == 3){
                            $('span[id="btn_close"]').removeClass('focus'); 
                            console.log("pFocus==>"+pFocus);
                            currentFocusList = 0;
                            pFocus = pFocus;
                            $('span[name="pr_num_minus"]').addClass('focus');
                            $('span[name="pr_num_plus"]').addClass('focus');
                            /*if(pFocus == 0){
                                //팝업전화면에서 pFocus포커스가 - 였을때
                                $('span[name="pr_num_minus"]').addClass('focus');
                            }else{
                                //팝업전화면에서 pFocus포커스가 + 였을때
                                $('span[name="pr_num_plus"]').addClass('focus');
                            }*/
                            
                            $('div[name="wrap_chVolume"]').hide();
                        }
                    }
                    //상품상세팝업
                    else if(currentFocusList == 5){
                        //닫기 포커스일때
                        if(popProductFocus == 2){
                            $('div[name="product_pop_btn"]').removeClass('focus');
                            location.href="#product_img";
                            currentFocusList = 0;
                            popProductFocus = 0;
                            $('div[name="product_pop"]').hide();
                        }
                        
                        //this.selectProductSubCategory();
                    }
                }
                //상품정보의 두번째 화면일때
                else{
                    //기획전일때->exhb.html으로 이동
                    if(currentFocusList == 2) {
                        location.href ="exhb.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName; // 기획전 이동
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
                    //상품정보의 첫번째 화면일때
                    if(productView ==1){
                        console.log("currentFocusList==>"+currentFocusList);
                        // 장바구니 찜하기 상세보기 버튼들..
                        if(currentFocusList == 0) {
                            if(btFocus == 2) { //찜하기 focus일때
                                console.log("btFocus131313==>"+btFocus);
                                $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                btFocus = Number(btFocus) + 1;
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                            }
                        }
                        //상품정보 전체화면
                        else if(currentFocusList == 1) {
                            
                        }
                        // 상품정보 같은종류 추천상품
                        else if(currentFocusList == 2) {
                            
                        }  
                        //상품정보 다른사람이 구매한 연관상품
                        else if(currentFocusList == 3) {
                            if(currentFocusMenul == 0){//다른사람이 구매한 연관상품->+ focus
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                
                                // $('span[name="pr_num_plus"]').addClass('focus');
                                // $('span[name="pr_num_minus"]').addClass('focus'); 
                                if(pFocus == 1){
                                    $('span[name="pr_num_plus"]').addClass('focus');
                                }else{
                                    $('span[name="pr_num_minus"]').addClass('focus'); 
                                }   
                                currentFocusList = 0;
                                //currentFocusMenul = currentFocusMenul-1;
                            }
                            else if(currentFocusMenul == 1){//다른사람이 구매한 연관상품 -> 장바구니담기 focus
                                console.log("다른사람이 구매한 연관상품 -> 장바구니담기 focus currentFocusMenul==>"+currentFocusMenul);    
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                currentFocusList = 0;
                                //currentFocusMenul = currentFocusMenul-1;
                            }
                            else if(currentFocusMenul == 2){//다른사람이 구매한 연관상품 -> 찜하기 focus
                                console.log("다른사람이 구매한 연관상품 -> 찜하기 focus currentFocusMenul==>"+currentFocusMenul);  
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                currentFocusList = 0;
                                //currentFocusMenul = currentFocusMenul-1;
                            }
                        }    
                        //팝업
                        else if(currentFocusList == 4) {
                            //확인버튼에 포커스
                            if(popFocus == 2){
                                console.log("확인버튼에 포커스"); 
                                $('span[id="btn_ok"]').removeClass('focus'); 
                                popFocus = 0;
                                $('span[name="pr_num_minusP"]').addClass('focus'); 
                            }
                            //취소버튼에 포커스
                            else if(popFocus == 3){
                                console.log("취소버튼에 포커스"); 
                                $('span[id="btn_close"]').removeClass('focus'); 
                                popFocus = 1;
                                $('span[name="pr_num_plusP"]').addClass('focus');
                            }
                        }
                        //상세정보 팝업
                        else if(currentFocusList == 5){
                            //상세정보 content->상세정보 img
                            if(popProductFocus == 1){
                                console.log("상세정보 content->상세정보 img");
                                popProductFocus = 0;
                                location.href="#product_img";
                            }
                            //닫기 -> 상세정보 content
                            else if(popProductFocus == 2){
                                console.log("닫기 -> 상세정보 content");
                                $('div[name="product_pop_btn"]').removeClass('focus'); 
                                popProductFocus = 1;
                                location.href="#product_content";
                            }
                        }

                    }
                    //상품정보의 두번째 화면일때
                    else{
                        // 다른사람이 구매한 연관상품->첫번째페이지
                        if(currentFocusList == 0) {
                            productView = 1;
                            $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                            $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                            $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                            currentFocusList = 3;
                            currentFocusMenul = currentFocusMenul;
                            var url = "&categoryCode=" + requestCategoryCode
                            + "&categoryDtlCode=" + requestCategoryDtlCode
                            + "&categoryDtlPage=" + requestCategoryDtlPage
                            + "&id=" + requestCategoryDtlId;
                            location.href="product1.html?productView="+productView+"&currentFocusList="+currentFocusList+"&currentFocusMenul="+currentFocusMenul+url+"&SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName;
                        }
                        // 같은종류 추천상품->첫번째페이지
                        else if(currentFocusList == 1){
                            productView = 1;
                            $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                            currentFocusList = 2;
                            currentFocusMenu = currentFocusMenu;
                            var url = "&categoryCode=" + requestCategoryCode
                            + "&categoryDtlCode=" + requestCategoryDtlCode
                            + "&categoryDtlPage=" + requestCategoryDtlPage
                            + "&id=" + requestCategoryDtlId;
                            location.href="product1.html?productView="+productView+"&currentFocusList="+currentFocusList+"&currentFocusMenu="+currentFocusMenu+url+"&SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName;
                        }
                        //관련기획전->같은종류 추천상퓸/다른사람이 구매한 연관상품
                        else if(currentFocusList == 2){
                            //관련기획전->같은종류 추천상품
                            if(giFocus == 0){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');   
                                currentFocusList = 1;        
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            //관련기획전->다른사람이 구매한 연관상품
                            else if(giFocus == 1){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');   
                                currentFocusList = 0;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            else if(giFocus == 2){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus = 0;  
                                $('li[name="relP"]').eq(giFocus).addClass('focus'); 
                            }
                            else if(giFocus == 3){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');   
                                giFocus = 1;  
                                $('li[name="relP"]').eq(giFocus).addClass('focus'); 
                            }
                        }

                    }



                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                       //상품정보의 첫번째 화면일때
                       if(productView ==1){
                           // 장바구니 찜하기 상세보기 버튼들..
                            if(currentFocusList == 0) {
                                if(btFocus  == 0){ //+/- focus -> 다른사람이 구매한 연관상품
                                    //$('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                    /*if(pFocus == 1){
                                        $('span[name="pr_num_plus"]').removeClass('focus');
                                    }else{
                                        $('span[name="pr_num_minus"]').removeClass('focus'); 
                                    } */
                                    $('span[name="pr_num_plus"]').removeClass('focus');
                                    $('span[name="pr_num_minus"]').removeClass('focus'); 

                                    $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();  
                                    $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');  
                                    currentFocusMenul = 0;
                                    currentFocusList = 3;
                                    console.log("currentFocusList!!!==>"+currentFocusList);
                                    $('li[name="pl_menul"]').eq(btFocus).addClass('focus');     
                                    $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                    $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');    
                                }
                                else if(btFocus  == 1){//장바구니 담기focus -> 다른사람이 구매한 연관상품
                                    $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                    $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                    console.log("장바구니 담기focus -> 다른사람이 구매한 연관상품 currentFocusMenul111==>"+currentFocusMenul);  
                                    currentFocusMenul = btFocus;
                                    currentFocusList = 3;
                                    console.log("장바구니 담기focus -> 다른사람이 구매한 연관상품 currentFocusMenul222==>"+currentFocusMenul);  
                                    $('li[name="pl_menul"]').eq(btFocus).addClass('focus'); 
                                    $('li[name="pl_menul"]:eq('+ btFocus + ') > .pm_bdr').append(btnokfill);   
                                    $('li[name="pl_menul"]').eq(btFocus).children().children('.plm_tit').addClass('focus');  
                                }
                                else if(btFocus  == 2){//찜하기 focus -> 다른사람이 구매한 연관상품
                                    $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                    $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                    console.log("찜하기 focus -> 다른사람이 구매한 연관상품 currentFocusMenul111==>"+currentFocusMenul);  
                                    currentFocusMenul = btFocus;
                                    currentFocusList =3;
                                    console.log("찜하기 focus -> 다른사람이 구매한 연관상품 currentFocusMenul222==>"+currentFocusMenul);  
                                    $('li[name="pl_menul"]').eq(btFocus).addClass('focus');  
                                    $('li[name="pl_menul"]:eq('+ btFocus + ') > .pm_bdr').append(btnokfill);   
                                    $('li[name="pl_menul"]').eq(btFocus).children().children('.plm_tit').addClass('focus');
                                }
                                else if(btFocus  == 3) { //상세보기 focus일때
                                    console.log("btFocus111==>"+btFocus);
                                    $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                    btFocus = Number(btFocus) - 1;
                                    console.log("btFocus222==>"+btFocus);
                                    $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                }
                            }

                           // 상품정보 전체화면
                           else if(currentFocusList == 1) {
                                
                           }

                           // 같은종류 추천상품
                           else if(currentFocusList == 2) {
                                productView = 2;
                                //상품정보의 두번째화면으로 이동   
                                console.log("같은종류 추천상품 상품정보의 두번째화면으로 이동 ");
                                console.log("currentFocusList==>"+currentFocusList+" , currentFocusMenu==>"+currentFocusMenu);
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusList = currentFocusList;
                                currentFocusMenu = currentFocusMenu;
                                var url = "&categoryCode=" + requestCategoryCode
                                + "&categoryDtlCode=" + requestCategoryDtlCode
                                + "&categoryDtlPage=" + requestCategoryDtlPage
                                + "&id=" + requestCategoryDtlId;
                                location.href="product2.html?productView="+productView+"&currentFocusList="+currentFocusList+"&currentFocusMenu="+currentFocusMenu+url+"&SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName;
                                
                            }

                             //다른사람이 구매한 연관상품
                            else if(currentFocusList == 3) {
                                productView = 2;
                                //상품정보의 두번째화면으로 이동   
                                console.log("다른사람이 구매한 연관상품 상품정보의 두번째화면으로 이동 ");
                                console.log("currentFocusList==>"+currentFocusList+" , currentFocusMenul==>"+currentFocusMenul);
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusList = currentFocusList;
                                currentFocusMenul = currentFocusMenul;
                                //location.href="product2.html"
                                var url = "&categoryCode=" + requestCategoryCode
                                + "&categoryDtlCode=" + requestCategoryDtlCode
                                + "&categoryDtlPage=" + requestCategoryDtlPage
                                + "&id=" + requestCategoryDtlId;
                                location.href="product2.html?productView="+productView+"&currentFocusList="+currentFocusList+"&currentFocusMenul="+currentFocusMenul+url+"&SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName;
                            }
                            //팝업
                            else if(currentFocusList == 4) {
                                //-에 focus일떄->확인
                                if(popFocus == 0){
                                    $('span[name="pr_num_minusP"]').removeClass('focus');
                                    popFocus = 2;   
                                    $('span[id="btn_ok"]').addClass('focus'); 
                                    console.log("-에 focus일떄->확인 popFocus->"+popFocus);
                                }
                                //+에 focus일때->취소
                                else if(popFocus == 1){
                                    $('span[name="pr_num_plusP"]').removeClass('focus'); 
                                    popFocus = 3;
                                    $('span[id="btn_close"]').addClass('focus'); 
                                    console.log("+에 focus일때->취소->"+popFocus);
                                }
                            }
                            //상세정보 팝업
                            else if(currentFocusList == 5){
                                //상세정보 img -> 상세정보 content
                                if(popProductFocus == 0){
                                    console.log("상세정보 img -> 상세정보 content");
                                    //$('p[name="pop_cl_photo"]').hide();  
                                    popProductFocus = 1;
                                    location.href="#product_content";
                                    //location.href="#product_content?SHOPPER_STATUS=" + SHOPPER_STATUS;
                                }
                                //상세정보 content -> 닫기
                                else if(popProductFocus == 1){
                                    console.log("상세정보 content -> 닫기");
                                    //location.href="#product_content"
                                    popProductFocus = 2;
                                    $('div[name="product_pop_btn"]').addClass('focus'); 
                                }
                            }
                    }   
                    //상품정보의 두번째 화면일때
                    else{
                        //다른사람이 구매한 연관상품->기획전
                        if(currentFocusList == 0) {
                            currentFocusList = 2;
                            giFocus = 1;
                            $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                            $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                            $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                            $('li[name="relP"]').eq(giFocus).addClass('focus');   

                        }
                        //같은종류 추천상품->기획전
                        else if(currentFocusList == 1){
                            currentFocusList = 2;
                            giFocus = 0;
                            $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                            $('li[name="relP"]').eq(giFocus).addClass('focus');   

                        }
                        //관련기획전
                        else if(currentFocusList == 2){
                            //관련기획전 1행1번째->2행1번째
                            if(giFocus == 0){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');  
                                giFocus = 2;
                                $('li[name="relP"]').eq(giFocus).addClass('focus');      
                            }
                            //관련기획전 1행2번째->2행2번째
                            else if(giFocus == 1){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');  
                                giFocus = 3;
                                $('li[name="relP"]').eq(giFocus).addClass('focus');  
                            }
                        }           
                    } 


                }
                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {
                    //상품정보의 첫번째 화면일때
                    if(productView ==1){
                        // 장바구니 찜하기 상세보기 버튼들..
                        if(currentFocusList == 0) {
                            if(btFocus  == 0) { // +/- focus일때
                                if(pFocus == 1){ //+에 focus
                                    $('span[name="pr_num_plus"]').removeClass('focus');
                                    pFocus = Number(pFocus) - 1;
                                    $('span[name="pr_num_minus"]').addClass('focus'); 
                                }
                            }
                            if(btFocus  == 1) { //장바구니담기 focus일때
                               $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                               btFocus = Number(btFocus) - 1;
                               $('span[name="pr_num_plus"]').addClass('focus'); //+에 focus
                               //$('span[name="pr_num_minus"]').addClass('focus'); //-에 focus
                            }
                            if(btFocus  == 2) { //찜하기 focus일때
                                $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                btFocus = Number(btFocus) - 1;
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                            }
                        }

                        // 상품정보 전체화면
                        else if(currentFocusList == 1) {
                            /*$('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            currentFocusList = 0;
                            currentFocusDtl1 = currentFocusDtl2; // 열2 선택 순서가 그대로 열1으로 이동
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);*/
                        }

                        // 같은종류 추천상품
                        else if(currentFocusList == 2) {
                            if(currentFocusMenu == 1){//같은종류 추천상품2번째->1번째
                                console.log("같은종류 추천상품2번째->1번째 focus currentFocusMenu==>"+currentFocusMenu);  
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenu == 2){//같은종류 추천상품3번째->2번째
                                console.log("같은종류 추천상품3번째->2번째 focus currentFocusMenu==>"+currentFocusMenu); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                        }

                        //다른사람이 구매한 연관상품 
                        else if(currentFocusList == 3) {
                            console.log("LEFT");
                            console.log("currentFocusMenul==>"+currentFocusMenul); 
                            if(currentFocusMenul == 0){//다른사람이 구매한 연관상품1번째->같은종류 추천상품3번째
                                console.log("다른사람이 구매한 연관상품1번째->같은종류 추천상품3번째 currentFocusMenul==>"+currentFocusMenul);  
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = 2;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                                currentFocusList = 2;
                            }
                            else if(currentFocusMenul == 1){//다른사람이 구매한 연관상품2번째->1번째
                                console.log("다른사람이 구매한 연관상품2번째 focus currentFocusMenul==>"+currentFocusMenul);  
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)-1;
                                btFocus = currentFocusMenul
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenul == 2){//다른사람이 구매한 연관상품3번째->2번째
                                console.log("다른사람이 구매한 연관상품3번째 focus currentFocusMenul==>"+currentFocusMenul); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)-1;
                                btFocus = currentFocusMenul
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                        } 
                        //팝업
                        else if(currentFocusList == 4) {
                            //+일때-> -
                            if(popFocus == 1){
                                $('span[name="pr_num_plusP"]').removeClass('focus'); 
                                popFocus = 0;
                                $('span[name="pr_num_minusP"]').addClass('focus'); 
                            }
                            //취소 -> 확인
                            else if(popFocus == 3){
                                $('span[id="btn_close"]').removeClass('focus');
                                popFocus = 2;
                                $('span[id="btn_ok"]').addClass('focus');
                            }

                        }


                    }
                    //상품정보의 두번째 화면일때
                    else{
                        //다른사람이 구매한 연관상품
                        if(currentFocusList == 0) {
                            //다른사람이 구매한 연관상품1번째->같은종류 추천상품 3번째
                            if(currentFocusMenul ==0){
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = 2;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill);
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus'); 
                                currentFocusList = 1;
                            }
                            //다른사람이 구매한 연관상품2번째->다른사람이 구매한 연관상품 1번째
                            else if(currentFocusMenul ==1){
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)-1;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenul == 2){
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)-1;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');

                            }
                        }
                        //같은종류 추천상품
                        else if(currentFocusList == 1){
                            //같은종류 추천상품2번째->같은종류 추천상품 1번째
                            if(currentFocusMenu ==1){
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            //같은종류 추천상품3번째->같은종류 추천상품 2번째
                            else if(currentFocusMenu == 2){
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                        }
                        //관련기획전
                        else if(currentFocusList == 2){
                             //1행2번째->1행1번째
                            if(giFocus ==1){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus=0;   
                                $('li[name="relP"]').eq(giFocus).addClass('focus'); 
                            }
                             //2행2번째->2행1번째
                            else if(giFocus ==3){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus=2;   
                                $('li[name="relP"]').eq(giFocus).addClass('focus');     
                            }
                        }

                    }   
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {

                    //상품정보의 첫번째 화면일때
                    if(productView ==1){
                        // 장바구니 찜하기 상세보기 버튼들..
                        if(currentFocusList == 0) {
                            if(btFocus  == 0) { // +/- focus일때
                                // $('span[name="pr_num_plus"]').removeClass('focus');
                                // $('span[name="pr_num_minus"]').removeClass('focus');
                                // btFocus = Number(btFocus + 1);
                                // $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                
                                if(pFocus == 1){ //+에 focus
                                    $('span[name="pr_num_plus"]').removeClass('focus');
                                    btFocus = Number(btFocus + 1);
                                    console.log("btFocus2424==>"+btFocus);
                                    $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                }else{ //-에 focus
                                    $('span[name="pr_num_minus"]').removeClass('focus');
                                    pFocus = pFocus + 1;
                                    $('span[name="pr_num_plus"]').addClass('focus');
                                }
                            }
                            else if(btFocus  == 1) { //장바구니담기 focus일때
                                console.log("btFocus@==>"+btFocus);
                                $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                btFocus = Number(btFocus) + 1;
                                console.log("btFocus@@==>"+btFocus);
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                            }
                        }
                        // 상품정보 전체화면
                        else if(currentFocusList == 1){

                        }
                        // 같은종류 추천상품
                        else if(currentFocusList == 2){
                            if(currentFocusMenu == 0){//같은종류 추천상품1번째->2번째
                                console.log("같은종류 추천상품1번째->2번째 focus currentFocusMenu==>"+currentFocusMenu);  
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu+1);
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenu == 1){//같은종류 추천상품2번째->3번째
                                console.log("같은종류 추천상품2번째->3번째 focus currentFocusMenu==>"+currentFocusMenu); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)+1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            } 
                            else if(currentFocusMenu == 2){//같은종류 추천상품3번째->다른사람이 구매한 연관상품 1번째
                                console.log("같은종류 추천상품3번째->다른사람이 구매한 연관상품 1번째==>"+currentFocusMenu); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul =0;
                                currentFocusList = 3;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                                
                            } 


                        }
                        // 다른사람이 구매한 연관상품
                        else if(currentFocusList == 3){
                            console.log("Right");
                            console.log("currentFocusMenulRight==>"+currentFocusMenul); 
                            if(currentFocusMenul == 0){//다른사람이 구매한 연관상품1번째->2번째
                                console.log("다른사람이 구매한 연관상품1번째 focus currentFocusMenul==>"+currentFocusMenul);  

                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)+1;
                                btFocus = currentFocusMenul
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenul == 1){//다른사람이 구매한 연관상품2번째->3번째
                                console.log("다른사람이 구매한 연관상품2번째 focus currentFocusMenul==>"+currentFocusMenul); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)+1;
                                btFocus = currentFocusMenul
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }    
                        }
                        //팝업
                        else if(currentFocusList == 4) {
                            //-일때-> +
                            if(popFocus == 0){
                                $('span[name="pr_num_minusP"]').removeClass('focus'); 
                                popFocus = 1;
                                $('span[name="pr_num_plusP"]').addClass('focus'); 
                            }
                            //확인 -> 취소
                            else if(popFocus == 2){
                                $('span[id="btn_ok"]').removeClass('focus');
                                popFocus = 3;
                                $('span[id="btn_close"]').addClass('focus');
                            }

                        }


                    }
                    //상품정보의 두번째 화면일때
                    else{
                        //다른사람이 구매한 연관상품
                        if(currentFocusList == 0) {
                            console.log("#############RIGHTRIGHT다른사람이 구매한 연관상품RIGHT#########################"); 
                            //다른사람이 구매한 연관상품1번째->다른사람이 구매한 연관상품 2번째
                            if(currentFocusMenul ==0){
                                console.log("#############다른사람1번째->다른사람 2번째#########################currentFocusMenul>>"+currentFocusMenul); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)+1;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            //다른사람이 구매한 연관상품2번째->다른사람이 구매한 연관상품 3번째
                            else if(currentFocusMenul == 1){
                                console.log("#############다른사람2번째->다른사람 3번째#########################currentFocusMenul111>>"+currentFocusMenul);
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)+1;
                                console.log("#############다른사람2번째->다른사람 3번째#########################currentFocusMenul222>>"+currentFocusMenul);
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                        }
                        //같은종류 추천상품
                        else if(currentFocusList == 1){
                            console.log("#############RIGHTRIGHT같은종류 추천상품RIGHT#########################"); 
                            //같은종류 추천상품1번째->같은종류 추천상품 2번째
                            if(currentFocusMenu ==0){
                                console.log("#############같은종류 추천상품1번째->같은종류 추천상품 2번째#########################currentFocusMenu>>"+currentFocusMenu); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)+1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            //같은종류 추천상품2번째->같은종류 추천상품 3번째
                            else if(currentFocusMenu ==1){
                                console.log("#############같은종류 추천상품2번째->같은종류 추천상품 3번째#########################currentFocusMenu>>"+currentFocusMenu);
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)+1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            //같은종류 추천상품3번째->다른사람이 구매한 연관상품 추천상품 1번째
                            else if(currentFocusMenu ==2){
                                console.log("#############같은종류 추천상품3번째->다른사람이 구매한 연관상품 추천상품 1번째#########################");
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                //currentFocusMenu = currentFocusMenu+1;
                                currentFocusMenul =0;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill);
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                                currentFocusList = 0; 
                            }

                        }
                        //관련기획전
                        else if(currentFocusList == 2){
                            //1행1번째->1행2번째
                            if(giFocus ==0){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus=1;   
                                $('li[name="relP"]').eq(giFocus).addClass('focus'); 
                            }
                             //2행1번째->2행2번째
                            else if(giFocus ==2){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus=3;   
                                $('li[name="relP"]').eq(giFocus).addClass('focus');     
                            }
                        }

                    }
                    
                }
                console.log("* getKeyEventActor : " + keyCode );
                console.log("리스트 종류 : " + currentFocusList);
                console.log("전체카테고리 : " + currentFocusMenu);
                console.log("상세카테고리 페이지 : " + currentFocusDtlPage);
                console.log("상세카테고리 : " + currentFocusDtl);
                
                
            } else if (keyCode === global.VK_BACK) {
                console.log("지금 이상품 이가격 포커스 : " + requestExhbFocus);
                console.log("지금 이상품 이가격 페이지 : " + requestExhbPage);

                // 검색 결과로 이동
                if(requestKeywordYN == "Y") {
                    console.log("%%%%%%%%%%%%%%% 전체 카테고리의 검색 결과로 이동");

                    var param = "&requestKeywordYN=" + requestKeywordYN
                              + "&requestKeyword=" + requestKeyword
                              + "&requestKeywordPage=" + requestKeywordPage
                              + "&requestKeywordFocus=" + requestKeywordFocus;

                    location.href = "category.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName + param;
                } else {
                    if(requestCategoryCode  != null && requestCategoryCode  != '' && requestCategoryCode != 'undefined') {
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%상세 카테고리로 이동");
                        //this.transCategoryCode(); // 한글코드를 숫자코드로 변환 후 페이지 이동
                        location.href = "category_dtl.html?categoryCode=" + requestCategoryCode + "&categoryDtlCode=" + requestCategoryDtlCode + "&categoryDtlPage=" + requestCategoryDtlPage + "&SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName + "&requestDtlPage=" + requestDtlPage+"&requestDtlMenu=" + requestDtlMenu+"&requestDtlCnt=" + requestDtlCnt;
                    }
                    else if(requestExhbFocus != null && requestExhbFocus != '' && requestExhbFocus != 'undefined') {
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%기획전으로 이동 (지금 이상품 이가격 포커싱)");
                        location.href = "exhb.html?SHOPPER_STATUS=" + SHOPPER_STATUS + "&requestExhbFocus=" + requestExhbFocus + "&requestExhbPage=" + requestExhbPage+ '&userID'+ userID; // 기획전 이동
                    }
                    else if(requestMyStatus != null && requestMyStatus != '' && requestMyStatus != 'undefined') {
                        if(requestMyStatus == 2){
                            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%찜한상품으로 이동");
                            location.href ="mypage.html?SHOPPER_STATUS=" + SHOPPER_STATUS+"&requestMyStatus=2&requestMyPage=" + requestMyPage+"&requestMyMenu=" + requestMyMenu+"&requestMyCnt=" + requestMyCnt+ '&userID='+ userID + '&userName=' + userName; // 마이페이지 이동
                        }else if(requestMyStatus == 3){
                            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%자주본상품으로 이동");   
                            location.href ="mypage.html?SHOPPER_STATUS=" + SHOPPER_STATUS+"&requestMyStatus=3&requestMyPage=" + requestMyPage+"&requestMyMenu=" + requestMyMenu+"&requestMyCnt=" + requestMyCnt+ '&userID='+ userID + '&userName=' + userName; // 마이페이지 이동 
                        }                  
                    }
                    else{
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%기획전으로 이동");
                        location.href = "exhb.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName; // 기획전 이동
                    }
                }
                
                
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                
            }
        }
    },

    // 영상재생
    videoPlay: function(url, category) {
        // 테스트용 영상
        url = "http://14.52.244.91:8080/video/tv/category/" + (category - 3) + ".mp4";
        // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
        $('#videoDiv').empty().append('<img src="../images/sample_01.jpg" />');
        
        videoPlayer.width = 704;
        videoPlayer.height = 396;
        $('#videoDiv').empty()
        document.getElementById('videoDiv').appendChild(videoPlayer);
        videoPlayer.data = url;
        videoPlayer.play(1);
    },

    // 영상 정지
    videoStop: function() {
        try {
             if(videoPlayer.playState != 0 ) {
                  videoPlayer.stop();
             }
        } catch(err){
             alert("Video stop " + err);
        }
    },
    
    // 화면 이동 시 메뉴 갱신
    menuRefresh: function() {
        var appendHtml = "";

        // 쇼퍼's Bag
        if(currentFocusMenu == '3') {

        } 

        if(currentFocusMenu == '4' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>사과/배</li>";
            appendHtml += "<li name='appendMenu'>참외/토마토</li>";
            appendHtml += "<li name='appendMenu'>키위/딸기/멜론/수박</li>";
            appendHtml += "<li name='appendMenu'>귤/한라봉/천혜향</li>";
            appendHtml += "<li name='appendMenu'>바나나/오렌지/외국과일</li>";
            appendHtml += "<li name='appendMenu'>복분자/블루베리</li>";
            appendHtml += "<li name='appendMenu'>건과/견과</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        } 

        if(currentFocusMenu == '5' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>고구마/감자/호박</li>";
            appendHtml += "<li name='appendMenu'>파/양파/마늘/생강</li>";
            appendHtml += "<li name='appendMenu'>당근/오이/가지/고추</li>";
            appendHtml += "<li name='appendMenu'>배추/양배추/무</li>";
            appendHtml += "<li name='appendMenu'>쌈 채소/기타</li>";
            appendHtml += "<li name='appendMenu'>파프리카/피망</li>";
            appendHtml += "<li name='appendMenu'>표고/송이/버섯류</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = true; // 하위페이지 있음
        }

        if(currentFocusMenu == '5' && currentFocusDtlPage == '1') {
            appendHtml += "<li name='appendMenu'>나물류/새순</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = true; // 이전페이지 있음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '6' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>우유</li>";
            appendHtml += "<li name='appendMenu'>두유</li>";
            appendHtml += "<li name='appendMenu'>요구르트</li>";
            appendHtml += "<li name='appendMenu'>버터/치즈/마가린</li>";
            appendHtml += "<li name='appendMenu'>두부</li>";
            appendHtml += "<li name='appendMenu'>계란/메추리알</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '7' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>소고기</li>";
            appendHtml += "<li name='appendMenu'>돼지고기</li>";
            appendHtml += "<li name='appendMenu'>닭/오리</li>";
            appendHtml += "<li name='appendMenu'>양념육/육포</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '8' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>생선/해산물</li>";
            appendHtml += "<li name='appendMenu'>멸치/건새우/건어</li>";
            appendHtml += "<li name='appendMenu'>미역/김/해조류</li>";
            appendHtml += "<li name='appendMenu'>어포/안주류</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '9' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>쌀</li>";
            appendHtml += "<li name='appendMenu'>찹쌀/현미</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '10' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>홍삼/건강식품</li>";
            appendHtml += "<li name='appendMenu'>친환경/유기농샵</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '11' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>즉석/간편식/햄/통조림</li>";
            appendHtml += "<li name='appendMenu'>라면/국수/면류</li>";
            appendHtml += "<li name='appendMenu'>생수/커피/차/음료</li>";
            appendHtml += "<li name='appendMenu'>조미료/향신료/장류</li>";
            appendHtml += "<li name='appendMenu'>과자</li>";
            appendHtml += "<li name='appendMenu'>사탕/초콜릿/껌</li>";
            appendHtml += "<li name='appendMenu'>빵/식빵/케익/잼</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }
    },

    addKeyEventActor: function (instance, conditionFunction) {
    	this.actors.push({
    		instance: instance,
    		conditionFunction: conditionFunction
    	});
    },
    // 조회 : 상세카테고리별 상품정보
    selectProductSubCategory: function() {
        var param = {
                        "subcategory" : requestCategoryDtlCode
                    };
        $.ajax({
            url         : cmsServerIp + "/ProductSubCategoryTask",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                /*console.log("######## 상세카테고리 파라미터 : " + requestCategoryDtlCode);*/
                console.log("######################################################################");
                console.log("######## 상품목록 결과 개수 : " + result.length);
                console.log("######## result  : " + result);
                console.log("######################################################################");

                //resultSet = result;

                // 결과값이 9보다 크면 ul > li 9개만 세팅
                /*if(result.length > 9) {
                    for(var i=0 ; i < 9 ; i++) {
                        makeProduct();
                    }
                } 
                // 결과값이 9보다 작으면 result 갯수만큼 뿌려줌
                else {
                    for(var i=0 ; i < result.length ; i++) {
                        makeProduct();
                    }
                }*/

                // 결과값을 넣는다.
                $.each(result, function(index, entry) {
                    // 처음에 뿌려주는 9개만 넣는다.
                    if(entry['id'] == requestCategoryDtlId) {
                        console.log("######## entry[id]와 request값 같은때 ########");
                        console.log("######## result  : " + JSON.stringify(result));
                        //상품정보 팝업화면일때
                        if(currentFocusList == 5){
                            $('p[name="pop_cl_photo"]').empty().append('<img src="' + entry['img'] + '"  style="width : auto; height : 100%; display : block; margin : 0 auto; "/>'); //width :555px;
                            $('h1[name="pop_pd_name"]').empty().append(entry['name']);
                            $('span[name="pop_pd_cost"]').empty().append(cn_toPrice(entry['cost']) + "원");
                            $('span[name="pop_pd_origin"]').empty().append(entry['origin']);
                            $('span[name="pop_pd_company"]').empty().append(entry['company']);
                            $('span[name="pop_pd_standard"]').empty().append(entry['standard']);
                            /*if(entry['sweet'] != null || entry['sweet'] != '') {
                                $('li[name="pd_sweet"]').show();
                                $('span[name="pop_pd_sweet"]').empty().append(entry['sweet']);  
                            } else {
                                $('li[name="pop_pd_sweet"]').hide();
                            }*/
                        }
                        //팝업이 아닐때
                        else{
                            console.log("당도::::::::::::"+entry['sweet']);
                            $('li[name="cl_photo"]').empty().append('<img src="' + entry['img'] + '"  style="height : 302px; display : block; margin : 0 auto; "/>'); //width :555px;
                            $('span[name="pd_name"]').empty().append(entry['name']);
                            $('span[name="pd_cost"]').empty().append(cn_toPrice(entry['cost']) + "원");
                            $('span[name="pd_origin"]').empty().append(entry['origin']);
                            $('span[name="pd_company"]').empty().append(entry['company']);
                            $('span[name="pd_standard"]').empty().append(entry['standard']);
                            /*if(entry['sweet'] != null || entry['sweet'] != '') {
                                $('li[name="pd_sweet"]').show();
                                $('span[name="pd_sweet"]').empty().append(entry['sweet']);  
                            } else {
                                $('li[name="pd_sweet"]').hide();
                            }*/
                        }
                        


                    }
                });

                // 리스트에 뿌려주는건 9개씩 따로 해줌

            },
            error : function(){
                    console.log("에러");
            },
            complete    : function(result) {
                // 이전 화면에서 받아온 FOCUS가 존재할 때
                if(requestCategoryDtlId == "42003") {
                    $('li[name="pl_img"]').empty();
                    $('li[name="pl_tit"]').empty();
                    $('li[name="pl_price"]').empty();
                    $('li[name="pl_imgl"]').empty();
                    $('li[name="pl_titl"]').empty();
                    $('li[name="pl_pricel"]').empty();
                    //같은종류 추천상품표시
                    for(var pdCnt=0; pdCnt<3; pdCnt++){
                        //같은종류 추천상품 첫번째에 위치할 상품
                        if(pdCnt == 0 ){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(42004,pdCnt);
                        }
                        //같은종류 추천상품 두번째에 위치할 상품
                        else if(pdCnt == 1){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(42008,pdCnt);
                        }
                        //같은종류 추천상품 세번째에 위치할 상품
                        else if(pdCnt == 2){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(42002,pdCnt);
                        }
                        //this.selectRecommendCategory(42004,a);
                    }
                    //다른사람이 구매한 연관상품표시
                    for(var pdCnt2=0; pdCnt2<3; pdCnt2++){
                        //같은종류 추천상품 첫번째에 위치할 상품
                        if(pdCnt2 == 0 ){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(25000,pdCnt2);
                        }
                        //같은종류 추천상품 두번째에 위치할 상품
                        else if(pdCnt2 == 1){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(84002,pdCnt2);
                        }
                        //같은종류 추천상품 세번째에 위치할 상품
                        else if(pdCnt2 == 2){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(23014,pdCnt2);
                        }
                        //this.selectRecommendCategory(42004,a);
                    }
                }else if(requestCategoryDtlId == "12004"){
                    $('li[name="pl_img"]').empty();
                    $('li[name="pl_tit"]').empty();
                    $('li[name="pl_price"]').empty();
                    $('li[name="pl_imgl"]').empty();
                    $('li[name="pl_titl"]').empty();
                    $('li[name="pl_pricel"]').empty();
                    for(var pdCnt=0; pdCnt<3; pdCnt++){
                        //같은종류 추천상품 첫번째에 위치할 상품
                        if(pdCnt == 0 ){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12008,pdCnt);
                        }
                        //같은종류 추천상품 두번째에 위치할 상품
                        else if(pdCnt == 1){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12003,pdCnt);
                        }
                        //같은종류 추천상품 세번째에 위치할 상품
                        else if(pdCnt == 2){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12002,pdCnt);
                        }
                        //this.selectRecommendCategory(42004,a);
                    }
                    //다른사람이 구매한 연관상품표시
                    for(var pdCnt2=0; pdCnt2<3; pdCnt2++){
                        //같은종류 추천상품 첫번째에 위치할 상품
                        if(pdCnt2 == 0 ){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(25018,pdCnt2);
                        }
                        //같은종류 추천상품 두번째에 위치할 상품
                        else if(pdCnt2 == 1){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(23004,pdCnt2);
                        }
                        //같은종류 추천상품 세번째에 위치할 상품
                        else if(pdCnt2 == 2){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(17006,pdCnt2);
                        }
                        //this.selectRecommendCategory(42004,a);
                    }



                }else if(requestCategoryDtlId == "12003"){
                    $('li[name="pl_img"]').empty();
                    $('li[name="pl_tit"]').empty();
                    $('li[name="pl_price"]').empty();
                    $('li[name="pl_imgl"]').empty();
                    $('li[name="pl_titl"]').empty();
                    $('li[name="pl_pricel"]').empty();
                    for(var pdCnt=0; pdCnt<3; pdCnt++){
                        //같은종류 추천상품 첫번째에 위치할 상품
                        if(pdCnt == 0 ){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12008,pdCnt);
                        }
                        //같은종류 추천상품 두번째에 위치할 상품
                        else if(pdCnt == 1){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12004,pdCnt);
                        }
                        //같은종류 추천상품 세번째에 위치할 상품
                        else if(pdCnt == 2){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12002,pdCnt);
                        }
                        //this.selectRecommendCategory(42004,a);
                    }
                    //다른사람이 구매한 연관상품표시
                    for(var pdCnt2=0; pdCnt2<3; pdCnt2++){
                        //같은종류 추천상품 첫번째에 위치할 상품
                        if(pdCnt2 == 0 ){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(25018,pdCnt2);
                        }
                        //같은종류 추천상품 두번째에 위치할 상품
                        else if(pdCnt2 == 1){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(23004,pdCnt2);
                        }
                        //같은종류 추천상품 세번째에 위치할 상품
                        else if(pdCnt2 == 2){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(17006,pdCnt2);
                        }
                        //this.selectRecommendCategory(42004,a);
                    }

                }else if(requestCategoryDtlId == "12002"){
                    $('li[name="pl_img"]').empty();
                    $('li[name="pl_tit"]').empty();
                    $('li[name="pl_price"]').empty();
                    $('li[name="pl_imgl"]').empty();
                    $('li[name="pl_titl"]').empty();
                    $('li[name="pl_pricel"]').empty();
                    for(var pdCnt=0; pdCnt<3; pdCnt++){
                        //같은종류 추천상품 첫번째에 위치할 상품
                        if(pdCnt == 0 ){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12008,pdCnt);
                        }
                        //같은종류 추천상품 두번째에 위치할 상품
                        else if(pdCnt == 1){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12003,pdCnt);
                        }
                        //같은종류 추천상품 세번째에 위치할 상품
                        else if(pdCnt == 2){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory(12004,pdCnt);
                        }
                        //this.selectRecommendCategory(42004,a);
                    }
                    //다른사람이 구매한 연관상품표시
                    for(var pdCnt2=0; pdCnt2<3; pdCnt2++){
                        //같은종류 추천상품 첫번째에 위치할 상품
                        if(pdCnt2 == 0 ){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(25018,pdCnt2);
                        }
                        //같은종류 추천상품 두번째에 위치할 상품
                        else if(pdCnt2 == 1){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(23004,pdCnt2);
                        }
                        //같은종류 추천상품 세번째에 위치할 상품
                        else if(pdCnt2 == 2){
                            Gigamart.app.product.KeyEventActorProvider.selectPdRecommendCategory2(17006,pdCnt2);
                        }
                        //this.selectRecommendCategory(42004,a);
                    }

                }
            }
        });
    },
    //찜하기 처리
    selectFavList: function() {
        var param = {
                        "product_id" : requestCategoryDtlId,
                        "cnt" : 1
                    };
        $.ajax({
            url         : cmsServerIp + "/BuyerFavoriteTask/Insert",
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
                 $('#pop_popfav_ok').show();
                setTimeout("fn_popFav()", 2000);

            },
            error : function(){
                    console.log("에러");
            }
        });
    },

    //최근본상품 count
    addCountNewProduct: function() {
        var param = {
                        "product_id" : requestCategoryDtlId
                    };
        $.ajax({
            url         : cmsServerIp + "/ProductTask/",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                /*console.log("######## 상세카테고리 파라미터 : " + requestCategoryDtlCode);*/
                console.log("############################최근본상품 count ##############################");
                console.log("######## success");
                console.log("######## result  : " + JSON.stringify(result));
                console.log("######################################################################");


                $.each(result, function(index, entry) {
                // 처음에 뿌려주는 9개만 넣는다.
                    if(entry['product_id'] == requestCategoryDtlId) {
                        console.log("currentFocusList : "+currentFocusList);
                        //당도 뿌려주기
                        //상품정보 팝업화면일때
                        if(currentFocusList == 5){
                                if(entry['sweet'] != null || entry['sweet'] != ''|| entry['sweet'] != '""'|| entry['sweet'] != "" || entry['sweet'] != undefined) {
                                    console.log("당도00000000000000000000 : "+entry['sweet']);
                                    console.log("당도 : "+sweetTxt);
                                    $('li[name="pop_pd_sweet"]').show();
                                    $('span[name="pop_pd_sweet"]').empty().append(entry['sweet']);  
                                    var sweetTxt = $('span[name="pd_sweet"]').html();
                                    if(sweetTxt == "" || sweetTxt == ''){
                                        $('li[name="pop_pd_sweet"]').hide();
                                    }else{
                                        $('li[name="pop_pd_sweet"]').show();
                                        $('span[name="pop_pd_sweet"]').empty().append(entry['sweet']);  
                                    }
                                    
                                } 
                                else {
                                    console.log("당도XXXXXXXXXXXXXXXXXXXX");
                                    $('li[name="pop_pd_sweet"]').hide();
                                }
                        }
                        //상품정보 팝업아닐때
                        else{
                                if(entry['sweet'] != null || entry['sweet'] != ''|| entry['sweet'] != '""'|| entry['sweet'] != "" || entry['sweet'] != undefined) {
                                    console.log("당도00000000000000000000 : "+entry['sweet']);
                                    console.log("당도 : "+sweetTxt);
                                    $('li[name="pd_sweet"]').show();
                                    $('span[name="pd_sweet"]').empty().append(entry['sweet']);  
                                    var sweetTxt = $('span[name="pd_sweet"]').html();
                                    if(sweetTxt == "" || sweetTxt == ''){
                                        $('li[name="pd_sweet"]').hide();
                                        $('li[name="pop_pd_sweet"]').hide();
                                    }else{
                                        $('li[name="pd_sweet"]').show();
                                        $('span[name="pd_sweet"]').empty().append(entry['sweet']);  
                                        $('li[name="pop_pd_sweet"]').show();
                                        $('span[name="pop_pd_sweet"]').empty().append(entry['sweet']);  
                                    }
                                    
                                } 
                                else {
                                    console.log("당도XXXXXXXXXXXXXXXXXXXX");
                                    $('li[name="pd_sweet"]').hide();
                                }
                        }
                    }
                });
            },
            error : function(){
                    console.log("에러");
            }
        });
    },
    //상품 정보의 같은종류 추천상품 표시
    selectPdRecommendCategory: function(pdCode,menuLoc) {
        var param = {
                        "product_id" : pdCode
                    };
        $.ajax({
            url         : cmsServerIp + "/ProductTask",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                /*console.log("######## 상세카테고리 파라미터 : " + requestCategoryDtlCode);*/
                console.log("######################################################################");
                console.log("######## result  : " + JSON.stringify(result));
                console.log("######################################################################");
                // 결과값을 넣는다.
                $.each(result, function(index, entry) {

                    $('li[name="pl_img"]').eq(menuLoc).empty().append('<img src="' + entry['img'] + '"  style="width : auto; height : 92px; display : block; margin : 0 auto; "/>'); //width :555px;
                    $('li[name="pl_tit"]').eq(menuLoc).empty().append(entry['name']);
                    $('li[name="pl_price"]').eq(menuLoc).empty().append(cn_toPrice(entry['cost']) + "원");
                });

                // 리스트에 뿌려주는건 9개씩 따로 해줌

            },
            error : function(){
                    console.log("에러");
            }
        });
    },
    //상품 정보의 다른사람이 구매한 연관상품 표시
    selectPdRecommendCategory2: function(pdCode,menuLoc) {
        var param = {
                        "product_id" : pdCode
                    };
        $.ajax({
            url         : cmsServerIp + "/ProductTask",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                /*console.log("######## 상세카테고리 파라미터 : " + requestCategoryDtlCode);*/
                console.log("######################################################################");
                console.log("######## result  : " + JSON.stringify(result));
                console.log("######################################################################");
                // 결과값을 넣는다.
                $.each(result, function(index, entry) {

                    $('li[name="pl_imgl"]').eq(menuLoc).empty().append('<img src="' + entry['img'] + '"  style="width : auto; height : 92px; display : block; margin : 0 auto; "/>'); //width :555px;
                    $('li[name="pl_titl"]').eq(menuLoc).empty().append(entry['name']);
                    $('li[name="pl_pricel"]').eq(menuLoc).empty().append(cn_toPrice(entry['cost']) + "원");
                });

                // 리스트에 뿌려주는건 9개씩 따로 해줌

            },
            error : function(){
                    console.log("에러");
            }
        });
    }
});