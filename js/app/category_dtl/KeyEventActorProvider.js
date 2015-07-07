'use strict';

var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();
var appConfiguration = window.oipfObjectFactory.createConfigurationObject();
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
        
    console.log("############ 동영상 : " + resultSet[idx]["video"]);
    console.log("############ 이미지 : " + resultSet[idx]["img"]);

    //resultSet[idx]["video"];

    $('#cif_vod').empty().append('<img src="' + resultSet[idx]["img"] + '" height="253" />'); //width="448"
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
        arrSubCategory = [ "사과/배", "참외/토마토", "키위/딸기/멜론/수박", "귤/한라봉/천혜향", "바나나/오렌지", "복분자/블루베리", "건과/견과", "기타" ];
    }

    else if(requestCategoryCode == '채소') {
        arrSubCategory = [ "고구마/감자/호박", "파/양파/마늘/생강", "당근/오이/가지", "배추/양배추/무", "쌈 채소/기타", "파프리카/피망", "표고/송이/버섯류", "나물류/새순" ];
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
        arrSubCategory = [ "즉석/간편식/햄", "라면/국수/면류", "생수/커피/차/음료", "조미료/향신료/장류", "과자", "사탕/초콜릿/껌", "빵/식빵/케익/잼" ];
    }

    //GIGA 하나로 마트 옆에 카테고리 뿌려주기
    $('h1[name="cate_dtl_title"]').empty().append(requestCategoryCode+"코너");

    updateSubCategoryTitle(); // 제목 Set
}

// 상세카테고리 화살표 위 아래 버튼 누르면 변경된 값으로 갱신 (배열 참조)
function fn_chgCategoryDtl(flag) {

    // 위 화살표
    if(flag == 'UP') {
        // 현재 카테고리가 어디에 위치하는지 찾는다.
        for(var i=0 ; i < arrSubCategory.length ; i++) {
            // 일치하는 값 검색
            if(arrSubCategory[i] == requestCategoryDtlCode) {
                console.log("arrSubCategory-1 : " + arrSubCategory[i-1]);
                console.log("arrSubCategory  : " + arrSubCategory[i]);
                console.log("requestCategoryDtlCode : " + requestCategoryDtlCode);

                // 첫번째 항목이면
                if(i == 0) {
                    requestCategoryDtlCode = arrSubCategory[arrSubCategory.length-1]; // 마지막 카테고리로
                    console.log("###### 위 - 첫번째 항목이면 : " + requestCategoryDtlCode);
                    break;
                } 
                // 첫번째 항목이 아니면
                else if(i >= 1) {

                    requestCategoryDtlCode = arrSubCategory[i-1];
                    console.log("###### 위 - 첫번째 항목이 아니면 : " + requestCategoryDtlCode);
                    break;
                }
            }
        }
    }

    // 아래 화살표
    if(flag == 'DOWN') {
        // 현재 카테고리가 어디에 위치하는지 찾는다.
        for(var i=0 ; i < arrSubCategory.length ; i++) {
            // 일치하는 값 검색
            if(arrSubCategory[i] == requestCategoryDtlCode) {

                // 마지막 항목이면
                if(i == arrSubCategory.length-1) {
                    requestCategoryDtlCode = arrSubCategory[0]; // 첫번째 카테고리로
                    console.log("###### 아래 - 마지막 항목이면 : " + requestCategoryDtlCode);
                    break;
                } 
                // 마지막 항목이 아니면
                else if(i <= arrSubCategory.length-2) {
                    requestCategoryDtlCode = arrSubCategory[i+1];
                    console.log("###### 아래 - 마지막 항목이 아니면 : " + requestCategoryDtlCode);
                    break;
                }
            }
        }
    }

    // 해당 상세 카테고리의 첫번째 페이지로 이동하므로 전 페이지 없음
    prevPageYN = false;

    // 해당 상세 카테고리의 (0,0)으로 이동
    horizonFocus = 0;
    verticalFocus = 0;
    currentFocusDtl = 0;
    currentFocusDtlPage = 0;
}

// 서브카테고리 제목 Set
// 위의 fn_chgCategoryDtl(flag) function 이 먼저 선행된다. 
function updateSubCategoryTitle() {
    for(var i=0 ; i < arrSubCategory.length ; i++) {

        if(arrSubCategory[i] == requestCategoryDtlCode) {
            $('div[name="sd_first_tit"]').empty().append(arrSubCategory[i]);

            // 마지막 항목이면
            if(i == arrSubCategory.length-1) {
                $('div[name="sd_second"]').empty().append(arrSubCategory[0]); // 가장 첫번째 항목 보여줌
            }

            // 마지막 항목이 아니면
            else if(i <= arrSubCategory.length-2) {
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
            $('li[name="li_img"]').eq(index).append('<span class="dtl_img"><img src="' + entry['img'] + '" /></span>');
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

        // 플로팅 메뉴 장바구니 SET
        fltEasyCart();

        // 상품 목록 조회
        this.selectProductSubCategory("NORMAL");


        // 당일 판매현장 시각
        //$('#ci_title').html("당일 판매현장 " + this.getCurrentDate());
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
            // * ▶ KEY (장바구니 담기)
            // **************************************************
            if(keyCode === global.VK_BLUE) {
                var idx = currentFocusDtl + (9 * currentFocusDtlPage);

                // 장바구니 담기
                appendEasyCart(1, resultSet[idx]['id']);
                $('#cart_message').html("장바구니에 " + resultSet[idx]['name'] + " 상품이 1개 담겼습니다.");
                $('#wrap_cart').show();
                // 플로팅 메뉴 장바구니 SET
                fltEasyCart();
                //$('#wrap_cart').show();
                setTimeout("fn_popEasyCart()", 1000);  
            }

            // **************************************************
            // * ◀ KEY (플로팅 Go home)
            // **************************************************
            if(keyCode == VK_RED) {
                location.href ="exhb.html" ; // 기획전 이동
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

                // 화살표 일때는 위아래로 입력 받게 변경됨 (2015-07-06)
                else if(currentFocusList == 3){
                    
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
                                
                                /*// 상세카테고리 변경
                                fn_chgCategoryDtl('UP');
                                //updateSubCategoryList();                // 페이지 변경
                                currentFocusDtlPage = 0;
                                currentFocusDtl = 0;
                                verticalFocus   = 0;
                                horizonFocus    = 0;

                                // 상품 목록 조회
                                this.selectProductSubCategory("NORMAL");

                                console.log("이동후 가로축 : " + horizonFocus);
                                console.log("이동후 세로축 : " + verticalFocus);
                                console.log("이동후 위치 : " + currentFocusDtl);
                                console.log("이동후 페이지 : " + currentFocusDtlPage);*/
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
                        /*if(currentFocusBtn == 0) {
                            $('li[name="mg_backward"]').removeClass('focus');  
                            $('li[name="mg_forward"]').addClass('focus');  
                            currentFocusBtn = 1;      
                        }*/
                    
                        /*$('div[name="sd_first"]').hide();
                        $('div[name="selDepth"]').addClass("animation");*/

                        // 상세카테고리 변경
                        fn_chgCategoryDtl('DOWN');
                        
                        // 상품 목록 조회
                        this.selectProductSubCategory("ARROW");
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
                            if(currentPageCnt - 3 <= currentFocusDtl) {
                                if(nextPageYN == true) {
                                    console.log("###### 아래로 이동 불가");
                                    return;
                                } else {
                                    // 다음 페이지 없음
                                    console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                                    
                                    /*// 상세카테고리 변경
                                    fn_chgCategoryDtl('DOWN');
                                    //updateSubCategoryList();                // 페이지 변경
                                    currentFocusDtlPage = 0;
                                    currentFocusDtl = 0;
                                    verticalFocus   = 0;
                                    horizonFocus    = 0;

                                    // 상품 목록 조회
                                    this.selectProductSubCategory("NORMAL");

                                    console.log("이동후 가로축 : " + horizonFocus);
                                    console.log("이동후 세로축 : " + verticalFocus);
                                    console.log("이동후 위치 : " + currentFocusDtl);
                                    console.log("이동후 페이지 : " + currentFocusDtlPage);*/
                                    console.log("####### 아래로 이동 불가");
                                    return;
                                }
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
                                
                                /*// 상세카테고리 변경
                                fn_chgCategoryDtl('DOWN');
                                //updateSubCategoryList();                // 페이지 변경
                                currentFocusDtlPage = 0;
                                currentFocusDtl = 0;
                                verticalFocus   = 0;
                                horizonFocus    = 0;

                                // 상품 목록 조회
                                this.selectProductSubCategory("NORMAL");

                                console.log("이동후 가로축 : " + horizonFocus);
                                console.log("이동후 세로축 : " + verticalFocus);
                                console.log("이동후 위치 : " + currentFocusDtl);
                                console.log("이동후 페이지 : " + currentFocusDtlPage);*/
                            }
                        }
                   }

                    //상세카테고리 화살표 버튼
                    else if(currentFocusList == 3) {
                        //아래쪽버튼 focus일때
                        /*if(currentFocusBtn == 1) {
                            $('li[name="mg_forward"]').removeClass('focus');  
                            $('li[name="mg_backward"]').addClass('focus');  
                            currentFocusBtn = 0;      
                        }*/

                        // 상세카테고리 변경
                        fn_chgCategoryDtl('UP');
                        
                        // 상품 목록 조회
                        this.selectProductSubCategory("ARROW");
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
                        /*if(currentFocusBtn == 1) {
                            $('li[name="mg_forward"]').removeClass('focus');  
                            currentFocusBtn = 0;      
                        } else {
                            $('li[name="mg_backward"]').removeClass('focus'); 
                        }*/

                        // 통합
                        $('li[name="mg_forward"]').removeClass('focus');
                        $('li[name="mg_backward"]').removeClass('focus');

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

                            // 통합
                            $('li[name="mg_backward"]').addClass('focus');
                            $('li[name="mg_forward"]').addClass('focus');
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
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '바나나/오렌지')           requestCategoryDtlCode = 4;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '복분자/블루베리')         requestCategoryDtlCode = 5;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '견과/견과')               requestCategoryDtlCode = 6;
        if(requestCategoryCode == 4 && requestCategoryDtlCode == '기타')                    requestCategoryDtlCode = 7;
        
        // 채소
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '고구마/감자/호박')        requestCategoryDtlCode = 0;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '파/양파/마늘/생강')       requestCategoryDtlCode = 1;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '당근/오이/가지')          requestCategoryDtlCode = 2;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '배추/양배추/무')          requestCategoryDtlCode = 3;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '쌈 채소/기타')            requestCategoryDtlCode = 4;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '파프리카/피망')           requestCategoryDtlCode = 5;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '표고/송이/버섯류')        requestCategoryDtlCode = 6;
        if(requestCategoryCode == 5 && requestCategoryDtlCode == '나물류/새순')             requestCategoryDtlCode = 7;

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
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '즉석/간편식/햄')         requestCategoryDtlCode = 0;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '라면/국수/면류')         requestCategoryDtlCode = 1;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '생수/커피/차/음료')      requestCategoryDtlCode = 2;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '조미료/향신료/장류')     requestCategoryDtlCode = 3;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '과자')                   requestCategoryDtlCode = 4;
        if(requestCategoryCode == 11 && requestCategoryDtlCode == '빵/식빵/케익/잼')        requestCategoryDtlCode = 5;
    },

    // 조회 : 상세카테고리별 상품정보
    selectProductSubCategory: function(flag) {

        // 서브카테고리
        var subcategory = requestCategoryDtlCode;
        console.log("변환 이전 파라미터 : " + requestCategoryDtlCode);
        if(requestCategoryDtlCode == '바나나/오렌지') subcategory = '바나나/오렌지/외국과일';
        if(requestCategoryDtlCode == '당근/오이/가지') subcategory = '당근/오이/가지/고추';
        if(requestCategoryDtlCode == '즉석/간편식/햄') subcategory = '즉석/간편식/햄/통조림';
        console.log("변환 이후 파라미터 : " + subcategory);

        var param = {
                        "subcategory" : subcategory
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

                // 첫 조회 시 ul_discount 비움
                $('ul[name="ul_discount"]').empty();

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
                } else {
                    nextPageYN = false;
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
                        $('li[name="li_img"]').eq(index).append('<span class="dtl_img"><img src="' + entry['img'] + '" /></span>');
                        $('li[name="li_name"]').eq(index).append(entry['name']);
                        $('li[name="li_cost"]').eq(index).append(cn_toPrice(entry['cost']) + "원");
                    }
                });

                console.log("#이거 뜨나 : " + nextPageYN);
                pageArrowUtil1(); // 페이징 화살표 컨트롤
            },
            error : function(){
                    console.log("에러");
            },
            complete  : function(result) {
                // 화살표로 이동한 상태 아니면
                if(flag != "ARROW") {
                    $('li[name="li_discount"]').eq(currentFocusDtl).addClass('focus');
                    $('li[name="li_discount"]:eq('+ currentFocusDtl + ') > .dm_bdr').append(btnokfill);
                    $('li[name="li_discount"]').eq(currentFocusDtl).children().children('.dlm_tit').addClass('focus');    
                }

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