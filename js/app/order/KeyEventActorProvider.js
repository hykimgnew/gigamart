'use strict';

// ************************************************************************
// ** 공통 
// ************************************************************************
var appConfiguration = window.oipfObjectFactory.createConfigurationObject();    // STB 설정 파일


// 숫자 -> 금액
function cn_toPrice(n) {
    if(isNaN(n)){return 0;}
    var reg = /(^[+-]?\d+)(\d{3})/;   
    n += '';
    while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

// ************************************************************************
// ** 장바구니
// ************************************************************************
var orderCartResultSet;                     // 장바구니 조회 resultSet
var orderCartResultScreenSet = new Array(); // 장바구니 조회 현재 페이지 resultSet

// 장바구니 목록 페이징 화살표 컨트롤
function martPageArrowUtil() {
    if(orderCartPrevPageYN == false) $('#cart_arrow_top').hide();
    else                        $('#cart_arrow_top').show();

    if(orderCartNextPageYN == false) $('#cart_arrow_bottom').hide();
    else                        $('#cart_arrow_bottom').show();
}

// 장바구니 조회
function selectCartList() 
{
    $.ajax({
        url         : cmsServerIp + "/BuyerCartTask/Select",
        type        : "post",
        dataType    : "json",
        async       : true,
        xhrFields   : {
                        withCredentials: true
        },
        success     : function(result) {
            orderCartResultSet = result['cart'];
            console.log("#장바구니 조회 : " + JSON.stringify(result));

            // 장바구니 목록 생성
            makeCartList(0);

            // 첫 페이지로 세팅 되므로 <이전 페이지 없음>
            orderCartPrevPageYN = false;

            // 3건 넘어갈 경우 <다음 페이지 있음>
            if(result['cart'].length > 3) orderCartNextPageYN = true;
            else orderCartPrevPageYN = false;
        },
        complete    : function(result) {
            // 값 초기화
            orderCartFocus     = 1;
            orderCartPage      = 0;
            orderCartListFocus = 0;

            // ARROW_TOP, BOTTOM SET
            martPageArrowUtil();

            // 첫 포커스는 장바구니 목록 최상단 상품
            $('li[name="li_cart_list"]').eq(0).addClass("focus");
        }
    });
}

// 장바구니 목록 생성
function makeCartList(page) {

    //***************************************************************
    // 금액
    //***************************************************************
    var cart_cost = 0;    // 상품 금액
    var cart_comm = 0;    // 쇼퍼 수수료
    var cart_total = 0;   // 총 금액

    for(var i=0 ; i < orderCartResultSet.length ; i++) {
        // 총 금액
        cart_cost    += Number(orderCartResultSet[i]["cost"]) * Number(orderCartResultSet[i]["cnt"]);
        cart_comm    += Math.floor(((Number(orderCartResultSet[i]["cost"]) * Number(orderCartResultSet[i]["cnt"])) * 5 / 100) / 10) * 10;
    }

    cart_total = cart_cost + cart_comm;

    console.log("쇼퍼 비용 : " + cart_comm + " 총 금액 : " + cart_total);

    //$('#order_discount_cost').html("0원");
    //$('#order_delivery_cost').html("0원");
    $('#order_cost').html(cn_toPrice(cart_cost) + "원");
    $('#order_shopper_cost').html(cn_toPrice(cart_comm) + "원");
    $('#order_total_cost').html(cn_toPrice(cart_total) + "원");

    //***************************************************************
    // 목록
    //***************************************************************
    var appendHtml  = "";                       // 리스트 HTML
    var start_idx   = Number(page) * 3;         // 페이지 시작 번호 
    var end_idx     = (Number(page) * 3) + 3;   // 페이지 끝 번호
    
    orderCartPage   = page;                     // 현재 페이지

    var screenCnt   = 0;
    for(var i=start_idx ; i < end_idx ; i++) {

        // 장바구니 목록의 전체 크기가 i 보다 크면 목록 출력
        if(orderCartResultSet.length > i) {
            // 리스트 저장
            orderCartResultScreenSet[screenCnt] = orderCartResultSet[i];
            screenCnt = screenCnt + 1;

            // 리스트 생성
            appendHtml += '<li name="li_cart_list" class="ctc_row">';
            appendHtml += '     <table width="100%" cellpadding="0" cellspacing="0" border="0">';
            appendHtml += '         <tr>';
            appendHtml += '             <td name="td_cart_chkbox" class="ctc_chebox"><img src="../images/checkbox.png" /></td>';
            appendHtml += '             <td class="ctc_img"><img src="' + orderCartResultSet[i]["img"] + '" width="100px" height="100px" />';
            appendHtml += '<input type="hidden" name="order_cart_cost" value="' + orderCartResultSet[i]["cost"] + '"/>';
            appendHtml += '<input type="hidden" name="order_cart_cnt" value="' + orderCartResultSet[i]["cnt"] + '"/>';
            appendHtml += '<input type="hidden" name="order_cart_id" value="' + orderCartResultSet[i]["product_id"] + '"/>';
            appendHtml += '             </td>';
            appendHtml += '             <td class="ctc_txt bdr_gray">' + orderCartResultSet[i]["name"] + '</td>';
            appendHtml += '             <td class="ctc_price bdr_gray">' + cn_toPrice(orderCartResultSet[i]["cost"]) + '원</td>';
            appendHtml += '             <td class="ctc_discount bdr_gray">0원</td>';
            appendHtml += '             <td class="ctc_amount bdr_gray">' + orderCartResultSet[i]["cnt"] + '</td>';
            appendHtml += '             <td class="ctc_delivery bdr_gray">0원</td>';
            appendHtml += '             <td class="ctc_store bdr_gray">하나로마트 양재점</td>';
            appendHtml += '             <td class="ctc_order">' + cn_toPrice(Number(orderCartResultSet[i]["cost"]) * Number(orderCartResultSet[i]["cnt"])) + '원</td>';
            appendHtml += '             <td class="ctc_ok"></td>';
            appendHtml += '         </tr>';
            appendHtml += '     </table>';
            appendHtml += '</li>';
        }
    }

    // 첫 페이지면 이전 페이지 없음
    if(orderCartPage == 0) orderCartPrevPageYN = false; 
    else orderCartPrevPageYN = true;

    // 장바구니 목록의 전체 크기가 페이지 끝번호보다 작거나 같은 경우 다음 페이지 없음
    if(orderCartResultSet.length <= end_idx) orderCartNextPageYN = false;
    else orderCartNextPageYN = true;

    $('#ul_cart_list').empty().append(appendHtml);
}





















/**
 *  KeyEventActorProvider Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.order.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        // 1. 플로팅 메뉴 장바구니 SET
        fltEasyCart();

        // 2. 장바구니 조회
        selectCartList();

    },

    // ************************************************************************
    // ** 공통 키 이벤트
    // ************************************************************************

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;

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
        

        // ************************************************************************
        // ** 팝업 없을 때
        // ************************************************************************
        else if(isCart == false) {

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

            // ************************************************************************
            // ** 장바구니 목록
            // ************************************************************************
            if(orderScreen == 0) {
                // **************************************************
                // * 三 KEY (플로팅 장바구니)
                // **************************************************
                if(keyCode === global.VK_GREEN) {
                    // 장바구니 목록에서 간편 장바구니 없음.
                    /*isCart      = true;
                    cartFocus   = 1;    // 결제 버튼 Focus

                    retrieveEasyCart(); // 간편 장바구니 조회

                    $('#popup_cart').show();
                    $('#ecc_payments').addClass('focus'); // 첫 포커스는 ecc_payments*/
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
                        //##########################
                        // 장바구니 상품 목록
                        //##########################
                        if(orderCartFocus == 1) {
                            // 전체 체크박스 일 때
                            if(orderCartListFocus == -1) {

                                // 이전 페이지가 존재하지 않을 때
                                if(orderCartPrevPageYN == false) {
                                    // 동작 없음.
                                }

                                // 이전 페이지가 존재 할 때
                                else if(orderCartPrevPageYN == true) {
                                    // 페이지 있음, 이전 페이지로 이동
                                    $('#li_cart_all_chkbox > img').removeClass("focus"); // 전체 체크박스 포커스 삭제

                                    orderCartPage      = orderCartPage - 1; // 페이지 감소
                                    orderCartListFocus = 2;                 // 화면 Focus는 제일 아래로

                                    makeCartList(orderCartPage);            // 페이지 갱신
                                    martPageArrowUtil();                    // 화살표 SET

                                    $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                                }

                            }

                            // 장바구니 목록의 첫번째 항목일 때
                            else if(orderCartListFocus == 0) {
                                // 전체체크박스로 이동  
                                $('li[name="li_cart_list"]').eq(0).removeClass("focus");
                                orderCartListFocus = -1;
                                $('#li_cart_all_chkbox > img').addClass("focus");
                            }

                            // 장바구니 목록의 항목이 1번째이나 2번째
                            else if(orderCartListFocus == 1 || orderCartListFocus == 2) {
                                $('li[name="li_cart_list"]').eq(orderCartListFocus).removeClass("focus");
                                orderCartListFocus      = orderCartListFocus - 1;
                                $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                            }

                            // 장바구니 목록의 항목이 선택상품 삭제, 전체 삭제, 선택상품 찜하기 일 경우
                            else if(orderCartListFocus == 3 || orderCartListFocus == 4 || orderCartListFocus == 5) {
                                $('#order_cart_delete').removeClass("focus");       // 선택상품 삭제 포커스 제거
                                $('#order_cart_all_delete').removeClass("focus");   // 전체 삭제 포커스 제거
                                $('#order_cart_favorite').removeClass("focus");     // 선택상품 찜하기 포커스 제거

                                orderCartListFocus      = 2; // 화면 상 마지막 상품으로

                                $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                            }
                        }

                        //##########################
                        // 주문하기
                        //##########################
                        if(orderCartFocus == 6) {
                            $('#order_cart_submit').removeClass("focus");
                            orderCartFocus = 5;
                            $('#order_cart_address').addClass("focus");
                        }
                    }

                    // **************************************************
                    // * 아래 KEY
                    // **************************************************
                    if(keyCode === global.VK_DOWN) {
                        //##########################
                        // 장바구니 상품 목록
                        //##########################
                        if(orderCartFocus == 1) {

                            // 선택상품 삭제, 전체 삭제, 선택상품 찜하기에서는 아래 키를 누르면 다음 페이지로 이동한다.
                            if(orderCartListFocus == 3 || orderCartListFocus == 4 || orderCartListFocus == 5) {
                                // 다음 페이지가 존재하지 않을 때
                                if(orderCartNextPageYN == false) {
                                    // 동작 없음.
                                }

                                // 다음 페이지가 존재 할 때
                                else if(orderCartNextPageYN == true) {
                                    // 페이지 있음, 다음 페이지로 이동
                                    $('#order_cart_delete').removeClass("focus");       // 선택상품 삭제 포커스 제거
                                    $('#order_cart_all_delete').removeClass("focus");   // 전체 삭제 포커스 제거
                                    $('#order_cart_favorite').removeClass("focus");     // 선택상품 찜하기 포커스 제거

                                    orderCartPage      = orderCartPage + 1; // 페이지 증가
                                    orderCartListFocus = 0;                 // 화면 Focus는 제일 위로

                                    makeCartList(orderCartPage);            // 페이지 갱신
                                    martPageArrowUtil();                    // 화살표 SET

                                    $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus"); // 이동한 페이지의 첫번째 상품 포커스
                                }
                            }
                            // 장바구니 목록의 2번째 항목이거나 장바구니 목록의 마지막 데이터일 때
                            else if(orderCartListFocus == 2 || orderCartListFocus == orderCartResultScreenSet.length) {
                                // 선택상품 삭제로 이동
                                $('li[name="li_cart_list"]').eq(orderCartListFocus).removeClass("focus");
                                orderCartListFocus = 3;
                                $('#order_cart_delete').addClass("focus");
                            }

                            // 장바구니 목록의 0번째, 1번째 항목이고 장바구니 목록의 마지막 데이터가 아닐 때
                            else if((orderCartListFocus == 0 || orderCartListFocus == 1) && orderCartListFocus != orderCartResultScreenSet.length) {
                                $('li[name="li_cart_list"]').eq(orderCartListFocus).removeClass("focus");
                                orderCartListFocus      = orderCartListFocus + 1;
                                $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");   
                            }

                            // 전체 체크 박스 일때
                            else if(orderCartListFocus == -1) {
                                $('#li_cart_all_chkbox > img').removeClass("focus");
                                orderCartListFocus = 0; // 장바구니 첫번째 상품으로
                                $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");  
                            }
                        }

                        //##########################
                        // 배송지 선택
                        //##########################
                        if(orderCartFocus == 5) {
                            $('#order_cart_address').removeClass("focus");
                            orderCartFocus = 6;
                            $('#order_cart_submit').addClass("focus");
                        }

                       
                    }
                    // **************************************************
                    // * 좌 KEY
                    // **************************************************
                    if(keyCode === global.VK_LEFT) {
                        //##########################
                        // 장바구니 상품 목록
                        //##########################
                        if(orderCartFocus == 1) {
                            // 전체 삭제일 때 
                            if(orderCartListFocus == 4) {
                                // 선택상품 삭제로 이동
                                $('#order_cart_all_delete').removeClass("focus");
                                orderCartListFocus = 3;
                                $('#order_cart_delete').addClass("focus");
                            }

                            // 선택상품 찜하기일 때
                            else if(orderCartListFocus == 5) {
                                // 전체 삭제로 이동
                                $('#order_cart_favorite').removeClass("focus");   
                                orderCartListFocus = 4;
                                $('#order_cart_all_delete').addClass("focus");
                            }

                        }

                        //##########################
                        // 배송지 선택 & 주문하기
                        //##########################
                        else if(orderCartFocus == 5 || orderCartFocus == 6) {
                            
                            if(orderCartFocus == 5) $('#order_cart_address').removeClass("focus");
                            if(orderCartFocus == 6) $('#order_cart_submit').removeClass("focus");  

                            // 전체체크박스, 장바구니 목록, 선택상품 찜하기로 이동함
                            orderCartFocus = 1;

                            // 이전 포커스가 전체 체크박스 일때
                            if(orderCartListFocus == -1) {
                                $('#li_cart_all_chkbox > img').addClass("focus");
                            }

                            // 이전 포커스가 장바구니 리스트 일때
                            else if(orderCartListFocus >= 0 && orderCartListFocus <= 2) {
                                $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                            }

                            // 이전 포커스가 선택상품 찜하기 일때
                            else if(orderCartListFocus == 5) {
                                $('#order_cart_favorite').addClass("focus"); 
                            }

                            
                        }

                        //##########################
                        // 주문하기
                        //##########################
                        else if(orderCartFocus == 6) {
                            
                        }

                    }

                    // **************************************************
                    // * 우 KEY
                    // **************************************************
                    if(keyCode === global.VK_RIGHT) {
                        //##########################
                        // 장바구니 상품 목록
                        //##########################
                        if(orderCartFocus == 1) {
                            // 전체 체크 박스, 상품 리스트, 선택상품 찜하기일 때
                            if((orderCartListFocus >= -1 && orderCartListFocus < 3) || orderCartListFocus == 5) {
                                // 결제하기로 이동
                                $('#li_cart_all_chkbox > img').removeClass("focus"); // 전체 체크박스 포커스 제거
                                $('li[name="li_cart_list"]').removeClass("focus"); // 상품 리스트 포커스 제거
                                $('#order_cart_favorite').removeClass("focus");     // 선택상품 찜하기 포커스 제거
                                orderCartFocus = 6;
                                $('#order_cart_submit').addClass("focus");
                            }

                            // 선택상품 삭제일 때 
                            else if(orderCartListFocus == 3) {
                                // 전체 삭제로 이동
                                $('#order_cart_delete').removeClass("focus");     // 선택상품 삭제 포커스 제거
                                orderCartListFocus = 4;
                                $('#order_cart_all_delete').addClass("focus");
                            }

                            // 전체 삭제일 때
                            else if(orderCartListFocus == 4) {
                                // 선택 상품 찜하기로 이동
                                $('#order_cart_all_delete').removeClass("focus");
                                orderCartListFocus = 5;
                                $('#order_cart_favorite').addClass("focus");   
                            }
                        }
                    }
                    
                } else if (keyCode === global.VK_BACK) {
                    //window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
                } else if (keyCode === global.VK_ESCAPE) {
                    //window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
                } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                    
                }
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