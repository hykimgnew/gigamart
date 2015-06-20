'use strict';

var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();
var resultSet;

// 숫자 -> 금액
function cn_toPrice(n) {
    if(isNaN(n)){return 0;}
    var reg = /(^[+-]?\d+)(\d{3})/;   
    n += '';
    while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

// 상품 리스트 레이아웃 생성
function makeProduct() {

    var appendHtml =  '<li name="li_discount" class="dl_menu mg_r5">';
        appendHtml += '    <span></span>';
        appendHtml += '    <span></span>';
        appendHtml += '    <span class="dm_bdr"></span>';
        appendHtml += '    <ul>';
        appendHtml += '       <li name="li_img" class="dlm_img"></li>';
        appendHtml += '       <li name="li_name" class="dlm_tit"></li>';
        appendHtml += '       <li name="li_cost" class="dlm_price"></li>';
        appendHtml += '    </ul>';
        appendHtml += '</li>';

        /*<li name="li_discount1" class="dl_menu mg_r5">
            <span class="polygon_bb">소량<br />구매</span>
            <span class="polygon_l">200원 <img src="../images/icon_shift.png" /></span>
            <span class="dm_bdr"><img src="../images/btn_ok_fill.png"/></span>
            <ul>
                <li class="dlm_img"><img src="../images/sample_08.png" /></li>
                <li class="dlm_tit">달달한 사과</li>
                <li class="dlm_price">24,900원</li>
            </ul>
        </li>*/

    $('ul[name="ul_discount"]').append(appendHtml);
}

// 빈 리스트 레이아웃 생성
function makeEmptyProduct() {

    var appendHtml =  '<li name="li_empty" class="dl_menu mg_r5">';
        appendHtml += '    <span></span>';
        appendHtml += '    <span></span>';
        appendHtml += '    <span class="dm_bdr"></span>';
        appendHtml += '    <ul>';
        appendHtml += '       <li name="li_img" class="dlm_img"></li>';
        appendHtml += '       <li name="li_name" class="dlm_tit"></li>';
        appendHtml += '       <li name="li_cost" class="dlm_price"></li>';
        appendHtml += '    </ul>';
        appendHtml += '</li>';

    $('ul[name="ul_discount"]').append(appendHtml);
}

// 우측 상품정보 갱신
function updateProductInfo() {
    var idx = currentFocusDtl + (resultSet.length * currentFocusDtlPage);
        
    console.log("############ 동영상 : " + cmsServerIp + resultSet[idx]["video"]);
    console.log("############ 이미지 : " + cmsServerIp + resultSet[idx]["img"]);

    $('#cif_vod').empty().append('<img src="' + cmsServerIp + resultSet[idx]["img"] + '" width="448" height="253" />');
    $('#cif_exp').empty().append(resultSet[idx]["name"]);
    $('#cif_exp_txt').empty().append(resultSet[idx]["description"]);
    $('#cif_exp_price_glm').empty().append("(" + resultSet[idx]["standard"] + ")");
    $('#cif_exp_price_won').empty().append(cn_toPrice(resultSet[idx]["cost"]) + "원");

    // 영상이 있으면
    /*if(resultSet[idx]["video"] != null && resultSet[idx]["video"] != '' && resultSet[idx]["video"] != 'undefined') {
        var url = cmsServerIp + resultSet[idx]["video"];
        videoPlay(url);
    } */
    // 영상 없으면
    /*else {
        $('#cif_vod').empty().append('<img src="' + cmsServerIp + resultSet[idx]["img"] + '" width="448" height="253" />');
    }*/
}

// 서브카테고리 배열
function setSubCategory() {
    console.log("############## 카테고리 : " + requestCategoryCode);

    if(requestCategoryCode == '과일') {
        arrSubCategory = [ "사과/배", "참외/토마토", "키위/딸기/멜론/수박", "귤/한라봉/천혜향", "바나나/오렌지/외국과일", "복분자/블루베리", "견과/견과" ];
    }

    else if(requestCategoryCode == '채소') {
        arrSubCategory = [ "고구마/감자/호박", "파/양파/마늘/생강", "당근/오이/가지/고추", "배추/양배추/무", "쌈 채소/기타", "파프리카/피망", "표고/송이/버섯류", "나물류/새순" ];
    }

    else if(requestCategoryCode == '유제품/두부/계란') {
        arrSubCategory = [ "우유", "두유", "요구르트", "버터/치즈/마가린", "두부", "계란/메추리알" ];
    }

    else if(requestCategoryCode == '정육') {
        arrSubCategory = [ "소고기", "돼지고기", "닭/오리", "양념육/육포" ];
    }

    else if(requestCategoryCode == '수산물/건어물') {
        arrSubCategory = [ "생선/해산물", "멸치/건새우/건어", "미역/김/해조류", "어포/안주류" ];
    }

    else if(requestCategoryCode == '쌀/잡곡/견과') {
        arrSubCategory = [ "쌀", "찹쌀/현미" ];
    }

    else if(requestCategoryCode == '건강/친환경/유기농') {
        arrSubCategory = [ "홍삼/건강식품", "친환경/유기농샵" ];
    } 

    else if(requestCategoryCode == '가공식품') {
        arrSubCategory = [ "즉석/간편식/햄/통조림", "라면/국수/면류", "생수/커피/차/음료", "조미료/향신료/장류", "과자", "사탕/초콜릿/껌", "빵/식빵/케익/잼" ];
    }

    updateSubCategoryTitle(); // 제목 Set
}

// 서브카테고리 제목 Set
function updateSubCategoryTitle() {
    console.log("############ 카테고리 배열 cnt : " + arrSubCategory.length);
    for(var i=0 ; i < arrSubCategory.length ; i++) {
        if(arrSubCategory[i] == requestCategoryDtlCode) {
            console.log("#### 카테고리 : " + i + " : " + requestCategoryDtlCode);
            $('div[name="sd_first_tit"]').empty().append(arrSubCategory[i]);

            // 마지막 항목이면
            if(i == arrSubCategory.length-1) {
                console.log("#### 카테고리 마지막 ");
                $('div[name="sd_second"]').hide(); // second 감춤
                $('div[name="sd_third"]').hide(); // third 감춤
            }

            // 마지막에서 두번째 항목이면
            else if(i == arrSubCategory.length-2) {
                console.log("#### 카테고리 마지막에서 두번째 ");
                $('div[name="sd_third"]').hide(); // third 감춤
                $('div[name="sd_second"]').empty().append(arrSubCategory[i+1]);
            }

            // 마지막에서 세번째 항목 이전이면
            else if(i < arrSubCategory.length-2) {
                console.log("#### 카테고리 마지막에서 세번째보다 작으면.. ");
                $('div[name="sd_second"]').empty().append(arrSubCategory[i+1]);
            }
            
        }
    }
}



/**
 *  Category Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.category_dtl.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        this.selectProductSubCategory();

        // 메뉴명 표기
        


        // 당일 판매현장 시각
        $('#ci_title').html("당일 판매현장 " + this.getCurrentDate());
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
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode == VK_GREEN) {
                isCart = false;
                $('#wrap').html(cartHtml); // 백업한 html 을 다시 복구

                if(currentFocusMenu >= 4) {
                    this.videoPlay("test", currentFocusMenu); // 영상 재생
                }

                /*if(videoPlayer.playState != 'undefined') {
                    if(videoPlayer.playState == 0 ) videoPlayer.play(1); // 영상 다시 재생
                }*/
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
        // * 팝업 없을 때
        // *****************************************************************************
        else if(isCart == false) {
            // **************************************************
            // * 三 KEY (간편 장바구니)
            // **************************************************
            if(keyCode == VK_GREEN) {

                if(currentFocusMenu >= 4) {
                    this.videoStop(); // 영상 재생 중지
                }
                /*if(videoPlayer.playState != 'undefined') {
                    if(videoPlayer.playState != 0 ) this.videoStop(); // 영상 재생 중지
                }
                */
                isCart = true;
                cartHtml = $('#wrap').html(); // 간편 장바구니에 들어갈 부분의 html 백업 (간편 장바구니 해제 후에 다시 돌려두어야함)
                $('#wrap').load("easy_cart.html");
                $('#ecc_payments').addClass('focus');
            }

            // **************************************************
            // * ◀ KEY (플로팅 Go home)
            // **************************************************
            if(keyCode == VK_RED) {
                location.href ="exhb.html"; // 기획전 이동
            }
            // **************************************************
            // * ◀|| KEY (카테고리 Go home)
            // 
            if(keyCode == VK_PLAY) {
                location.href ="category.html"; // 기획전 이동
            }    
            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                console.log("############ VK_ENTER 1234");
                console.log("currentFocusList"+currentFocusList);
                console.log("currentFocusBtn"+currentFocusBtn);
                
                /**********test용****************/
                //location.href ="product1.html";
                /*******************************/

                // 상세 카테고리 일때
                if(currentFocusList == 0) {
                    console.log("############ VK_ENTER 2222");
                    location.href ="product1.html";
                }
                else if(currentFocusList == 3){
                    console.log("아래쪽버튼 focus일때");
                    //아래쪽버튼 focus일때
                    if(currentFocusBtn == 0) {
                        $('div[name="sd_first"]').hide();
                        $('div[name="selDepth"]').addClass("animation");
                        
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

                    // 상품 목록
                    if(currentFocusList == 0) {
                        // 첫번째 행 일때
                        if(verticalFocus == 0) { 
                            if(prevPageYN == true) {
                                // 전 페이지 조회
                                console.log("### 상세카테고리 : 전 페이지 조회");
                                this.selectProductSubPage(currentFocusDtlPage - 1); // 전 페이지 조회
                            }
                            else if(prevPageYN == false && currentFocusDtlPage <= 0) {
                                // 전 페이지 없음
                                console.log("상세카테고리 : 전 페이지 없음");
                            }
                        }

                        // 두번째, 세번째 행 일때
                        else if(verticalFocus >= 1 && verticalFocus < 3) {
                            $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();
                            
                            verticalFocus   = verticalFocus - 1;    // 행 감소
                            horizonFocus    = horizonFocus;         // 열 증감 없음
                            currentFocusDtl = currentFocusDtl - 3;  // 위치 변경
                            updateProductInfo();                    // 우측 상품 정보 갱신

                            $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                        }
                    }

                    //상세카테고리 화살표 버튼
                    else if(currentFocusList == 3) {
                        //아래쪽버튼 focus일때
                        if(currentFocusBtn == 0) {
                            $('li[name="mg_backward"]').removeClass('focus');  
                            $('li[name="mg_forward"]').addClass('focus');  
                            currentFocusBtn = 1;      
                        }
                    }    
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                   
                   // 상품 목록
                   if(currentFocusList == 0) {
                        // 첫번째, 두번째 행 일때
                        if(verticalFocus >= 0 && verticalFocus < 2) {
                            $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();

                            verticalFocus   = verticalFocus + 1;    // 행 증가
                            horizonFocus    = horizonFocus;         // 열 증감 없음
                            currentFocusDtl = currentFocusDtl + 3;  // 위치 변경
                            updateProductInfo();                    // 우측 상품 정보 갱신

                            $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                        }

                        // 세번째 행 일때
                        else if(verticalFocus == 2) {
                            if(nextPageYN == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                            }
                            else if(nextPageYN == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                            }
                        }
                   }

                    //상세카테고리 화살표 버튼
                    else if(currentFocusList == 3) {
                        //아래쪽버튼 focus일때
                        if(currentFocusBtn == 1) {
                            $('li[name="mg_forward"]').removeClass('focus');  
                            $('li[name="mg_backward"]').addClass('focus');  
                            currentFocusBtn = 0;      
                        }
                    }    


                }
                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {

                    // 상품 목록 일때
                    if(currentFocusList == 0) {
                        // 상품 목록 두번째, 세번째 열일 때
                        if(horizonFocus >= 1 && horizonFocus < 3) {
                            $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();

                            verticalFocus   = verticalFocus;        // 행 증감 없음
                            horizonFocus    = horizonFocus - 1;     // 열 감소
                            currentFocusDtl = currentFocusDtl - 1;  // 위치 변경
                            updateProductInfo();                    // 우측 상품 정보 갱신

                            $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                        }
                    }

                    // 상세카테고리 화살표 버튼
                    if(currentFocusList == 3) {
                        if(currentFocusBtn == 1) {
                            $('li[name="mg_forward"]').removeClass('focus');  
                            currentFocusBtn = 0;      
                        } else {
                            $('li[name="mg_backward"]').removeClass('focus'); 
                        }

                        currentFocusList = 0; // 상품 목록으로

                        $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                        $('li[name="li_discount"]:eq(' + currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                    }    
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    // 상품 목록 일때
                    if(currentFocusList == 0) {
                        // 상품 목록 첫번째, 두번째 열일 때
                        if(horizonFocus >= 0 && horizonFocus < 2) {
                            $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();

                            verticalFocus   = verticalFocus;        // 행 증감 없음
                            horizonFocus    = horizonFocus + 1;     // 열 증가
                            currentFocusDtl = currentFocusDtl + 1;  // 위치 변경
                            updateProductInfo();                    // 우측 상품 정보 갱신

                            $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                        }
                        
                        //상품목록 열3 -> back버튼
                        else if(horizonFocus == 2) {
                            $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();

                            currentFocusList = 3; // 화살표 버튼으로

                            $('li[name="mg_backward"]').addClass('focus');   
                        }
                    }
                }                
                
            } else if (keyCode === global.VK_BACK) {
                // 전체 카테고리로 이동
                this.transCategoryCode(); // 한글코드를 숫자코드로 변환 후 페이지 이동

                location.href = "category.html?categoryCode=" + requestCategoryCode + "&categoryDtlCode=" + requestCategoryDtlCode + "&categoryDtlPage=" + requestCategoryDtlPage;
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                
            }
        }
    },

    // 영상재생
    videoPlay: function(url) {
        // $('#videoDiv').empty().append('<img src="../images/sample_01.jpg" />');
        
        videoPlayer.width = 448;
        videoPlayer.height = 253;
        $('#cif_vod').empty()
        document.getElementById('cif_vod').appendChild(videoPlayer);
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

    addKeyEventActor: function (instance, conditionFunction) {
    	this.actors.push({
    		instance: instance,
    		conditionFunction: conditionFunction
    	});
    },

    // 변환 : 카테고리 코드 한글 -> 숫자 (CMS에서 한글 파라미터는 최대한 배제하는 편이..)
    transCategoryCode: function() {
        // 카테고리 코드
        if(requestCategoryCode == '과일')                 requestCategoryCode = 4;
        if(requestCategoryCode == '채소')                 requestCategoryCode = 5;
        if(requestCategoryCode == '유제품/두부/계란')     requestCategoryCode = 6;
        if(requestCategoryCode == '정육')                 requestCategoryCode = 7;
        if(requestCategoryCode == '수산물/건어물')        requestCategoryCode = 8;
        if(requestCategoryCode == '쌀/잡곡/견과')         requestCategoryCode = 9;
        if(requestCategoryCode == '건강/친환경/유기농')   requestCategoryCode = 10;
        if(requestCategoryCode == '가공식품')             requestCategoryCode = 11;

        // 상세카테고리 코드
        // 과일
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '사과/배')                 requestCategoryDtlCode = 0;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '참외/토마토')             requestCategoryDtlCode = 1;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '키위/딸기/멜론/수박')     requestCategoryDtlCode = 2;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '귤/한라봉/천혜향')        requestCategoryDtlCode = 3;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '바나나/오렌지/외국과일')  requestCategoryDtlCode = 4;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '복분자/블루베리')         requestCategoryDtlCode = 5;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '견과/견과')               requestCategoryDtlCode = 6;
        
        // 채소
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '고구마/감자/호박')        requestCategoryDtlCode = 0;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '파/양파/마늘/생강')       requestCategoryDtlCode = 1;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '당근/오이/가지/고추')     requestCategoryDtlCode = 2;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '배추/양배추/무')          requestCategoryDtlCode = 3;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '쌈 채소/기타')            requestCategoryDtlCode = 4;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '파프리카/피망')           requestCategoryDtlCode = 5;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '표고/송이/버섯류')        requestCategoryDtlCode = 6;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '나물류/새순') {
            requestCategoryDtlCode = 0;
            requestCategoryDtlPage = 1;
        }

        // 유제품/두부/계란
        if(requestCategoryCode == 6 && requestCategoryDtlCode == '우유')                    requestCategoryDtlCode = 0;
        if(requestCategoryCode == 6 && requestCategoryDtlCode == '두유')                    requestCategoryDtlCode = 1;
        if(requestCategoryCode == 6 && requestCategoryDtlCode == '요구르트')                requestCategoryDtlCode = 2;
        if(requestCategoryCode == 6 && requestCategoryDtlCode == '버터/치즈/마가린')        requestCategoryDtlCode = 3;
        if(requestCategoryCode == 6 && requestCategoryDtlCode == '두부')                    requestCategoryDtlCode = 4;
        if(requestCategoryCode == 6 && requestCategoryDtlCode == '계란/메추리알')           requestCategoryDtlCode = 5;

        // 정육
        if(requestCategoryCode == 7 && requestCategoryDtlCode == '소고기')                  requestCategoryDtlCode = 0;
        if(requestCategoryCode == 7 && requestCategoryDtlCode == '돼지고기')                requestCategoryDtlCode = 1;
        if(requestCategoryCode == 7 && requestCategoryDtlCode == '닭/오리')                 requestCategoryDtlCode = 2;
        if(requestCategoryCode == 7 && requestCategoryDtlCode == '양념육/육포')             requestCategoryDtlCode = 3;

        // 수산물/건어물
        if(requestCategoryCode == 8 && requestCategoryDtlCode == '생선/해산물')             requestCategoryDtlCode = 0;
        if(requestCategoryCode == 8 && requestCategoryDtlCode == '멸치/건새우/건어')        requestCategoryDtlCode = 1;
        if(requestCategoryCode == 8 && requestCategoryDtlCode == '미역/김/해조류')          requestCategoryDtlCode = 2;
        if(requestCategoryCode == 8 && requestCategoryDtlCode == '어포/안주류')             requestCategoryDtlCode = 3;

        // 쌀/잡곡/견과
        if(requestCategoryCode == 9 && requestCategoryDtlCode == '쌀')                      requestCategoryDtlCode = 0;
        if(requestCategoryCode == 9 && requestCategoryDtlCode == '찹쌀/현미')               requestCategoryDtlCode = 1;

        // 건강/친환경/유기농
        if(requestCategoryCode == 10 && requestCategoryDtlCode == '홍삼/건강식품')          requestCategoryDtlCode = 0;
        if(requestCategoryCode == 10 && requestCategoryDtlCode == '친환경/유기농샵')        requestCategoryDtlCode = 1;
        

        // 가공식품
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '즉석/간편식/햄/통조림')  requestCategoryDtlCode = 0;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '라면/국수/면류')         requestCategoryDtlCode = 1;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '생수/커피/차/음료')      requestCategoryDtlCode = 2;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '조미료/향신료/장류')     requestCategoryDtlCode = 3;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '과자')                   requestCategoryDtlCode = 4;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '빵/식빵/케익/잼')        requestCategoryDtlCode = 5;
    },

    // 갱신 : 상품정보
    updateProductInfo : function() {

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
                console.log("######## 상세카테고리 파라미터 : " + requestCategoryDtlCode);
                console.log("######## 상품목록 결과 개수 : " + result.length);

                resultSet = result;

                
                var result_len  = result.length;
                var empty_len   = 9 - result.length;

                // 결과값이 9보다 작으면 결과값 만큼만 상품 리스트를 뿌리고 빈 값으로 나머지를 채워준다.
                for(var i=0 ; i < result_len ; i++) {
                    makeProduct();
                }
                if(empty_len > 0) {
                    for(var i=0 ; i < empty_len ; i++) {
                        makeEmptyProduct();
                    }
                }

                // 결과값이 9보다 크면 다음 페이지 존재
                if(result_len > 9) {
                    nextPageYN = true;
                }
                
                // 결과값을 넣는다.
                $.each(result, function(index, entry) {
                    // 처음에 뿌려주는 9개만 넣는다.
                    if(index < result_len) {
                        $('li[name="li_img"]').eq(index).append('<img src="' + cmsServerIp + entry['img'] + '" />');
                        $('li[name="li_name"]').eq(index).append(entry['name']);
                        $('li[name="li_cost"]').eq(index).append(cn_toPrice(entry['cost']) + "원");
                    }
                });
            },
            error : function(){
                    console.log("에러");
            },
            complete  : function(result) {
                $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);

                // 서브카테고리 Set
                setSubCategory();

                // 우측 상품 영역 갱신
                updateProductInfo(); 

            }
        });
    },

    // 상세카테고리 페이지 변경
    selectProductSubPage: function() {
        resultSet;
    }



});