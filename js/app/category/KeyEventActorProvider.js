'use strict';

var videoPlayer;
var appConfiguration = window.oipfObjectFactory.createConfigurationObject();
var voiceDataManager = window.oipfObjectFactory.createVoiceDataManagerObject();

// 숫자 -> 금액
function cn_toPrice(n) {
    if(isNaN(n)){return 0;}
    var reg = /(^[+-]?\d+)(\d{3})/;   
    n += '';
    while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

// 상세 카테고리 페이징 화살표 컨트롤
function pageArrowUtil1() {
    if(prevPageYN == false) $('#arrow_top').hide();
    else                    $('#arrow_top').show();

    if(nextPageYN == false) $('#arrow_bottom').hide();
    else                    $('#arrow_bottom').show();
}

// 검색결과 목록 페이징 화살표 컨트롤
function keywordPageArrowUtil() {
    if(keywordPrevPageYN == false) $('#keyword_prev_arrow').removeClass("focus");
    else                             $('#keyword_prev_arrow').addClass("focus");

    if(keywordNextPageYN == false) $('#keyword_next_arrow').removeClass("focus");
    else                             $('#keyword_next_arrow').addClass("focus");
}


// 쇼퍼 실시간 영상재생
var rtspPlayer;
function rtspPlay() {
    var url = "rtsp://175.209.53.209:1554/11023.sdp";

    // khy 2015-07-06
    appConfiguration.localSystem.mute = false; // 음소거 해제
    
    rtspPlayer = document.querySelector('object');
    $('#rtsp_area').empty();
    rtspPlayer.width = 970;
    rtspPlayer.height = 545;
    document.getElementById('rtsp_area').appendChild(rtspPlayer);
    rtspPlayer.data = url;
    rtspPlayer.play(1);
    setTimeout(rtspPlayer.play(1), 500);
}

function rtspStop() {
    //rtspPlayer.stop();

    // khy 2015-06-29
    appConfiguration.localSystem.mute = true; // 음소거 설정
    //$('#rtsp_area video').remove();
    //$('#rtsp_area object').remove();
    rtspPlayer = document.querySelector('object');
    //rtspPlayer.stop();
}

/**
 *  Category Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.category.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        //현재포커스된 위치의 상품갯수
        //var userID  = request.getParameter("userID");
        console.log("userID : " + userID);

        // 플로팅 메뉴 장바구니 SET
        
        appConfiguration.localSystem.mute = false; // 음소거 설정
        
        // 공통 실행
        common_init();

        // 상태 관련 버튼 변경
        if(SHOPPER_STATUS == '2') {
            $('#shlr_on').removeClass("shlr_off");
            $('#shlr_on').addClass("shlr_on");    
        } else if(SHOPPER_STATUS == '3') {
            $('#shlr_on').removeClass("shlr_on");
            $('#shlr_on').addClass("shlr_off");    
        }
        fltEasyCart();

        // 카테고리 목록 조회
        this.selectCategoryList();
        
        // 영상 재생
        this.videoPlay("test", currentFocusMenu);
        
        //쇼퍼 list
        this.selectShopperList();
        //마트는지금
        this.selectTweetList();

        // 전체, 상세카테고리 포커스
        if(requestCategoryCode != null && requestCategoryCode != '' && requestCategoryCode != 'undefined') {
            if(requestCategoryDtlCode != null && requestCategoryDtlCode != '' && requestCategoryDtlCode != 'undefined') {

                $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                currentFocusList    = 1;
                currentFocusMenu    = Number(requestCategoryCode);
                $('li[name="category_menu"]').eq(currentFocusMenu).addClass("sel");
                currentFocusDtlPage = Number(requestCategoryDtlPage);

                // 메뉴 갱신
                this.menuRefresh("FOCUS");
            } else {
                // 메뉴 갱신
                this.menuRefresh("NORMAL");
            }
        } else {
            // 메뉴 갱신
            this.menuRefresh("NORMAL");
        }
        
        // 당일 판매현장 시각
        // $('#cv_title').html("당일 판매현장 " + this.getCurrentDate());

        // 키워드 검색 결과에 따라 처리 할 내용
        console.log("~~~~~~~~~~~~~~~~ requestKeywordYN : " + requestKeywordYN);
        console.log("~~~~~~~~~~~~~~~~ requestKeyword : " + requestKeyword);
        console.log("~~~~~~~~~~~~~~~~ requestKeywordPage : " + requestKeywordPage);
        console.log("~~~~~~~~~~~~~~~~ requestKeywordFocus : " + requestKeywordFocus);

        if(requestKeywordYN == 'Y') {
            // 검색결과 팝업 띄움

            $('#input_keyword').val(requestKeyword);

            Gigamart.app.category.KeyEventActorProvider.selectKeywordList("MODE2");

            keywordFocus = 9;

            // 백그라운드 Focus 처리
            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass('focus');
            currentFocusList = 0;
            currentFocusMenu = 1;
            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");

            // 동영상 제거
            this.videoStop();
            $('#sub_content').hide();

        }
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
                        location.href = EXHB_PATH + 'order.html?SHOPPER_STATUS=' + SHOPPER_STATUS + '&requestOrderScreen=category.html'+ '&userID='+ userID + '&userName=' + userName;
                    }
                    
                    // 결제
                    if(cartFocus == 1) {
                        console.log("장바구니 담긴 개수 : " + $('#ec_list > li[name="ec_li_list"]').size());

                        if($('#ec_list > li[name="ec_li_list"]').size() > 0) {
                            $('#p_videoDiv video').remove();
                            $('#span_videoDiv video').remove();
                            appConfiguration.localSystem.mute = true; // 음소거 설정
                            location.href = EXHB_PATH + 'order.html?SHOPPER_STATUS=' + SHOPPER_STATUS + '&requestOrderScreen=category.html'+ '&userID='+ userID + '&userName=' + userName + '&startScreen=2';   
                        } else {
                            console.log("#상품이 존재하지 않아 결제 화면으로 이동하지 않음");
                        }
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
            } 
            //else if (keyCode === global.VK_ESCAPE) {
                
            //} 
            else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
            
            }
        }

        // *****************************************************************************
        // * 팝업 없을 때
        // *****************************************************************************
        else if(isCart == false) {
            // **************************************************
            // * 음성검색 KEY (음성검색)
            // **************************************************
            if(keyCode === global.VK_WINK) {
                console.log("음성검색 키 입력");
            }

            // **************************************************
            // * 三 KEY (간편 장바구니)
            // **************************************************
            if(keyCode === global.VK_GREEN) {

                if(isKeyword == 0 && keywordFocus == 0) {
                    isCart      = true;
                    cartFocus   = 1;    // 결제 버튼 Focus

                    retrieveEasyCart(); // 간편 장바구니 조회

                    $('#popup_cart').show();
                    $('#ecc_payments').addClass('focus'); // 첫 포커스는 ecc_payments
                }
            }

            // **************************************************
            // * ▶ KEY (장바구니 담기)
            // **************************************************
            if(keyCode === global.VK_BLUE) {
                // 검색결과 상품목록 일때
                if(keywordFocus == 9) {
                    var idx = Number(keywordListFocus) + (8 * Number(keywordListPage));

                    // 장바구니 담기
                    appendEasyCart(1, keywordListArray[idx]['product_id']);
                    $('#cart_message').html("장바구니에 " + keywordListArray[idx]['name'] + " 상품이 1개 담겼습니다.");
                    $('#wrap_cart').show();
                    // 플로팅 메뉴 장바구니 SET
                    fltEasyCart();
                    //$('#wrap_cart').show();
                    setTimeout("fn_popEasyCart()", 1000);
                }
            }

            // **************************************************
            // * PLAY KEY (메뉴/카테고리)
            // **************************************************
            if(keyCode === global.VK_PLAY) {
                /** 전체 카테고리로 이동 */
                //location.href = "category.html";
            }

            // **************************************************
            // * ◀ KEY (플로팅 Go home)
            // **************************************************
            if(keyCode === global.VK_RED) {
                $('#videoDiv video').remove();
                location.href ="exhb.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName; // 기획전 이동
            }

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                // 검색 팝업 일때
                if(isKeyword != 0) {
                    // 입력창 
                    if(isKeyword == 1) {
                        // 가상 키보드 떠야 함
                    } 
                    // 검색버튼
                    else if(isKeyword == 2) {
                        // 검색결과 팝업 띄움
                        Gigamart.app.category.KeyEventActorProvider.selectKeywordList("MODE1");

                        $('#btn_sort1').addClass("focus");
                        keywordFocus = 1;
                        $('#wrap_keyword_search').hide();
                        isKeyword = 0;
                    }
                    // 닫기버튼
                    else if(isKeyword == 3) {
                        $('#wrap_keyword_search').hide();
                        $('#btn_keyword_close').removeClass("focus");
                        isKeyword = 0;
                    }
                }

                // 검색 결과 팝업 일때
                else if(keywordFocus != 0) {
                    // 할인율순
                    if(keywordFocus == 1) {
                        $('#common_msg').empty().html("서비스 준비 중 입니다.");
                        $('#wrap_common').show();

                        setTimeout("$('#wrap_common').hide()", 1500);
                        setTimeout("$('#common_msg').empty()", 1500);
                    }
                    // 가격낮은순
                    else if(keywordFocus == 2) {
                        $('#common_msg').empty().html("서비스 준비 중 입니다.");
                        $('#wrap_common').show();

                        setTimeout("$('#wrap_common').hide()", 1500);
                        setTimeout("$('#common_msg').empty()", 1500);
                    }
                    // 가격높은순
                    else if(keywordFocus == 3) {
                        $('#common_msg').empty().html("서비스 준비 중 입니다.");
                        $('#wrap_common').show();

                        setTimeout("$('#wrap_common').hide()", 1500);
                        setTimeout("$('#common_msg').empty()", 1500);
                    }
                    // 인기순
                    else if(keywordFocus == 4) {
                        $('#common_msg').empty().html("서비스 준비 중 입니다.");
                        $('#wrap_common').show();

                        setTimeout("$('#wrap_common').hide()", 1500);
                        setTimeout("$('#common_msg').empty()", 1500);
                    }
                    // 기획전 상품만 보기
                    else if(keywordFocus == 5) {
                        $('#common_msg').empty().html("서비스 준비 중 입니다.");
                        $('#wrap_common').show();

                        setTimeout("$('#wrap_common').hide()", 1500);
                        setTimeout("$('#common_msg').empty()", 1500);
                    }
                    // 상품 리스트
                    else if(keywordFocus == 9) {
                        var idx = Number(keywordListFocus) + (8 * Number(keywordListPage));

                        var url = "?requestKeyword=" + $('#input_keyword').val()        // 검색 결과 키워드
                                + "&requestKeywordFocus=" + keywordListFocus            // 검색 결과 포커스
                                + "&requestKeywordPage=" + keywordListPage              // 검색 결과 페이지
                                + "&categoryDtlCode=" + keywordListArray[idx]["subcategory"] // 상품 서브카테고리
                                + "&id=" + keywordListArray[idx]["product_id"]          // 상품 아이디
                                + "&requestKeywordYN=Y";

                        location.href = 'product1.html' + url 
                                      + '&SHOPPER_STATUS=' + SHOPPER_STATUS 
                                      + '&userID=' + userID 
                                      + '&userName=' + userName;
                    }
                }

                // 전체 카테고리 일때
                else if(currentFocusList == 0) {
                    // My Page
                    if(currentFocusMenu == 0){
                        location.href ="mypage.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName; // 마이페이지 이동
                    }
                    
                    // 음성 검색
                    else if(currentFocusMenu == 1) {
                        /*$('#common_msg').empty().html("서비스 준비 중 입니다.");
                        $('#wrap_common').show();

                        setTimeout("$('#wrap_common').hide()", 1500);
                        setTimeout("$('#common_msg').empty()", 1500);*/

                        // 검색 팝업 띄움
                        $('#wrap_keyword_search').show();
                        $('#input_keyword').addClass("focus");
                        isKeyword = 1;
                    }

                    // 쇼퍼 주문 이력
                    else if(currentFocusMenu == 2) {

                        /*this.selectShopperHistory(); // 쇼퍼 주문 이력 조회

                        $('#sub_content').hide();
                        $('#shopper_bag').hide();
                        $('#shopper_history').show();*/

                        this.selectShopperHistory(); // 쇼퍼 주문 이력 조회
                        $('#shopper_bag').hide();
                        $('#shopper_history').show();
                        $('#shlr_on').addClass("focus");
                        currentFocusList = 3;
                        histFocus = 2;
                        $('li[name="category_menu"]').eq(currentFocusMenu).removeClass('focus');
                        $('li[name="category_menu"]').eq(currentFocusMenu).addClass("sel");
                    }

                    // 쇼퍼's bag
                    if(currentFocusMenu == 3) {
                        console.log("123123");
                        $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                        $('li[name="category_menu"]').eq(currentFocusMenu).addClass("sel");
                        currentFocusList = 2; // 쇼퍼's Bag
                        $('#sb_menu').removeClass("sb_menu").addClass("sb_menu_sel");
                    }

                    // 과일에서 가공식품 사이일 때
                    if(currentFocusMenu >= 4 && currentFocusMenu <= 11) {
                        $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                        currentFocusList = 1; // 상세 카테고리로 이동함
                        currentFocusDtl = 0; // 상세 카테고리의 첫번째로
                        $('li[name="appendMenu"]').eq(currentFocusDtl).addClass("focus");
                    }
                }

                // 상세 카테고리 일때
                else if(currentFocusList == 1) {

                    $('#sub_mpeg_player').remove(); // 영상 재생 중지
                    /*if(videoPlayer.playstate != 'undefined') {
                        if(videoPlayer.playstate != 0 ) videoPlayer.stop(); // 영상 재생 중지
                    }*/
                    /*videobroadcast.style.visibility = hidden;*/

                    // 상세 카테고리로 이동
                    $('#videoDiv video').remove();
                    location.href ="category_dtl.html?categoryCode="  + $('span[name="span_category_menu"]').eq(currentFocusMenu-3).html()
                                                 + "&categoryDtlCode=" + $('li[name="appendMenu"]').eq(currentFocusDtl).html()
                                                 + "&categoryDtlPage=" + currentFocusDtlPage + "&SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName;
                }

                // 쇼퍼's Bag 일때
                else if(currentFocusList == 2) {
                    // 쇼퍼's Bag으로 이동
                    $('#videoDiv video').remove();
                    location.href = "shopper_bag.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName;
                }

                // 쇼퍼 주문이력 일때
                else if(currentFocusList == 3) {
                    // 쇼퍼 리얼 타임
                    if(histFocus == 2) {
                        // 쇼퍼가 구매중일 때
                        if(SHOPPER_STATUS == 2) {
                            currentFocusList = 4; // 쇼퍼 리얼 타임 팝업
                            $('#shopper_real_time').show();
                            this.selectShopperList();
                            rtspPlay();
                        }

                        // 쇼퍼가 구매중이 아닐 때
                        else if(SHOPPER_STATUS == 3) {
                            console.log("~~~");
                            $('#common_shopper_message').html("현재 리얼타임 방송이 없습니다.");
                            viewShopperMsg();
                        }
                    }

                    // 닫기
                    else if(histFocus == 3) {
                        $('#shlr_on').addClass("focus");
                        $('#shlr_close').removeClass("focus");
                        currentFocusList = 0; // 전체카테고리
                        histFocus = 2;
                        $('#shopper_history').hide();
                        $('#shopper_bag').show();
                        $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("sel");
                        $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");
                    }
                }

                // 쇼퍼 리얼 타임 일때
                else if(currentFocusList == 4) {
                    currentFocusList = 3; // 쇼퍼 주문이력
                    rtspStop();
                    $('#shopper_real_time').hide();
                }
            } 

            // **************************************************
            // * 좌 우 위 아래 KEY
            // **************************************************
            else if (keyCode >= global.VK_LEFT && keyCode <= global.VK_DOWN) {

                //$('#cv_title').html("당일 판매현장 " + this.getCurrentDate());

                // **************************************************
                // * 위 KEY
                // **************************************************
                if(keyCode === global.VK_UP) {
                    // 검색 팝업 일때
                    if(isKeyword != 0) {
                        // 입력창 
                        if(isKeyword == 1) {
                            // X
                        } 
                        // 검색버튼
                        else if(isKeyword == 2) {
                            // X
                        }
                        // 닫기버튼
                        else if(isKeyword == 3) {
                            $('#btn_keyword_close').removeClass("focus");
                            isKeyword = 2;
                            $('#btn_keyword_search').addClass("focus");
                        }
                    }

                    // 검색 결과 팝업 일때
                    else if(keywordFocus != 0) {
                        // 할인율순
                        if(keywordFocus == 1) {
                            // X
                        }
                        // 가격낮은순
                        else if(keywordFocus == 2) {
                            $('#btn_sort2').removeClass("focus");
                            $('#btn_sort1').addClass("focus");
                            keywordFocus = 1;
                        }
                        // 가격높은순
                        else if(keywordFocus == 3) {
                            $('#btn_sort3').removeClass("focus");
                            $('#btn_sort2').addClass("focus");
                            keywordFocus = 2;
                        }
                        // 인기순
                        else if(keywordFocus == 4) {
                            $('#btn_sort4').removeClass("focus");
                            $('#btn_sort3').addClass("focus");
                            keywordFocus = 3;
                        }
                        // 기획전 상품만 보기
                        else if(keywordFocus == 5) {
                            $('#btn_keyword_checkbox').removeClass("focus");
                            $('#btn_sort4').addClass("focus");
                            keywordFocus = 4;
                        }
                        // 상품 리스트
                        else if(keywordFocus == 9) {
                            // 윗줄
                            if(keywordListFocus >= 0 && keywordListFocus <= 3) {
                                // 이전 페이지가 있으면
                                if(keywordPrevPageYN == true) {
                                    this.makeKeywordList(Number(keywordListPage) - 1); // 페이지 이동
                                    
                                    keywordListFocus = Number(keywordListFocus) + 4;

                                    $('li[name="keyword_product_list"]').eq(keywordListFocus).addClass("focus");
                                    $('li[name="dlm_tit"]').eq(keywordListFocus).addClass("focus");
                                    $('span[name="okfill"]').eq(keywordListFocus).empty().append(btnokfill);
                                }
                            }

                            // 아랫줄
                            else if(keywordListFocus >= 4 && keywordListFocus <= 7) {
                                $('li[name="keyword_product_list"]').eq(keywordListFocus).removeClass("focus");
                                $('li[name="dlm_tit"]').eq(keywordListFocus).removeClass("focus");
                                $('span[name="okfill"]').eq(keywordListFocus).empty();

                                keywordListFocus = Number(keywordListFocus) - 4;

                                $('li[name="keyword_product_list"]').eq(keywordListFocus).addClass("focus");
                                $('li[name="dlm_tit"]').eq(keywordListFocus).addClass("focus");
                                $('span[name="okfill"]').eq(keywordListFocus).empty().append(btnokfill);
                                
                            }
                        }
                    }

                    // 전체 카테고리 일때
                    else if(currentFocusList == 0) {
                        // 쇼퍼주문이력이나 가공식품 사이일때
                        if(currentFocusMenu > 0 && currentFocusMenu <= 11) {
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                            currentFocusMenu = currentFocusMenu - 1; // 현재 메뉴 Focus 위치 감소
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");

                            // 쇼퍼 주문 이력
                            if(currentFocusMenu == 2) {
                                $('#sub_content').hide();
                                //$('#shopper_bag').hide();
                            }
                            // 쇼퍼's Bag
                            if(currentFocusMenu == 3) {
                                appConfiguration.localSystem.mute = true; // 음소거 설정
                                this.videoStop();
                                $('#sub_content').hide();
                                $('#shopper_history').hide();
                                $('#shopper_bag').show();
                            }

                            // 과일~가공식품
                            if(currentFocusMenu >= 4) {
                                this.menuRefresh("NORMAL");
                                appConfiguration.localSystem.mute = false; // 음소거 설정
                                this.videoPlay("test", currentFocusMenu);
                            }


                        }
                    }

                    // 상세 카테고리 일때
                    else if(currentFocusList == 1) {
                        // 이전 페이지가 존재 할 때
                        if(prevPageYN == true && currentFocusDtl == 0) {
                            currentFocusDtlPage = currentFocusDtlPage - 1; // 페이지 값 감소

                            this.menuRefresh("NORMAL"); // 메뉴 갱신

                            currentFocusDtl = $('li[name="appendMenu"]').size() - 1;
                            $('li[name="appendMenu"]').eq(currentFocusDtl).addClass("focus");
                        }

                        else if(currentFocusDtl > 0) {
                            $('li[name="appendMenu"]').eq(currentFocusDtl).removeClass("focus");
                            currentFocusDtl = currentFocusDtl - 1;  // 현재 상세 카테고리 Focus 위치 감소
                            $('li[name="appendMenu"]').eq(currentFocusDtl).addClass("focus");
                        } 
                    }

                    // 쇼퍼 주문 이력 일때
                    else if(currentFocusList == 3) {
                        // 쇼퍼 주문 이력 페이지 이동
                        if(histFocus == 1) {
                            // 현재 페이지가 첫 페이지 일 때
                            if(currentOrderedProductPage == 0) {
                                console.log("##### 첫 페이지임..");
                            }
                            // 첫페이지가 아닐 때
                            else {
                                this.pagingOrderedProduct(currentOrderedProductPage-1);
                            }
                        }

                        //  쇼퍼 리얼 타임 영상 연결
                        else if(histFocus == 3) {
                            $('#shlr_close').removeClass("focus");
                            histFocus = 2;
                            $('#shlr_on').addClass("focus");
                        }
                    }
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                    // 검색 팝업 일때
                    if(isKeyword != 0) {
                        // 입력창 
                        if(isKeyword == 1) {
                            $('#input_keyword').removeClass("focus");
                            isKeyword = 3;
                            $('#btn_keyword_close').addClass("focus");
                        } 
                        // 검색버튼
                        else if(isKeyword == 2) {
                            $('#btn_keyword_search').removeClass("focus");
                            isKeyword = 3;
                            $('#btn_keyword_close').addClass("focus");

                        }
                        // 닫기버튼
                        else if(isKeyword == 3) {
                            // X
                        }
                    }

                    // 검색 결과 팝업 일때
                    else if(keywordFocus != 0) {
                        // 할인율순
                        if(keywordFocus == 1) {
                            $('#btn_sort1').removeClass("focus");
                            $('#btn_sort2').addClass("focus");
                            keywordFocus = 2;
                        }
                        // 가격낮은순
                        else if(keywordFocus == 2) {
                            $('#btn_sort2').removeClass("focus");
                            $('#btn_sort3').addClass("focus");
                            keywordFocus = 3;
                        }
                        // 가격높은순
                        else if(keywordFocus == 3) {
                            $('#btn_sort3').removeClass("focus");
                            $('#btn_sort4').addClass("focus");
                            keywordFocus = 4;
                        }
                        // 인기순
                        else if(keywordFocus == 4) {
                            $('#btn_sort4').removeClass("focus");
                            $('#btn_keyword_checkbox').addClass("focus");
                            keywordFocus = 5;
                        }
                        // 기획전 상품만 보기
                        else if(keywordFocus == 5) {
                            // X
                        }
                        // 상품 리스트
                        else if(keywordFocus == 9) {
                            // 윗줄
                            if(keywordListFocus >= 0 && keywordListFocus <= 3) {
                                // 총 갯수에서 4룰 뺀 수가 포커스보다 작으면 아래로 이동 불가 
                                if(keywordListLen - 4 <= keywordListFocus) {
                                
                                } 
                                // 총 갯수에서 4를 빼도 현재 포커스보다 크면 이동 가능
                                else {
                                    $('li[name="keyword_product_list"]').eq(keywordListFocus).removeClass("focus");
                                    $('li[name="dlm_tit"]').eq(keywordListFocus).removeClass("focus");
                                    $('span[name="okfill"]').eq(keywordListFocus).empty();

                                    keywordListFocus = Number(keywordListFocus) + 4;

                                    $('li[name="keyword_product_list"]').eq(keywordListFocus).addClass("focus");
                                    $('li[name="dlm_tit"]').eq(keywordListFocus).addClass("focus");
                                    $('span[name="okfill"]').eq(keywordListFocus).empty().append(btnokfill);
                                }
                            }
                            

                            // 아랫줄
                            else if(keywordListFocus >= 4 && keywordListFocus <= 7) {
                                // 다음 페이지가 있으면
                                if(keywordNextPageYN == true) {
                                    this.makeKeywordList(Number(keywordListPage) + 1); // 페이지 이동

                                    keywordListFocus = Number(keywordListFocus) - 4;

                                    console.log("키워드 포커스 : " + keywordListFocus);
                                    console.log("키워드 현재 페이지 갯수 : " + keywordListLen);

                                    // 아래로 이동 했을 때 다음 페이지에 이동할 포커스가 없으면
                                    if(keywordListLen < Number(keywordListFocus)+1) {
                                        keywordListFocus = Number(keywordListLen)-1;
                                    }

                                    console.log("변경 후 키워드 포커스 : " + keywordListFocus);


                                    $('li[name="keyword_product_list"]').eq(keywordListFocus).addClass("focus");
                                    $('li[name="dlm_tit"]').eq(keywordListFocus).addClass("focus");
                                    $('span[name="okfill"]').eq(keywordListFocus).empty().append(btnokfill);
                                }
                                
                            }
                        }
                    }

                    // 전체 카테고리 일때
                    else if(currentFocusList == 0) {

                        // My Mart 일때
                        if(currentFocusMenu == 0) {
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                            currentFocusMenu = currentFocusMenu + 2
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");
                        }

                        // 음성 검색일때
                        if(currentFocusMenu == 1) {
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                            currentFocusMenu = currentFocusMenu + 1
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");
                        }

                        // 전체 카테고리 포커스 위치가 쇼퍼주문이력이나 가공식품 사이일 때
                        if(currentFocusMenu >= 2 && currentFocusMenu < 11) {
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                            currentFocusMenu = currentFocusMenu + 1; // 현재 카테고리 Focus 위치 증가
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");

                            // 쇼퍼 주문 이력
                            if(currentFocusMenu == 2) {
                                $('#sub_content').hide();
                                $('#shopper_bag').hide();
                            }

                            // 쇼퍼's Bag
                            if(currentFocusMenu == 3) {
                                $('#sub_content').hide();
                                $('#shopper_history').hide();
                                $('#shopper_bag').show();
                            }

                            // 과일~가공식품
                            if(currentFocusMenu >= 4) {
                                // 쇼퍼's Bag -> 과일
                                if(currentFocusMenu == 4) {
                                    $('#shopper_bag').hide();
                                    $('#shopper_history').hide();
                                    $('#sub_content').show();
                                } 
                                this.menuRefresh("NORMAL");
                                appConfiguration.localSystem.mute = false; // 음소거 설정
                                this.videoPlay("test", currentFocusMenu);    
                            }
                        }
                    }
                    // 상세 카테고리 일때
                    else if(currentFocusList == 1) {
                        if(nextPageYN == true && (currentFocusDtl == $('li[name="appendMenu"]').size() -1)) {
                            currentFocusDtlPage = currentFocusDtlPage + 1; // 페이지 값 증가
                            this.menuRefresh("NORMAL"); // 메뉴 갱신
                            currentFocusDtl = 0;
                            $('li[name="appendMenu"]').eq(currentFocusDtl).addClass("focus");
                        }

                        else if(currentFocusDtl < $('li[name="appendMenu"]').size() - 1) {
                            $('li[name="appendMenu"]').eq(currentFocusDtl).removeClass("focus");
                            currentFocusDtl = currentFocusDtl + 1;  // 현재 상세 카테고리 Focus 위치 증가
                            $('li[name="appendMenu"]').eq(currentFocusDtl).addClass("focus");
                        }
                    }

                    // 쇼퍼 주문 이력 일때
                    else if(currentFocusList == 3) {
                        // 구매 상품 리스트
                        if(histFocus == 1) {
                            // 현재 페이지가 마지막 페이지 일 때
                            if(currentOrderedProductPage == totalOrderedPage) {
                                console.log("##### 더 이상 이동할 페이지 없음..");
                            }
                            // 마지막 페이지 아닐 때
                            else {
                                this.pagingOrderedProduct(currentOrderedProductPage+1);
                            }
                        }

                        //  쇼퍼 리얼 타임 영상 연결
                        else if(histFocus == 2) {
                            $('#shlr_on').removeClass("focus");
                            histFocus = 3;
                            $('#shlr_close').addClass("focus");
                        }
                    }
                }
                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {
                    // 검색 팝업 일때
                    if(isKeyword != 0) {
                        // 입력창 
                        if(isKeyword == 1) {
                            // X
                        } 
                        // 검색버튼
                        else if(isKeyword == 2) {
                            $('#btn_keyword_search').removeClass("focus");
                            isKeyword = 1;
                            $('#input_keyword').addClass("focus");
                        }
                        // 닫기버튼
                        else if(isKeyword == 3) {
                            // X
                        }
                    }

                    // 검색 결과 팝업 일때
                    else if(keywordFocus != 0) {
                        // 할인율순
                        if(keywordFocus == 1) {
                            // X
                        }
                        // 가격낮은순
                        else if(keywordFocus == 2) {
                            // X
                        }
                        // 가격높은순
                        else if(keywordFocus == 3) {
                            // X
                        }
                        // 인기순
                        else if(keywordFocus == 4) {
                            // X
                        }
                        // 기획전 상품만 보기
                        else if(keywordFocus == 5) {
                            // X
                        }
                        // 상품 리스트
                        else if(keywordFocus == 9) {
                            // 맨 좌측 상품이 아닐 경우
                            console.log("실행 : " + keywordListFocus);
                            if((keywordListFocus >= 1 && keywordListFocus <= 3) || (keywordListFocus >= 5 && keywordListFocus <= 7)) {
                                $('li[name="keyword_product_list"]').eq(keywordListFocus).removeClass("focus");
                                $('li[name="dlm_tit"]').eq(keywordListFocus).removeClass("focus");
                                $('span[name="okfill"]').eq(keywordListFocus).empty();

                                keywordListFocus = Number(keywordListFocus) - 1;

                                $('li[name="keyword_product_list"]').eq(keywordListFocus).addClass("focus");
                                $('li[name="dlm_tit"]').eq(keywordListFocus).addClass("focus");
                                $('span[name="okfill"]').eq(keywordListFocus).empty().append(btnokfill);
                            }

                            // 맨 좌측 상품일 경우
                            else if(keywordListFocus == 0 || keywordListFocus == 4) {
                                console.log("이번엔 이거");
                                $('li[name="keyword_product_list"]').eq(keywordListFocus).removeClass("focus");
                                $('li[name="dlm_tit"]').eq(keywordListFocus).removeClass("focus");
                                $('span[name="okfill"]').eq(keywordListFocus).empty();

                                keywordFocus = 1;
                                $('#btn_sort1').addClass("focus"); // 할인율순 버튼으로 이동
                            }
                        }
                    }

                    // 전체 카테고리 일때
                    else if(currentFocusList == 0) {
                        // MyMart나 쇼퍼 주문이력 사이일 때
                        if(currentFocusMenu > 0 && currentFocusMenu <= 2) {
                            if(currentFocusMenu == 2) {
                                $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("sel");    
                            }

                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                            currentFocusMenu = currentFocusMenu - 1; // 현재 카테고리 Focus 위치 감소
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");

                            // 쇼퍼 주문 이력 감춤
                            histFocus = 0;
                            $('#shopper_history').hide();
                        }
                    }
                    // 상세 카테고리 일때
                    else if(currentFocusList == 1) {
                        $('li[name="appendMenu"]').eq(currentFocusDtl).removeClass("focus");
                        currentFocusList = 0; // 전체 카테고리로 이동함
                        currentFocusDtlPage = 0; // 페이지 값 초기화
                        $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("sel");
                        $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");
                    }
                    // 쇼퍼's Bag 일때
                    else if(currentFocusList == 2) {
                        $('#sb_menu').removeClass("sb_menu_sel").addClass("sb_menu");
                        currentFocusList = 0; // 전체 카테고리로 이동함
                        $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("sel");
                        $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");
                    }

                    // 쇼퍼 주문 이력 일때
                    else if(currentFocusList == 3) {
                        // 구매 상품 리스트 일때
                        if(histFocus == 1) {
                            $('#th_product_list').removeClass("focus");
                            currentFocusList = 0;
                            histFocus = 0;
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("sel");
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");
                        }
                        // 쇼퍼 리얼 타임 영상 연결 일때
                        else if(histFocus == 2) {
                            $('#shlr_on').removeClass("focus");
                            histFocus = 1;
                            $('#th_product_list').addClass("focus");
                        }
                    }
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    // 검색 팝업 일때
                    if(isKeyword != 0) {
                        // 입력창 
                        if(isKeyword == 1) {
                            $('#input_keyword').removeClass("focus");
                            isKeyword = 2;
                            $('#btn_keyword_search').addClass("focus");
                        } 
                        // 검색버튼
                        else if(isKeyword == 2) {
                            // X
                        }
                        // 닫기버튼
                        else if(isKeyword == 3) {
                            // X
                        }
                    }

                    // 검색 결과 팝업 일때
                    else if(keywordFocus != 0) {
                        // 할인율순, 가격낮은순, 가격높은순, 인기순, 기획전 상품만 보기
                        if(keywordFocus == 1 || keywordFocus == 2 || keywordFocus == 3 || keywordFocus == 4 || keywordFocus == 5) {
                            $('#btn_sort1').removeClass("focus");
                            $('#btn_sort2').removeClass("focus");
                            $('#btn_sort3').removeClass("focus");
                            $('#btn_sort4').removeClass("focus");
                            $('#btn_keyword_checkbox').removeClass("focus");

                            keywordFocus = 9;
                            $('li[name="keyword_product_list"]').eq(keywordListFocus).addClass("focus");
                            $('li[name="dlm_tit"]').eq(keywordListFocus).addClass("focus");
                            $('span[name="okfill"]').eq(keywordListFocus).empty().append(btnokfill);

                        }
                        // 상품 리스트
                        else if(keywordFocus == 9) {
                            // 맨 오른쪽이 아닐 때
                            if((keywordListFocus >= 0 && keywordListFocus <= 2) || (keywordListFocus >= 4 && keywordListFocus <= 6)) {

                                // 우측에 상품이 있을때
                                if(keywordListLen > Number(keywordListFocus)+1) {
                                    $('li[name="keyword_product_list"]').eq(keywordListFocus).removeClass("focus");
                                    $('li[name="dlm_tit"]').eq(keywordListFocus).removeClass("focus");
                                    $('span[name="okfill"]').eq(keywordListFocus).empty();

                                    keywordListFocus = Number(keywordListFocus) + 1;

                                    $('li[name="keyword_product_list"]').eq(keywordListFocus).addClass("focus");
                                    $('li[name="dlm_tit"]').eq(keywordListFocus).addClass("focus");
                                    $('span[name="okfill"]').eq(keywordListFocus).empty().append(btnokfill);
                                // 우측에 상품이 없을때
                                } else if(keywordListLen <= Number(keywordListFocus)+1) {

                                }
                            }
                        }
                    }

                    // 전체 카테고리 일때
                    else if(currentFocusList == 0) {
                        // MyMart나 음성검색일 때
                        if(currentFocusMenu == 0 || currentFocusMenu == 1) {
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                            currentFocusMenu = currentFocusMenu + 1; // 현재 메뉴 Focus 위치 증가
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("focus");

                            // 쇼퍼 주문 이력
                            if(currentFocusMenu == 1) {
                                $('#sub_content').hide();
                                $('#shopper_bag').hide();
                                //$('#shopper_history').show();
                            }
                        }

                        // 쇼퍼 주문 이력 일때
                        else if(currentFocusMenu == 2) {
                            this.selectShopperHistory(); // 쇼퍼 주문 이력 조회

                            $('#shopper_history').show();
                            $('#shopper_bag').hide();
                            $('#shlr_on').addClass("focus");
                            currentFocusList = 3;
                            histFocus = 2;
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass('focus');
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("sel");
                        }

                        // 쇼퍼's Bag 일때
                        else if(currentFocusMenu == 3) {
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("sel");
                            currentFocusList = 2; // 쇼퍼's Bag
                            $('#sb_menu').removeClass("sb_menu").addClass("sb_menu_sel");

                        }
                        // 과일에서 가공식품 사이일 때
                        else if(currentFocusMenu >= 4 && currentFocusMenu <= 11) {
                            $('li[name="category_menu"]').eq(currentFocusMenu).removeClass("focus");
                            $('li[name="category_menu"]').eq(currentFocusMenu).addClass("sel");
                            currentFocusList = 1; // 상세 카테고리로 이동함
                            currentFocusDtl = 0; // 상세 카테고리의 첫번째로
                            $('li[name="appendMenu"]').eq(currentFocusDtl).addClass("focus");
                        }
                    }

                    // 쇼퍼 주문 이력 일때
                    else if(currentFocusList == 3) {
                        // 구매 상품 리스트
                        if(histFocus == 1) {
                            $('#th_product_list').removeClass("focus");
                            histFocus = 2;
                            $('#shlr_on').addClass("focus");
                        }
                    }
                }
                
                
            } else if (keyCode === global.VK_BACK) {
                // 검색 결과 팝업, 검색 팝업 일때
                if(keywordFocus != 0 || isKeyword != 0) {
                    $('#wrap_keyword_search').hide();
                    keywordFocus = 0;
                    keywordListFocus = 0;
                    $('#wrap_keyword_result').hide();
                    isKeyword = 0;

                    // 검색 팝업 포커스 제거
                    $('#input_keyword').removeClass("focus");
                    $('#btn_keyword_search').removeClass("focus");
                    $('#btn_keyword_close').removeClass("focus");

                    // 검색 결과 포커스 제거
                    $('#btn_sort1').removeClass("focus");
                    $('#btn_sort2').removeClass("focus");
                    $('#btn_sort3').removeClass("focus");
                    $('#btn_sort4').removeClass("focus");
                    $('#btn_keyword_checkbox').removeClass("focus");
                    $('li[name="keyword_product_list"]').removeClass("focus");
                    $('span[name="okfill"]').empty();
                }

                // 그 이외의 화면 일때
                else {
                    $('#videoDiv video').remove();
                    location.href ="exhb.html?SHOPPER_STATUS=" + SHOPPER_STATUS+ '&userID='+ userID + '&userName=' + userName; // 기획전 이동
                }
                
            } 
            //else if (keyCode === global.VK_ESCAPE) {
                
            //} 
            else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                
            }
        }
    },


    // 카테고리 목록 조회 20150714 카테고리 하드코딩 삭제 관련
    // 서버에서 이미지 주소 등을 받아오지 않고 이름만 받아와서 일단 보류
    selectCategoryList: function() {
        var param = '';
        
        $.ajax({
            url         : cmsServerIp + "/TVProductCategory/",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                console.log("#####%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 카테고리 목록 " + JSON.stringify(result));

                var appendHtml = '<li name="category_menu"><a href="#"><img src="../images/cate_bag.png" /> <span name="span_category_menu">쇼퍼\'s bag</span></a></li>';

                $.each(result["category"], function(index, entry) {
                    console.log(result["category"][index]);
                });
            }
        });
    },




    // 영상재생
    videoPlay: function(url, category) {

        var categoryName = "";

        switch(category) {
            case 4 : 
                categoryName = "과일";
                break;
            case 5 : 
                categoryName = "채소";
                break;
            case 6 : 
                categoryName = "유제품";
                break;
            case 7 : 
                categoryName = "정육";
                break;
            case 8 : 
                categoryName = "수산물";
                break;
            case 9 : 
                categoryName = "쌀잡곡";
                break;
            case 10 : 
                categoryName = "건강친환경";
                break;
            case 11 : 
                categoryName = "가공식품";
                break;
            default : 
                categoryName = "과일";
                break;
        }

        
        /*videoPlayer.width = 704;
        videoPlayer.height = 396;
        videoPlayer.data = url;
        */
        /*<video id="sub_mpeg_player" width="704" height="396" loop src="http://14.52.244.91:8080/video/tv/category/과일.mp4"></video>*/
        console.log("현재 재생영상 : " + url);

        url = videoServerIp + "/gigamart_video/video/tv/category/" + categoryName + ".mp4";

        console.log("현재 재생영상 : " + url);

        appConfiguration.localSystem.mute = false; // 음소거 해제

        $('#videoDiv video').remove();
        $('#videoDiv').html('<video id="full_mpeg_player" width="730" height="438" autoplay loop src="' + url + '"></video>');
    },

    // 영상 정지
    videoStop: function() {
        appConfiguration.localSystem.mute = true; // 음소거 설정
        $('#videoDiv video').remove();
    },
    
    // 화면 이동 시 메뉴 갱신
    menuRefresh: function(type) {
        var appendHtml = "";
        var param = { "category" : $("span[name='span_category_menu']").eq(currentFocusMenu-3).html() };
        
        $.ajax({
            url         : cmsServerIp + "/TVProductCategory/sub",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                console.log("#####%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 서브 카테고리 목록 " + JSON.stringify(result));

                var cnt = 0;
                var startIdx = Number(currentFocusDtlPage) * 8;
                var endIdx = 0;

                // 서브카테고리의 총 크기가 (currentFocusDtlPage*8)+8 
                // 보다 크면 현재페이지의 [시작인덱스]에서 +8을 [종료인덱스]로 
                if(result["subcategory"].length > (Number(currentFocusDtlPage) * 8)+8) {
                    endIdx = (Number(currentFocusDtlPage) * 8) + 8;
                // 보다 작으면 result["subcategory"]의 총 크기를 [종료인덱스]로 
                } else {
                    endIdx = result["subcategory"].length;
                }
                
                for(var i = startIdx ; i < endIdx ; i ++) {
                    appendHtml += "<li name='appendMenu'>" + result["subcategory"][i] + "</li>";
                }

                if(currentFocusDtlPage == 0) prevPageYN = false; // 이전페이지 없음
                else prevPageYN = true;

                if(cnt > 8) nextPageYN = true;
                else nextPageYN = false;

                $('#cc_list').empty().append(appendHtml);
            },
            complete    : function(result) {
                // 이전 화면에서 받아온 FOCUS가 존재할 때
                if(type == "FOCUS") {
                    currentFocusDtl     = Number(requestCategoryDtlCode);
                    console.log("###### 이전 화면에서 받아온 FOCUS가 존재할 때 currentFocusDtl : " + currentFocusDtl);
                    console.log("###### 이전 화면에서 받아온 FOCUS가 존재할 때 requestCategoryDtlCode : " + requestCategoryDtlCode);
                    console.log("###### 이전 화면에서 받아온 FOCUS가 존재할 때 requestCategoryDtlPage : " + requestCategoryDtlPage);
                    $('li[name="appendMenu"]').eq(currentFocusDtl).addClass("focus");
                }
            }
        });

        pageArrowUtil1(); // 페이징 화살표 컨트롤
    },

    addKeyEventActor: function (instance, conditionFunction) {
    	this.actors.push({
    		instance: instance,
    		conditionFunction: conditionFunction
    	});
    },

    // 현재 시간 구하기 (ampm)
    getCurrentDate: function() {
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var str_ampm, dsp_ampm;

        if(hour == 0) str_ampm ="오후";
        else if(hour < 13) str_ampm = "오전";
        else {
            hour -= 12;
            str_ampm = "오후";
        }
        hour = (hour == 0) ? 12 : hour;

        dsp_ampm = str_ampm + " " + hour + "시 " + minute + "분";

        return dsp_ampm;
    },
    
    // 조회 : 쇼퍼 주문 이력
    selectShopperHistory: function() {
        var param = '';

        $.ajax({
            url         : cmsServerIp + "/BuyerOrderTask/",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                console.log("######## 주문 이력 결과 : " + JSON.stringify(result));

                var generalYN   = false;
                var shopperStar = "";
                // totalOrderedPage, maxOrderedPageView, productList는 Category.js에 전역변수로 선언되어 있음.

                // 주문 이력이 없을 때
                if(result['orders'].length == 0) {
                    $('#ordered_product').empty().append("<span>주문 이력이 없습니다.</span>");
                    
                    currentFocusList = 3;
                    histFocus = 3;
                    $('#shlr_close').addClass("focus");
                }

                $.each(result['orders'], function(index, entry) {
                    
                    if(generalYN == false && entry['type'] == 'general') {
                        generalYN = true;

                        $('#order_date').empty().html(entry['order_date']);
                        $('#total_order_cost').empty().html(cn_toPrice(entry['total_cost']) + "원");
                        $('#shopper_id').empty().html("ID : " + entry['shopper_id']);

                        var rating = Number(entry['rating']);
                        if(rating >= 20)    shopperStar += '<img src="../images/icon_star.png" />';
                        else                shopperStar += '<img src="../images/icon_star_blank.png" />';
                        if(rating >= 40)    shopperStar += '<img src="../images/icon_star.png" />';
                        else                shopperStar += '<img src="../images/icon_star_blank.png" />';
                        if(rating >= 60)    shopperStar += '<img src="../images/icon_star.png" />';
                        else                shopperStar += '<img src="../images/icon_star_blank.png" />';
                        if(rating >= 80)    shopperStar += '<img src="../images/icon_star.png" />';
                        else                shopperStar += '<img src="../images/icon_star_blank.png" />';
                        if(rating >= 100)   shopperStar += '<img src="../images/icon_star.png" />';
                        else                shopperStar += '<img src="../images/icon_star_blank.png" />';

                        productList = new Array(); // 구매 리스트 초기화

                        var cnt = 0;
                        
                        $.each(entry['ordered_product'], function(pindex, pentry) {
                            cnt                 = Math.floor(pindex / maxOrderedPageView);
                            var str             = Number(pindex+1) + ". " + pentry['name']  + " " + pentry['standard'] + " " +  cn_toPrice(pentry['cost']) + "원 (수량 : " +  pentry['cnt'] + ")<br /><br />";
                            productList[cnt]    = (productList[cnt] + str).replace("undefined", "");
                        });


                        $('#shopper_rating').empty().append(shopperStar);
                        $('#ordered_product').empty().append(productList[currentOrderedProductPage]);

                        // 총 페이지 수
                        totalOrderedPage = cnt;
                        $('#ordered_page').empty().append("<b>" + Number(currentOrderedProductPage+1) + "</b> / " + Number(totalOrderedPage+1));
                        //if(Math.floor(Math.random() * 2) == 0)  $('#shopper_photo').empty().append('<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_김미나.jpg" />');
                        //else                                    $('#shopper_photo').empty().append('<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_이순자.jpg" />');

                        
                    }

                });
            }
        });
    },

    // 구매상품 리스트 페이지 이동
    pagingOrderedProduct : function(page) {
        // 현재 페이지
        currentOrderedProductPage = page;

        $('#ordered_product').empty().append(productList[page]);
    },

    // 조회 : 쇼퍼 List (인기순)
    selectShopperList: function() {
        var param = '';
        
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
                 console.log("#####%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% shopper List json " + JSON.stringify(result));

                $.each(result['shopper'], function(index, entry) {
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


                    $('li[name="shopper_rating"]').empty().append(shopperStar);
                    $('span[name="shopper_rating"]').empty().append(shopperStar);
                    //$('li[name="shopper_img"]').empty().append("<span class='sp_img'><img src=" + entry['img'] + " height='120' /></span>"); //width='160'
                    //$("#shopper_photo").empty().append("<span class='sp_img'><img src=" + entry['img'] + " height='120' /></span>"); //width='160'
                    $('li[name="shopper_name"]').empty().append(entry['shopper_id']);
                    $('span[name="shopper_name"]').empty().append(entry['shopper_id']);
                    /*$('li[name="shopper_cnt"]').empty().append(" (후기: " + entry['reply_cnt'] + ")");*/
                    $('li[name="shopper_cate"]').empty().append(entry['shopping_main']);
                    $('span[name="shopper_cate"]').empty().append(entry['shopping_main']);
                    //$('li[name="description"]').empty().append(entry['description']);

                });
            }
        });
    },


    // 조회 : 마트는 지금?
    selectTweetList: function() {
        var param = '';
        
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

                $.each(result['tweet'], function(index, entry) {

                    // *** 쇼퍼 이미지 ***/
                    $('span[name="shopper_img"]').empty().append("<span class='sp_img'><img src=" + cmsServerIp + entry['shopper_img'] + " width='60' height='68' /></span>");
                    // *** 쇼퍼 ID ***/
                    $('li[name="shopper_id"]').empty().append(entry['shopper_id']);
                    // *** 트윗 일시 ***/
                    $('li[name="tweet_date"]').empty().append(entry['tweet_date']);
                    // *** 트윗 내용 ***/
                    $('li[name="tweet"]').empty().append(entry['tweet']);
                    // *** 제품 이미지 ***/
                    $('li[name="product_img"]').empty().append("<img src=" + cmsServerIp + entry['tweet_img'] + " width='393' height='180' />");
                });
            }
        });
    },

    // 조회 : 검색 결과
    selectKeywordList: function(mode) {
        var param = { "search" : $('#input_keyword').val() };

        $.ajax({
            url         : cmsServerIp + "/ProductCategoryTask/search",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                keywordListArray = result['products'];

                console.log(JSON.stringify(keywordListArray));

                // 첫 페이지로 세팅 되므로 <이전 페이지 없음>
                keywordPrevPageYN = false;

                // 8건 넘어갈 경우 <다음 페이지 있음>
                if(result['products'].length > 8) keywordNextPageYN = true;
                else keywordNextPageYN = false;

                // 타이틀
                $('#title_keyword').html("<b>‘" + $('#input_keyword').val() + "’</b>(으)로 검색된 총 " + keywordListArray.length + "건 입니다.");

                    /*<li class="pl_menu focus mg_r10">
                        <span class="dlm_bdr"></span>
                        <span class="polygon_bb">소량<br />구매</span>
                        <span class="dm_bdr"><img src="../images/btn_ok_fill.png"/></span>
                        <ul>
                            <li class="dlm_img"><img src="../images/sample_01.jpg" /></li>
                            <li class="dlm_tit focus">달달한 사과</li>
                            <li class="dlm_price">24,900원</li>
                        </ul>
                    </li>*/
                

                // $('#ul_keyword_list').empty().append(appendHtml);
            },
            complete    : function(result) {
                if(mode == "MODE1") {
                    $('#wrap_keyword_result').show();
                    Gigamart.app.category.KeyEventActorProvider.makeKeywordList(0); // 검색 결과 리스트 생성
                }

                else if(mode == "MODE2") {
                    $('#wrap_keyword_result').show();
                    Gigamart.app.category.KeyEventActorProvider.makeKeywordList(requestKeywordPage); // 검색 결과 리스트 생성

                    keywordListFocus = requestKeywordFocus;

                    $('li[name="keyword_product_list"]').eq(keywordListFocus).addClass("focus");
                    $('li[name="dlm_tit"]').eq(keywordListFocus).addClass("focus");
                    $('span[name="okfill"]').eq(keywordListFocus).empty().append(btnokfill);
                }

            }
        });
    },

    // 생성 : 검색 결과
    makeKeywordList: function(page) {
        //***************************************************************
        // 목록
        //***************************************************************
        var appendHtml      = "";                       // 리스트 HTML
        var start_idx       = Number(page) * 8;         // 페이지 시작 번호 
        var end_idx         = (Number(page) * 8) + 8;   // 페이지 끝 번호
        var empty_len       = 0;                        // 빈 목록의 갯수
        var total_page      = Math.ceil(Number(keywordListArray.length) / 8); // 전체 페이지
        
        keywordListPage     = page;                     // 현재 페이지

        keywordListLen      = 0;                        // 페이지에 보여지는 상품 갯수

        for(var i=start_idx ; i < end_idx ; i++) {
            if(keywordListArray.length > i) {
                // 리스트 저장
                keywordListScreenArray[keywordListLen] = keywordListArray[i];
                keywordListLen = keywordListLen + 1;

                appendHtml += '<li name="keyword_product_list" class="pl_menu mg_r10">';
                //appendHtml += '     <span class="dlm_bdr"></span>';
                appendHtml += '     <span name="okfill" class="dm_bdr"></span>';
                appendHtml += '     <ul>';
                appendHtml += '         <li class="dlm_img"><img src="' + keywordListArray[i]["img"] + '" /></li>';
                appendHtml += '         <li name="dlm_tit" class="dlm_tit">' + keywordListArray[i]["name"] + '</li>';
                appendHtml += '         <li class="dlm_price">' + cn_toPrice(keywordListArray[i]["cost"]) + '원</li>';
                appendHtml += '     </ul>';
                appendHtml += '</li>';
            }
        }

        // end_idx가 keywordListArray보다 크면 나머지를 빈 목록으로 채움
        if(keywordListArray.length < end_idx) {
            empty_len = end_idx - keywordListArray.length;

            for(var i=0 ; i < empty_len ; i++) {
                appendHtml += '<li name="keyword_empty_list" class="pl_menu focus mg_r10">';
                appendHtml += '</li>';
            }
        }

        // 첫 페이지면 이전 페이지 없음
        if(keywordListPage == 0) keywordPrevPageYN = false; 
        else keywordPrevPageYN = true;

        // 목록의 전체 크기가 페이지 끝번호보다 작거나 같은 경우 다음 페이지 없음
        if(keywordListArray.length <= end_idx) keywordNextPageYN = false;
        else keywordNextPageYN = true;

        $('#ul_keyword_list').empty().append(appendHtml);
        $('#keyword_list_page').html("<b>" + (Number(keywordListPage) + 1) + "</b> / " + total_page);
        keywordPageArrowUtil(); // 화살표

    }
});