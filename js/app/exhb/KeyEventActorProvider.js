'use strict';

//##############################################################################

// index.html과 exhb.html은 공통적으로 js/exhb/KeyEventActorProvider.js를 사용함

//##############################################################################

/**
 *  Exhb Js : KeyEventActorProvider (키 이벤트 처리)
 **/

//저렴한 가격
var resultSet;
//할인율최고
var resultSet2;

// 남은시간
var viewTime; // (남은 시간 시:분:초)
var SetTime;  // (남은 시간 초)
var tid;      // 타이머 객체

var rtspPlayer = window.oipfObjectFactory.createVideoMpegObject();    // 실시간 영상보기
var appConfiguration = window.oipfObjectFactory.createConfigurationObject();

var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();     // 기획전
var videoPlayer2 = window.oipfObjectFactory.createVideoMpegObject();    // 전체 영상보기

var video = new Array();
var videoFlag = true;


// 타이머 시작
function TimerStart() {
    tid=setInterval('msg_time()', 1000);

    console.log("########## Set Time : " + SetTime);
}

// 1초씩 카운트
function msg_time() {


    var hour = Math.floor(SetTime / (60 * 60));
    var divisor_for_minutes = SetTime % (60 * 60);
    var minute = Math.floor(divisor_for_minutes / 60);
    var sec = (SetTime % 60) ;

    if ( hour < 10)
    hour = "0" + hour;
    if ( minute < 10)
    minute = "0" + minute;
    if ( sec < 10)
    sec = "0" + sec;

    var m = hour + ":" + minute + ":" + sec;  // 남은 시간 계산
    
    //document.all.ViewTimer.innerHTML = msg;     // div 영역에 보여줌 
    $('#timer').html(m);
    $('#vi_time').html(m);
            
    SetTime--;                  // 1초씩 감소
    if (SetTime < 0) {          // 시간이 종료 되었으면..
        clearInterval(tid);     // 타이머 해제
        console.log("######## 타이머 종료");
    }
    
}

// 전체영상보기 / 토스트 팝업 닫기
function fn_popCart() {
    $('#pop_cart').hide();
    fvFocus = 1;
}


// 숫자 -> 금액
function cn_toPrice(n) {
    if(isNaN(n)){return 0;}
    var reg = /(^[+-]?\d+)(\d{3})/;   
    n += '';
    while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

// 지금 이상품 이가격 페이징 표시 on/off
function pageArrowUtil1(type) {

    // 초기화
    if(type == 'INIT') {
        // 페이지수=0 : 전페이지/다음페이지 없음
        if(totalOrderedPage1 == 0){ 
            prevPageYN1 = false;
            nextPageYN1 = false;
            $('#a_top1').hide();
            $('#a_bot1').hide();
        }

        // 총 페이지 수가 2페이지 이상
        if(totalOrderedPage1 > 0) {
            prevPageYN1 = false;
            nextPageYN1 = true;
            $('#a_top1').hide();
            $('#a_bot1').show();
        }
    }

    // 페이징 이동
    if(type == 'PAGE') {
        // 첫 페이지
        if(currentOrderedProductPage1 == 0) {
            prevPageYN1 = false;
            $('#a_top1').hide();
        } else {
            prevPageYN1 = true;
            $('#a_top1').show();
        }
        // 마지막 페이지거나 마지막 페이지보다 크면..
        if(currentOrderedProductPage1 >= totalOrderedPage1) {
            nextPageYN1 = false;
            $('#a_bot1').hide();
        } else {
            nextPageYN1 = true;
            $('#a_bot1').show();
        }
    }
}

// 저렴한 상품 추천, 할인율 최고 페이징 표시 on/off
function pageArrowUtil2(type) {

    // 초기화
    if(type == 'INIT') {
        // 페이지수=0 : 전페이지/다음페이지 없음
        if(orderedPage1 == 0 && orderedPage2 == 0){ 
            prevPageYN2 = false;
            nextPageYN2 = false;
            $('#a_top2').hide();
            $('#a_bot2').hide();
        }

        // 어느 한 부분의 페이지 수가 2페이지 이상
        if(orderedPage1 > 0 || orderedPage2 > 0) {
            prevPageYN2 = false;
            nextPageYN2 = true;
            $('#a_top2').hide();
            $('#a_bot2').show();
        }
    }

    // 페이징 이동
    if(type == 'PAGE') {
        console.log(" currentOrderedProductPage2 ========== " + currentOrderedProductPage2);
        // 첫 페이지
        if(currentOrderedProductPage2 == 0) {
            prevPageYN2 = false;
            $('#a_top2').hide();
        } else {
            prevPageYN2 = true;
            $('#a_top2').show();
        }
        // 둘다 마지막 페이지거나 마지막 페이지보다 크면..
        if(currentOrderedProductPage2 >= orderedPage1 && currentOrderedProductPage2 >= orderedPage2) {
            nextPageYN2 = false;
            $('#a_bot2').hide();
        } else {
            nextPageYN2 = true;
            $('#a_bot2').show();
        }
    }
}

// 지금 이상품 이가격 하단 레이아웃 생성
function makeTweetList() {
    var appendHtml =  '<li name="sl_menu" class="sl_menu pd_r10">';
        appendHtml += ' <span class="polygon_b" name="slp_flag"></span>';
        appendHtml += '     <a href="#" class="sl_play"><img src="../images/btn_play_s.png" /></a>';
        appendHtml += '     <ul>';
        appendHtml += '         <li> <img src="../images/sample_02.jpg" width="144" height="92" /></li>';
        appendHtml += '         <li class="slm_txt" name="slp_title"></li>';
        appendHtml += '     </ul>';
        appendHtml += '<input type="hidden" name="tv_video" class="tv_video"id=""/>';
        appendHtml += '</li>';
    $('#ul_tweet').append(appendHtml);
}

// 쇼퍼 실시간 영상재생 (사용 안함)
function rtspPlay() {
    var url = "rtsp://175.209.53.209:1554/11023.sdp";
    console.log("url : " + url + " 재생함");
    rtspPlayer.width = 970;
    rtspPlayer.height = 545;
    //rtspPlayer.height = 526;
    $('#rtsp_area').empty()
    document.getElementById('rtsp_area').appendChild(rtspPlayer);
    rtspPlayer.data = url;
    rtspPlayer.play(1);
}


// 비디오 재생
function fn_videoPlay(url, category, type) {
    // 지금 이상품 이가격
    if(type == 1) {
        // khy 2015-06-29
        //url = url;
        appConfiguration.localSystem.mute = false; // 음소거 해제

        $('#p_videoDiv video').remove();
        $('#span_videoDiv video').remove();
        $('#span_videoDiv').html('<video id="sub_mpeg_player" width="614" height="343" autoplay loop src="' + url + '"></video>');
    }
    // 전체 영상보기
    else if(type == 2) {
        // khy 2015-06-29
        //url = url;
        appConfiguration.localSystem.mute = false; // 음소거 해제

        $('#span_videoDiv video').remove();
        $('#p_videoDiv video').remove();
        $('#p_videoDiv').html('<video id="full_mpeg_player" width="970" height="545" autoplay loop src="' + url + '"></video>');
    }
}

App.defineClass('Gigamart.app.exhb.KeyEventActorProvider', {
    _construct: function() {

        console.log("############# EXHB_PATH : " + EXHB_PATH );

        // 플로팅 메뉴 장바구니 SET
        fltEasyCart();

        //$('#intro_skip').show(); // 인트로 버튼 on
        //$('#intro_skip').addClass("focus");

    	var me = this;
        // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
        $('#span_videoDiv').empty().append('<img src="../images/sample_02.jpg"  style="width : 614px; height : 351px; margin-left : -2px;"/>');

    	me.actors = [];
        //저렴한상품추천
        this.selectSalesWon();
        //할인율최고
        this.selectSalesPercentage();
        //쇼퍼추천세트
        this.selectShopper();

        // 리스트갱신
        //this.menuRefresh();

        // 지금 이상품 이가격 하단
        this.selectProductEvent();

        //지금 이 상품 이 가격 하단에 focus되므로 video재생
        appConfiguration.localSystem.mute = false; // 음소거 off
        var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
        console.log("###################################################################################### url : " + url);
        console.log("###################################################################################### video url : " + video[1]);
        //this.videoPlay("/video/tv/product_event/2-1기획전_매실.mp4", Number(currentFocusMenu+2), 1);
        
        // 당일 판매현장 시각
        // $('#cv_title').html("오늘 " + this.getCurrentDate() +" 현장 영상");

        // 로그인 확인
        console.log("############ 로그인 되었습니다. : 구매자 ID : " + buyerID);

        //매실 지금이상품 이가격 adName에 이름주기
        var requestCategoryDtlCode = "";
        requestCategoryDtlCode = "기타";
        this.selectProductSubCategory2(requestCategoryDtlCode,18000);
        //지금 이상품 이가격 adName에 이름
        //this.adName();

        // 남은 시간 타이머
        

    },

    // 인트로 로그인
    login: function() {

        var config  = window.oipfObjectFactory.createConfigurationObject();
        var said    = config.configuration.getText("SAID");

        console.log("############# 셋탑 STB ID : " + said);

        var param = { 
                        "stb_id" : said
                    };
        $.ajax({
            url         : cmsServerIp + "/TVLoginTask/login",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                console.log("############ 로그인 결과 : " + JSON.stringify(result));

                var resultCode = JSON.stringify(result);
                console.log("###### JSON read 1 : " + result['resultCode']);
                console.log("###### JSON read 2 : " + result.resultCode);

                if(result['resultCode'] == '1') {
                    console.log("############ 로그인 되었습니다. " + buyerID);
                    //appConfiguration.localSystem.mute = true; // 음소거 설정

                    INTRO_SCREEN = false;
                    $('div[name="screen_intro"]').hide();
                    $('div[name="screen_exhb"]').show();

                    //location.href = "view/exhb.html?buyerID=" + result['id'];  // 메인 화면으로 이동
                }

                else if(result['resultCode'] == '0') {
                    console.log("############ 로그인 실패하였습니다.");
                    //appConfiguration.localSystem.mute = true; // 음소거 설정
                    // location.href = "view/exhb.html";  // 메인 화면으로 이동
                    
                    //alert("로그인에 실패하였습니다.");
                    // return;
                }
                
                else {
                    console.log("############ 셋탑박스를 확인해주시거나 고객센터로 문의해주세요.");
                    //appConfiguration.localSystem.mute = true; // 음소거 설정
                    // location.href = "view/exhb.html";  // 메인 화면으로 이동

                    //alert("셋탑박스를 확인해주시거나 고객센터로 문의해주세요.");
                    // return;
                }
            }
        });
    },

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;
        
        // *****************************************************************************
        // * 전체 영상보기 팝업
        // *****************************************************************************
        if(isFullVideo == true && isCart == false && isRealTime == false && isRealTimeStart == false && isRealTimeEnd == false && isRealTimeEndComplete == false) {

            console.log("# 전체 영상보기 팝업 : " + keyCode);
            console.log("# 전체 영상보기 포커스.. : " + fvFocus);

            // **************************************************
            // * ▶ KEY (쇼퍼리얼타임 테스트)
            // **************************************************
            if(keyCode === global.VK_BLUE) {
                //this.shopperRealTimeStart();
            }

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                // 토스트 팝업
                if(fvFocus == 0) {
                    fn_popCart();
                }
                // 장바구니 담기
                if(fvFocus == 1) {
                    $('#pop_cart').show();
                    fvFocus = 0;
                    setTimeout("fn_popCart()", 1500);
                }

                // 상품 상세보기
                else if(fvFocus == 2) {
                    console.log("=====================================================");
                    console.log("=====================================================");
                    console.log("상품 상세보기..var fvCode = "+fvCode);
                    console.log("currentOrderedProductPage1 = "+currentOrderedProductPage1);
                    console.log("fvUrl = "+fvUrl);
                    console.log("fvId = "+fvId);
                    var requestCategoryDtlId = "";
                    var requestCategoryDtlCode = "";
                    //url 이름 찾기
                    var a = fvUrl.split("/");
                    var aa = a[4];
                    var b = aa.split(".");
                    var bb = b[0]
                    console.log("bb="+bb);
                    if(bb == "2-1기획전_매실"){
                        requestCategoryDtlId="18000";
                        requestCategoryDtlCode = "사과/배";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-2기획전_문어"){
                        requestCategoryDtlId="51017";
                        requestCategoryDtlCode = "생선/해산물";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-3기획전_한우"){
                        requestCategoryDtlId="41000";
                        requestCategoryDtlCode = "소고기";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-4기획전_활전복"){
                        requestCategoryDtlId="51018";
                        requestCategoryDtlCode = "생선/해산물";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-5기획전_해산물"){
                        requestCategoryDtlId="51008";
                        requestCategoryDtlCode = "생선/해산물";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-6기획전_치킨"){
                        requestCategoryDtlId="43007";
                        requestCategoryDtlCode = "닭/오리";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-7기획전_활어회"){
                        requestCategoryDtlId="51019";
                        requestCategoryDtlCode = "생선/해산물";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-8기획전_파프리카"){
                        requestCategoryDtlId="26000";
                        requestCategoryDtlCode = "파프리카/피망";
                        //this.selectProductSubCategory();
                    }
                    console.log("requestCategoryDtlId = "+fvId);
                    console.log("requestCategoryDtlCode = "+requestCategoryDtlCode);
                    

                    $('#p_videoDiv video').remove();
                    $('#span_videoDiv video').remove();
                    appConfiguration.localSystem.mute = true; // 음소거 설정
                    location.href = EXHB_PATH + "product1.html?id="+requestCategoryDtlId+"&categoryDtlCode="+requestCategoryDtlCode;
                        

                    //지금 이상품 이가격 하단 페이징 첫페이지일때
                    if(currentOrderedProductPage1 == 0){

                    }else{

                    }
                    /*var url = "&categoryDtlCode=" + requestCategoryDtlCode
                                + "&id=" + requestCategoryDtlId;*/


                }

                // 닫기
                else if(fvFocus == 3) {
                    isFullVideo = false;
                    fvFocus = 1;
                    //this.videoStop();
                    $('#p_videoDiv video').remove();
                    $('#popup_fv').hide();
                    $('#btn_close').removeClass('focus');
                    $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                    $('li[name="sl_menu"]').eq(currentFocusMenu).children('.sl_play').addClass('focus');
                    $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').addClass('focus');

                    //$('#p_videoDiv').empty();
                    var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                    this.videoPlay(url, Number(currentFocusMenu+2), 1);

                    //$('#p_videoDiv').remove();
                    //this.videoPlay();
                    //$('#span_videoDiv').empty().append(appendVideo);
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
                   // 상품정보 보기 -> 장바구니 담기
                    if(fvFocus == 2) {
                        $('#btn_dtl').removeClass('focus');
                        fvFocus = 1;
                        $('#btn_cart').addClass('focus');
                    }

                    // 닫기 -> 상품정보 보기
                    else if(fvFocus == 3) {
                        $('#btn_close').removeClass('focus');
                        fvFocus = 2;
                        $('#btn_dtl').addClass('focus');
                    }
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                    // 장바구니 담기 -> 상품정보 보기
                    if(fvFocus == 1) {
                        $('#btn_cart').removeClass('focus');
                        fvFocus = 2;
                        $('#btn_dtl').addClass('focus');
                    }

                    // 상품정보 보기 -> 닫기
                    else if(fvFocus == 2) {
                        $('#btn_dtl').removeClass('focus');
                        fvFocus = 3;
                        $('#btn_close').addClass('focus');

                    }
                   
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

                //window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
            } else if (keyCode === global.VK_ESCAPE) {
                /*if(isPopup){
                    isPopup = false;
                    reservationPopup.closePopup();
                }else {
                    destroyed();
                }*/
                //window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {

            }
        }


















        // *****************************************************************************
        // * 간편 장바구니 팝업
        // *****************************************************************************
        else if(isFullVideo == false && isCart == true && isRealTime == false && isRealTimeStart == false && isRealTimeEnd == false && isRealTimeEndComplete == false) {
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


























        // *****************************************************************************
        // * 쇼퍼 리얼타임 팝업
        // *****************************************************************************
        else if(isFullVideo == false && isCart == false && isRealTime == true && isRealTimeStart == false && isRealTimeEnd == false && isRealTimeEndComplete == false) {
            console.log("# 쇼퍼 리얼타임 팝업 : " + keyCode);

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                // 닫기 버튼
                if(rtFocus == 0) {
                    console.log("@@@@@@@@@@@@@ 쇼퍼 리얼타임 종료");
                    rtFocus              = 0;
                    //$('#popup_rt').hide();

                    // 영상 종료
                    if(typeof rtspPlayer !== "undefined") {
                        //rtspPlayer.stop();
                    }

                    this.shopperRealTimeEnd(); // 쇼퍼 리얼타임 종료 호출                    
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
                
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {

            }
        }

        // *****************************************************************************
        // * 쇼퍼 리얼타임 시작 팝업
        // *****************************************************************************
        else if(isFullVideo == false && isCart == false && isRealTime == false && isRealTimeStart == true && isRealTimeEnd == false && isRealTimeEndComplete == false) {
            console.log("# 쇼퍼 리얼타임 시작 팝업 : " + keyCode);

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                // 영상요청 버튼
                if(rtStartFocus == 0) {
                    console.log("@@@@@@@@@@@@@ 쇼퍼 리얼타임 호출");
                    $('#shopper_real_time_start').remove();
                    this.shopperRealTime(); // 쇼퍼 리얼타임 호출
                }
                // 닫기 버튼
                else if(rtStartFocus == 1) {
                    rtStartFocus = 0;
                    isRealTimeStart = false;

                    $('#wrap').html(rtStartHtml); // 백업한 html 을 다시 복구
                    $('#shopper_real_time_start').remove();

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
                    // 닫기 -> 영상요청
                    if(rtStartFocus == 1) {
                        $('#rtStart_close').removeClass('focus');
                        rtStartFocus = 0;
                        $('#rtStart_video').addClass('focus');
                    }
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    // 영상요청 -> 닫기
                    if(rtStartFocus == 0) {
                        $('#rtStart_video').removeClass('focus');
                        rtStartFocus = 1;
                        $('#rtStart_close').addClass('focus');
                    }
                }
                
            } else if (keyCode === global.VK_BACK) {
                
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {

            }
        }

        // *****************************************************************************
        // * 쇼퍼 리얼타임 종료 팝업
        // *****************************************************************************
        else if(isFullVideo == false && isCart == false && isRealTime == false && isRealTimeStart == false && isRealTimeEnd == true && isRealTimeEndComplete == false) {
            console.log("# 쇼퍼 리얼타임 종료 팝업 : " + keyCode);

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                // 확인 버튼
                if(rtEndFocus == 0) {
                    // 쇼퍼 리얼타임 종료 확인 팝업으로
                    console.log("@@@@@@@@@@@@@ 쇼퍼 리얼타임 종료 확인 띄움");
                    $('#shopper_real_time_end').remove();

                    rtEndFocus              = 0;
                    this.shopperRealTimeEndComplete();
                }
                // 취소 버튼
                else if(rtEndFocus == 1) {
                    // 쇼퍼 리얼타임 화면으로 복귀
                    rtFocus                 = 0;
                    rtEndFocus              = 0;
                    isRealTime              = true;
                    isRealTimeStart         = false;
                    isRealTimeEnd           = false;
                    isRealTimeEndComplete   = false;
                    $('#shopper_real_time_end').remove();
                    $('#wrap').html(rtEndHtml); // 백업한 html 을 다시 복구
                    
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
                   // 취소 -> 확인
                   if(rtEndFocus == 1) {
                        $('#rtEnd_cancel').removeClass('focus');
                        rtEndFocus = 0;
                        $('#rtEnd_submit').addClass('focus');
                   }
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    // 확인 -> 취소
                    if(rtEndFocus == 0) {
                        $('#rtEnd_submit').removeClass('focus');
                        rtEndFocus = 1;
                        $('#rtEnd_cancel').addClass('focus');
                    }
                }
                
            } else if (keyCode === global.VK_BACK) {
                
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {

            }
        }


        // *****************************************************************************
        // * 쇼퍼 리얼타임 종료 완료 팝업
        // *****************************************************************************
        else if(isFullVideo == false && isCart == false && isRealTime == false && isRealTimeStart == false && isRealTimeEnd == false && isRealTimeEndComplete == true) {
            console.log("# 쇼퍼 리얼타임 종료 완료 팝업 : " + keyCode);

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                if(rtEndCompleteFocus == 0) {
                    // 쇼퍼 리얼타임 관련 팝업 제거
                    isRealTime              = false;
                    isRealTimeStart         = false;
                    isRealTimeEnd           = false;
                    isRealTimeEndComplete   = false;
                    $('#shopper_real_time_end_complete').remove();
                    $('#wrap').html(rtEndCompleteHtml); // 백업한 html 을 다시 복구
                    
                    var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                            //url : 치킨일땐 이미지 뿌리기                           
                    /*if(url == "/video/tv/product_event/2-6기획전_치킨.mp4"){
                        console.log("지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 치킨영상 재생 url"+url);
                        this.videoPlay(url, Number(currentFocusMenu+2), 1);
                    }
                    else{*/
                         console.log("지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 영상 url"+url);   
                         this.videoPlay(url, Number(currentFocusMenu+2), 1);
                    //}
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
                
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {

            }
        }


















        // *****************************************************************************
        // * 팝업 없을 때
        // *****************************************************************************
        else if(isFullVideo == false && isCart == false && isRealTime == false && isRealTimeStart == false && isRealTimeEnd == false && isRealTimeEndComplete == false) {
            console.log("# 팝업 없을때 keyCode : " + keyCode);

            // **************************************************
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode === global.VK_GREEN) {
                isCart      = true;
                cartFocus   = 1;    // 결제 버튼 Focus
                // cartHtml    = $('#wrap').html(); // 간편 장바구니에 들어갈 부분의 html 백업 (간편 장바구니 해제 후에 다시 돌려두어야함)

                retrieveEasyCart(); // 간편 장바구니 조회

                $('#popup_cart').show();
                $('#ecc_payments').addClass('focus'); // 첫 포커스는 ecc_payments

                /*if(currentFocusList == 0) $('#pj_left').removeClass('focus');
                if(currentFocusList == 2) $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                if(currentFocusList == 3) $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                if(currentFocusList == 4) $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                if(currentFocusList == 5) $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');*/
            }

            // **************************************************
            // * ◀ KEY (플로팅 Go home)
            // **************************************************
            if(keyCode === global.VK_RED) {
                /** 기획전으로 이동 */
                //location.href = "exhb.html";
            }

            // **************************************************
            // * ▶ KEY (장바구니 담기, 상품은 담고 세트는 리스트 호출?)
            // **************************************************
            if(keyCode === global.VK_BLUE) {
                // 저렴한 상품 추천
                if(currentFocusList == 3) {
                    var idx = currentFocusDtl1 + (2 * currentFocusDtlPage);
                    
                    console.log("############ 장바구니에 담는 product_id : " + productList[idx]["product_id"]);
                    console.log("장바구니에 담겼습니다..");
                    
                    // 장바구니 담기
                    appendEasyCart(1, productList[idx]["product_id"]);
                    $('#cart_message').html("장바구니에 " + productList[idx]["name"] + " 상품이 1개 담겼습니다.");
                    $('#wrap_cart').show();
                    // 플로팅 메뉴 장바구니 SET
                    fltEasyCart();
                    setTimeout("fn_popEasyCart()", 1500);                    
                }

                // 할인율 최고
                if(currentFocusList == 4) {
                    var idx = currentFocusDtl2 + (2 * currentFocusDtlPage);
                    
                    console.log("############ 장바구니에 담는 product_id : " + productList2[idx]["product_id"]);
                    console.log("장바구니에 담겼습니다..");
                    
                    // 장바구니 담기
                    appendEasyCart(1, productList2[idx]["product_id"]);
                    $('#cart_message').html("장바구니에 " + productList2[idx]["name2"] + " 상품이 1개 담겼습니다.");
                    $('#wrap_cart').show();
                    // 플로팅 메뉴 장바구니 SET
                    fltEasyCart();
                    setTimeout("fn_popEasyCart()", 1500);
                }

                // 추천 세트
                if(currentFocusList == 5) {
                    console.log("추천세트 장바구니 담기 : " + currentFocusDtl3);
                    console.log("아직 지원 안함..실제 상품이 없음..");
                }

                $('#pop_easy_cart').show();
                setTimeout("fn_popEasyCart()", 1000);
            }

            // **************************************************
            // * PLAY KEY (메뉴/카테고리)
            // **************************************************
            if(keyCode === global.VK_PLAY) {
                /** 전체 카테고리로 이동 */
                $('#p_videoDiv video').remove();
                $('#span_videoDiv video').remove();
                appConfiguration.localSystem.mute = true; // 음소거 설정
                location.href = EXHB_PATH + "category.html";
            }

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                /*if(currentFocusList == 0) {
                    //전체 카테고리로 이동 
                    location.href = "category.html";
                }*/

                if(currentFocusList == 2) {
                    /** 전체 영상보기 팝업 */
                    // TODO : 타임세일 코드값 넘겨야함
                    isFullVideo = true;
                    $('#popup_fv').show();
                    $('#btn_cart').addClass('focus');
                    // 전체 영상보기 영상 재생
                    var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                    fvUrl = url;
                    fvId = $('input[name="sl_id"]').val();

                    var requestCategoryDtlCode = "";
                    var a = fvUrl.split("/");
                    var aa = a[4];
                    var b = aa.split(".");
                    var bb = b[0]
                    console.log("bb="+bb);
                    if(bb == "2-1기획전_매실"){
                        //requestCategoryDtlId="11000";
                        requestCategoryDtlCode = "사과/배";
                        this.selectProductSubCategory(requestCategoryDtlCode,18000);
                    }else if(bb == "2-2기획전_문어"){
                        //requestCategoryDtlId="54009";
                        requestCategoryDtlCode = "생선/해산물";
                        this.selectProductSubCategory(requestCategoryDtlCode,51017);
                    }else if(bb == "2-3기획전_한우"){
                        //requestCategoryDtlId="41000";
                        requestCategoryDtlCode = "소고기";
                        this.selectProductSubCategory(requestCategoryDtlCode,41000);
                    }else if(bb == "2-4기획전_활전복"){
                        //requestCategoryDtlId="54010";
                        requestCategoryDtlCode = "생선/해산물";
                        this.selectProductSubCategory(requestCategoryDtlCode,51018);
                    }else if(bb == "2-5기획전_해산물"){
                        //requestCategoryDtlId="51008";
                        requestCategoryDtlCode = "생선/해산물";
                        this.selectProductSubCategory(requestCategoryDtlCode,51008);
                    }else if(bb == "2-6기획전_치킨"){
                        //requestCategoryDtlId="43007";
                        requestCategoryDtlCode = "닭/오리";
                        this.selectProductSubCategory(requestCategoryDtlCode,43007);
                    }else if(bb == "2-7기획전_활어회"){
                        //requestCategoryDtlId="54011";
                        requestCategoryDtlCode = "생선/해산물";
                        this.selectProductSubCategory(requestCategoryDtlCode,51019);
                    }else if(bb == "2-8기획전_파프리카"){
                        //requestCategoryDtlId="26000";
                        requestCategoryDtlCode = "파프리카/피망";
                        this.selectProductSubCategory(requestCategoryDtlCode,26000);
                    }
                    console.log("전체 영상보기 영상 재생 url : "+url);
                    console.log("전체 영상보기 영상 재생 fvId : "+fvId);
                    $('#span_videoDiv').empty();
                    this.videoPlay(url, Number(currentFocusMenu+2), 2);
                }
                //저렴한 상품추천
                else if(currentFocusList == 3) {
                    var idx = currentFocusDtl1 + (2 * currentFocusDtlPage);
                    console.log("저렴한 상품추천############ currentFocusDtl1  : " + currentFocusDtl1);
                    console.log("저렴한 상품추천############ currentFocusDtlPage  : " + currentFocusDtlPage);
                    console.log("저렴한 상품추천############ resultSet  : " + resultSet);
                    console.log("저렴한 상품추천############ idx  : " + idx);
                    console.log("############ product_id : " + productList[idx]["product_id"]);
                    console.log("############ subcategory: " + productList[idx]["subcategory"]);

                    $('#p_videoDiv video').remove();
                    $('#span_videoDiv video').remove();
                    appConfiguration.localSystem.mute = true; // 음소거 설정
                    location.href = EXHB_PATH + "product1.html?id="+productList[idx]["product_id"]+"&categoryDtlCode="+productList[idx]["subcategory"];

                }
                //할인율 최고
                else if(currentFocusList == 4){
                    var idx = currentFocusDtl2 + (2 * currentFocusDtlPage);
                    console.log("할인율 최고############ currentFocusDtl2   : " + currentFocusDtl2);
                    console.log("할인율 최고############ currentFocusDtlPage   : " + currentFocusDtlPage);
                    console.log("할인율 최고############ resultSet2   : " + resultSet2);
                    console.log("할인율 최고############ idx  : " + idx);
                    console.log("############ product_id  : " + productList2[idx]["product_id"]);
                    console.log("############ subcategory : " + productList2[idx]["subcategory"]);

                    $('#p_videoDiv video').remove();
                    $('#span_videoDiv video').remove();
                    appConfiguration.localSystem.mute = true; // 음소거 설정
                    location.href = EXHB_PATH + "product1.html?id="+productList2[idx]["product_id"]+"&categoryDtlCode="+productList2[idx]["subcategory"];
                }
                //단골쇼퍼
                if(currentFocusList == 5) {
                    //쇼퍼
                    if(currentFocusDtl3 == 0) {
                        // 쇼퍼's Bag으로 이동
                        $('#p_videoDiv video').remove();
                        $('#span_videoDiv video').remove();
                        appConfiguration.localSystem.mute = true; // 음소거 설정
                        location.href = EXHB_PATH + "shopper_bag.html";        
                    }
                    //추천세트
                    else if(currentFocusDtl3 == 1){
                        /** 쇼퍼's Bag 이동 */
                        location.href = "shopper_bag.html?setName=닭볶음탕";
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
                    // 지금 이상품 이가격(하단) -> 지금 이상품 이가격
                    /*if(currentFocusList == 2) {
                        $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                        currentFocusList = 1;
                        $('#s_scale').addClass('focus');
                    }*/

                    // 지금 이상품 이가격(하단)
                    if(currentFocusList == 2) {
                        console.log("##### 지금 이상품 이가격(하단)지금 이상품 이가격(하단)지금 이상품 이가격(하단)지금 이상품 이가격(하단)..");
                        if(prevPageYN1 == true) {
                            // 전 페이지 조회
                            console.log("지금 이상품 이가격 : 전 페이지 조회");
                            if(currentOrderedProductPage1 == 0) {
                                    console.log("##### 첫페이지임 ..");
                                }
                                // 마지막 페이지 아닐 때
                            else {
                                console.log("##### 마지막 페이지 아닐 때..");

                                this.pagingOrderedProduct2(Number(currentOrderedProductPage1-1));

                                var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val(); 
                                this.videoPlay(url, Number(currentFocusMenu+2), 1);
                                //지금 이상품 이가격 adName에 이름
                                this.adName();
                                console.log("VK_DOWN 지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 영상 재생 url"+url);
                            }


                        } else if(prevPageYN1 == false) {
                            // 전 페이지 없음
                            console.log("지금 이상품 이가격 : 전 페이지 없음");

                            console.log("# currentOrderedProductPage1 = " + currentOrderedProductPage1);
                            console.log("# totalOrderedPage1 = " + totalOrderedPage1);
                        }
                    }

                    // 저렴한 상품 추천
                    else if(currentFocusList == 3) {
                        if(currentFocusDtl1 == 0) {//1행
                            if(prevPageYN2 == true) {
                                // 전 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 조회");
                                console.log("currentOrderedProductPage2 : "+currentOrderedProductPage2);
                                console.log("totalOrderedPage2 : "+totalOrderedPage2);
                                    // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage2 == 0) {
                                    console.log("##### 첫페이지임 ..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    //$('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","none");
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').removeClass('focus');
                                    //$('a[name="arrow_top"]').addClass('focus');  
                                    currentFocusDtlPage = Number(currentFocusDtlPage)-1;

                                    this.pagingOrderedProduct(currentOrderedProductPage2-1);

                                    currentFocusDtl1 = currentFocusDtl1 + 1; 
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","block");
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').addClass('focus');

                                }
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                                /*if(currentOrderedProductPage2 == totalOrderedPage2) {
                                    console.log("##### 더 이상 이동할 페이지 없음.22.");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때.22.2");
                                    this.pagingOrderedProduct(currentOrderedProductPage2-1);
                                }*/
                            }
                        }
                        else if(currentFocusDtl1 == 1) {//2행
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').removeClass('focus');
                            
                            currentFocusDtl1 = currentFocusDtl1 - 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').addClass('focus');
                        }
                        else if(currentFocusDtl1 == 2) {
                            $('a[name="arrow_bottom"]').removeClass('focus');  
                            currentFocusDtl1 = currentFocusDtl1 - 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').addClass('focus');
                        }

                    }

                    // 할인율 최고
                    else if(currentFocusList == 4) {
                        console.log("UP 할인율 최고 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl2 == 0) {//1행
                            if(prevPageYN2 == true) {
                                // 전 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 조회");
                                if(currentOrderedProductPage2 == 0) {
                                    console.log("##### 첫페이지임 ..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","none");
                                    $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').removeClass('focus');
                                    currentFocusDtlPage = Number(currentFocusDtlPage)-1;

                                    console.log("before totalOrderedPage2 = " + totalOrderedPage2);
                                    console.log("before currentOrderedProductPage2 = " + currentOrderedProductPage2);

                                    this.pagingOrderedProduct(Number(currentOrderedProductPage2-1));

                                    console.log("after totalOrderedPage2 = " + totalOrderedPage2);
                                    console.log("after currentOrderedProductPage2 = " + currentOrderedProductPage2);

                                    currentFocusDtl2 = currentFocusDtl2 + 1;
                                     $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");
                                    $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');
                                }
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                            }
                            
                        }
                        else if(currentFocusDtl2 == 1) {//2행
                            //console.log("UP 할인율최고 2행->1행");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusDtl2 = currentFocusDtl2 - 1;
                            //currentFocusDtl3 = currentFocusDtl2;
                            console.log("UP 할인율최고 2행->1행 currentFocusDtl2==>"+currentFocusDtl2);
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');
                        }
                        else if(currentFocusDtl2 == 2) {
                            $('a[name="arrow_bottom"]').removeClass('focus');  
                            currentFocusDtl2 = currentFocusDtl2 - 1;
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');
                        }
                    }

                    // 단골쇼퍼
                    else if(currentFocusList == 5) {
                        console.log("UP 단골쇼퍼 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl3 == 0) {
                            console.log("UP추천세트1행->0???????");
                            if(prevPageYN2 == true) {
                                // 전 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 조회");
                                $('li[name="shooperImg"]').removeClass('focus');
                                currentFocusDtlPage = Number(currentFocusDtlPage)-1;
                                this.pagingOrderedProduct(Number(currentOrderedProductPage2-1));
                                currentFocusDtl3 = 1;
                                $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                                $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                                $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dl_bdr').css("display","block");
                                $('li[name="li_discount3"]').eq(currentFocusDtl3).children().children('.dlm_tit').addClass('focus');
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                            }
                            
                        }
                        else if(currentFocusDtl3 == 1) {
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).children().children('.dlm_tit').removeClass('focus');
                            currentFocusDtl3 = currentFocusDtl3 - 1;
                            console.log("UP추천세트2행->1행 currentFocusDtl3==>"+currentFocusDtl3);
                            $('li[name="shooperImg"]').addClass('focus');
                            //$('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            //$('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl3 == 2) {
                            $('a[name="arrow_bottom"]').removeClass('focus');  
                            currentFocusDtl3 = currentFocusDtl3 - 1;
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).children().children('.dlm_tit').addClass('focus');
                        }
                    }                   
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {

                    // 지금 이상품 이가격 -> 지금 이상품 이가격(하단)
                    /*if(currentFocusList == 1) {
                        $('#s_scale').removeClass('focus');
                        currentFocusList = 2;
                        $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                   }*/

                   // 지금 이상품 이가격(하단)
                   if(currentFocusList == 2) {
                        if(nextPageYN1 == true) {
                            // 다음 페이지 조회
                            console.log("지금 이상품 이가격 : 다음 페이지 조회");
                            if(currentOrderedProductPage1 == totalOrderedPage1) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                            }
                            // 마지막 페이지 아닐 때
                            else {
                                console.log("##### 마지막 페이지 아닐 때..");
                               
                                this.pagingOrderedProduct2(Number(currentOrderedProductPage1+1));

                                 var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                                console.log("VK_DOWN 지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 영상 재생 url"+url);
                                this.videoPlay(url, Number(currentFocusMenu+2), 1);
                                //지금 이상품 이가격 adName에 이름
                                this.adName();

                            }
                        } else if(nextPageYN1 == false) {
                            // 다음 페이지 없음
                            console.log("지금 이상품 이가격 : 다음 페이지 없음");
                            console.log("# currentOrderedProductPage1 = " + currentOrderedProductPage1);
                            console.log("# totalOrderedPage1 = " + totalOrderedPage1);
                        }
                   }



                   // 저렴한 상품 추천
                   else if(currentFocusList == 3) {
                        if(currentFocusDtl1 == 0) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').removeClass('focus');
                            currentFocusDtl1 = Number(currentFocusDtl1 + 1);
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').addClass('focus');
                        }
                        else if(currentFocusDtl1 == 1) {
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                                // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage2 >= orderedPage1 && currentOrderedProductPage2 >= orderedPage2) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                    console.log("##### currentOrderedProductPage2 = " + currentOrderedProductPage2);
                                    console.log("##### totalOrderedPage2 == " + totalOrderedPage2);
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty(); 
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","none");
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').removeClass('focus');

                                    currentFocusDtlPage = Number(currentFocusDtlPage)+1;
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage2+1));
                                    currentFocusDtl1 = currentFocusDtl1 - 1; 

                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","block");
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').addClass('focus');
                                }



                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                                /*// 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage2 == totalOrderedPage2) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage2+1));
                                }*/
                            }
                        }
                        else if(currentFocusDtl1 == -1) {
                            //$('a[name="arrow_top"]').removeClass('focus');
                            currentFocusDtl1 = currentFocusDtl1 + 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').addClass('focus');
                        }
                   }

                   // 할인율 최고
                   else if(currentFocusList == 4) {
                        console.log("DOWN 할인율 최고 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl2 == 0) {
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusDtl2 = currentFocusDtl2 + 1;
                            currentFocusDtl3 = currentFocusDtl2;
                            console.log("DOWN할인율 최고1행->2행!! currentFocusDtl2? : "+currentFocusDtl2);
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');
                        }
                        else if(currentFocusDtl2 == 1) {
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");

                                // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage2 >= orderedPage1 && currentOrderedProductPage2 >= orderedPage2) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                    console.log("currentOrderedProductPage2 : "+currentOrderedProductPage2);
                                    console.log("totalOrderedPage2 : "+totalOrderedPage2);
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                     $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","none"); 
                                    $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').removeClass('focus');

                                    currentFocusDtlPage = Number(currentFocusDtlPage)+1;
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage2+1));
                                    currentFocusDtl2 = currentFocusDtl2 - 1; 

                                    $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");
                                    $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');

                                }
                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                                /*// 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage2 == totalOrderedPage2) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage2+1));
                                }*/

                            }
                        }
                        else if(currentFocusDtl2 == -1) {
                            //$('a[name="arrow_top"]').removeClass('focus');
                            currentFocusDtl2 = currentFocusDtl2 + 1; 
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');
                        }
                   }

                   // 단골쇼퍼
                   else if(currentFocusList == 5) {
                        console.log("DOWN 추천 세트 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl3 == 0) {
                            $('li[name="shooperImg"]').removeClass('focus');
                            /*$('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();*/
                            currentFocusDtl3 = currentFocusDtl3 + 1;
                            console.log("DOWN추천세트1행->2행!! currentFocusDtl3? : "+currentFocusDtl3);
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).children().children('.dlm_tit').addClass('focus');
                        }
                        else if(currentFocusDtl3 == 1) {
                            console.log("DOWN추천세트2행->없어");
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                                $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                                $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty(); 
                                $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dl_bdr').css("display","none");
                                $('li[name="li_discount3"]').eq(currentFocusDtl3).children().children('.dlm_tit').removeClass('focus');
                                currentFocusDtlPage = Number(currentFocusDtlPage)+1;    
                                this.pagingOrderedProduct(Number(currentOrderedProductPage2+1));
                                currentFocusDtl3 = 0;
                                $('li[name="shooperImg"]').addClass('focus');

                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                            }
                        }
                        else if(currentFocusDtl3 == -1) {
                            //$('a[name="arrow_top"]').removeClass('focus');
                            currentFocusDtl3 = currentFocusDtl3 + 1; 
                            $('li[name="shooperImg"]').addClass('focus');
                        }
                    }
                }

                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {

                    // 지금 이상품 이가격 -> 전체 카테고리
                    /*if(currentFocusList == 1) {
                        $('#s_scale').removeClass('focus');
                        currentFocusList = 0;
                        $('#pj_left').addClass('focus');
                    }*/

                    // 지금 이상품 이가격 (하단) -> 지금 이상품 이가격 (하단) or 전체 카테고리
                    if(currentFocusList == 2) {
                        // 지금 이상품 이가격(하단 왼쪽) -> 전체 카테고리
                        if(currentFocusMenu == 0) {

                            //전체 카테고리로 이동 
                            //$('#span_videoDiv').append('<img src="../images/sample_02.jpg" style="width : 610px; height : 343px;"/>');
                            $('#span_videoDiv').append('<img src="../images/sample_02.jpg" style="width : 614px; height : 351px; margin-left : -2px;"/>');

                            $('#p_videoDiv video').remove();
                            $('#span_videoDiv video').remove();
                            appConfiguration.localSystem.mute = true; // 음소거 설정
                            location.href = EXHB_PATH + "category.html";
                            //$('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            //currentFocusList = 0;
                            //$('#pj_left').addClass('focus');

                        // 지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단)
                        } 
                        else if(currentFocusMenu > 0) {
                            if(currentFocusMenu == 3) {
                                $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').css("color", "#000000");
                            }
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children('.sl_play').removeClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').removeClass('focus');
                            console.log("currentFocusMenu-> url"+currentFocusMenu);
                            currentFocusMenu = currentFocusMenu - 1;
                            fvCode = currentFocusMenu; // TODO : 나중에 타임세일 코드 넣어야함
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children('.sl_play').addClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').addClass('focus');
                            
                            var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                            //url : 치킨일땐 이미지 뿌리기                           
                            /*if(url == "/video/tv/product_event/2-6기획전_치킨.mp4"){
                                console.log("지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 치킨영상 재생 url"+url);
                                this.videoPlay(url, Number(currentFocusMenu+2), 1);
                                //지금 이상품 이가격 adName에 이름
                                this.adName();
                            }
                            else{*/
                                 console.log("지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 영상 url"+url);   
                                 this.videoPlay(url, Number(currentFocusMenu+2), 1);
                                 //지금 이상품 이가격 adName에 이름
                                this.adName();
                            //}
                            
                        


                        }
                    }
                    
                    // 저렴한 상품 추천 -> 지금 이상품 이가격 or 지금 이상품 이가격(하단 오른쪽)
                    else if(currentFocusList == 3) {
                        // 저렴한 상품 (0,1) -> 지금 이상품 이가격
                        /*if(currentFocusDtl1 == 0 || currentFocusDtl1 == 1) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            currentFocusList = 1;
                            $('#s_scale').removeClass('focus');
                        }*/

                        // 저렴한 상품 (2) -> 지금 이상품 이가격(하단 오른쪽)
                        if(currentFocusDtl1 == 0 || currentFocusDtl1 == 1 ||currentFocusDtl1 == 2) {
                            $('#scn_bdr').addClass("focus");
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').css("color", "#FFFFFF");

                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 2;
                            currentFocusMenu = 3;
                            fvCode = currentFocusMenu; // TODO : 차후에 상품 코드 넣어야함
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children('.sl_play').addClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').addClass('focus');

                            var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                            console.log("저렴한 상품 (2) -> 지금 이상품 이가격(하단 오른쪽) 영상 재생 url"+url);
                            this.videoPlay(url, Number(currentFocusMenu+2), 1);
                        }
                    }

                    // 할인율 최고 -> 저렴한 상품 추천
                    else if(currentFocusList == 4) {
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","none");
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').removeClass('focus');
                        currentFocusList = 3;
                        currentFocusDtl1 = currentFocusDtl2; // 할인율 최고 선택 순서가 그대로 저렴한 상품 추천으로 이동
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                        $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","block");
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').addClass('focus');
                    }

                    // 단골쇼퍼 -> 할인율 최고
                    else if(currentFocusList == 5) {
                        console.log("LEFT 단골쇼퍼 -> 할인율 최고 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl3 ==0){
                            $('li[name="shooperImg"]').removeClass('focus');
                            currentFocusList = 4;
                            currentFocusDtl2 = currentFocusDtl3; // 추천 세트 선택 순서가 그대로 할인율 최고로 이동
                            console.log("단골쇼퍼1행 -> 할인율 최고1행!!! currentFocusDtl2? : "+currentFocusDtl2);
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);   
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");  
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');
                        }
                        else if(currentFocusDtl3 ==1){
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).children().children('.dlm_tit').removeClass('focus');
                            //$('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            //$('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                            currentFocusList = 4;
                            currentFocusDtl2 = currentFocusDtl3; // 추천 세트 선택 순서가 그대로 할인율 최고로 이동
                            console.log("단골쇼퍼2행 -> 할인율 최고2행!! currentFocusDtl2? : "+currentFocusDtl2);
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');
                        }
                        
                    }
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {

                    // 전체 카테고리 -> 지금 이상품 이가격 (하단)
                    if(currentFocusList == 0) {
                        // this.videoStop();

                        /*$('#pj_left').removeClass('focus');
                        currentFocusList = 2;
                        currentFocusMenu = 0;
                        fvCode = currentFocusMenu; // TODO : 차후에 상품 코드 넣어야함
                        $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');

                        var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                        console.log("전체 카테고리 -> 지금 이상품 이가격 (하단) 영상 재생 url"+url);
                        this.videoPlay(url, Number(currentFocusMenu+2), 1);*/
                    }

                    // 지금 이상품 이가격 -> 저렴한 상품 추천
                    /*else if(currentFocusList == 1) {
                        // TODO - 해줄게 있음
                        $('#s_scale').removeClass('focus');
                        currentFocusList = 3;
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                    }*/

                    // 지금 이상품 이가격(하단) -> 지금 이상품 이가격(하단) or 저렴한 상품 추천
                    else if(currentFocusList == 2) {
                        // 지금 이상품 이가격(하단) -> 지금 이상품 이가격(하단)
                        if(currentFocusMenu < 3) {
                            //this.videoStop();
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children('.sl_play').removeClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').removeClass('focus');
                            currentFocusMenu = currentFocusMenu + 1;
                            if(currentFocusMenu == 3) {
                                $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').css("color", "#FFFFFF");
                            }
                            fvCode = currentFocusMenu; // TODO : 차후에 상품 코드 넣어야함
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children('.sl_play').addClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').addClass('focus');

                            var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                            console.log("지금 이상품 이가격(하단) -> 지금 이상품 이가격(하단) or 저렴한 상품 추천 영상 재생 url"+url);
                            this.videoPlay(url, Number(currentFocusMenu+2), 1);
                            //지금 이상품 이가격 adName에 이름
                            this.adName();
                        }

                        // 지금 이상품 이가격(하단 오른쪽) -> 저렴한 상품 추천
                        else if(currentFocusMenu == 3) {
                            $('#scn_bdr').removeClass("focus");
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').css("color", "#08760D");
                            //지금이상품 이가격 하단에 초록색 화살표 남아있어야되므로 remove X
                            //$('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children('.sl_play').removeClass('focus');
                            $('li[name="sl_menu"]').eq(currentFocusMenu).children().children('.slm_txt').removeClass('focus');
                            currentFocusList = 3;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').addClass('focus');

                            appConfiguration.localSystem.mute = true; // 음소거 on
                        }

                    }

                    // 저렴한 상품 추천 -> 할인율 최고
                    else if(currentFocusList == 3) {
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                        $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                        $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dl_bdr').css("display","none");
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).children().children('.dlm_tit').removeClass('focus');
                        currentFocusList = 4;
                        currentFocusDtl2 = currentFocusDtl1;
                        console.log("저렴한 상품 추천 -> 할인율 최고 currentFocusDtl2? : "+currentFocusDtl2);
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","block");
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').addClass('focus');
                    }

                    // 할인율 최고 -> 단골쇼퍼
                    else if(currentFocusList == 4) {
                        console.log("RIGHT 할인율 최고 -> 단골쇼퍼 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl2 ==0){
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 5;
                            currentFocusDtl3 = currentFocusDtl2;
                            console.log("할인율 최고1행 -> 단골쇼퍼1행 currentFocusDtl3? : "+currentFocusDtl3);
                            $('li[name="shooperImg"]').addClass('focus');
                            //$('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            //$('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl2 ==1){
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dl_bdr').css("display","none");
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).children().children('.dlm_tit').removeClass('focus');
                            currentFocusList = 5;
                            currentFocusDtl3 = currentFocusDtl2;
                            console.log("할인율 최고2행 -> 단골쇼퍼2행!!!! currentFocusDtl3? : "+currentFocusDtl3);
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill); 
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dl_bdr').css("display","block");
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).children().children('.dlm_tit').addClass('focus');
                        }
                        
                        //$('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                        //$('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                    }
                }
                
            } else if (keyCode === global.VK_BACK) {
                window.oipfObjectFactory.createApplicationManagerObject().getOwnerApplication(window.document).destroyApplication();
            } else if (keyCode === global.VK_ESCAPE) {
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

    // 영상재생
    videoPlay: function(url, category, type) {
        // 지금 이상품 이가격
        if(type == 1) {
                
            //url : /video/tv/product_event/2-6기획전_치킨.mp4 일때 
            /*if(url == "/video/tv/product_event/2-6기획전_치킨.mp4"){
                $('#span_videoDiv').empty().append('<img src="'+cmsServerIp+'/video/tv/product_event/2-6기획전_치킨.png" style="width : 614px; height : 351px; margin-left : -2px;"/>');
            }
            else{*/
                console.log("치킨아님!!!! : "+url);
            
                /*videoPlayer.width = 610;
                videoPlayer.height = 343;
                $('#span_videoDiv').empty()
                document.getElementById('span_videoDiv').appendChild(videoPlayer);
                videoPlayer.data = url;
                videoPlayer.play(1);*/
                
                //document.getElementById('span_videoDiv').appendChild(appendVideo);

                // sar 2015-06-29
                /*var appendVideo = '<video id="sub_mpeg_player" width="614" height="351" style="margin-left:-2px;" loop src="' + url + '"></video>';
                $('#span_videoDiv').empty().append(appendVideo);

                var videoPlayer = document.querySelector('video');
                videoPlayer.play(1);*/

                // khy 2015-06-29
                //url = url;
                appConfiguration.localSystem.mute = false; // 음소거 해제

                $('#p_videoDiv video').remove();
                $('#span_videoDiv video').remove();
                $('#span_videoDiv').html('<video id="sub_mpeg_player" width="614" height="343" autoplay loop src="' + url + '"></video>');
            // }

        }
        // 전체 영상보기
        else if(type == 2) {
            //url : /video/tv/product_event/2-6기획전_치킨.mp4 일때 
            /*if(url == "/video/tv/product_event/2-6기획전_치킨.mp4"){
                $('#p_videoDiv').empty().append('<img src="'+cmsServerIp+'/video/tv/product_event/2-6기획전_치킨.png" style="width : 970px; height : 545px;"/>');
            } else {*/
                /*videoPlayer2.width = 970;
                videoPlayer2.height = 545;
                $('#p_videoDiv').empty()
                document.getElementById('p_videoDiv').appendChild(videoPlayer2);
                videoPlayer2.data = url;
                videoPlayer2.play(1);*/
                //document.getElementById('p_videoDiv').appendChild(appendVideo);


                // sar 2015-06-29
                /*var appendVideo = '<video id="full_mpeg_player" width="970" height="545" loop src="' + url + '"></video>';
                $('#p_videoDiv').empty().append(appendVideo);
                var videoPlayer = document.querySelector('video');
                videoPlayer.play(1);*/

                // khy 2015-06-29
                //url = url;
                appConfiguration.localSystem.mute = false; // 음소거 해제

                $('#span_videoDiv video').remove();
                $('#p_videoDiv video').remove();
                $('#p_videoDiv').html('<video id="full_mpeg_player" width="970" height="545" autoplay loop src="' + url + '"></video>');
            // }
        }
    },

    // 영상 정지 (사용 안함)
    videoStop: function() {
        try {
             if(videoPlayer.playState != 0) {
                  videoPlayer.stop();
             }

             if(videoPlayer2.playState != 0) {
                  videoPlayer2.stop();
             }
        } catch(err){
             alert("Video stop111 " + err);
        }
    },

    destroyed: function () {
        /** 팝업? 종료 시 호출 */
        window.document.removeEventListener('keydown', keyDownEventReceivedForDetail, false);
        changeWindow(WindowType.main);
        initIndexFocus();
    },

    // 조회 : 저렴한 상품추천
    selectSalesWon: function() {
        var param = '';
        var appendHtml = '';

        $.ajax({
            url         : cmsServerIp + "/ProductTask/sales_won",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                
                //var val1 = jQuery.parseJSON(result);
                var val2 = JSON.stringify(result);
                console.log("######## 저렴한 상품추천 결과 : " + JSON.stringify(result));

                productList = new Array(); // 구매 리스트 초기화
                var cnt = 0;
                $.each(result['product'], function(index, entry) {
                        $('span[name="pd_sales_won"]').eq(index).empty().html(cn_toPrice(entry['sales_won'])+"원");
                        $('li[name="pd_img"]').eq(index).empty().html('<img src="' + entry['img'] + '"/>');
                        $('li[name="pd_name"]').eq(index).empty().html(entry['name']);
                        $('li[name="pd_cost"]').eq(index).empty().html(cn_toPrice(entry['cost']) + "원"); 
                        appendHtml = {
                                        "sales_won" : cn_toPrice(entry['sales_won']),
                                        "img" : entry['img'],
                                        "name" : entry['name'],
                                        "cost" : cn_toPrice(entry['cost']) + "원",
                                        "product_id" : entry['product_id'],
                                        "subcategory" : entry['subcategory']
                                     };
                    cnt                 = Math.floor(index / maxOrderedPageView2);
                    var str             = Number(index+1) + ". " +appendHtml;

                    productList[index]    = appendHtml;
                    //resultSet = productList[index];
                    //console.log("index : " + index + " maxOrderedPageView2 : " + maxOrderedPageView + " cnt : " + cnt);
                });

                // 총 페이지 수
                totalOrderedPage2 = cnt;

                // 저렴한 상품추천 페이지 수
                orderedPage1 = cnt;

                console.log("저렴한 상품 추천 총페이지수: " + orderedPage1);
                
                //$('li[name="li_discount1"]').empty().append(productList[currentOrderedProductPage2]);

                //1일때/1이상일때 currentFocusDtlPage--??
                //$('li[name="li_discount1"]').empty().append("<B>" + Number(currentOrderedProductPage2+1) + "</b> / " + Number(totalOrderedPage2+1));
                //저렴한 상품추천, 할인율최고, 단골쇼퍼의 2행에 margin-top : 10px;줄것
                $('li[name="li_discount1"]').eq(1).css("margin-top" , "15px");
                $('li[name="li_discount2"]').eq(1).css("margin-top" , "15px");
                $('li[name="li_discount3"]').eq(1).css("margin-top" , "15px");
            }
        });
    },

    // 조회 : 할인율최고
    selectSalesPercentage: function() {
        var param = '';
        var appendHtml = '';
        $.ajax({
            url         : cmsServerIp + "/ProductTask/sales_percentage",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                resultSet2 = result;
                console.log("######## 할인율최고 결과 : " + JSON.stringify(result));
                productList2 = new Array(); // 구매 리스트 초기화
                var cnt = 0;
                $.each(result['product'], function(index, entry) {
                        $('span[name="pd_sales_percentage"]').eq(index).empty().html(entry['sales_percentage']+"%");
                        $('li[name="pd_img2"]').eq(index).empty().html('<img src="'+ entry['img']+'"/>');
                        $('li[name="pd_name2"]').eq(index).empty().html(entry['name']);
                        $('li[name="pd_cost2"]').eq(index).empty().html(cn_toPrice(entry['cost']) + "원");
                        appendHtml = {
                                        "sales_percentage" : entry['sales_percentage'],
                                        "img2" : entry['img'],
                                        "name2" : entry['name'],
                                        "cost2" : cn_toPrice(entry['cost']) + "원",
                                        "product_id" : entry['product_id'],
                                        "subcategory" : entry['subcategory']
                                     };
                        
                    cnt                 = Math.floor(index / maxOrderedPageView2);
                    var str             = Number(index+1) + ". " +appendHtml;
                    //productList[cnt]    = (productList[cnt] + str).replace("undefined", "");
                    productList2[index]    =  appendHtml;
                    //console.log("index : " + index + " maxOrderedPageView : " + maxOrderedPageView2 + " cnt : " + cnt);
                });

                // 총 페이지 수 , 저렴한 상품 추천의 페이지수보다 많으면 대입
                if(totalOrderedPage2 < cnt) totalOrderedPage2 = cnt;    

                // 할인율 최고 페이지 수
                orderedPage2 = cnt;
                
                // 저렴한 상품 추천 , 할인율 최고 페이징 화살표 show/hide
                pageArrowUtil2('INIT');

                console.log("할인율 최고 페이지 수 : " + orderedPage2);

            }
        });
    },
    // 조회 : 쇼퍼추천세트
    selectShopper : function(){
        console.log("######## 쇼퍼추천세트");
        var appendHtml = '';
        var appendHtml2 = '';
        var shopperImg = "";
        var shopperSet = "";
        var shopperName ="";
        var shopperProduct ="";

        appendHtml = "";
        appendHtml += '<li class="shooperImg" name="shooperImg" id="shooperImg"></li>';
        appendHtml += '<li>';
        appendHtml += '<img src="../images/icon_star.png" /><img src="../images/icon_star.png" /><img src="../images/icon_star.png" /><img src="../images/icon_star.png" /><img src="../images/icon_star_blank.png" />';
        appendHtml += '</li>';
        appendHtml += '<li class="pd_t5 pd_b5"><img src="../images/txt_custom.png" /></li>';
        appendHtml += '<li class="txt"style="font-size:12px;">무더운 여름에 시원하게 얼음동동 콩국수 어떠세요?  </li>';
        appendHtml += '</ul>';
        

        appendHtml2 = "";
        appendHtml2 += '<a href="#" class="dlm_rank"><b>3</b>위</a>';
        appendHtml2 += '<span class="polygon_l">세트구매</span>';
        appendHtml2 += '<span class="dl_bdr" style="display:none;"></span>';
        appendHtml2 += '<span class="dm_bdr"></span>';
        appendHtml2 += '<ul>';
        appendHtml2 += '<li class="dlm_img" name="shooperImg2"></li>';
        appendHtml2 += '<li class="dlm_tit" name="shopper_product"></li>';
        appendHtml2 += '<li class="dlm_price">24,900원</li>';
        appendHtml2 += '</ul>';
        
        /*if(Math.floor(Math.random() * 2) == 0) {shopperImg = '<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_김미나.png" />'; shopperName="김미나 쇼퍼";}
        else  {shopperImg ='<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_이순자.png" />'; shopperName="이순자 쇼퍼";}
        if(Math.floor(Math.random() * 2) == 0)  {shopperSet = '<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼세트_닭볶음탕.jpg" />';shopperProduct = "닭볶음탕";} 
        else  {shopperSet ='<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼세트_소고기샤브샤브2.jpg" />'; shopperProduct = "소고기샤브샤브"; }*/

        if(currentOrderedProductPage2 == 0) {shopperImg = '<img class="shopperP_img" src="' + cmsServerIp + '/images/shopper/set/쇼퍼_김미나.png" />'; shopperName="김미나 쇼퍼";}
        else  {shopperImg ='<img class="shopperP_img" src="' + cmsServerIp + '/images/shopper/set/쇼퍼_이순자.png" />'; shopperName="이순자 쇼퍼";}
        if(currentOrderedProductPage2 == 0) {shopperSet = '<img class="shopperS_img" src="' + cmsServerIp + '/images/shopper/set/쇼퍼세트_닭볶음탕.jpg" />';shopperProduct = "닭볶음탕";} 
        else  {shopperSet ='<img class="shopperS_img" src="' + cmsServerIp + '/images/shopper/set/쇼퍼세트_소고기샤브샤브2.jpg" />'; shopperProduct = "소고기샤브샤브"; }

        console.log("######## shopperImg->"+shopperImg);

        console.log("######## shopperSet->"+shopperSet);
        $('li[name="li_discount3"]').eq(0).append(appendHtml);  //쇼퍼 
        $('li[name="li_discount3"]').eq(1).append(appendHtml2);    
        $('li[name="shooperImg"]').empty().append(shopperImg);
        $('li[name="shooperImg2"]').empty().html(shopperSet);
        $('span[name="shopper_name"]').empty().html(shopperName);
        $('li[name="shopper_product"]').empty().html(shopperProduct);


    },
    // 조회 : 지금 이상품 이가격 하단
    selectProductEvent: function() {
        var param = '';
        var appendHtml = '';
        var str = '';
        $.ajax({
            url         : cmsServerIp + "/ProductTask/product_event",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                console.log("########지금 이상품 이가격 하단 결과 : " + JSON.stringify(result));
                
                productList3 = new Array(); // 구매 리스트 초기화
                var cnt = 0;

                /*$.each(result['product'], function(index, entry) {
                    console.log("index : " + index + " maxOrderedPageView1 : " + maxOrderedPageView1 );
                    makeTweetList();
                     상품 플래그 
                    $('span[name="slp_flag"]').eq(index).empty().append(entry['flag']);
                     상품 title
                    $('li[name="slp_title"]').eq(index).empty().append(entry['title']);
                     비디오 hidden값 
                    $('input[name="tv_video"]').eq(index).empty().append(entry['tv_video']);
                     
                });
                //4번째있는 이미지의 class속성 제거(오른쪽여백)
                $('li[name="sl_menu"]').eq(3).removeClass('pd_r10');*/



                $.each(result['product'], function(index, entry) {
                        var img = entry['tv_video']
                        var img2 = img.replace("mp4","png");
                        
                        $('span[name="slp_flag"]').eq(index).empty().html(entry['flag']);
                        $('li[name="slp_title"]').eq(index).empty().html(entry['title']);
                        $('input[name="tv_video"]').eq(index).val(entry['tv_video']);
                        $('li[name="sl_img"]').eq(index).empty().html('<img class="sl_menu_img" src="' +img2+'"/>');
                        $('input[name="sl_id"]').eq(index).val(entry['product_id']);

                        // 남은 시간
                        $('input[name="SetTime"]').eq(index).val(entry['duration_sec']);
                        console.log("## 남은 시간 " + index + " : " + $('input[name="SetTime"]').eq(index).val());
                        // 첫번째 남은시간
                        if(index == 0) {
                            SetTime = entry['duration_sec'];
                            console.log("## 첫번째 남은 시간 " + index + " : " + SetTime);

                            if(typeof tid !== 'undefined') clearInterval(tid);
                            TimerStart();
                        }

                        //$('li[name="sl_img"]').eq(index).empty().html('<img src="'+cmsServerIp + entry['img']+'"/>');

                        video[index] = entry['tv_video'];

                        appendHtml = {
                                        "flag" : entry['flag'],
                                        "title" : entry['title'],
                                        "tv_video" : entry['tv_video'],
                                        "img" : entry['img'],
                                        "product_id" : entry['product_id'],
                                        "duration_sec" : entry['duration_sec']
                                     };
                    cnt                 = Math.floor(index / maxOrderedPageView1);
                    var str             = appendHtml;
                    productList3[index]    = str;
                    
                    totalOrderedPage1 = cnt;
                });
    

                pageArrowUtil1('INIT');

                console.log("총페이지수: " + totalOrderedPage1);

                
            },
            complete    : function(result) {
                if(videoFlag) {
                    // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
                    //$('#span_videoDiv').empty().append('<img src="../images/sample_02.jpg" />');
                    fn_videoPlay(video[0], Number(currentFocusMenu+2), 1);
                    videoFlag = false;
                    console.log("###################################################################################### video complete url : " + video[1]);
                }        
            }
        });
        
    },
    // 내가 늘 사는 상품 지금 얼마? 리스트 페이지 이동
    pagingOrderedProduct : function(page) {
        // 현재 페이지
        currentOrderedProductPage2 = page;
        
        // 단골쇼퍼, 추천세트 변경 시작
        var appendHtml = '';
        var appendHtml2 = '';
        var shopperImg = "";
        var shopperSet = "";
        var shopperName ="";
        var shopperProduct ="";

        if(currentOrderedProductPage2 == 0) {shopperImg = '<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_김미나.png" />'; shopperName="김미나 쇼퍼";}
        else  {shopperImg ='<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_이순자.png" />'; shopperName="이순자 쇼퍼";}
        if(currentOrderedProductPage2 == 0) {shopperSet = '<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼세트_닭볶음탕.jpg" />';shopperProduct = "닭볶음탕";} 
        else  {shopperSet ='<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼세트_소고기샤브샤브2.jpg" />'; shopperProduct = "소고기샤브샤브"; }

        $('li[name="li_discount3"]').eq(0).append(appendHtml);  //쇼퍼 
        $('li[name="li_discount3"]').eq(1).append(appendHtml2);    
        $('li[name="shooperImg"]').empty().append(shopperImg);
        $('li[name="shooperImg2"]').empty().html(shopperSet);
        // 단골쇼퍼, 추천세트 변경 끝

        console.log("########리스트 페이지 이동 currentOrderedProductPage2 : " + currentOrderedProductPage2);
        //console.log("######## productList[0000] : " + JSON.stringify(appendHtml));
        console.log("######## productList[0] : " + productList);
        console.log("######## productList.length : " + productList.length);
        console.log("######## productList[0] : " + productList[0]);
        console.log("######## productList[0] : " + productList[0].name);
        console.log("######## productList[1] : " + productList[1]["name"]);


        for(var i=0 ; i < productList.length ; i++) {
            console.log("######## productList " + i + ": " + productList[i]);
            console.log("######## productList[0] : " + productList[i].name);
            console.log("######## productList[0] : " + productList[i]["name"]);
            console.log("######## productList stringify " + i + ": " + JSON.stringify(productList[i]));
        }

        if(currentOrderedProductPage2 <= orderedPage1) {
            //저렴한 상품추천 1행
            $('span[name="pd_sales_won"]').eq(0).empty().append(productList[page*2].sales_won);
            $('li[name="pd_img"]').eq(0).empty().append('<img src="' + productList[page*2].img + '"/>');
            $('li[name="pd_name"]').eq(0).empty().append(productList[page*2].name);
            $('li[name="pd_cost"]').eq(0).empty().append(productList[page*2].cost);
            //저렴한 상품추천 2행
            $('span[name="pd_sales_won"]').eq(1).empty().append(productList[(page*2)+1].sales_won);
            $('li[name="pd_img"]').eq(1).empty().append('<img src="' + productList[(page*2)+1].img + '"/>');
            $('li[name="pd_name"]').eq(1).empty().append(productList[(page*2)+1].name);
            $('li[name="pd_cost"]').eq(1).empty().append(productList[(page*2)+1].cost);
        }

        if(currentOrderedProductPage2 <= orderedPage2) {
            //할인율 최고 1행
            $('span[name="sales_percentage"]').eq(0).empty().append(productList2[page*2].sales_percentage);
            $('li[name="pd_img2"]').eq(0).empty().append('<img src="' + productList2[page*2].img2 + '"/>');
            $('li[name="pd_name2"]').eq(0).empty().append(productList2[page*2].name2);
            $('li[name="pd_cost2"]').eq(0).empty().append(productList2[page*2].cost2);
            //할인율 최고 2행
            $('span[name="sales_percentage"]').eq(1).empty().append(productList2[(page*2)+1].sales_percentage);
            $('li[name="pd_img2"]').eq(1).empty().append('<img src="' + productList2[(page*2)+1].img2 + '"/>');
            $('li[name="pd_name2"]').eq(1).empty().append(productList2[(page*2)+1].name2);
            $('li[name="pd_cost2"]').eq(1).empty().append(productList2[(page*2)+1].cost2);
        }

        pageArrowUtil2("PAGE");
        this.updateShopperName();
        
    },
    // 지금 이상품 이가격 하단 리스트 페이지 이동
    pagingOrderedProduct2 : function(page) {
        // 현재 페이지
        currentOrderedProductPage1 = page;
        console.log("########리스트 페이지 이동 currentOrderedProductPage1 : " + currentOrderedProductPage1);
        console.log("########productList3.length : " + productList3.length);
        for(var i=0 ; i < productList3.length ; i++) {
            console.log("######## productList3 i :  " + i + ": " + productList3[i]);
            console.log("######## productList3 stringify " + i + ": " + JSON.stringify(productList3[i]));

        }

        //productImgList = new Array();


        for(var i=0 ; i < 4 ; i++) {
            var img = productList3[Number((page*4)+i)].tv_video;
            var img2 = img.replace("mp4","png");
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            console.log("img-->"+img);
            console.log("img2-->"+img2);
            console.log("ip+img2-->"+img2);
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            console.log("(page*4)+i : "+ Number((page*4)+i));    
            $('span[name="slp_flag"]').eq(i).empty().html(productList3[Number((page*4)+i)].flag);
            $('li[name="slp_title"]').eq(i).empty().html(productList3[Number((page*4)+i)].title);
            $('input[name="tv_video"]').eq(i).val(productList3[Number((page*4)+i)].tv_video);
            $('li[name="sl_img"]').eq(i).empty().html('<img class="sl_menu_img" src="'+ img2+'"/>');
            $('input[name="sl_id"]').eq(i).val(productList3[Number((page*4)+i)].tv_videoproduct_id);
            
            $('input[name="SetTime"]').eq(i).val(productList3[Number((page*4)+i)].duration_sec);
            //$('li[name="sl_img"]').eq(i).empty().html('<img src="'+cmsServerIp + productList3[Number((page*4)+i)].img+'"/>');
            //$('input[name="tv_video"]').eq(index).val(entry['tv_video']);
        }

        pageArrowUtil1('PAGE');

        //fn_videoPlay(video[0], Number(currentFocusMenu+2), 1);

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

    // 조회 : 상세카테고리별 상품정보
    selectProductSubCategory: function(requestCategoryDtlCode,fvId) {
                console.log("######################################################################");
                console.log("######## requestCategoryDtlCode  : "+requestCategoryDtlCode);
                console.log("######## fvId  : "+fvId);
                console.log("######################################################################");
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
                console.log("######################################################################");
                console.log("######## result  : " + result);
                console.log("########상세카테고리별 상품정보 결과 : " + JSON.stringify(result));
                console.log("######################################################################");


                // 결과값을 넣는다.
                $.each(result, function(index, entry) {
                    // 처음에 뿌려주는 9개만 넣는다.
                    if(entry['id'] == fvId) {
                        console.log("######## entry[id]와 request값 같은때 ########");
                        $('span[name="pd_name"]').empty().append(entry['name']);
                        $('span[name="pd_cost"]').empty().append(cn_toPrice(entry['cost']) + "원");
                        $('span[name="pd_standard"]').empty().append(entry['standard']);
                    }
                });
            },
            error : function(){
                    console.log("에러");
            }
        });
    },
    // 조회 : 상세카테고리별 상품정보 찾아와서 지금 이상품 이가격 기획세일 하단 text에 뿌려준다.
    selectProductSubCategory2: function(requestCategoryDtlCode,fvId) {
                console.log("######################################################################");
                console.log("##################상세카테고리별 상품정보 찾아와서 지금 이상품 이가격 기획세일 하단 text에 뿌려준다.######################");
                console.log("######## requestCategoryDtlCode  : "+requestCategoryDtlCode);
                console.log("######## fvId  : "+fvId);
                console.log("######################################################################");
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
                console.log("######################################################################");
                console.log("######## result  : " + result);
                console.log("########상세카테고리별 상품정보 결과 : " + JSON.stringify(result));
                console.log("######################################################################");


                // 결과값을 넣는다.
                $.each(result, function(index, entry) {
                    // 처음에 뿌려주는 9개만 넣는다.
                    if(entry['id'] == fvId) {
                        console.log("######## entry[id]와 request값 같은때 ########");
                        $('span[name="ad_name"]').empty().append(entry['name']+entry['standard']);
                        $('b[name="timesale_won"]').empty().append(cn_toPrice(entry['cost']) + "원");
                    }
                });

                // 타이머
                // if(typeof tid !== 'undefined') clearInterval(tid);
                
                //$('#timer').html(entry['duration_sec']);
                //viewTime = $('#timer').html();

                // SetTime 초로 변환
                /*var transHour   = Number(viewTime.substring(0,2)) * 3600;
                var transMinute = Number(viewTime.substring(3,5)) * 60;
                var transSecond = Number(viewTime.substring(6,8)) * 1;
                SetTime = transHour + transMinute + transSecond;*/

                // 남은 시간
                //TimerStart();
            },
            error : function(){
                    console.log("에러");
            }
        });
    },





    // 조회 : 쇼퍼 조회
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
                console.log("######################################## 쇼퍼 조회 : " + JSON.stringify(result));

                // *** 쇼퍼 별점 ***
                var shopperRating   = Number(result['shopper']['rating']);       // 쇼퍼 평점
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
                $('span[name="shopper_img"]').empty().append("<img src=" + result['shopper']['img'] + " width='160' height='120' />");
                $('li[name="shopper_name"]').empty().append(result['shopper']['name']);
                $('li[name="description"]').empty().append(result['shopper']['description']);
            }
        });
    },


    

    // 쇼퍼 리얼 타임
    shopperRealTime: function() {
        console.log("######################################## 리얼 타임");
        isRealTime             = true;
        isRealTimeStart        = false;
        isRealTimeEnd          = false;
        isRealTimeEndComplete  = false;
    
        rtHtml = rtStartHtml;                               // 현재 화면을 <쇼퍼 리얼 타임 시작>에서 가져옴
        $('#wrap').load(EXHB_PATH + "shopper_real_time.html");
        //$('#popup_rt').show();
        $('#rt_close').addClass('focus');

        this.selectShopperList();

        // 영상 재생 시작
        setTimeout(rtspPlay, 500);
    },

    // 쇼퍼 리얼 타임 시작
    shopperRealTimeStart: function() {
        isRealTime             = false;
        isRealTimeStart        = true;
        isRealTimeEnd          = false;
        isRealTimeEndComplete  = false;
        
        rtStartHtml = $('#wrap').html();                    // 현재 화면
        $('#wrap').load(EXHB_PATH + "shopper_real_time_start.html");

        $('#rtStart_video').addClass('focus');
    },

    // 쇼퍼 리얼 타임 종료
    shopperRealTimeEnd: function() {
        isRealTime             = false;
        isRealTimeStart        = false;
        isRealTimeEnd          = true;
        isRealTimeEndComplete  = false;

        rtEndHtml = $('#wrap').html();                      // <쇼퍼 리얼 타임>
        $('#wrap').load(EXHB_PATH + "shopper_real_time_end.html");

        $('#rtEnd_submit').addClass('focus');
    },

    // 쇼퍼 리얼 타임 종료 완료
    shopperRealTimeEndComplete: function() {
        isRealTime             = false;
        isRealTimeStart        = false;
        isRealTimeEnd          = false;
        isRealTimeEndComplete  = true;

        rtEndCompleteHtml = rtHtml;                         // 현재 화면
        $('#wrap').load(EXHB_PATH + "shopper_real_time_end_complete.html");

        $('#rtEndComplete_submit').addClass('focus');
    },
    //지금 이상품이가격 하단 adName에 이름주기
    adName : function(){
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@adName FUNCTION@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();

        console.log("url==>"+url);
        fvUrl = url;
        fvId = $('input[name="sl_id"]').val();

        var requestCategoryDtlCode = "";
        var a = fvUrl.split("/");
        var aa = a[4];
        var b = aa.split(".");
        var bb = b[0]
        console.log("bb="+bb);

        if(bb == "2-1기획전_매실"){
            //requestCategoryDtlId="18000";
            requestCategoryDtlCode = "사과/배";
            this.selectProductSubCategory2(requestCategoryDtlCode,18000);
            // 남은 시간
            // SetTime = $('input[name="SetTime"]').eq(0).val();
            SetTime = productList3[7].duration_sec;
        }else if(bb == "2-2기획전_문어"){
            //requestCategoryDtlId="54009";
            requestCategoryDtlCode = "생선/해산물";
            this.selectProductSubCategory2(requestCategoryDtlCode,51017);
            // 남은 시간
            // SetTime = $('input[name="SetTime"]').eq(1).val();
            SetTime = productList3[2].duration_sec;
        }else if(bb == "2-3기획전_한우"){
            //requestCategoryDtlId="41000";
            requestCategoryDtlCode = "소고기";
            this.selectProductSubCategory2(requestCategoryDtlCode,41000);
            // 남은 시간
            // SetTime = $('input[name="SetTime"]').eq(2).val();
            SetTime = productList3[3].duration_sec;
        }else if(bb == "2-4기획전_활전복"){
            //requestCategoryDtlId="54010";
            requestCategoryDtlCode = "생선/해산물";
            this.selectProductSubCategory2(requestCategoryDtlCode,51018);
            // 남은 시간
            // SetTime = $('input[name="SetTime"]').eq(3).val();
            SetTime = productList3[4].duration_sec;
        }else if(bb == "2-5기획전_해산물"){
            //requestCategoryDtlId="51008";
            requestCategoryDtlCode = "생선/해산물";
            this.selectProductSubCategory2(requestCategoryDtlCode,51008);
            // 남은 시간
            // SetTime = $('input[name="SetTime"]').eq(0).val();
            SetTime = productList3[1].duration_sec;
        }else if(bb == "2-6기획전_치킨"){
            //requestCategoryDtlId="43007";
            requestCategoryDtlCode = "닭/오리";
            this.selectProductSubCategory2(requestCategoryDtlCode,43007);
            // 남은 시간
            // SetTime = $('input[name="SetTime"]').eq(1).val();
            SetTime = productList3[5].duration_sec;
        }else if(bb == "2-7기획전_활어회"){
            //requestCategoryDtlId="54011";
            requestCategoryDtlCode = "생선/해산물";
            this.selectProductSubCategory2(requestCategoryDtlCode,51019);
            // 남은 시간
            // SetTime = $('input[name="SetTime"]').eq(2).val();
            SetTime = productList3[6].duration_sec;
        }else if(bb == "2-8기획전_파프리카"){
            //requestCategoryDtlId="26000";
            requestCategoryDtlCode = "파프리카/피망";
            this.selectProductSubCategory2(requestCategoryDtlCode,26000);
            // 남은 시간
            //SetTime = $('input[name="SetTime"]').eq(3).val();
            SetTime = productList3[0].duration_sec;
        }
        // 타이머
        if(typeof tid !== 'undefined') clearInterval(tid);
        TimerStart();

    },
    // 페이징될때마다 단골쇼퍼의 쇼퍼이름과 세트구매의 정보들 바뀜
    updateShopperName : function(){
        var shopperImgUrl = $('li[name="shooperImg"]').children().attr("src");
        console.log("shopperImgUrl="+shopperImgUrl);
        if(shopperImgUrl == "http://14.52.244.91:8080/images/shopper/set/쇼퍼_이순자.png"){
            $('span[name="shopper_name"]').empty().html("이순자 쇼퍼");
        }else{
            $('span[name="shopper_name"]').empty().html("김미나 쇼퍼");
        }

        var setImgUrl = $('li[name="shooperImg2"]').children().attr("src");
        console.log("setImgUrl="+setImgUrl);
        if(setImgUrl == "http://14.52.244.91:8080/images/shopper/set/쇼퍼세트_소고기샤브샤브2.jpg"){
            $('li[name="shopper_product"]').empty().html("소고기 샤브샤브");
        }else{
            $('li[name="shopper_product"]').empty().html("닭볶음탕");
        }
    }
});