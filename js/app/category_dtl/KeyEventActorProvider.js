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

// 상세 카테고리 페이징 화살표 컨트롤
function pageArrowUtil1() {
    if(prevPageYN == false) $('#arrow_top').hide();
    else                    $('#arrow_top').show();

    if(nextPageYN == false) $('#arrow_bottom').hide();
    else                    $('#arrow_bottom').show();
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

    var appendHtml =  '<li name="li_empty">';
        /*appendHtml += '    <span></span>';
        appendHtml += '    <span></span>';
        appendHtml += '    <span></span>';
        appendHtml += '    <ul>';
        appendHtml += '       <li name="li_img" class="dlm_img"></li>';
        appendHtml += '       <li name="li_name" class="dlm_tit"></li>';
        appendHtml += '       <li name="li_cost" class="dlm_price"></li>';
        appendHtml += '    </ul>';*/
        appendHtml += '</li>';

    $('ul[name="ul_discount"]').append(appendHtml);
}

// 우측 상품정보 갱신
function updateProductInfo() {
    var idx = currentFocusDtl + (9 * currentFocusDtlPage);
        
    console.log("############ 동영상 : " + cmsServerIp + resultSet[idx]["video"]);
    console.log("############ 이미지 : " + cmsServerIp + resultSet[idx]["img"]);

    //resultSet[idx]["video"];

    $('#cif_vod').empty().append('<img src="' + cmsServerIp + resultSet[idx]["img"] + '" height="253" />'); //width="448"
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
        arrSubCategory = [ "사과/배", "참외/토마토", "키위/딸기/멜론/수박", "귤/한라봉/천혜향", "바나나/오렌지/외국과일", "복분자/블루베리", "건과/견과" ];
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

    //GIGA 하나로 마트 옆에 카테고리 뿌려주기
    $('h1[name="cate_dtl_title"]').empty().append(requestCategoryCode+"코너");

    updateSubCategoryTitle(); // 제목 Set
}

// 서브카테고리 제목 Set
function updateSubCategoryTitle() {
    console.log("############ 카테고리 배열 cnt : " + arrSubCategory.length);
    for(var i=0 ; i < arrSubCategory.length ; i++) {
        console.log("#### 카테고리순서 확인 : " + i + " : " + arrSubCategory[i] + " requestCategoryDtlCode : " + requestCategoryDtlCode);

        if(arrSubCategory[i] == requestCategoryDtlCode) {
            console.log("#### 카테고리 : " + arrSubCategory[i] + " : " + requestCategoryDtlCode);
            $('div[name="sd_first_tit"]').empty().append(arrSubCategory[i]);


            // 마지막 항목이면
            if(i == arrSubCategory.length-1) {
                console.log("#### 카테고리 마지막 ");

                $('div[name="sd_second"]').empty().append(arrSubCategory[0]); // 가장 첫번째 항목 보여줌
            }

            // 마지막에서 두번째 항목이면
            else if(i <= arrSubCategory.length-2) {
                console.log("#### 카테고리 마지막에서 두번째보다 작으면 ");
                $('div[name="sd_second"]').empty().append(arrSubCategory[i+1]);
            }
        }
    }
}

// 페이징 변경 좌측 항목 업데이트
function updateSubCategoryList() {
   // 변경 해야 할 파라미터 
   // var horizonFocus  = 0;    가로값 (0~2)
   // var verticalFocus = 0;    세로값 (0~2)
   // var currentFocusDtl = 0;  현재위치 (0~8)
   // var currentFocusDtlPage = 0; 페이지 (0~n)  (한페이지에 9개의 데이터)
   // var prevPageYN = false; 이전페이지 
   // var nextPageYN = false; 다음페이지
   var resultLen    = resultSet.length;            // 데이터 전체 갯수
   var startIdx     = currentFocusDtlPage * 9;     // 페이지에서 시작되는 idx
   var endIdx       = (startIdx + 9);
   var totalPage    = Math.ceil(resultLen / 9);

   console.log("## 전체 페이지 수 : " + totalPage);

   $('#pageNavi').empty().append("<B>" + Number(currentFocusDtlPage+1) + "</b> / " + totalPage);

   // 마지막 페이지 일 때 (마지막 인덱스가 전체데이터 갯수보다 많을 때)
   if(resultLen < endIdx) {
        nextPageYN = false;        // 다음 페이지 없음
        $('#arrow_bottom').hide(); // 다음 페이지 방향키 감춤
        endIdx = resultLen;         // 마지막 인덱스를 최대길이로 변경
   // 마지막 페이지 아닐 때 (마지막 인덱스가 전체데이터 갯수보다 적을 때)
   } else {
        nextPageYN = true;          // 다음 페이지 있음
        $('#arrow_bottom').show();  // 다음 페이지 방향키
   }

   var pageSet  = resultSet.slice(startIdx, endIdx); // 전체 데이터에서 페이지 갯수만큼의 데이터를 추출
   var emptyLen = 9 - pageSet.length;                // 빈 공간 갯수
   currentPageCnt = pageSet.length;                  // 현재 페이지 상품 cnt

   console.log("####### 빈 페이지 개수 : " + emptyLen);
   console.log("####### 시작 idx : " + startIdx);
   console.log("####### 종료 idx : " + endIdx);

   $('ul[name="ul_discount"]').empty();

   // 결과값이 9보다 작으면 결과값 만큼만 상품 리스트를 뿌리고 빈 값으로 나머지를 채워준다.
    for(var i=0 ; i < pageSet.length ; i++) {
        console.log("not empty ? : " + i);
        makeProduct();
    }
    if(emptyLen > 0) {
        for(var i=0 ; i < emptyLen ; i++) {
            makeEmptyProduct();
            console.log("empty ? : " + i);
        }
    }

    // 데이터를 넣는다.
    $.each(pageSet, function(index, entry) {
        if(index < resultLen) {
            console.log("다음꺼 " + entry['img']);
            $('li[name="li_img"]').eq(index).append('<span class="dtl_img"><img src="' + cmsServerIp + entry['img'] + '" /></span>');
            $('li[name="li_name"]').eq(index).append(entry['name']);
            $('li[name="li_cost"]').eq(index).append(cn_toPrice(entry['cost']) + "원");
        }
    });

    // 우측정보 갱신 
    updateProductInfo;
    
    // 페이징 화살표 컨트롤
    pageArrowUtil1(); 
}



/**
 *  Category Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.category_dtl.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        // 상품 목록 조회
        this.selectProductSubCategory();


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

                /*if(currentFocusMenu >= 4) {
                    this.videoPlay("test", currentFocusMenu); // 영상 재생
                }*/

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
                isCart = false;
                $('#wrap').html(cartHtml); // 백업한 html 을 다시 복구

                /*if(currentFocusMenu >= 4) {
                    this.videoPlay("test", currentFocusMenu); // 영상 재생
                }*/
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

                /*if(currentFocusMenu >= 4) {
                    this.videoStop(); // 영상 재생 중지
                }*/
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
                location.href ="../index.html?GO_EXHB=Y" ; // 기획전 이동
            }
            // **************************************************
            // * ◀|| KEY (카테고리 Go home)
            // 
            if(keyCode == VK_PLAY) {
                location.href ="category.html"; // 전체카테고리 이동
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

                    var idx = currentFocusDtl + (9 * currentFocusDtlPage);

                    console.log("### 상품 배열 " + idx + "번째");

                    // this.transCategoryCode(); // 코드를 숫자로 전환
                    var url = "?categoryCode=" + requestCategoryCode
                            + "&categoryDtlCode=" + requestCategoryDtlCode
                            + "&categoryDtlPage=" + requestCategoryDtlPage
                            + "&id=" + resultSet[idx]["id"];

                    console.log("### 상품 정보로 넘어가는 값들 :  " + url);                            

                    location.href ="product1.html" + url;
                }

                else if(currentFocusList == 3){
                    console.log("아래쪽버튼 focus일때");
                    //아래쪽버튼 focus일때
                    if(currentFocusBtn == 0) {
                        /*$('div[name="sd_first"]').hide();
                        $('div[name="selDepth"]').addClass("animation");*/
                        
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
                                currentFocusDtlPage = currentFocusDtlPage - 1;

                                if(currentFocusDtlPage <= 0) {
                                    // 현재 페이지가 0이면 이전 페이지 없음 처리
                                    prevPageYN = false;
                                    // $('#arrow_top').hide();
                                } 
                                updateSubCategoryList();                // 페이지 변경
                                verticalFocus   = verticalFocus + 2;    // 행 증가(전페이지의 마지막으로 위치)
                                horizonFocus    = horizonFocus;         // 열 증감 없음
                                currentFocusDtl = currentFocusDtl + 6;  // 위치 변경
                                updateProductInfo();                    // 우측 상품 정보 갱신

                                $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                                $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                                $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');
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
                            $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').removeClass('focus');
                            
                            verticalFocus   = verticalFocus - 1;    // 행 감소
                            horizonFocus    = horizonFocus;         // 열 증감 없음
                            currentFocusDtl = currentFocusDtl - 3;  // 위치 변경
                            updateProductInfo();                    // 우측 상품 정보 갱신

                            $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');
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
                            // 총 갯수에서 3을 뺀 수가 포커스보다 작을 때 아래로 이동 불가 
                            console.log("### 아래 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + currentFocusDtl);

                            if(currentPageCnt - 3 <= currentFocusDtl) {
                                console.log("###### 아래로 이동 불가");
                                return;
                            } else {
                                console.log("###### 아래로 이동 가능");
                            }

                            $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();
                            $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').removeClass('focus');

                            verticalFocus   = verticalFocus + 1;    // 행 증가
                            horizonFocus    = horizonFocus;         // 열 증감 없음
                            currentFocusDtl = currentFocusDtl + 3;  // 위치 변경
                            updateProductInfo();                    // 우측 상품 정보 갱신

                            $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');
                        }

                        // 세번째 행 일때
                        else if(verticalFocus == 2) {
                            if(nextPageYN == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                                
                                // 페이지 이동했으므로 전 페이지 존재
                                prevPageYN = true;
                                $('#arrow_top').show();

                                currentFocusDtlPage = currentFocusDtlPage + 1;
                                updateSubCategoryList();    // 페이지 변경
                                verticalFocus   = verticalFocus - 2;    // 행 감소
                                horizonFocus    = horizonFocus;         // 열 증감 없음
                                currentFocusDtl = currentFocusDtl - 6;  // 위치 변경

                                // 아래로 이동했을때 아래 위치에 상품이 없으면 (이동할 포커스가 다음 페이지 상품 수 보다 큼)
                                if(currentPageCnt <= currentFocusDtl + 1) {
                                    currentFocusDtl = currentPageCnt - 1;
                                    horizonFocus = currentPageCnt - 1;
                                }

                                updateProductInfo();                    // 우측 상품 정보 갱신

                                console.log("### 아래 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + currentFocusDtl);
                                
                                

                                console.log("### 아래 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + currentFocusDtl);

                                $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                                $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                                $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');
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
                            $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').removeClass('focus');

                            verticalFocus   = verticalFocus;        // 행 증감 없음
                            horizonFocus    = horizonFocus - 1;     // 열 감소
                            currentFocusDtl = currentFocusDtl - 1;  // 위치 변경
                            updateProductInfo();                    // 우측 상품 정보 갱신

                            $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                            $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');
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
                        $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');
                    }    
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    // 상품 목록 일때
                    if(currentFocusList == 0) {

                        // 총 갯수에서 1을 뺀 수가 포커스보다 작을 때 오른쪽으로 이동 불가 
                        console.log("### 우측 이동 시 전체 갯수 : " + currentPageCnt + " 현재 포커스 위치 : " + currentFocusDtl);

                        // 상품 목록 첫번째, 두번째 열일 때
                        if(horizonFocus >= 0 && horizonFocus < 2) {
                            // 우측에 상품이 있을때
                            if(currentPageCnt > currentFocusDtl+1) {
                                $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                                $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();
                                $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').removeClass('focus');

                                verticalFocus   = verticalFocus;        // 행 증감 없음
                                horizonFocus    = horizonFocus + 1;     // 열 증가
                                currentFocusDtl = currentFocusDtl + 1;  // 위치 변경
                                updateProductInfo();                    // 우측 상품 정보 갱신

                                $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                                $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                                $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');
                            // 우측에 상품이 없을 때
                            } else if(currentPageCnt == currentFocusDtl+1) {
                                console.log("### 우측에 상품이 없어서 back 버튼으로 이동");
                                $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                                $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();
                                $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').removeClass('focus');

                                currentFocusList = 3; // 화살표 버튼으로

                                $('li[name="mg_backward"]').addClass('focus');
                            }
                        }
                        
                        //상품목록 열3 -> back버튼
                        else if(horizonFocus == 2) {
                            $('li[name="li_discount"]').eq(currentFocusDtl).removeClass('focus');
                            $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').empty();
                            $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').removeClass('focus');

                            currentFocusList = 3; // 화살표 버튼으로

                            $('li[name="mg_backward"]').addClass('focus');   
                        }
                    }
                }                
                
            } else if (keyCode === global.VK_BACK) {
                // 전체 카테고리로 이동
                this.transCategoryCode(); // 한글코드를 숫자코드로 변환 후 페이지 이동

                location.href = "category.html?categoryCode=" + requestCategoryCode 
                              + "&categoryDtlCode=" + requestCategoryDtlCode 
                              + "&categoryDtlPage=" + requestCategoryDtlPage;
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                
            //  TODO : 입력하면 안되는 키 (아래 소스 작동 X)
            } else if (keyCode === global.VK_HOME || keyCode === global.VK_RESERVE_1) {
                console.log("XXXXXXXXXXXXXXXXXXXXXXXX 입력 X");
                return;
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
                console.log("######## 상품목록 결과 : " + JSON.stringify(result));

                resultSet = result;
                var resultLen  = result.length;
                var totalPage    = Math.ceil(resultLen / 9);
                // $('#arrow_top').hide(); // 첫 페이지에서는 전 페이지 X

                // 결과값이 9보다 크면 다음 페이지 존재
                if(resultLen > 9) { 
                    nextPageYN = true;
                    $('#arrow_bottom').show();
                    resultLen = 9;
                    currentPageCnt = 9;
                }
                var emptyLen   = 9 - resultLen;

                // 결과값이 9보다 작으면 결과값 만큼만 상품 리스트를 뿌리고 빈 값으로 나머지를 채워준다.
                for(var i=0 ; i < resultLen ; i++) {
                    makeProduct();
                    currentPageCnt = resultLen;
                }
                if(emptyLen > 0) {
                    for(var i=0 ; i < emptyLen ; i++) {
                        makeEmptyProduct();
                    }
                }

                $('#pageNavi').empty().append("<B>" + Number(currentFocusDtlPage+1) + "</b> / " + totalPage);

                console.log("결과 값과 빈값의 길이 : 결과값 " + resultLen + " 빈값 " + emptyLen + "합친값 " + Number(resultLen + emptyLen));

                
                
                // 결과값을 넣는다.
                $.each(result, function(index, entry) {
                    // 처음에 뿌려주는 9개만 넣는다.
                    if(index < resultLen) {
                        $('li[name="li_img"]').eq(index).append('<span class="dtl_img"><img src="' + cmsServerIp + entry['img'] + '" /></span>');
                        $('li[name="li_name"]').eq(index).append(entry['name']);
                        $('li[name="li_cost"]').eq(index).append(cn_toPrice(entry['cost']) + "원");
                    }
                });

                pageArrowUtil1(); // 페이징 화살표 컨트롤
            },
            error : function(){
                    console.log("에러");
            },
            complete  : function(result) {
                $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');

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