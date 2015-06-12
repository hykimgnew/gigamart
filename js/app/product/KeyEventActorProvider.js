'use strict';

var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();

/**
 *  Product Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.product.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

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
                location.href ="/view/exhb.html"; // 기획전 이동
            }
            // **************************************************
            // * ◀|| KEY (카테고리 Go home)
            // 
            if(keyCode == VK_PLAY) {
                location.href ="/view/category.html"; // 기획전 이동
            }    
            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                // 전체 카테고리 일때
                if(currentFocusList == 0) {

                    /*// 쇼퍼's bag
                    if(currentFocusMenu == 3) {
                        $('#sub_content').hide();
                        $('#sub_content_bag').show("slow");
                    }*/
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
                    //location.href ="/view/exhb.html";
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

                    // 상세카테고리 1열
                    if(currentFocusList == 0) {
                        if(currentFocusDtl1 == 0) { //1열 1번째
                            if(prevPageYN == true) {
                                // 전 페이지 조회
                                console.log("상세카테고리 : 전 페이지 조회");
                            }
                            else if(prevPageYN == false) {
                                // 전 페이지 없음
                                console.log("상세카테고리  : 전 페이지 없음");
                            }
                        }
                        else if(currentFocusDtl1 >= 1) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            
                            currentFocusDtl1 = currentFocusDtl1 - 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        }
                    }



                    //상세카테고리 2열
                    else if(currentFocusList == 1) {
                        if(currentFocusDtl2 == 0) {
                            if(prevPageYN == true) {
                                // 전 페이지 조회
                                console.log("상세카테고리 : 전 페이지 조회");
                            }
                            else if(prevPageYN == false) {
                                // 전 페이지 없음
                                console.log("상세카테고리 : 전 페이지 없음");
                            }
                            
                        }
                        else if(currentFocusDtl2 >= 1) {
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            currentFocusDtl2 = currentFocusDtl2 - 1;
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                        }
                    }

                    // 상세카테고리 3열
                    else if(currentFocusList == 2) {
                        if(currentFocusDtl3 == 0) {
                            if(prevPageYN == true) {
                                // 전 페이지 조회
                                console.log("상세카테고리 : 전 페이지 조회");
                            }
                            else if(prevPageYN == false) {
                                // 전 페이지 없음
                                console.log("상세카테고리 : 전 페이지 없음");
                            }
                            
                        }
                        if(currentFocusDtl3 >= 1) {
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                            currentFocusDtl3 = currentFocusDtl3 - 1;
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
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
                   
                   // 상세카테고리 1열
                   if(currentFocusList == 0) {
                        if(currentFocusDtl1 == 0 || currentFocusDtl1 == 1) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            currentFocusDtl1 = currentFocusDtl1 + 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl1 == 2) {
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

                   // 상세카테고리 2열
                   else if(currentFocusList == 1) {
                        if(currentFocusDtl2 == 0 || currentFocusDtl2 == 1) {
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            currentFocusDtl2 = currentFocusDtl2 + 1;
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl2 == 2) {
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

                   // 상세카테고리 3열
                   else if(currentFocusList == 2) {
                        if(currentFocusDtl3 == 0 || currentFocusDtl3 == 1) {
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                            currentFocusDtl3 = currentFocusDtl3 + 1;
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                        }
                        else if(currentFocusDtl3 == 2) {
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

                    // 저렴한 상품 추천 -> 지금 이상품 이가격 or 지금 이상품 이가격(하단 오른쪽)
                    if(currentFocusList == 0) {
                        // 저렴한 상품 (0,1) -> 지금 이상품 이가격
                        /*if(currentFocusDtl1 == 0 || currentFocusDtl1 == 1) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            currentFocusList = 1;
                            $('#s_scale').removeClass('focus');
                        }*/

                        // 저렴한 상품 (2) -> 지금 이상품 이가격(하단 오른쪽)
                        /*if(currentFocusDtl1 == 0 || currentFocusDtl1 == 1 ||currentFocusDtl1 == 2) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                            currentFocusList = 2;
                            $('li[name="sl_menu"]').eq(3).addClass('focus');
                        }*/
                    }

                    // 상세카테고리 열2 -> 상세카테고리 열1
                    if(currentFocusList == 1) {
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                        currentFocusList = 0;
                        currentFocusDtl1 = currentFocusDtl2; // 열2 선택 순서가 그대로 열1으로 이동
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                        $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                    }

                    // 상세카테고리 열3 -> 상세카테고리 열2
                    if(currentFocusList == 2) {
                        $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                        $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                        currentFocusList = 1;
                        currentFocusDtl2 = currentFocusDtl3; // 열3 선택 순서가 그대로 열2로 이동
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                    }
                    //back버튼/forward버튼 -> 카테고리 열3 

                    if(currentFocusList == 3) {
                            if(currentFocusBtn == 1) {
                                $('li[name="mg_forward"]').removeClass('focus');  
                                currentFocusBtn = 0;      
                            }else{
                                $('li[name="mg_backward"]').removeClass('focus'); 
                            }
                            currentFocusList = 2;
                            //currentFocusDtl3 = currentFocusDtl2; 
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                            $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                            
                        }    
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {

                    // 지금 이상품 이가격(하단) -> 지금 이상품 이가격(하단) or 저렴한 상품 추천
                    /*if(currentFocusList == 2) {
                        // 지금 이상품 이가격(하단) -> 지금 이상품 이가격(하단)
                        if(currentFocusMenu < 3) {
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusMenu = currentFocusMenu + 1;
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                        }

                        // 지금 이상품 이가격(하단 오른쪽)
                        else if(currentFocusMenu == 3) {
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusList = 3;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);
                        }

                    }*/

                    // 상세카테고리 열1 -> 상세카테고리 열2
                    if(currentFocusList == 0) {
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                        $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                        currentFocusList = 1;
                        currentFocusDtl2 = currentFocusDtl1;
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                    }

                    // 상세카테고리 열2 -> 상세카테고리 열3
                    else if(currentFocusList == 1) {
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                        $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                        currentFocusList = 2;
                        currentFocusDtl3 = currentFocusDtl2;
                        $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                        $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').append(btnokfill);
                    }
                    //카테고리 열3 -> back버튼
                    else if(currentFocusList == 2) {
                        $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                        $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty();
                        currentFocusList = 3;
                        currentFocusDtl3 = currentFocusDtl3;
                        $('li[name="mg_backward"]').addClass('focus');   
                    }
                }

                console.log("* getKeyEventActor : " + keyCode );
                console.log("리스트 종류 : " + currentFocusList);
                console.log("전체카테고리 : " + currentFocusMenu);
                console.log("상세카테고리 페이지 : " + currentFocusDtlPage);
                console.log("상세카테고리 : " + currentFocusDtl);
                
                
            } else if (keyCode === global.VK_BACK) {
                
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
    }
});