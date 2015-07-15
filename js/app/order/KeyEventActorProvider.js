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
var orderCartResultSet;                          // 장바구니 조회 resultSet
var orderCartResultScreenSet    = new Array();   // 장바구니 조회 현재 페이지 resultSet
var orderCartResultCheckStatus  = new Array();   // 장바구니 조회 전체 페이지 checkbox 저장값, false, true로 구분, true : 체크
var orderCartAllCheck           = false;         // 장바구니 전체 체크박스 상태, true : 체크
var orderCartResultLen          = 0;             // 현재 페이지의 상품 갯수

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

            console.log("~~~~~~~~~~ result['cart'] : " + result['cart']);

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
                // 장바구니 재조회
                selectCartList();
                // 삭제 확인 팝업 숨김
                $('#wrap_delete_product').hide();

                // 포커스 초기화

            }
        });
    }

    
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

        // 1. 플로팅 메뉴 장바구니 SET
        // fltEasyCart();

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
                    //##########################
                    // 장바구니 상품 목록
                    //##########################

                    console.log("눌린 키 : " + keyCode);
                    console.log("orderCartFocus : " + orderCartFocus);

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

                                }
                            }

                            // 선택상품 삭제하기
                            else if(orderCartListFocus == 3) {
                                // 장바구니 선택 삭제 확인 팝업
                                orderCartFocus = 7;
                                confirmDeleteCart();
                            }

                            // 선택상품 찜하기
                            else if(orderCartListFocus == 4) {

                            }
                        }

                        // <배송지 선택>
                        else if(orderCartFocus == 5) {
                            console.log("~~~~~~~~~~~~~");
                            $('#wrap_addr').show();
                        }

                        // <결제하기>
                        else if(orderCartFocus == 6) {
                            $('#orderScreen0').hide();
                            orderScreen = 1;
                            $('#orderScreen1').show();
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

                                // 장바구니 재조회
                                selectCartList();
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

                            //##########################
                            // 주문하기
                            //##########################
                            if(orderCartFocus == 6) {
                                $('#order_cart_submit').removeClass("focus");
                                orderCartFocus = 5;
                                $('#order_cart_address').addClass("focus");
                            }
                        }
                    }

                    // **************************************************
                    // * 아래 KEY
                    // **************************************************
                    if(keyCode === global.VK_DOWN) {
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
                            if(orderCartFocus == 5) {
                                $('#order_cart_address').removeClass("focus");
                                orderCartFocus = 6;
                                $('#order_cart_submit').addClass("focus");
                            }
                        }
                       
                    }

                    // **************************************************
                    // * 좌 KEY
                    // **************************************************
                    if(keyCode === global.VK_LEFT) {
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
                        }
                    }

                    // **************************************************
                    // * 우 KEY
                    // **************************************************
                    if(keyCode === global.VK_RIGHT) {
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
                    // 그 외 화면
                    else {
                        location.href = REQUEST_SCREEN;
                    }


                } else if (keyCode === global.VK_ESCAPE) {
                    //window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
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