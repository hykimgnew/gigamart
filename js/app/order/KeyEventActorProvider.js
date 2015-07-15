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


// 장바구니 목록 페이징 화살표 컨트롤
function martPageArrowUtil() {
    if(orderCartPrevPageYN == false) $('#cart_arrow_top').hide();
    else                             $('#cart_arrow_top').show();

    if(orderCartNextPageYN == false) $('#cart_arrow_bottom').hide();
    else                             $('#cart_arrow_bottom').show();
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

            // 조회된 장바구니가 없으면..
            if(typeof result['cart'] === 'undefined') {
                makeEmptyCartList();
                orderCartProductYN = false;
            }

            // 장바구니에 상품이 있으면
            else {
                console.log("#장바구니 조회 : " + JSON.stringify(result));

                // 체크박스 기본 값 (false) SET
                for(var i=0 ; i < orderCartResultSet.length ; i++) {
                    // 체크박스에 기본 값 SET
                    orderCartResultCheckStatus[i] = false;

                    // 장바구니 상품 목록 저장 (주문하기)
                    resultProductArray.push(orderCartResultSet[i]["product_id"]);
                }

                // 장바구니 목록 생성
                makeCartList(0);
                orderCartProductYN = true;

                // 첫 페이지로 세팅 되므로 <이전 페이지 없음>
                orderCartPrevPageYN = false;

                // 3건 넘어갈 경우 <다음 페이지 있음>
                if(result['cart'].length > 3) orderCartNextPageYN = true;
                else orderCartPrevPageYN = false;
            }

        },
        complete    : function(result) {
            // 기본 초기화
            $('#delete_cart_msg').empty().html("선택 상품을 삭제하시겠습니까?");

            // 값 초기화
            orderCartFocus     = 1;
            orderCartPage      = 0;
            orderCartListFocus = 0;
            orderCartCheckYN   = false;

            // ARROW_TOP, BOTTOM SET
            martPageArrowUtil();

            // 조회된 장바구니가 없으면
            if(typeof orderCartResultSet === 'undefined') {
                // 포커스 안줌..
                // 이동도 불가 선택도 불가, 이전버튼만 가능
            }
            // 장바구니에 상품이 있으면
            else {
                // 첫 포커스는 장바구니 목록 최상단 상품
                $('li[name="li_cart_list"]').eq(0).addClass("focus");
                $('.ctc_chebox').eq(0).css("background", "#F4F4F4");

                // 기타 포커스 제거
                $('#order_cart_delete').removeClass("focus");
            }
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
    var appendHtml      = "";                       // 리스트 HTML
    var start_idx       = Number(page) * 3;         // 페이지 시작 번호 
    var end_idx         = (Number(page) * 3) + 3;   // 페이지 끝 번호
    
    orderCartPage       = page;                     // 현재 페이지

    orderCartResultLen  = 0;                        // 페이지에 보여지는 상품 갯수

    for(var i=start_idx ; i < end_idx ; i++) {

        // 장바구니 목록의 전체 크기가 i 보다 크면 목록 출력
        if(orderCartResultSet.length > i) {
            // 리스트 저장
            orderCartResultScreenSet[orderCartResultLen] = orderCartResultSet[i];
            orderCartResultLen = orderCartResultLen + 1;

            // 리스트 생성
            appendHtml += '<li name="li_cart_list" class="ctc_row">';
            appendHtml += '     <table width="100%" cellpadding="0" cellspacing="0" border="0">';
            appendHtml += '         <tr>';
            
            console.log("orderCartResultCheckStatus[i] " + orderCartResultCheckStatus[i]);

            if(orderCartResultCheckStatus[i] == false) {
                appendHtml += '             <td name="td_cart_chkbox" class="ctc_chebox"><img src="../images/checkbox.png" /></td>';
            } else {
                appendHtml += '             <td name="td_cart_chkbox" class="ctc_chebox"><img src="../images/checkbox_sel.png" /></td>';
            }
            appendHtml += '             <td class="ctc_img"><img src="' + orderCartResultSet[i]["img"] + '" width="100px" height="100px" />';
            appendHtml += '<input type="hidden" name="order_cart_cost" value="' + orderCartResultSet[i]["cost"] + '"/>';
            appendHtml += '<input type="hidden" name="order_cart_cnt" value="' + orderCartResultSet[i]["cnt"] + '"/>';
            appendHtml += '<input type="hidden" name="order_cart_id" value="' + orderCartResultSet[i]["product_id"] + '"/>';
            appendHtml += '             </td>';
            appendHtml += '             <td class="ctc_txt bdr_gray">' + orderCartResultSet[i]["name"] + '</td>';
            appendHtml += '             <td align="center" class="ctc_price bdr_gray">' + cn_toPrice(orderCartResultSet[i]["cost"]) + '원</td>';
            appendHtml += '             <td align="center" class="ctc_discount bdr_gray">0원</td>';
            appendHtml += '             <td align="center" class="ctc_amount bdr_gray">' + orderCartResultSet[i]["cnt"] + '</td>';
            appendHtml += '             <td align="center" class="ctc_delivery bdr_gray">0원</td>';
            appendHtml += '             <td align="center" class="ctc_store bdr_gray">하나로마트 양재점</td>';
            appendHtml += '             <td align="center" class="ctc_order">' + cn_toPrice(Number(orderCartResultSet[i]["cost"]) * Number(orderCartResultSet[i]["cnt"])) + '원</td>';
            appendHtml += '             <td align="center" class="ctc_ok"></td>';
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

// 장바구니에 상품이 없을 때
function makeEmptyCartList() {
    var appendHtml = "";

    // 리스트 생성
    appendHtml += '<li name="li_cart_list" class="ctc_row">';
    appendHtml += '     <table width="100%" cellpadding="0" cellspacing="0" border="0">';
    appendHtml += '             <tr>';
    appendHtml += '                     <td style="width:30%">';
    appendHtml += '                     <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;장바구니에 상품이 없습니다.<br/>[이전] 버튼을 눌러서 이전 화면으로 이동 가능합니다.</td>';
    appendHtml += '             </tr>';
    appendHtml += '     </table>';
    appendHtml += '</li>';

    orderCartPrevPageYN = false;
    orderCartNextPageYN = false;

    $('#order_cost').html("0원");
    $('#order_shopper_cost').html("0원");
    $('#order_total_cost').html("0원");

    $('#btn_delete_yn_submit').removeClass("focus");
    $('#ul_cart_list').empty().append(appendHtml);
}

// 장바구니 삭제 확인 팝업
function confirmDeleteCart() {

    var arrChkProductId = new Array();

    console.log("############# 체크 상태 : " + orderCartResultCheckStatus);

    // 전체 선택일 때
    for(var i=0 ; i < orderCartResultCheckStatus.length ; i++) {
        if(orderCartResultCheckStatus[i] == true) {
            arrChkProductId.push(orderCartResultSet[i]["product_id"]);
        }
    }
    if(orderCartResultSet.length == arrChkProductId.length) {
        $('#delete_cart_msg').empty().html("전체 상품을 삭제하시겠습니까?");
        $('#wrap_delete_product').show();
        $('#btn_delete_yn_submit').addClass("focus");
        orderCartDeleteFocus = 0;
    }

    // 선택된 상품이 없을 때
    else if(arrChkProductId.length == 0) {
        $('#common_msg').empty().html("선택된 상품이 없습니다.");
        $('#wrap_common').show();

        setTimeout("$('#wrap_common').hide()", 1500);
        setTimeout("$('#common_msg').empty()", 1500);
        orderCartFocus = 1;
    } else {
        $('#wrap_delete_product').show();
        $('#btn_delete_yn_submit').addClass("focus");
        orderCartDeleteFocus = 0;
    }

    console.log(orderCartResultSet);
    console.log(arrChkProductId);
}

// 장바구니 선택 삭제
function deleteCart() 
{
    var arrChkProductId = new Array();

    for(var i=0 ; i < orderCartResultCheckStatus.length ; i++) {
        if(orderCartResultCheckStatus[i] == true) {
            arrChkProductId.push(orderCartResultSet[i]["product_id"]);
        }
    }

    // 선택한 상품이 없을 때
    if(arrChkProductId.length == 0) {
        $('#common_msg').empty().html("선택된 상품이 없습니다.");
        $('#wrap_common').show();

        setTimeout("$('#wrap_common').hide()", 1500);
        setTimeout("$('#common_msg').empty()", 1500);
    } 
    // 삭제하기
    else {
        for(var i=0 ; i < arrChkProductId.length ; i++) {
            var param = { "product_id" : arrChkProductId[i] };

            $.ajax({
                url         : cmsServerIp + "/BuyerCartTask/Delete",
                type        : "post",
                data        : param,
                dataType    : "json",
                async       : true,
                xhrFields   : {
                                withCredentials: true
                },
                success     : function(result) {
                    if(result["resultCode"] == '1') {
                        console.log(arrChkProductId[i] + " 삭제 성공");
                    } else {
                        console.log(arrChkProductId[i] + " 삭제 실패, 로그인 세션 없음");
                    }
                },
                complete     : function(result) {
                    
                }
            });
        }

        // 장바구니 재조회
        selectCartList();
        // 삭제 확인 팝업 숨김
        $('#wrap_delete_product').hide();
        // 포커스 초기화
        $('#order_cart_delete').removeClass("focus");
    }
}

// 장바구니 선택 찜하기
function favoriteCart() 
{
    var arrChkProductId = new Array();

    for(var i=0 ; i < orderCartResultCheckStatus.length ; i++) {
        if(orderCartResultCheckStatus[i] == true) {
            arrChkProductId.push(orderCartResultSet[i]["product_id"]);
        }
    }

    console.log("arrCHkProductId : " + arrChkProductId);

    // 선택한 상품이 없을 때
    if(arrChkProductId.length == 0) {
        $('#common_msg').empty().html("선택된 상품이 없습니다.");
        $('#wrap_common').show();

        setTimeout("$('#wrap_common').hide()", 1500);
        setTimeout("$('#common_msg').empty()", 1500);
    } 
    // 찜하기
    else {
        for(var i=0 ; i < arrChkProductId.length ; i++) {

            var param = { 
                            "product_id" : arrChkProductId[i], 
                            "cnt" : 1 
                        };

            $.ajax({
                url         : cmsServerIp + "/BuyerFavoriteTask/Insert",
                type        : "post",
                data        : param,
                dataType    : "json",
                async       : true,
                xhrFields   : {
                                withCredentials: true
                },
                success     : function(result) {
                    
                },
                complete     : function(result) {

                }
            });
        }

        $('#common_msg').empty().html("선택 상품을 찜하기 메뉴에 담았습니다. MY마트 > 찜한상품에서 확인 하실 수 있습니다.");
        $('#wrap_common').show();

        setTimeout("$('#wrap_common').hide()", 1500);
        setTimeout("$('#common_msg').empty()", 1500);
    }
}

// 배송지 조회
function selectAddrList() 
{
    var param = "";
    var appendHtml = '';

    $.ajax({
        url         : cmsServerIp + "/BuyerAddressTask/Select",
        type        : "post",
        data        : param,
        dataType    : "json",
        async       : true,
        xhrFields   : {
                        withCredentials: true
        },
        success     : function(result) {
            console.log("배송지 목록 : " + JSON.stringify(result));

            arrAddrList = result['address'];
            
            if(typeof result['address'] === 'undefined') {
                appendHtml += '<li name="option_empty_addr">저장된 주소가 없습니다.</li>';
            } else {
                $.each(result['address'], function(index, entry) {

                    if(index == 0) {

                        addrListFocus = 0;

                        appendHtml = entry["address1"] + " " + entry["address2"];

                        resultAddress1 = entry["address1"];
                        resultAddress2 = entry["address2"];

                        if(entry["main"] == 1) {
                            $('#sbr_address').empty().html('기본 배송지 : ' + appendHtml + '<span id="order_cart_address">다른 주소 선택</span>');
                            appendHtml = "(기본) " + appendHtml;
                        } 
                    }
                });
            }
        },
        complete     : function(result) {
            $('#addr_list_span').empty().append(appendHtml);
        }
    });
}


// 쇼퍼 목록 조회
function selectShopperList() 
{
    var param = "";
    var appendHtml = "";

    $.ajax({
        url         : cmsServerIp + "/TVShopperBag/popular",
        type        : "post",
        data        : param,
        dataType    : "json",
        async       : true,
        xhrFields   : {
                        withCredentials: true
        },
        success     : function(result) {
            if(typeof result['shopper'] === 'undefined') {
                makeShopperEmptyList(); // 빈 목록을 생성한다.
            } else {
                arrShopperList = result['shopper'];

                makeShopperList(0); // 쇼퍼 목록을 생성한다.    
            }
        },
        complete    : function(result) {
            // 첫번째 쇼퍼에 Focus
            shopperListFocus = 0;
            $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");

        }
    });
}

// 쇼퍼 목록 생성
function makeShopperList(page)
{
    var appendHtml = "";

    for(var i=0 ; i < arrShopperList.length ; i++) {

        appendHtml += '<li name="li_shopper_list">';
        appendHtml += '     <div class="sblcs_photoArea">';
        appendHtml += '         <p class="sblcs_photo">' + '<img src="' + arrShopperList[i]["img"] + '" width="160px" height="120px" /></p>';
        appendHtml += '         <span class="pd_t5">' + 'ID : ' + arrShopperList[i]["shopper_id"] + '</span>';
        appendHtml += '         <span>' + '(후기 ' + arrShopperList[i]["reply_cnt"] + ')' + '</span>';
        appendHtml += '         <span class="pd_d5">';
            var rating = Number(arrShopperList[i]['rating']);
            if(rating >= 20)    appendHtml += '<img src="../images/icon_star.png" />';
            else                appendHtml += '<img src="../images/icon_star_blank.png" />';
            if(rating >= 40)    appendHtml += '<img src="../images/icon_star.png" />';
            else                appendHtml += '<img src="../images/icon_star_blank.png" />';
            if(rating >= 60)    appendHtml += '<img src="../images/icon_star.png" />';
            else                appendHtml += '<img src="../images/icon_star_blank.png" />';
            if(rating >= 80)    appendHtml += '<img src="../images/icon_star.png" />';
            else                appendHtml += '<img src="../images/icon_star_blank.png" />';
            if(rating >= 100)   appendHtml += '<img src="../images/icon_star.png" />';
            else                appendHtml += '<img src="../images/icon_star_blank.png" />';
        appendHtml += '         </span>';
        appendHtml += '     </div>';
        appendHtml += '     <div class="sblcs_txtArea">';
        appendHtml += '        <p>' + arrShopperList[i]["description"] + '</p>';
        appendHtml += '        <span>' + '쇼핑 주종목: ' + arrShopperList[i]["shopping_main"] + '<span>';
        appendHtml += '     </div>';
        appendHtml += '</li>';

    }

    $('#ul_shopper_list').empty().append(appendHtml);
}

// 빈 쇼퍼 목록 생성
function makeShopperEmptyList()
{

}


// 주문하기
function orderPayment() {

    var param = {
                    "shopper_id" : resultShopperId,
                    "total_cost" : Number($('#order_cost').html()),
                    "delivery_cost" : 0,
                    "shopper_cost" : 2000,
                    "orderd_cost" : Number($('#order_total_cost').html()),
                    "shopper_msg" : "",
                    "receiver_name" : "",
                    "receiver_tel" : "",
                    "receiver_phone" : "",
                    "address1" : resultAddress1,
                    "address2" : resultAddress2,
                    "type"  : "general",
                    "message" : "",
                    "products" : resultProductArray
                };

    $.ajax({
        url         : cmsServerIp + "/BuyerOrderTask/Insert",
        type        : "post",
        data        : param,
        dataType    : "json",
        async       : true,
        xhrFields   : {
                        withCredentials: true
        },
        success     : function(result) {
            if(result["resultCode"] == 1) $('#common_msg').empty().html("주문이 완료되었습니다.");
            if(result["resultCode"] == -1) $('#common_msg').empty().html("로그인 정보가 올바르지 않아 주문에 실패했습니다.");
            if(result["resultCode"] == 2) $('#common_msg').empty().html("요청 파라미터가 부족합니다.");
                
            $('#wrap_common').show();

            setTimeout("$('#wrap_common').hide()", 1500);
            setTimeout("$('#common_msg').empty()", 1500);               
        },
        complete    : function(result) {
            // 주문 완료 화면 set
            $('#order_cost2').html($('#order_cost').html());
            $('#order_shopper_cost2').html($('#order_shopper_cost').html());
            $('#order_total_cost2,#order_total_cost3').html($('#order_total_cost').html());

            // 주문정보 get
            var first_name = "";

            for(var i=0 ; i < orderCartResultSet.length ; i++) {
                if(i == 0) {
                    first_name = orderCartResultSet[i]["name"];
                }
            }

            $('#complete_1').html("74838219"); // 주문번호 X
            $('#complete_2').html(first_name + " 외 " + (orderCartResultSet.length - 1) + "건"); // 주문정보
            $('#complete_3').html(resultAddress1 + " " + resultAddress2);
            $('#complete_4').html("010-3333-3333");
            $('#complete_5').html("\'" + resultShopperId + "\'" + " 쇼퍼님을 선택하셨습니다." );
            $('#complete_6').html(resultShopperPhone);
        }
    });
}











/**
 *  KeyEventActorProvider Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.order.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        // 0. 공통 실행
        common_init();

        // 1. 배송지 조회
        selectAddrList();

        // 2. 장바구니 조회
        selectCartList();

        console.log("##### 넘어온 화면 : " + REQUEST_SCREEN);

    },

    // ************************************************************************
    // ** 공통 키 이벤트
    // ************************************************************************

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;
        
        console.log("keyCode : " + keyCode);

        // ************************************************************************
        // ** 팝업 없을 때
        // ************************************************************************

            // **************************************************
            // * ◀ KEY (플로팅 Go home)
            // **************************************************
            if(keyCode === global.VK_RED) {
                location.href ="exhb.html?SHOPPER_STATUS=" + SHOPPER_STATUS; // 기획전 이동
            }

            // **************************************************
            // * PLAY KEY (메뉴/카테고리)
            // **************************************************
            if(keyCode === global.VK_PLAY) {
                /** 전체 카테고리로 이동 */
                location.href = "category.html?SHOPPER_STATUS=" + SHOPPER_STATUS;
            }

            // ************************************************************************
            // ** 장바구니 목록
            // ************************************************************************
            if(orderScreen == 0 || orderScreen == 1 || orderScreen == 2 || orderScreen == 3) {
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
                    //##########################
                    // 수량 조절 팝업 ON 일때
                    //##########################
                    if(chgVolumeFocus > 0) {
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

                        // 확인 (장바구니 수량 수정)
                        else if(chgVolumeFocus == 3) {
                            var idx = (Number(orderCartPage) * 3) + Number(orderCartListFocus);         // 현재 선택된 상품 idx

                            var param = { 
                                            "product_id" : orderCartResultSet[idx]["cost"],
                                            "cnt"        : Number($('span[name="ppr_num_numP"]').html())
                                        };

                            console.log("장바구니 수정 : " + idx + " : " + JSON.stringify(param));

                            $.ajax({
                                url         : cmsServerIp + "/BuyerCartTask/Update",
                                type        : "post",
                                data        : param ,
                                dataType    : "json" ,
                                async       : true ,
                                xhrFields   : {
                                                withCredentials: true
                                },
                                success     : function(result) {
                                    console.log("## 장바구니 수정 시도 : " + JSON.stringify(result));

                                    if(result['resultCode'] == 1) {
                                        console.log("### 장바구니 수정 성공");
                                    } 
                                    else if(result['resultCode'] == -1) {
                                        console.log("### 로그인 안됨");
                                    }

                                },
                                complete    : function(result) {
                                    // 장바구니 재조회
                                    selectCartList();

                                    // 수량변경 팝업 on -> off
                                    $('#btn_volume_close').removeClass('focus');
                                    $('#wrap_chVolume_easyCart').hide();
                                    chgVolumeFocus = 0;
                                }
                            });

                        }

                        // 취소
                        else if(chgVolumeFocus == 4) {
                            // 변경된 수량과 금액을 적용하지 않는다.

                            // 수량변경 팝업 on -> off
                            $('#btn_volume_close').removeClass('focus');
                            $('#wrap_chVolume_easyCart').hide();
                            chgVolumeFocus = 0;

                        }

                        // 키 입력을 중지시킨다.
                        return;
                    }                    

                    //##########################
                    // 장바구니 상품 목록
                    //##########################

                    // 장바구니에 상품이 존재할 때만 키 입력
                    if(orderCartProductYN) {
                        // <상품 리스트>
                        if(orderCartFocus == 1) {

                            // 전체 체크박스 일 때
                            if(orderCartListFocus == -1) {
                                
                                // 체크되어 있지 않을 때
                                if(orderCartAllCheck == false) {
                                    orderCartAllCheck = true;
                                    $('#li_cart_all_chkbox img').attr("src", "../images/checkbox_sel.png");

                                    for(var i=0 ; i < orderCartResultSet.length ; i++) {
                                        orderCartResultCheckStatus[i] = true;
                                        $('.ctc_chebox > img').attr("src", "../images/checkbox_sel.png");
                                    }
                                }

                                // 체크되어 있을 때
                                else if(orderCartAllCheck == true) {
                                    orderCartAllCheck = false;
                                    $('#li_cart_all_chkbox img').attr("src", "../images/checkbox.png");

                                    for(var i=0 ; i < orderCartResultSet.length ; i++) {
                                        orderCartResultCheckStatus[i] = false;
                                        $('.ctc_chebox img').attr("src", "../images/checkbox.png");
                                    }   
                                }
                            }

                            // 상품 리스트 일 때
                            else if(orderCartListFocus >= 0 && orderCartListFocus <= 2) {
                                // 체크박스 일 때
                                if(orderCartCheckYN == true) {
                                    // 체크 해제
                                    if(orderCartResultCheckStatus[(orderCartPage * 3) + orderCartListFocus] == true) {
                                        orderCartResultCheckStatus[(orderCartPage * 3) + orderCartListFocus] = false;
                                        $('.ctc_chebox img').eq(orderCartListFocus).attr("src", "../images/checkbox.png");

                                        // 하나라도 체크 해제되면 체크 해제 됨
                                        $('#li_cart_all_chkbox img').attr("src", "../images/checkbox.png");
                                        orderCartAllCheck = false;
                                    }

                                    // 체크 설정
                                    else if(orderCartResultCheckStatus[(orderCartPage * 3) + orderCartListFocus] == false) {
                                        orderCartResultCheckStatus[(orderCartPage * 3) + orderCartListFocus] = true;
                                        $('.ctc_chebox img').eq(orderCartListFocus).attr("src", "../images/checkbox_sel.png");
                                    }
                                }

                                // 상품 리스트 일 때
                                else if(orderCartCheckYN == false) {
                                    // 수량 조절 팝업 열기
                                    chgVolumeFocus = 2;
                                    $('#wrap_chVolume_easyCart').show();

                                    // 현재 선택된 상품의 수량을 수량변경팝업에 적용
                                    var idx = (Number(orderCartPage) * 3) + Number(orderCartListFocus);         // 현재 선택된 상품 idx
                                    $('span[name="ppr_num_numP"]').html(orderCartResultSet[idx]["cnt"]);

                                    $('span[name="ppr_num_plusP"]').addClass('focus');
                                }
                            }

                            // 선택상품 삭제하기
                            else if(orderCartListFocus == 3) {
                                // 장바구니 선택 삭제 확인 팝업 열기
                                orderCartFocus = 7;
                                confirmDeleteCart();
                            }

                            // 선택상품 찜하기
                            else if(orderCartListFocus == 4) {
                                // 찜하기
                                favoriteCart();
                            }
                        }

                        // <배송지 선택>
                        else if(orderCartFocus == 5) {
                            // 배송지 목록에 포커스 주기
                            addrPopFocus = 0;
                            $('#addr_list').addClass("focus");

                            // 배송지 팝업 열기
                            orderCartFocus = 8;
                            $('#wrap_addr').show();
                        }

                        // <결제하기>
                        else if(orderCartFocus == 6) {
                            // 배송시간 선택 팝업
                            orderCartFocus = 9;
                            $('#wrap_delivery_time').show();

                            // 1시간 이내에 기본 sel, 완료버튼에 focus
                            $('#dt_1hour').addClass("sel");
                            $('#btn_dt_ok').addClass("focus");

                            deliveryTimeFocus = 3;
                            deliverySelectFocus = 0;
                        }

                        // <장바구니 선택 삭제 확인 팝업>
                        else if(orderCartFocus == 7) {
                            // 확인 버튼
                            if(orderCartDeleteFocus == 0) {
                                // 선택된 상품 삭제
                                deleteCart();
                            }
                            // 취소 버튼
                            else if(orderCartDeleteFocus == 1) {
                                // 팝업 감춤
                                $('#wrap_delete_product').hide();
                                orderCartDeleteFocus = 0;

                                // 포커스 초기화
                                $('#btn_delete_yn_cancel').removeClass("focus");

                                // 장바구니 재조회
                                selectCartList();
                            }
                        }

                        // <배송지 선택 팝업>
                        else if(orderCartFocus == 8) {
                            // 셀렉트박스
                            if(addrPopFocus == 0) {
                                // 액션 없음..
                            }
                            // 확인
                            else if(addrPopFocus == 1) {
                                // 주소 적용
                                if(arrAddrList[addrListFocus]["main"] == 1)
                                    $('#sbr_address').empty().html('기본 배송지 : ' + arrAddrList[addrListFocus]["address1"] + ' ' + arrAddrList[addrListFocus]["address2"] + '<span id="order_cart_address">다른 주소 선택</span>');
                                else
                                    $('#sbr_address').empty().html(arrAddrList[addrListFocus]["address1"] + ' ' + arrAddrList[addrListFocus]["address2"] + '<span id="order_cart_address">다른 주소 선택</span>');

                                // 주문자 주소 저장
                                resultAddress1 = arrAddrList[addrListFocus]["address1"];
                                resultAddress2 = arrAddrList[addrListFocus]["address2"];

                                // 확인버튼 focus 삭제
                                $('#btn_addr_submit').removeClass("focus");

                                // 배송지 팝업 닫기
                                $('#order_cart_address').addClass("focus");

                                if(orderScreen == 0) orderCartFocus = 5;        // 이전화면이 장바구니
                                else if(orderScreen == 1) orderCartFocus = 11;  // 이전화면이 쇼퍼선택
                                else if(orderScreen == 2) orderCartFocus = 40;  // 이전화면이 주문/결제

                                $('#wrap_addr').hide();
                            }
                            // 취소
                            else if(addrPopFocus == 2) {
                                // 취소버튼 focus 삭제
                                $('#btn_addr_cancel').removeClass("focus");

                                // 배송지 팝업 닫기
                                $('#order_cart_address').addClass("focus");

                                if(orderScreen == 0) orderCartFocus = 5;        // 이전화면이 장바구니
                                else if(orderScreen == 1) orderCartFocus = 11;  // 이전화면이 쇼퍼선택

                                $('#wrap_addr').hide();
                            }
                        }

                        // <배송시간 선택 팝업>
                        else if(orderCartFocus == 9) {
                            // 빠른배송 1시간 이내
                            if(deliveryTimeFocus == 0) {
                                // 선택 
                                $('#dt_hour').empty();

                                $('#dt_2hour').removeClass("focus");
                                $('#dt_hour').removeClass("focus");
                                $('#dt_1hour').removeClass("sel");
                                $('#dt_2hour').removeClass("sel");
                                $('#dt_hour').removeClass("sel");

                                $('#dt_1hour').addClass("sel");
                                deliverySelectFocus = 0;
                            }

                            // 빠른배송 2시간 이내
                            else if(deliveryTimeFocus == 1) {
                                // 선택 
                                $('#dt_hour').empty();

                                $('#dt_1hour').removeClass("focus");
                                $('#dt_hour').removeClass("focus");
                                $('#dt_1hour').removeClass("sel");
                                $('#dt_2hour').removeClass("sel");
                                $('#dt_hour').removeClass("sel");
                                
                                $('#dt_2hour').addClass("sel");
                                deliverySelectFocus = 1;
                            }

                            // 배송시간 지정
                            else if(deliveryTimeFocus == 2) {
                                // 숫자 유효성 체크
                                var current_num = Number($('#dt_hour').html());

                                if(current_num > 21 || current_num < 10) {
                                    $('#common_msg').empty().html("입력한 시간이 올바르지 않습니다. (10 ~ 21 사이로 입력)");
                                    $('#wrap_common').show();

                                    setTimeout("$('#wrap_common').hide()", 1500);
                                    setTimeout("$('#common_msg').empty()", 1500);   

                                    $('#dt_hour').empty();

                                    return;
                                }

                                // 선택 
                                $('#dt_1hour').removeClass("focus");
                                $('#dt_2hour').removeClass("focus");
                                $('#dt_1hour').removeClass("sel");
                                $('#dt_2hour').removeClass("sel");
                                $('#dt_hour').removeClass("sel");

                                $('#dt_hour').addClass("sel");
                                deliveryTime = current_num; // 입력한 시간을 deliveryTime에 set (나중에 주문완료할때 쓰임)
                                deliverySelectFocus = 2;
                            }

                            // 완료 버튼
                            else if(deliveryTimeFocus == 3) {
                                
                                // 쇼퍼 목록 조회
                                selectShopperList();

                                // 주문하기 버튼 Focus 제거 (갱신되므로 할 필요 없음)
                                // $('#order_cart_submit').removeClass("focus");

                                // 주문하기 버튼 -> 결제하기, 장바구니 돌아가기 버튼으로 변경
                                var appendHtml = '<li id="order_cart_submit" class="btn_red">결제하기</li>'
                                               + '<li id="order_cart_back" class="btn_green">장바구니 돌아가기</li>';

                                $('#sbr_btn').empty().append(appendHtml);

                                // 쇼퍼 리스트로 이동 
                                orderScreen = 1;
                                orderCartFocus = 10; // 쇼퍼 리스트로..
                                $('#orderScreen0').hide();
                                $('#orderScreen1').show();
                                $('#wrap_delivery_time').hide();

                                // 단계 변경
                                $('#cart_part1').removeClass("sel");
                                $('#cart_part2').addClass("sel");
                                $('#cart_part1 > span').removeClass("pr_txt_sel").addClass("pr_txt");
                                $('#cart_part2 > span').removeClass("pr_txt").addClass("pr_txt_sel");
                            }

                            // 취소 버튼
                            else if(deliveryTimeFocus == 4) {
                                // 입력된 값 제거
                                $('#dt_hour').empty();

                                // 포커스 제거
                                $('#dt_1hour').removeClass("focus");
                                $('#dt_2hour').removeClass("focus");
                                $('#dt_hour').removeClass("focus");
                                $('#dt_1hour').removeClass("sel");
                                $('#dt_2hour').removeClass("sel");
                                $('#dt_hour').removeClass("sel");
                                $('#btn_dt_close').removeClass("focus");
                                
                                // 포커스 추가
                                deliveryTimeFocus = 3; // 장바구니로 돌아가고 배송시간 포커스는 완료버튼
                                deliverySelectFocus = 0; // 1시간 이내로 선택
                                orderCartFocus = 6; // 주문하기 버튼 Focus

                                $('#dt_1hour').addClass("sel");
                                $('#btn_dt_ok').addClass("focus");

                                $('#wrap_delivery_time').hide();
                            }

                        }

                        //##########################
                        // 쇼퍼 선택 화면
                        //##########################
                        // <쇼퍼 리스트>
                        else if(orderCartFocus == 10) {
                            if(shopperListFocus == 0) {
                                shopperSelectFocus = 0;
                            } 
                            else if(shopperListFocus == 1) {
                              shopperSelectFocus = 1;  
                            }
                            else if(shopperListFocus == 2) {
                                shopperSelectFocus = 2;
                            }
                            else if(shopperListFocus == 3) {
                                shopperSelectFocus = 3;
                            }

                            $('#display_select_shopper').html(arrShopperList[shopperListFocus]["shopper_id"] + " 쇼퍼님을 선택하셨습니다.");
                            $('li[name="li_shopper_list"]').removeClass("sel");
                            $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("sel");

                        }

                        // <쇼퍼 - 배송지 선택>
                        else if(orderCartFocus == 11) {
                            // 배송지 목록에 포커스 주기
                            addrPopFocus = 0;
                            $('#addr_list').addClass("focus");

                            // 배송지 팝업 열기
                            orderCartFocus = 8;
                            $('#wrap_addr').show();
                        }

                        // <쇼퍼 - 결제하기>
                        else if(orderCartFocus == 12) {
                            // 선택된 쇼퍼가 없을 때
                            if(shopperSelectFocus == -1) {
                                $('#common_msg').empty().html("선택된 쇼퍼가 없습니다.");
                                $('#wrap_common').show();

                                setTimeout("$('#wrap_common').hide()", 1500);
                                setTimeout("$('#common_msg').empty()", 1500);

                                return;
                            }

                            // 쇼퍼 ID, phone저장
                            resultShopperId = arrShopperList[shopperSelectFocus]["shopper_id"];
                            resultShopperPhone = arrShopperList[shopperSelectFocus]["phone"];

                            // 주문/결제로 이동
                            $('#order_cart_submit').removeClass("focus");
                            $('li[name="payment_left_menu"]').eq(0).addClass("focus");
                            orderScreen = 2;
                            orderCartFocus = 21;
                            $('#orderScreen1').hide();
                            $('#orderScreen2').show();

                            // 단계 변경
                            $('#cart_part2').removeClass("sel");
                            $('#cart_part3').addClass("sel");
                            $('#cart_part2 > span').removeClass("pr_txt_sel").addClass("pr_txt");
                            $('#cart_part3 > span').removeClass("pr_txt").addClass("pr_txt_sel");
                        }

                        // <쇼퍼 - 장바구니로 돌아가기>
                        else if(orderCartFocus == 13) {
                            // 장바구니 조회
                            selectCartList();

                            $('#display_select_shopper').html("쇼퍼를 선택해주세요");

                            // 주문하기 버튼 -> 결제하기, 장바구니 돌아가기 버튼으로 변경
                            var appendHtml = '<li id="order_cart_submit" class="btn_red">주문하기</li>';                                           

                            $('#sbr_btn').empty().append(appendHtml);

                            // 쇼퍼 리스트로 이동 
                            orderScreen = 0;
                            orderCartFocus = 1; // 쇼퍼 리스트로..
                            $('#orderScreen1').hide();
                            $('#orderScreen0').show();

                            // 단계 변경
                            $('#cart_part2').removeClass("sel");
                            $('#cart_part1').addClass("sel");
                            $('#cart_part2 > span').removeClass("pr_txt_sel").addClass("pr_txt");
                            $('#cart_part1 > span').removeClass("pr_txt").addClass("pr_txt_sel");

                        }

                        //##########################
                        // 주문/결제
                        //##########################
                        // <계좌 안내>
                        else if(orderCartFocus == 21) {
                            // X
                        }
                        // <신용카드 등 미구현 메뉴>
                        else if(orderCartFocus == 22 || orderCartFocus == 23 || orderCartFocus == 24) {
                            $('#common_msg').empty().html("준비 중 입니다.");
                            $('#wrap_common').show();

                            setTimeout("$('#wrap_common').hide()", 1500);
                            setTimeout("$('#common_msg').empty()", 1500);
                        }
                        // <배송지 선택>
                        else if(orderCartFocus == 40) {
                            // 배송지 목록에 포커스 주기
                            addrPopFocus = 0;
                            $('#addr_list').addClass("focus");

                            // 배송지 팝업 열기
                            orderCartFocus = 8;
                            $('#wrap_addr').show();
                        }
                        // <결제하기>
                        else if(orderCartFocus == 41) {
                            // 주문하기
                            orderPayment();

                            // 주문 완료로 이동
                            orderScreen = 3;
                            orderCartFocus = 61;
                            $('#orderScreen2').hide();
                            $('#orderScreen3').show();
                            $('#orderScreen_right0').hide();
                            $('#orderScreen_right1').show();

                            // 주문이력보기 Focus
                            $('#order_cart_submit2').addClass("focus");

                            // 단계 변경
                            $('#cart_part3').removeClass("sel");
                            $('#cart_part4').addClass("sel");
                            $('#cart_part3 > span').removeClass("pr_txt_sel").addClass("pr_txt");
                            $('#cart_part4 > span').removeClass("pr_txt").addClass("pr_txt_sel");

                        }
                        // <장바구니로 돌아가기>
                        else if(orderCartFocus == 42) {
                            // 장바구니 조회
                            selectCartList();

                            $('#display_select_shopper').html("쇼퍼를 선택해주세요");

                            // 주문하기 버튼 -> 결제하기, 장바구니 돌아가기 버튼으로 변경
                            var appendHtml = '<li id="order_cart_submit" class="btn_red">주문하기</li>';                                           

                            $('#sbr_btn').empty().append(appendHtml);

                            // 쇼퍼 리스트로 이동 
                            orderScreen = 0;
                            orderCartFocus = 1; // 쇼퍼 리스트로..
                            $('#orderScreen1').hide();
                            $('#orderScreen0').show();

                            // 단계 변경
                            $('#cart_part2').removeClass("sel");
                            $('#cart_part1').addClass("sel");
                            $('#cart_part2 > span').removeClass("pr_txt_sel").addClass("pr_txt");
                            $('#cart_part1 > span').removeClass("pr_txt").addClass("pr_txt_sel");
                        }

                        //##########################
                        // 주문완료
                        //##########################
                        // <주문내역조회>
                        else if(orderCartFocus == 61) {
                            location.href = "mypage.html?SHOPPER_STATUS" + SHOPPER_STATUS;
                        }
                        // <메뉴 돌아가기>
                        else if(orderCartFocus == 62) {
                            //*****
                            //** 주문/결제로 넘어왔던 이전 화면으로 돌아감, VK_BACK과 같이 관리할 것
                            //*****
                            // 상품정보
                            if(REQUEST_SCREEN == 'product1.html') {
                                location.href = REQUEST_SCREEN + '?productView=' + requestProductView
                                              + '&currentFocusList=' + requestCurrentFocusList
                                              + '&currentFocusMenu=' + requestCurrentFocusMenu
                                              + '&currentFocusMenul=' + requestCurrentFocusMenul
                                              + '&categoryCode=' + requestCategoryCode
                                              + '&categoryDtlCode=' + requestCategoryDtlCode
                                              + '&categoryDtlPage=' + requestCategoryDtlPage
                                              + '&id=' + requestCategoryDtlId
                                              + '&requestExhbFocus=' + requestExhbFocus
                                              + '&requestExhbPage=' + requestExhbPage
                                              + '&SHOPPER_STATUS=' + SHOPPER_STATUS;
                            }
                            // 상세 카테고리
                            else if(REQUEST_SCREEN == 'category_dtl.html') {
                                location.href = REQUEST_SCREEN + '?categoryCode=' + requestCategoryCode
                                              + '&categoryDtlCode=' + requestCategoryDtlCode
                                              + '&categoryDtlPage=' + requestCategoryDtlPage
                                              + '&SHOPPER_STATUS=' + SHOPPER_STATUS;
                            }
                            // 값이 없으면 기획전으로..
                            else if(REQUEST_SCREEN == '') {
                                location.href = 'exhb.html';
                            } else {
                                location.href = REQUEST_SCREEN;
                            }

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

                        //##########################
                        // 수량 조절 팝업 ON 일때
                        //##########################
                        if(chgVolumeFocus > 0) {
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

                            // 키 입력을 중지시킨다.
                            return;
                        }

                        //##########################
                        // 장바구니 상품 목록
                        //##########################
                        // 장바구니에 상품이 존재할 때만 키 입력
                        if(orderCartProductYN) {
                            if(orderCartFocus == 1) {
                                // 전체 체크박스 일 때
                                if(orderCartListFocus == -1) {

                                }

                                // 장바구니 목록의 첫번째 항목일 때
                                else if(orderCartListFocus == 0) {
                                    // 이전 페이지가 존재하지 않을 때
                                    if(orderCartPrevPageYN == false) {
                                        // 전체체크박스로 이동  
                                        if(orderCartCheckYN == false) {
                                            $('li[name="li_cart_list"]').eq(0).removeClass("focus");
                                        }
                                        else {
                                            $('td[name="td_cart_chkbox"] > img').eq(0).removeClass("focus");
                                        }
                                        orderCartListFocus = -1;
                                        $('#li_cart_all_chkbox > img').addClass("focus");
                                    }

                                    // 이전 페이지가 존재 할 때
                                    else if(orderCartPrevPageYN == true) {
                                        // 페이지 있음, 이전 페이지로 이동
                                        $('#li_cart_all_chkbox > img').removeClass("focus"); // 전체 체크박스 포커스 삭제

                                        orderCartPage      = orderCartPage - 1; // 페이지 감소
                                        orderCartListFocus = 2;                 // 화면 Focus는 제일 아래로

                                        makeCartList(orderCartPage);            // 페이지 갱신
                                        martPageArrowUtil();                    // 화살표 SET

                                        if(orderCartCheckYN == false) {
                                            $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                                            $('.ctc_chebox').eq(orderCartListFocus).css("background", "#F4F4F4");
                                        } else {
                                            $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).addClass("focus");
                                        }
                                    }
                                }

                                // 장바구니 목록의 항목이 1번째이나 2번째
                                else if(orderCartListFocus == 1 || orderCartListFocus == 2) {
                                    if(orderCartCheckYN == false) {
                                        $('li[name="li_cart_list"]').eq(orderCartListFocus).removeClass("focus");
                                    } else {
                                        $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).removeClass("focus");
                                    }

                                    orderCartListFocus      = orderCartListFocus - 1;

                                    if(orderCartCheckYN == false) {
                                        $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                                        $('.ctc_chebox').eq(orderCartListFocus).css("background", "#F4F4F4");
                                    } else {
                                        $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).addClass("focus");
                                    }
                                }

                                // 장바구니 목록의 항목이 선택상품 삭제 선택상품 찜하기 일 경우
                                else if(orderCartListFocus == 3 || orderCartListFocus == 4) {
                                    $('#order_cart_delete').removeClass("focus");       // 선택상품 삭제 포커스 제거
                                    $('#order_cart_favorite').removeClass("focus");     // 선택상품 찜하기 포커스 제거

                                    orderCartListFocus      = orderCartResultLen - 1;   // 화면 상 마지막 상품으로

                                    if(orderCartCheckYN == false) {
                                        $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                                        $('.ctc_chebox').eq(orderCartListFocus).css("background", "#F4F4F4");
                                    } else {
                                        $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).addClass("focus");
                                    }
                                }
                            }

                            // <주문하기>
                            if(orderCartFocus == 6) {
                                $('#order_cart_submit').removeClass("focus");
                                orderCartFocus = 5;
                                $('#order_cart_address').addClass("focus");
                            }

                            // <배송지 선택 팝업>
                            else if(orderCartFocus == 8) {
                                // 확인 버튼
                                if(addrPopFocus == 1) {
                                    $('#btn_addr_submit').removeClass("focus");
                                    addrPopFocus = 0;
                                    $('#addr_list').addClass("focus");
                                }
                                // 취소 버튼
                                else if(addrPopFocus == 2) {
                                    $('#btn_addr_cancel').removeClass("focus");
                                    addrPopFocus = 0;
                                    $('#addr_list').addClass("focus");   
                                }

                            }

                            // <배송시간 선택 팝업>
                            else if(orderCartFocus == 9) {
                                // 빠른배송 1시간 이내
                                if(deliveryTimeFocus == 0) {
                                    // X
                                }

                                // 빠른배송 2시간 이내
                                else if(deliveryTimeFocus == 1) {
                                    $('#dt_2hour').removeClass("focus");
                                    deliveryTimeFocus = 0;
                                    $('#dt_1hour').addClass("focus");
                                }

                                // 배송시간 지정
                                else if(deliveryTimeFocus == 2) {
                                    // X
                                }

                                // 완료 버튼
                                else if(deliveryTimeFocus == 3) {
                                    $('#btn_dt_ok').removeClass("focus");
                                    deliveryTimeFocus = 1;
                                    $('#dt_2hour').addClass("focus");
                                }

                                // 취소 버튼
                                else if(deliveryTimeFocus == 4) {
                                    $('#btn_dt_close').removeClass("focus");
                                    deliveryTimeFocus = 2;
                                    $('#dt_hour').addClass("focus");
                                }
                            }

                            //##########################
                            // 쇼퍼 선택 화면
                            //##########################
                            // <쇼퍼 리스트>
                            else if(orderCartFocus == 10) {
                                if(shopperListFocus == 0) {
                                    // TODO : 페이지 이동...
                                } 
                                else if(shopperListFocus == 1) {
                                    // TODO : 페이지 이동...

                                }
                                else if(shopperListFocus == 2) {
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    shopperListFocus = 0;
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");

                                }
                                else if(shopperListFocus == 3) {
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    shopperListFocus = 1;
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                                }
                            }

                            // <쇼퍼 - 배송지 선택>
                            else if(orderCartFocus == 11) {
                                // X
                            }

                            // <쇼퍼 - 결제하기>
                            else if(orderCartFocus == 12) {
                                $('#order_cart_submit').removeClass("focus");
                                orderCartFocus = 11;
                                $('#order_cart_address').addClass("focus");
                            }

                            // <쇼퍼 - 장바구니로 돌아가기>
                            else if(orderCartFocus == 13) {
                                $('#order_cart_back').removeClass("focus");
                                orderCartFocus = 12;
                                $('#order_cart_submit').addClass("focus");
                            }

                            //##########################
                            // 주문/결제
                            //##########################
                            // <계좌 안내>
                            else if(orderCartFocus == 21) {
                                // X
                            }
                            // <신용카드 등 미구현 메뉴>
                            else if(orderCartFocus == 22 || orderCartFocus == 23 || orderCartFocus == 24) {
                                if(orderCartFocus == 22) {
                                    $('li[name="payment_left_menu"]').eq(1).removeClass("focus");
                                    orderCartFocus = 21;
                                    $('li[name="payment_left_menu"]').eq(0).addClass("focus");
                                }
                                else if(orderCartFocus == 23) {
                                    $('li[name="payment_left_menu"]').eq(2).removeClass("focus");
                                    orderCartFocus = 22;
                                    $('li[name="payment_left_menu"]').eq(1).addClass("focus");
                                }
                                else if(orderCartFocus == 24) {
                                    $('li[name="payment_left_menu"]').eq(3).removeClass("focus");
                                    orderCartFocus = 23;
                                    $('li[name="payment_left_menu"]').eq(2).addClass("focus");
                                }
                            }
                            // <배송지 선택>
                            else if(orderCartFocus == 40) {
                                // X
                            }
                            // <결제하기>
                            else if(orderCartFocus == 41) {
                                $('#order_cart_submit').removeClass("focus");
                                orderCartFocus = 40;
                                $('#order_cart_address').addClass("focus");
                            }
                            // <장바구니로 돌아가기>
                            else if(orderCartFocus == 42) {
                                $('#order_cart_back').removeClass("focus");
                                orderCartFocus = 41;
                                $('#order_cart_submit').addClass("focus");
                            }

                            //##########################
                            // 주문완료
                            //##########################
                            // <주문내역조회>
                            else if(orderCartFocus == 61) {
                                // X
                            }
                            // <메뉴 돌아가기>
                            else if(orderCartFocus == 62) {
                                $('#order_cart_back2').removeClass("focus");
                                orderCartFocus = 61;
                                $('#order_cart_submit2').addClass("focus");
                            }
                        }
                    }

                    // **************************************************
                    // * 아래 KEY
                    // **************************************************
                    if(keyCode === global.VK_DOWN) {

                        //##########################
                        // 수량 조절 팝업 ON 일때
                        //##########################
                        if(chgVolumeFocus > 0) {
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
                            // 키 입력을 중지 시킨다.
                            return;
                        }

                        //##########################
                        // 장바구니 상품 목록
                        //##########################
                        // 장바구니에 상품이 존재할 때만 키 입력
                        if(orderCartProductYN) {
                            if(orderCartFocus == 1) {

                                // 선택상품 삭제, 선택상품 찜하기에서는 아래 키를 누르면 다음 페이지로 이동한다.
                                if(orderCartListFocus == 3 || orderCartListFocus == 4) {
                                    
                                }
                                // 장바구니 목록의 2번째 항목이거나 장바구니 목록의 마지막 데이터일 때
                                else if(orderCartListFocus == 2 || orderCartListFocus == orderCartResultLen-1) {
                                    // 다음 페이지가 존재하지 않을 때
                                    if(orderCartNextPageYN == false) {
                                        // 선택상품 삭제로 이동
                                        console.log("#### orderCartResultLen : " + orderCartResultLen);
                                        if(orderCartCheckYN == false) $('li[name="li_cart_list"]').eq(orderCartListFocus).removeClass("focus");
                                        else $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).removeClass("focus");
                                        orderCartListFocus = 3;
                                        $('#order_cart_delete').addClass("focus");
                                        console.log("#### orderCartListFocus : " + orderCartListFocus);
                                    }

                                    // 다음 페이지가 존재 할 때
                                    else if(orderCartNextPageYN == true) {
                                        // 페이지 있음, 다음 페이지로 이동
                                        $('#order_cart_delete').removeClass("focus");       // 선택상품 삭제 포커스 제거
                                        $('#order_cart_favorite').removeClass("focus");     // 선택상품 찜하기 포커스 제거

                                        orderCartPage      = orderCartPage + 1; // 페이지 증가
                                        orderCartListFocus = 0;                 // 화면 Focus는 제일 위로

                                        makeCartList(orderCartPage);            // 페이지 갱신
                                        martPageArrowUtil();                    // 화살표 SET

                                        if(orderCartCheckYN == false) {
                                            $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus"); // 이동한 페이지의 첫번째 상품 포커스
                                            $('.ctc_chebox').eq(orderCartListFocus).css("background", "#F4F4F4");    
                                        } else {
                                            $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).addClass("focus");
                                        }
                                        
                                    }

                                }

                                // 장바구니 목록의 0번째, 1번째 항목이고 장바구니 목록의 마지막 데이터가 아닐 때
                                else if((orderCartListFocus == 0 || orderCartListFocus == 1) && orderCartListFocus != orderCartResultLen-1) {
                                    console.log("#### orderCartResultLen : " + orderCartResultLen);

                                    if(orderCartCheckYN == false) $('li[name="li_cart_list"]').eq(orderCartListFocus).removeClass("focus");
                                    else $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).removeClass("focus");

                                    orderCartListFocus      = orderCartListFocus + 1;

                                    if(orderCartCheckYN == false) {
                                        $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                                        $('.ctc_chebox').eq(orderCartListFocus).css("background", "#F4F4F4");
                                    } else {
                                        $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).addClass("focus");
                                    }
                                    console.log("#### orderCartListFocus : " + orderCartListFocus);
                                }

                                // 전체 체크 박스 일때
                                else if(orderCartListFocus == -1) {
                                    $('#li_cart_all_chkbox > img').removeClass("focus");
                                    orderCartListFocus = 0; // 장바구니 첫번째 상품으로

                                    if(orderCartCheckYN == false) {
                                        $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                                        $('.ctc_chebox').eq(orderCartListFocus).css("background", "#F4F4F4");
                                    } else {
                                        $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).addClass("focus");
                                    }
                                }
                            }

                            //##########################
                            // 배송지 선택
                            //##########################
                            else if(orderCartFocus == 5) {
                                $('#order_cart_address').removeClass("focus");
                                orderCartFocus = 6;
                                $('#order_cart_submit').addClass("focus");
                            }

                            // <배송지 선택 팝업>
                            else if(orderCartFocus == 8) {
                                // 셀렉트박스
                                if(addrPopFocus == 0) {
                                    $('#addr_list').removeClass("focus");
                                    addrPopFocus = 1;
                                    $('#btn_addr_submit').addClass("focus");
                                }
                            }

                            // <배송시간 선택 팝업>
                            else if(orderCartFocus == 9) {
                                // 빠른배송 1시간 이내
                                if(deliveryTimeFocus == 0) {
                                    $('#dt_1hour').removeClass("focus");
                                    deliveryTimeFocus = 1;
                                    $('#dt_2hour').addClass("focus");
                                }

                                // 빠른배송 2시간 이내
                                else if(deliveryTimeFocus == 1) {
                                    $('#dt_2hour').removeClass("focus");
                                    deliveryTimeFocus = 3;
                                    $('#btn_dt_ok').addClass("focus");
                                }

                                // 배송시간 지정
                                else if(deliveryTimeFocus == 2) {
                                    // 배송시간을 입력하고 확인을 누르지 않은 상태에서 이동하면 초기화 된다.
                                    if(deliverySelectFocus != 2) $('#dt_hour').empty(); 

                                    $('#dt_hour').removeClass("focus");
                                    deliveryTimeFocus = 4;
                                    $('#btn_dt_close').addClass("focus");
                                }

                                // 완료 버튼
                                else if(deliveryTimeFocus == 3) {
                                    // X
                                }

                                // 취소 버튼
                                else if(deliveryTimeFocus == 4) {
                                    // X
                                }
                            }

                            //##########################
                            // 쇼퍼 선택 화면
                            //##########################
                            // <쇼퍼 리스트>
                            else if(orderCartFocus == 10) {
                                if(shopperListFocus == 0) {
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    shopperListFocus = 2;
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                                } 
                                else if(shopperListFocus == 1) {
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    shopperListFocus = 3;
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                                }
                                else if(shopperListFocus == 2) {
                                    // TODO : 페이지 이동은 이곳에
                                }
                                else if(shopperListFocus == 3) {
                                    // TODO : 페이지 이동은 이곳에
                                }
                            }

                            // <쇼퍼 - 배송지 선택>
                            else if(orderCartFocus == 11) {
                                $('#order_cart_address').removeClass("focus");
                                orderCartFocus = 12;
                                $('#order_cart_submit').addClass("focus");
                            }

                            // <쇼퍼 - 결제하기>
                            else if(orderCartFocus == 12) {
                                $('#order_cart_submit').removeClass("focus");
                                orderCartFocus = 13;
                                $('#order_cart_back').addClass("focus");

                            }

                            // <쇼퍼 - 장바구니로 돌아가기>
                            else if(orderCartFocus == 13) {
                                // X
                            }

                            //##########################
                            // 주문/결제
                            //##########################
                            // <계좌 안내>
                            else if(orderCartFocus == 21) {
                                console.log("22로");
                                $('li[name="payment_left_menu"]').eq(0).removeClass("focus");
                                orderCartFocus = 22;
                                $('li[name="payment_left_menu"]').eq(1).addClass("focus");
                            }
                            // <신용카드 등 미구현 메뉴>
                            else if(orderCartFocus == 22 || orderCartFocus == 23 || orderCartFocus == 24) {
                                if(orderCartFocus == 22) {
                                    $('li[name="payment_left_menu"]').eq(1).removeClass("focus");
                                    orderCartFocus = 23;
                                    $('li[name="payment_left_menu"]').eq(2).addClass("focus");
                                }
                                else if(orderCartFocus == 23) {
                                    $('li[name="payment_left_menu"]').eq(2).removeClass("focus");
                                    orderCartFocus = 24;
                                    $('li[name="payment_left_menu"]').eq(3).addClass("focus");
                                }
                                else if(orderCartFocus == 24) {
                                    // X
                                }
                            }
                            // <배송지 선택>
                            else if(orderCartFocus == 40) {
                                $('#order_cart_address').removeClass("focus");
                                orderCartFocus = 41;
                                $('#order_cart_submit').addClass("focus");
                            }
                            // <결제하기>
                            else if(orderCartFocus == 41) {
                                $('#order_cart_submit').removeClass("focus");
                                orderCartFocus = 42;
                                $('#order_cart_back').addClass("focus");

                            }
                            // <장바구니로 돌아가기>
                            else if(orderCartFocus == 42) {
                                // X
                            }

                            //##########################
                            // 주문완료
                            //##########################
                            // <주문내역조회>
                            else if(orderCartFocus == 61) {
                                $('#order_cart_submit2').removeClass("focus");
                                orderCartFocus = 62;
                                $('#order_cart_back2').addClass("focus");
                            }
                            // <메뉴 돌아가기>
                            else if(orderCartFocus == 62) {

                            }
                        }
                    }

                    // **************************************************
                    // * 좌 KEY
                    // **************************************************
                    if(keyCode === global.VK_LEFT) {
                        //##########################
                        // 수량 조절 팝업 ON 일때
                        //##########################
                        if(chgVolumeFocus > 0) {
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

                            // 키 입력을 중지시킨다.
                            return;
                        }

                        //##########################
                        // 장바구니 상품 목록
                        //##########################
                        // 장바구니에 상품이 존재할 때만 키 입력
                        if(orderCartProductYN) {
                            if(orderCartFocus == 1) {

                                // 상품 리스트 일 때
                                if((orderCartListFocus >= 0 && orderCartListFocus <= 2) && orderCartCheckYN == false) {
                                    $('li[name="li_cart_list"]').eq(orderCartListFocus).removeClass("focus");
                                    orderCartCheckYN = true;
                                    $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).addClass("focus");
                                    console.log("LEFT : 상품 리스트에서 체크박스로 " + orderCartCheckYN);
                                }

                                // 선택상품 찜하기일 때
                                else if(orderCartListFocus == 4) {
                                    // 전체 삭제로 이동
                                    $('#order_cart_favorite').removeClass("focus");   
                                    orderCartListFocus = 3;
                                    $('#order_cart_delete').addClass("focus");
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
                                    $('.ctc_chebox').eq(orderCartListFocus).css("background", "#F4F4F4");
                                }

                                // 이전 포커스가 선택상품 찜하기 일때
                                else if(orderCartListFocus == 4) {
                                    $('#order_cart_favorite').addClass("focus"); 
                                }
                            }

                            //######################
                            // 선택 상품 삭제 확인 팝업
                            //######################
                            // <장바구니 선택 삭제 확인 팝업>
                            else if(orderCartFocus == 7) {
                                if(orderCartDeleteFocus == 1) {
                                    $('#btn_delete_yn_cancel').removeClass("focus");
                                    orderCartDeleteFocus = 0;
                                    $('#btn_delete_yn_submit').addClass("focus");
                                }
                            }

                            // <배송지 선택 팝업>
                            else if(orderCartFocus == 8) {
                                // 셀렉트박스
                                if(addrPopFocus == 0) {
                                    if(addrListFocus == 0) addrListFocus = Number(arrAddrList.length)-1;
                                    else if(addrListFocus > 0) addrListFocus = Number(addrListFocus) - 1;
                                        
                                    if(arrAddrList[addrListFocus]["main"] == 1) {
                                        $('#addr_list_span').empty().html("(기본)" + arrAddrList[addrListFocus]["address1"]  + " " + arrAddrList[addrListFocus]["address2"]);    
                                    } else {
                                        $('#addr_list_span').empty().html(arrAddrList[addrListFocus]["address1"]  + " " + arrAddrList[addrListFocus]["address2"]);
                                    }                                        
                                }

                                // 취소 버튼
                                if(addrPopFocus == 2) {
                                    $('#btn_addr_cancel').removeClass("focus");
                                    addrPopFocus = 1;
                                    $('#btn_addr_submit').addClass("focus");
                                }
                            }

                            // <배송시간 선택 팝업>
                            else if(orderCartFocus == 9) {
                                // 빠른배송 1시간 이내
                                if(deliveryTimeFocus == 0) {
                                    // X
                                }

                                // 빠른배송 2시간 이내
                                if(deliveryTimeFocus == 1) {
                                    // X
                                }

                                // 배송시간 지정
                                if(deliveryTimeFocus == 2) {
                                    // 배송시간을 입력하고 확인을 누르지 않은 상태에서 이동하면 초기화 된다.
                                    if(deliverySelectFocus != 2) $('#dt_hour').empty(); 

                                    $('#dt_hour').removeClass("focus");
                                    deliveryTimeFocus = 0;
                                    $('#dt_1hour').addClass("focus");
                                }

                                // 완료 버튼
                                if(deliveryTimeFocus == 3) {
                                    // X
                                }

                                // 취소 버튼
                                if(deliveryTimeFocus == 4) {
                                    $('#btn_dt_close').removeClass("focus");
                                    deliveryTimeFocus = 3;
                                    $('#btn_dt_ok').addClass("focus");
                                }
                            }

                            //##########################
                            // 쇼퍼 선택 화면
                            //##########################
                            // <쇼퍼 리스트>
                            else if(orderCartFocus == 10) {
                                if(shopperListFocus == 0) {
                                    // X
                                } 
                                else if(shopperListFocus == 1) {
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    shopperListFocus = 0;
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                                }
                                else if(shopperListFocus == 2) {
                                    // X
                                }
                                else if(shopperListFocus == 3) {
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    shopperListFocus = 2;
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                                }
                            }

                            // <쇼퍼 - 배송지 선택>
                            else if(orderCartFocus == 11) {
                                $('#order_cart_address').removeClass("focus");
                                orderCartFocus = 10;
                                shopperListFocus = 1;
                                $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                            }

                            // <쇼퍼 - 결제하기>
                            else if(orderCartFocus == 12) {
                                $('#order_cart_submit').removeClass("focus");
                                orderCartFocus = 10;
                                shopperListFocus = 3;
                                $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                            }

                            // <쇼퍼 - 장바구니로 돌아가기>
                            else if(orderCartFocus == 13) {
                                $('#order_cart_back').removeClass("focus");
                                orderCartFocus = 10;
                                shopperListFocus = 3;
                                $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                            }

                            //##########################
                            // 주문/결제
                            //##########################
                            // <계좌 안내>
                            else if(orderCartFocus == 21) {
                                // X
                            }
                            // <신용카드 등 미구현 메뉴>
                            else if(orderCartFocus == 22 || orderCartFocus == 23 || orderCartFocus == 24) {
                                // X
                            }
                            // <배송지 선택>
                            else if(orderCartFocus == 40) {
                                $('#order_cart_address').removeClass("focus");
                                orderCartFocus = 21;
                                $('li[name="payment_left_menu"]').eq(0).addClass("focus");
                            }
                            // <결제하기>
                            else if(orderCartFocus == 41) {
                                $('#order_cart_submit').removeClass("focus");
                                orderCartFocus = 21;
                                $('li[name="payment_left_menu"]').eq(0).addClass("focus");
                            }
                            // <장바구니로 돌아가기>
                            else if(orderCartFocus == 42) {
                                $('#order_cart_back').removeClass("focus");
                                orderCartFocus = 21;
                                $('li[name="payment_left_menu"]').eq(0).addClass("focus");
                            }

                            //##########################
                            // 주문완료
                            //##########################
                            // <주문내역조회>
                            else if(orderCartFocus == 61) {

                            }
                            // <메뉴 돌아가기>
                            else if(orderCartFocus == 62) {

                            }
                        }
                    }

                    // **************************************************
                    // * 우 KEY
                    // **************************************************
                    if(keyCode === global.VK_RIGHT) {
                        //##########################
                        // 수량 조절 팝업 ON 일때
                        //##########################
                        if(chgVolumeFocus > 0) {
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

                            // 키 입력을 중지시킨다.
                            return;
                        }

                        //##########################
                        // 장바구니 상품 목록
                        //##########################
                        // 장바구니에 상품이 존재할 때만 키 입력
                        if(orderCartProductYN) {
                            if(orderCartFocus == 1) {
                                
                                // 전체 체크 박스, 상품 리스트, 선택상품 찜하기일 때
                                if((orderCartListFocus >= -1 && orderCartListFocus <= 2) || orderCartListFocus == 4) {

                                    // 전체 체크 박스
                                    if(orderCartListFocus == -1) {
                                        $('#li_cart_all_chkbox > img').removeClass("focus"); // 전체 체크박스 포커스 제거
                                        orderCartFocus = 6;
                                        $('#order_cart_submit').addClass("focus");
                                    }
                                    // 선택상품 찜하기
                                    else if(orderCartListFocus == 4) {
                                        $('#order_cart_favorite').removeClass("focus");     // 선택상품 찜하기 포커스 제거
                                        orderCartFocus = 6;
                                        $('#order_cart_submit').addClass("focus");
                                    }
                                    // 상품 리스트
                                    else if(orderCartListFocus >= 0 && orderCartListFocus <= 2) {
                                        // 상품 리스트 일 때
                                        if(orderCartCheckYN == false) {
                                            $('li[name="li_cart_list"]').removeClass("focus"); // 상품 리스트 포커스 제거
                                            orderCartFocus = 6;
                                            $('#order_cart_submit').addClass("focus");
                                            console.log("RIGHT : 상품 리스트에서 주문으로"); 
                                        }
                                        // 체크 박스 일 때
                                        else if(orderCartCheckYN == true) {
                                            $('td[name="td_cart_chkbox"] > img').eq(orderCartListFocus).removeClass("focus");
                                            orderCartCheckYN = false;
                                            $('li[name="li_cart_list"]').eq(orderCartListFocus).addClass("focus");
                                            $('.ctc_chebox').eq(orderCartListFocus).css("background", "#F4F4F4");
                                            console.log("RIGHT : 체크박스에서 상품 리스트로");
                                        }
                                    }
                                }

                                // 선택상품 삭제일 때 
                                else if(orderCartListFocus == 3) {
                                    // 전체 삭제로 이동
                                    $('#order_cart_delete').removeClass("focus");     // 선택상품 삭제 포커스 제거
                                    orderCartListFocus = 4;
                                    $('#order_cart_favorite').addClass("focus");
                                }
                            }

                            //######################
                            // 선택 상품 삭제 확인 팝업
                            //######################
                            // <장바구니 선택 삭제 확인 팝업>
                            else if(orderCartFocus == 7) {
                                if(orderCartDeleteFocus == 0) {
                                    $('#btn_delete_yn_submit').removeClass("focus");
                                    orderCartDeleteFocus = 1;
                                    $('#btn_delete_yn_cancel').addClass("focus");
                                }
                            }

                            // <배송지 선택 팝업>
                            else if(orderCartFocus == 8) {
                                // 셀렉트박스
                                if(addrPopFocus == 0) {
                                    if(addrListFocus != Number(arrAddrList.length)-1) addrListFocus = Number(addrListFocus) + 1;
                                    else if(addrListFocus == Number(arrAddrList.length)-1) addrListFocus = 0;
                                        
                                    if(arrAddrList[addrListFocus]["main"] == 1) {
                                        $('#addr_list_span').empty().html("(기본)" + arrAddrList[addrListFocus]["address1"]  + " " + arrAddrList[addrListFocus]["address2"]);    
                                    } else {
                                        $('#addr_list_span').empty().html(arrAddrList[addrListFocus]["address1"]  + " " + arrAddrList[addrListFocus]["address2"]);
                                    }                                        
                                }
                                // 확인 버튼
                                if(addrPopFocus == 1) {
                                    $('#btn_addr_submit').removeClass("focus");
                                    addrPopFocus = 2;
                                    $('#btn_addr_cancel').addClass("focus");
                                }
                            }

                            // <배송시간 선택 팝업>
                            else if(orderCartFocus == 9) {
                                // 빠른배송 1시간 이내
                                if(deliveryTimeFocus == 0) {
                                    $('#dt_1hour').removeClass("focus");
                                    deliveryTimeFocus = 2;
                                    $('#dt_hour').addClass("focus");
                                }

                                // 빠른배송 2시간 이내
                                else if(deliveryTimeFocus == 1) {
                                    $('#dt_2hour').removeClass("focus");
                                    deliveryTimeFocus = 2;
                                    $('#dt_hour').addClass("focus");   
                                }

                                // 배송시간 지정
                                else if(deliveryTimeFocus == 2) {
                                    // X
                                }

                                // 완료 버튼
                                else if(deliveryTimeFocus == 3) {
                                    $('#btn_dt_ok').removeClass("focus");
                                    deliveryTimeFocus = 4;
                                    $('#btn_dt_close').addClass("focus");
                                }

                                // 취소 버튼
                                else if(deliveryTimeFocus == 4) {
                                    // X
                                }
                            }
                    
                            //##########################
                            // 쇼퍼 선택 화면
                            //##########################
                            // <쇼퍼 리스트>
                            else if(orderCartFocus == 10) {
                                if(shopperListFocus == 0) {
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    shopperListFocus = 1;
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                                } 
                                else if(shopperListFocus == 1) {
                                    // 결제하기로 이동
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    orderCartFocus = 12;
                                    $('#order_cart_submit').addClass("focus");
                                }
                                else if(shopperListFocus == 2) {
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    shopperListFocus = 3;
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).addClass("focus");
                                }
                                else if(shopperListFocus == 3) {
                                    // 결제하기로 이동
                                    $('li[name="li_shopper_list"]').eq(shopperListFocus).removeClass("focus");
                                    orderCartFocus = 12;
                                    $('#order_cart_submit').addClass("focus");
                                }
                            }

                            // <쇼퍼 - 배송지 선택>
                            else if(orderCartFocus == 11) {
                                // X
                            }

                            // <쇼퍼 - 결제하기>
                            else if(orderCartFocus == 12) {
                                // X
                            }

                            // <쇼퍼 - 장바구니로 돌아가기>
                            else if(orderCartFocus == 13) {
                                // X
                            }

                            //##########################
                            // 주문/결제
                            //##########################
                            // <계좌 안내>
                            else if(orderCartFocus == 21) {
                                $('li[name="payment_left_menu"]').eq(0).removeClass("focus");
                                orderCartFocus = 41;
                                $('#order_cart_submit').addClass("focus");
                            }
                            // <신용카드 등 미구현 메뉴>
                            else if(orderCartFocus == 22 || orderCartFocus == 23 || orderCartFocus == 24) {
                                $('li[name="payment_left_menu"]').removeClass("focus");
                                orderCartFocus = 41;
                                $('#order_cart_submit').addClass("focus");
                            }
                            // <결제하기>
                            else if(orderCartFocus == 41) {
                                // X
                            }
                            // <장바구니로 돌아가기>
                            else if(orderCartFocus == 42) {
                                // X
                            }

                            //##########################
                            // 주문완료
                            //##########################
                            // <주문내역조회>
                            else if(orderCartFocus == 61) {

                            }
                            // <메뉴 돌아가기>
                            else if(orderCartFocus == 62) {

                            }
                        }
                    }
                    
                } else if (keyCode === global.VK_BACK) {
                    console.log("##### 화면 : " + REQUEST_SCREEN);
                    //*****
                    //** 주문/결제로 넘어왔던 이전 화면으로 돌아감
                    //*****
                    // 상품정보
                    if(REQUEST_SCREEN == 'product1.html') {
                        location.href = REQUEST_SCREEN + '?productView=' + requestProductView
                                      + '&currentFocusList=' + requestCurrentFocusList
                                      + '&currentFocusMenu=' + requestCurrentFocusMenu
                                      + '&currentFocusMenul=' + requestCurrentFocusMenul
                                      + '&categoryCode=' + requestCategoryCode
                                      + '&categoryDtlCode=' + requestCategoryDtlCode
                                      + '&categoryDtlPage=' + requestCategoryDtlPage
                                      + '&id=' + requestCategoryDtlId
                                      + '&requestExhbFocus=' + requestExhbFocus
                                      + '&requestExhbPage=' + requestExhbPage
                                      + '&SHOPPER_STATUS=' + SHOPPER_STATUS;
                    }
                    // 상세 카테고리
                    else if(REQUEST_SCREEN == 'category_dtl.html') {
                        location.href = REQUEST_SCREEN + '?categoryCode=' + requestCategoryCode
                                      + '&categoryDtlCode=' + requestCategoryDtlCode
                                      + '&categoryDtlPage=' + requestCategoryDtlPage
                                      + '&SHOPPER_STATUS=' + SHOPPER_STATUS;
                    }
                    // 값이 없으면 기획전으로..
                    else if(REQUEST_SCREEN == '') {
                        location.href = 'exhb.html';
                    } else {
                        location.href = REQUEST_SCREEN;
                    }


                } else if (keyCode === global.VK_ESCAPE) {
                    //window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
                } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                    
                // 숫자 키 입력
                } else if (keyCode >= 48 && keyCode <= 59) {
                    // <배송시간 선택 팝업>
                    if(orderCartFocus == 9) {
                        // 배송시간 지정
                        if(deliveryTimeFocus == 2) {
                            var num = keyCode - 48; // 입력받은 숫자 0~9
                            var current_num = $('#dt_hour').html(); // 현재 지정된 배송시간

                            // 1자리보다 같거나 작을때만 입력 받음
                            if(current_num.length <= 1) $('#dt_hour').html(current_num + "" + num);
                        }
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