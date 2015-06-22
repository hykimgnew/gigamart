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

/**
 *  Exhb Js : KeyEventActorProvider (키 이벤트 처리)
 **/

var rtspPlayer = window.oipfObjectFactory.createVideoMpegObject();    // 실시간 영상보기

// 쇼퍼 실시간 영상재생
function rtspPlay() {
    var url = "rtsp://175.209.53.209:1554/11023.sdp";
    // var url = cmsServerIp + "/video/tv/product_event/2-2기획전_문어.mp4";
    console.log("url : " + url + " 재생함");
    rtspPlayer.width = 970;
    rtspPlayer.height = 545;
    $('#rtsp_area').empty()
    document.getElementById('rtsp_area').appendChild(rtspPlayer);
    rtspPlayer.data = url;
    rtspPlayer.play(1);
}


var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();     // 기획전
var videoPlayer2 = window.oipfObjectFactory.createVideoMpegObject();    // 전체 영상보기

var video = new Array();
var videoFlag = true;


function fn_videoPlay(url, category, type) {
    // 지금 이상품 이가격
    if(type == 1) {
        // 테스트용 영상
        url = "http://14.52.244.91:8080" + url;
        // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
        $('#span_videoDiv').empty().append('<img src="../images/sample_02.jpg"  style="width : 610px; height : 343px;"/>');
        
        videoPlayer.width = 610;
        videoPlayer.height = 343;
        $('#span_videoDiv').empty()
        document.getElementById('span_videoDiv').appendChild(videoPlayer);
        videoPlayer.data = url;
        videoPlayer.play(1);
    }
    // 전체 영상보기
    else if(type == 2) {
        // 테스트용 영상
        url = "http://14.52.244.91:8080" + url;
        // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
        $('#p_videoDiv').empty().append('<img src="../images/sample_02.jpg" style="width : 970px; height : 545px;"/>');
        
        videoPlayer2.width = 970;
        videoPlayer2.height = 545;
        $('#p_videoDiv').empty()
        document.getElementById('p_videoDiv').appendChild(videoPlayer2);
        videoPlayer2.data = url;
        videoPlayer2.play(1);
    }
}

App.defineClass('Gigamart.app.exhb.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;
        // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
        $('#span_videoDiv').empty().append('<img src="../images/sample_02.jpg"  style="width : 610px; height : 343px;"/>');

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

        //처름 지금이상품 이가격 하단에 focus되므로 video재생
        var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
        console.log("###################################################################################### url : " + url);
        console.log("###################################################################################### video url : " + video[1]);
        //this.videoPlay("/video/tv/product_event/2-1기획전_매실.mp4", Number(currentFocusMenu+2), 1);
        
        // 당일 판매현장 시각
        $('#cv_title').html("오늘 " + this.getCurrentDate() +" 현장 영상");

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
                this.shopperRealTimeStart();
            }

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                // 장바구니 담기
                if(fvFocus == 1) {
                    console.log("장바구니 담기..");
                }

                // 상품 상세보기
                else if(fvFocus == 2) {
                    console.log("=====================================================");
                    console.log("=====================================================");
                    console.log("상품 상세보기..var fvCode = "+fvCode);
                    console.log("currentOrderedProductPage2 = "+currentOrderedProductPage2);
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
                        requestCategoryDtlId="11000";
                        requestCategoryDtlCode = "사과/배";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-2기획전_문어"){
                        requestCategoryDtlId="54009";
                        requestCategoryDtlCode = "생선/해산물";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-3기획전_한우"){
                        requestCategoryDtlId="41000";
                        requestCategoryDtlCode = "소고기";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-4기획전_활전복"){
                        requestCategoryDtlId="54010";
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
                        requestCategoryDtlId="54011";
                        requestCategoryDtlCode = "생선/해산물";
                        //this.selectProductSubCategory();
                    }else if(bb == "2-8기획전_파프리카"){
                        requestCategoryDtlId="26000";
                        requestCategoryDtlCode = "파프리카/피망";
                        //this.selectProductSubCategory();
                    }
                    console.log("requestCategoryDtlId = "+fvId);
                    console.log("requestCategoryDtlCode = "+requestCategoryDtlCode);
                    location.href="product1.html?id="+requestCategoryDtlId+"&categoryDtlCode="+requestCategoryDtlCode;
                        

                    //지금 이상품 이가격 하단 페이징 첫페이지일때
                    if(currentOrderedProductPage2 == 0){

                    }else{

                    }
                    /*var url = "&categoryDtlCode=" + requestCategoryDtlCode
                                + "&id=" + requestCategoryDtlId;*/


                }

                // 닫기
                else if(fvFocus == 3) {
                    console.log("video1 state : " + videoPlayer.playState);
                    console.log("video2 state : " + videoPlayer2.playState);
                    isFullVideo = false;
                    fvFocus = 1;
                    //this.videoStop();
                    $('#popup_fv').hide();
                    $('#btn_close').removeClass('focus');
                    $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
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
                this.shopperRealTimeStart();
            }

            // **************************************************
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode === global.VK_GREEN) {
                isCart = false;
                $('#wrap').html(cartHtml); // 백업한 html 을 다시 복구
                
                /*if(currentFocusList == 0) $('#pj_left').addClass('focus');
                if(currentFocusList == 2) $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                if(currentFocusList == 3) $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                if(currentFocusList == 4) $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                if(currentFocusList == 5) $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');*/
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
                    if(url == "/video/tv/product_event/2-6기획전_치킨.mp4"){
                        console.log("지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 치킨영상 재생 url"+url);
                        this.videoPlay(url, Number(currentFocusMenu+2), 1);
                    }
                    else{
                         console.log("지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 영상 url"+url);   
                         this.videoPlay(url, Number(currentFocusMenu+2), 1);
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
            console.log("# 팝업 X : " + keyCode);
            console.log("# 팝업 X : " + VK_BLUE);
            // **************************************************
            // * ▶ KEY (쇼퍼리얼타임 테스트)
            // **************************************************
            if(keyCode === global.VK_BLUE) {
                this.shopperRealTimeStart();
            }

            // **************************************************
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode === global.VK_GREEN) {
                isCart = true;
                cartHtml = $('#wrap').html(); // 간편 장바구니에 들어갈 부분의 html 백업 (간편 장바구니 해제 후에 다시 돌려두어야함)
                $('#wrap').load("easy_cart.html");
                $('#ecc_payments').addClass('focus');

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
                location.href = "exhb.html";
            }

            // **************************************************
            // * ▶ KEY (장바구니 담기, 상품은 담고 세트는 리스트 호출?)
            // **************************************************
            /*if(keyCode === global.VK_BLUE) {
                // 저렴한 상품 추천
                if(currentFocusList == 3) {
                    console.log("저렴한 상품 추천 장바구니 담기 : " + currentFocusDtl1);
                }

                // 할인율 최고
                if(currentFocusList == 4) {
                    console.log("할인율 최고 장바구니 담기 : " + currentFocusDtl2);
                }

                // 추천 세트
                if(currentFocusList == 5) {
                    console.log("추천세트 장바구니 담기 : " + currentFocusDtl3);
                }
            }*/

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
                        this.selectProductSubCategory(requestCategoryDtlCode,11000);
                    }else if(bb == "2-2기획전_문어"){
                        //requestCategoryDtlId="54009";
                        requestCategoryDtlCode = "생선/해산물";
                        this.selectProductSubCategory(requestCategoryDtlCode,54009);
                    }else if(bb == "2-3기획전_한우"){
                        //requestCategoryDtlId="41000";
                        requestCategoryDtlCode = "소고기";
                        this.selectProductSubCategory(requestCategoryDtlCode,41000);
                    }else if(bb == "2-4기획전_활전복"){
                        //requestCategoryDtlId="54010";
                        requestCategoryDtlCode = "생선/해산물";
                        this.selectProductSubCategory(requestCategoryDtlCode,54010);
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
                        this.selectProductSubCategory(requestCategoryDtlCode,54011);
                    }else if(bb == "2-8기획전_파프리카"){
                        //requestCategoryDtlId="26000";
                        requestCategoryDtlCode = "파프리카/피망";
                        this.selectProductSubCategory(requestCategoryDtlCode,26000);
                    }








                    console.log("전체 영상보기 영상 재생 url : "+url);
                    console.log("전체 영상보기 영상 재생 fvId : "+fvId);
                    this.videoPlay(url, Number(currentFocusMenu+2), 2);
                }
                //단골쇼퍼
                if(currentFocusList == 5) {
                    //쇼퍼
                    if(currentFocusDtl3 == 0) {
                        // 쇼퍼's Bag으로 이동
                        location.href = "shopper_bag.html";        
                    }
                    //추천세트
                    else if(currentFocusDtl3 == 1){
                        /** 전체 카테고리로 이동 */
                        location.href = "category.html";
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
                            if(currentOrderedProductPage2 == 0) {
                                    console.log("##### 첫페이지임 ..");
                                }
                                // 마지막 페이지 아닐 때
                            else {
                                console.log("##### 마지막 페이지 아닐 때..");
                                //$('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                //$('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                                //currentFocusDtl2 = currentFocusDtl2 - 1;
                                //$('a[name="arrow_top"]').addClass('focus'); 
                                this.pagingOrderedProduct2(Number(currentOrderedProductPage2-1));

                                var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val(); 
                                this.videoPlay(url, Number(currentFocusMenu+2), 1);
                                console.log("VK_DOWN 지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 영상 재생 url"+url);
                            }


                        } else if(prevPageYN1 == false) {
                            // 전 페이지 없음
                            console.log("지금 이상품 이가격 : 전 페이지 없음");
                        }
                    }

                    // 저렴한 상품 추천
                    else if(currentFocusList == 3) {
                        if(currentFocusDtl1 == 0) {//1행
                            if(prevPageYN2 == true) {
                                // 전 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 조회");
                                console.log("currentOrderedProductPage : "+currentOrderedProductPage);
                                console.log("totalOrderedPage : "+totalOrderedPage);
                                    // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage == 0) {
                                    console.log("##### 첫페이지임 ..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    //$('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                                    //$('a[name="arrow_top"]').addClass('focus');  
                                    this.pagingOrderedProduct(currentOrderedProductPage-1);

                                    currentFocusDtl1 = currentFocusDtl1 + 1; 
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);

                                }
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                                /*if(currentOrderedProductPage == totalOrderedPage) {
                                    console.log("##### 더 이상 이동할 페이지 없음.22.");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때.22.2");
                                    this.pagingOrderedProduct(currentOrderedProductPage-1);
                                }*/
                            }
                        }
                        else if(currentFocusDtl1 == 1) {//2행
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            
                            currentFocusDtl1 = currentFocusDtl1 - 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl1 == 2) {
                            $('a[name="arrow_bottom"]').removeClass('focus');  
                            currentFocusDtl1 = currentFocusDtl1 - 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        }

                    }

                    // 할인율 최고
                    else if(currentFocusList == 4) {
                        console.log("UP 할인율 최고 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl2 == 0) {//1행
                            if(prevPageYN2 == true) {
                                // 전 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 조회");
                                if(currentOrderedProductPage == 0) {
                                    console.log("##### 첫페이지임 ..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                                    
                                    //$('a[name="arrow_top"]').addClass('focus');  
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage-1));
                                    currentFocusDtl2 = currentFocusDtl2 + 1;
                                     $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
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
                            currentFocusDtl2 = currentFocusDtl2 - 1;
                            //currentFocusDtl3 = currentFocusDtl2;
                            console.log("UP 할인율최고 2행->1행 currentFocusDtl2==>"+currentFocusDtl2);
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl2 == 2) {
                            $('a[name="arrow_bottom"]').removeClass('focus');  
                            currentFocusDtl2 = currentFocusDtl2 - 1;
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
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
                                //$('li[name="shooperImg"]').removeClass('focus');
                                //currentFocusDtl3 = currentFocusDtl3 - 1;
                                //$('a[name="arrow_top"]').addClass('focus');  
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                            }
                            
                        }
                        else if(currentFocusDtl3 == 1) {
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
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
                            if(currentOrderedProductPage2 == totalOrderedPage2) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                            }
                            // 마지막 페이지 아닐 때
                            else {
                                console.log("##### 마지막 페이지 아닐 때..");
                                //$('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                                //currentFocusDtl1 = currentFocusDtl1 + 1; 
                                //$('a[name="arrow_bottom2"]').addClass('focus'); 
                               
                                this.pagingOrderedProduct2(Number(currentOrderedProductPage2+1));
                                 var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                                console.log("VK_DOWN 지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 영상 재생 url"+url);
                                this.videoPlay(url, Number(currentFocusMenu+2), 1);

                            }
                        } else if(nextPageYN1 == false) {
                            // 다음 페이지 없음
                            console.log("지금 이상품 이가격 : 다음 페이지 없음");
                        }
                   }



                   // 저렴한 상품 추천
                   else if(currentFocusList == 3) {
                        if(currentFocusDtl1 == 0) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            currentFocusDtl1 = currentFocusDtl1 + 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl1 == 1) {
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                                // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage == totalOrderedPage) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty(); 
                                    //$('a[name="arrow_bottom"]').addClass('focus'); 
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage+1));
                                    currentFocusDtl1 = currentFocusDtl1 - 1; 
                                    $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                                    $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                                }



                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                                /*// 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage == totalOrderedPage) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage+1));
                                }*/
                            }
                        }
                        else if(currentFocusDtl1 == -1) {
                            $('a[name="arrow_top"]').removeClass('focus');
                            currentFocusDtl1 = currentFocusDtl1 + 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        }
                   }

                   // 할인율 최고
                   else if(currentFocusList == 4) {
                        console.log("DOWN 할인율 최고 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl2 == 0) {
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            currentFocusDtl2 = currentFocusDtl2 + 1;
                            currentFocusDtl3 = currentFocusDtl2;
                            console.log("DOWN할인율 최고1행->2행!! currentFocusDtl2? : "+currentFocusDtl2);
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl2 == 1) {
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");

                                // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage == totalOrderedPage) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                     $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty(); 
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage+1));
                                    currentFocusDtl2 = currentFocusDtl2 - 1; 
                                    $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                                    $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);

                                }
                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                                /*// 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage == totalOrderedPage) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage+1));
                                }*/

                            }
                        }
                        else if(currentFocusDtl2 == -1) {
                            $('a[name="arrow_top"]').removeClass('focus');
                            currentFocusDtl2 = currentFocusDtl2 + 1; 
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
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
                        }
                        else if(currentFocusDtl3 == 1) {
                            console.log("DOWN추천세트2행->없어");
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                                //$('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                                //$('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty(); 
                                //currentFocusDtl3 = currentFocusDtl3 + 1; 
                                //$('a[name="arrow_bottom"]').addClass('focus');  

                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                            }
                        }
                        else if(currentFocusDtl3 == -1) {
                            $('a[name="arrow_top"]').removeClass('focus');
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
                            //videoPlayer.stop();

                            //전체 카테고리로 이동 
                            //$('#span_videoDiv').append('<img src="../images/sample_02.jpg" style="width : 610px; height : 343px;"/>');
                            videoPlayer.stop();
                            $('#span_videoDiv').append('<img src="../images/sample_02.jpg" style="width : 610px; height : 343px;"/>');
                            location.href = "category.html";
                            //$('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            //currentFocusList = 0;
                            //$('#pj_left').addClass('focus');

                        // 지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단)
                        } 
                        else if(currentFocusMenu > 0) {
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            console.log("currentFocusMenu-> url"+currentFocusMenu);
                            currentFocusMenu = currentFocusMenu - 1;
                            fvCode = currentFocusMenu; // TODO : 나중에 타임세일 코드 넣어야함
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                            
                            var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                            //url : 치킨일땐 이미지 뿌리기                           
                            if(url == "/video/tv/product_event/2-6기획전_치킨.mp4"){
                                console.log("지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 치킨영상 재생 url"+url);
                                this.videoPlay(url, Number(currentFocusMenu+2), 1);
                            }
                            else{
                                 console.log("지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단) 영상 url"+url);   
                                 this.videoPlay(url, Number(currentFocusMenu+2), 1);
                            }
                            
                        


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
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            currentFocusList = 2;
                            currentFocusMenu = 3;
                            fvCode = currentFocusMenu; // TODO : 차후에 상품 코드 넣어야함
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');

                            var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                            console.log("저렴한 상품 (2) -> 지금 이상품 이가격(하단 오른쪽) 영상 재생 url"+url);
                            this.videoPlay(url, Number(currentFocusMenu+2), 1);
                        }
                    }

                    // 할인율 최고 -> 저렴한 상품 추천
                    else if(currentFocusList == 4) {
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                        currentFocusList = 3;
                        currentFocusDtl1 = currentFocusDtl2; // 할인율 최고 선택 순서가 그대로 저렴한 상품 추천으로 이동
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                        $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
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
                        }
                        else if(currentFocusDtl3 ==1){
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                            //$('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            //$('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                            currentFocusList = 4;
                            currentFocusDtl2 = currentFocusDtl3; // 추천 세트 선택 순서가 그대로 할인율 최고로 이동
                            console.log("단골쇼퍼2행 -> 할인율 최고2행!! currentFocusDtl2? : "+currentFocusDtl2);
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
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
                            currentFocusMenu = currentFocusMenu + 1;
                            fvCode = currentFocusMenu; // TODO : 차후에 상품 코드 넣어야함
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');

                            var url = $('li[name="sl_menu"]').eq(currentFocusMenu).children('.tv_video').val();
                            console.log("지금 이상품 이가격(하단) -> 지금 이상품 이가격(하단) or 저렴한 상품 추천 영상 재생 url"+url);
                            this.videoPlay(url, Number(currentFocusMenu+2), 1);
                        }

                        // 지금 이상품 이가격(하단 오른쪽) -> 저렴한 상품 추천
                        else if(currentFocusMenu == 3) {
                            //this.videoStop();
                            //videoPlayer.stop();

                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusList = 3;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        }

                    }

                    // 저렴한 상품 추천 -> 할인율 최고
                    else if(currentFocusList == 3) {
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                        $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                        currentFocusList = 4;
                        currentFocusDtl2 = currentFocusDtl1;
                        console.log("저렴한 상품 추천 -> 할인율 최고 currentFocusDtl2? : "+currentFocusDtl2);
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                    }

                    // 할인율 최고 -> 단골쇼퍼
                    else if(currentFocusList == 4) {
                        console.log("RIGHT 할인율 최고 -> 단골쇼퍼 currentFocusDtl2? : "+currentFocusDtl2+"currentFocusDtl3? : "+currentFocusDtl3);
                        if(currentFocusDtl2 ==0){
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
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
                            currentFocusList = 5;
                            currentFocusDtl3 = currentFocusDtl2;
                            console.log("할인율 최고2행 -> 단골쇼퍼2행!!!! currentFocusDtl3? : "+currentFocusDtl3);
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill); 
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
            if(url == "/video/tv/product_event/2-6기획전_치킨.mp4"){
                console.log("치킨!!!! : "+url);
               // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
                $('#span_videoDiv').empty().append('<img src="'+cmsServerIp+'/video/tv/product_event/2-6기획전_치킨.png" style="width : 610px; height : 343px;"/>');
            }
            else{
                console.log("치킨아님!!!! : "+url);
            // 테스트용 영상
            url = "http://14.52.244.91:8080" + url;
                videoPlayer.width = 610;
                videoPlayer.height = 343;
                $('#span_videoDiv').empty()
                document.getElementById('span_videoDiv').appendChild(videoPlayer);
                videoPlayer.data = url;
                videoPlayer.play(1);
            }

            
        }
        // 전체 영상보기
        else if(type == 2) {
            //url : /video/tv/product_event/2-6기획전_치킨.mp4 일때 
            if(url == "/video/tv/product_event/2-6기획전_치킨.mp4"){
                // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)]
                $('#p_videoDiv').empty().append('<img src="'+cmsServerIp+'/video/tv/product_event/2-6기획전_치킨.png" style="width : 970px; height : 545px;"/>');
            }
            else{
            // 테스트용 영상
            url = "http://14.52.244.91:8080" + url;
            videoPlayer2.width = 970;
            videoPlayer2.height = 545;
            $('#p_videoDiv').empty()
            document.getElementById('p_videoDiv').appendChild(videoPlayer2);
            videoPlayer2.data = url;
            videoPlayer2.play(1);
            }
            
        }
    },

    // 영상 정지
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
                        $('li[name="pd_img"]').eq(index).empty().html('<img src="'+cmsServerIp + entry['img']+'"/>');
                        $('li[name="pd_name"]').eq(index).empty().html(entry['name']);
                        $('li[name="pd_cost"]').eq(index).empty().html(cn_toPrice(entry['cost']) + "원"); 
                        appendHtml = {
                                        "sales_won" : cn_toPrice(entry['sales_won']),
                                        "img" : entry['img'],
                                        "name" : entry['name'],
                                        "cost" : cn_toPrice(entry['cost']) + "원"
                                     };
                    cnt                 = Math.floor(index / maxOrderedPageView);
                    var str             = Number(index+1) + ". " +appendHtml;

                    productList[index]    = appendHtml;
                    //console.log("index : " + index + " maxOrderedPageView : " + maxOrderedPageView + " cnt : " + cnt);
                });


                // 총 페이지 수
                totalOrderedPage = cnt;
                if(totalOrderedPage == 0){ // 페이지수=0 : 전페이지/다음페이지 없음
                    prevPageYN2 = false;
                    nextPageYN2 = false;
                }else{
                    prevPageYN2 = true;
                    nextPageYN2 = true;

                }
                console.log("총페이지수: " + totalOrderedPage);
                
                //$('li[name="li_discount1"]').empty().append(productList[currentOrderedProductPage]);

                //1일때/1이상일때 currentFocusDtlPage--??
                //$('li[name="li_discount1"]').empty().append("<B>" + Number(currentOrderedProductPage+1) + "</b> / " + Number(totalOrderedPage+1));

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
                console.log("######## 할인율최고 결과 : " + JSON.stringify(result));
                productList2 = new Array(); // 구매 리스트 초기화
                var cnt = 0;
                $.each(result['product'], function(index, entry) {
                        $('span[name="pd_sales_percentage"]').eq(index).empty().html(entry['sales_percentage']+"%");
                        $('li[name="pd_img2"]').eq(index).empty().html('<img src="'+cmsServerIp + entry['img']+'"/>');
                        $('li[name="pd_name2"]').eq(index).empty().html(entry['name']);
                        $('li[name="pd_cost2"]').eq(index).empty().html(cn_toPrice(entry['cost']) + "원");
                        appendHtml = {
                                        "sales_percentage" : entry['sales_percentage'],
                                        "img2" : entry['img'],
                                        "name2" : entry['name'],
                                        "cost2" : cn_toPrice(entry['cost']) + "원"
                                     };
                        
                    cnt                 = Math.floor(index / maxOrderedPageView);
                    var str             = Number(index+1) + ". " +appendHtml;
                    //productList[cnt]    = (productList[cnt] + str).replace("undefined", "");
                    productList2[index]    =  appendHtml;
                    //console.log("index : " + index + " maxOrderedPageView : " + maxOrderedPageView + " cnt : " + cnt);
                });

                // 총 페이지 수
                totalOrderedPage = cnt;
                if(totalOrderedPage == 0){ // 페이지수=0 : 전페이지/다음페이지 없음
                    prevPageYN2 = false;
                    nextPageYN2 = false;
                }else{
                    prevPageYN2 = true;
                    nextPageYN2 = true;

                }
                console.log("총페이지수: " + totalOrderedPage);

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
        appendHtml2 += '<span class="dm_bdr"></span>';
        appendHtml2 += '<ul>';
        appendHtml2 += '<li class="dlm_img" name="shooperImg2"></li>';
        appendHtml2 += '<li class="dlm_tit" name="shopper_product"></li>';
        appendHtml2 += '<li class="dlm_price">24,900원</li>';
        appendHtml2 += '</ul>';
        
        if(Math.floor(Math.random() * 2) == 0) {shopperImg = '<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_김미나.png" />'; shopperName="김미나 쇼퍼";}
        else  {shopperImg ='<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_이순자.png" />'; shopperName="이순자 쇼퍼";}
        if(Math.floor(Math.random() * 2) == 0)  {shopperSet = '<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼세트_닭볶음탕.jpg" />';shopperProduct = "닭볶음탕";} 
        else  {shopperSet ='<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼세트_소고기샤브샤브2.jpg" />'; shopperProduct = "소고기샤브샤브"; }

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
                    console.log("index : " + index + " maxOrderedPageView2 : " + maxOrderedPageView2 );
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
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                        console.log("img-->"+img);
                        console.log("img2-->"+img2);
                        console.log("ip+img2-->"+cmsServerIp+img2);
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                        $('span[name="slp_flag"]').eq(index).empty().html(entry['flag']);
                        $('li[name="slp_title"]').eq(index).empty().html(entry['title']);
                        $('input[name="tv_video"]').eq(index).val(entry['tv_video']);
                        $('li[name="sl_img"]').eq(index).empty().html('<img class="sl_menu_img" src="'+cmsServerIp +img2+'"/>');
                        $('input[name="sl_id"]').eq(index).val(entry['product_id']);
                        //$('li[name="sl_img"]').eq(index).empty().html('<img src="'+cmsServerIp + entry['img']+'"/>');

                        video[index] = entry['tv_video'];
                        console.log("###################################################################################### video success url : " + video[1]);

                        appendHtml = {
                                        "flag" : entry['flag'],
                                        "title" : entry['title'],
                                        "tv_video" : entry['tv_video'],
                                        "img" : entry['img'],
                                        "product_id" : entry['product_id'] 
                                     };
                    cnt                 = Math.floor(index / maxOrderedPageView2);
                    var str             = appendHtml;
                    productList3[index]    = str;
                    console.log("index : " + index + " maxOrderedPageView2 : " + maxOrderedPageView2 + " cnt : " + cnt);
/*
                    cnt                 = Math.floor(pindex / maxOrderedPageView);
                    var str             = Number(pindex+1) + ". " + pentry['name']  + " " + pentry['standard'] + " " +  pentry['cost'] + "원 (수량 : " +  pentry['cnt'] + ")<br /><br />";
                    productList[cnt]    = (productList[cnt] + str).replace("undefined", "");*/


                });


                // 총 페이지 수
                totalOrderedPage2 = cnt;
                if(totalOrderedPage2 == 0){ // 페이지수=0 : 전페이지/다음페이지 없음
                    prevPageYN1 = false;
                    nextPageYN1 = false;
                }else{
                    prevPageYN1 = true;
                    nextPageYN1 = true;

                }
                console.log("총페이지수: " + totalOrderedPage2);

                
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
        currentOrderedProductPage = page;
        
        console.log("########리스트 페이지 이동 currentOrderedProductPage : " + currentOrderedProductPage);
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

        //저렴한 상품추천 1행
        $('span[name="pd_sales_won"]').eq(0).empty().append(productList[page*2].sales_won);
        $('li[name="pd_img"]').eq(0).empty().append('<img src="' + cmsServerIp + productList[page*2].img + '"/>');
        $('li[name="pd_name"]').eq(0).empty().append(productList[page*2].name);
        $('li[name="pd_cost"]').eq(0).empty().append(productList[page*2].cost);
        //저렴한 상품추천 2행
        $('span[name="pd_sales_won"]').eq(1).empty().append(productList[(page*2)+1].sales_won);
        $('li[name="pd_img"]').eq(1).empty().append('<img src="' + cmsServerIp + productList[(page*2)+1].img + '"/>');
        $('li[name="pd_name"]').eq(1).empty().append(productList[(page*2)+1].name);
        $('li[name="pd_cost"]').eq(1).empty().append(productList[(page*2)+1].cost);


        //할인율 최고 1행
        $('span[name="sales_percentage"]').eq(0).empty().append(productList2[page*2].sales_percentage);
        $('li[name="pd_img2"]').eq(0).empty().append('<img src="' + cmsServerIp + productList2[page*2].img2 + '"/>');
        $('li[name="pd_name2"]').eq(0).empty().append(productList2[page*2].name2);
        $('li[name="pd_cost2"]').eq(0).empty().append(productList2[page*2].cost2);
        //할인율 최고 2행
        $('span[name="sales_percentage"]').eq(1).empty().append(productList2[(page*2)+1].sales_percentage);
        $('li[name="pd_img2"]').eq(1).empty().append('<img src="' + cmsServerIp + productList2[(page*2)+1].img2 + '"/>');
        $('li[name="pd_name2"]').eq(1).empty().append(productList2[(page*2)+1].name2);
        $('li[name="pd_cost2"]').eq(1).empty().append(productList2[(page*2)+1].cost2);

        
    },
    // 지금 이상품 이가격 하단 리스트 페이지 이동
    pagingOrderedProduct2 : function(page) {
        // 현재 페이지
        currentOrderedProductPage2 = page;
        console.log("########리스트 페이지 이동 currentOrderedProductPage2 : " + currentOrderedProductPage2);
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
            console.log("ip+img2-->"+cmsServerIp+img2);
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            console.log("(page*4)+i : "+ Number((page*4)+i));    
            $('span[name="slp_flag"]').eq(i).empty().html(productList3[Number((page*4)+i)].flag);
            $('li[name="slp_title"]').eq(i).empty().html(productList3[Number((page*4)+i)].title);
            $('input[name="tv_video"]').eq(i).val(productList3[Number((page*4)+i)].tv_video);
            $('li[name="sl_img"]').eq(i).empty().html('<img class="sl_menu_img" src="'+cmsServerIp +img2+'"/>');
            $('input[name="sl_id"]').eq(i).val(productList3[Number((page*4)+i)].tv_videoproduct_id);
            //$('li[name="sl_img"]').eq(i).empty().html('<img src="'+cmsServerIp + productList3[Number((page*4)+i)].img+'"/>');
            //$('input[name="tv_video"]').eq(index).val(entry['tv_video']);
        }


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
                // 리스트에 뿌려주는건 9개씩 따로 해줌
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
                $('span[name="shopper_img"]').empty().append("<img src=" + cmsServerIp + result['shopper']['img'] + " width='160' height='120' />");
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
        $('#wrap').load("shopper_real_time.html");
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
        $('#wrap').load("shopper_real_time_start.html");

        $('#rtStart_video').addClass('focus');
    },

    // 쇼퍼 리얼 타임 종료
    shopperRealTimeEnd: function() {
        isRealTime             = false;
        isRealTimeStart        = false;
        isRealTimeEnd          = true;
        isRealTimeEndComplete  = false;

        rtEndHtml = $('#wrap').html();                      // <쇼퍼 리얼 타임>
        $('#wrap').load("shopper_real_time_end.html");

        $('#rtEnd_submit').addClass('focus');
    },

    // 쇼퍼 리얼 타임 종료 완료
    shopperRealTimeEndComplete: function() {
        isRealTime             = false;
        isRealTimeStart        = false;
        isRealTimeEnd          = false;
        isRealTimeEndComplete  = true;

        rtEndCompleteHtml = rtHtml;                         // 현재 화면
        $('#wrap').load("shopper_real_time_end_complete.html");

        $('#rtEndComplete_submit').addClass('focus');
    }
});