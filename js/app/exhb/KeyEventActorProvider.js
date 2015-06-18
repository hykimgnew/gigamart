'use strict';

/**
 *  Exhb Js : KeyEventActorProvider (키 이벤트 처리)
 **/

var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();     // 기획전
var videoPlayer2 = window.oipfObjectFactory.createVideoMpegObject();    // 전체 영상보기


App.defineClass('Gigamart.app.exhb.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];
        //저렴한상품추천
        this.selectSalesWon();
        //할인율최고
        this.selectSalesPercentage();
        //쇼퍼추천세트
        this.selectShopper();

        // 리스트갱신
        //this.menuRefresh();

        //this.selectProductEvent();
    },

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;
        
        // *****************************************************************************
        // * 전체 영상보기 팝업
        // *****************************************************************************
        if(isFullVideo == true && isCart == false) {
            console.log("# 전체 영상보기 팝업 : " + keyCode);
            console.log("# 전체 영상보기 포커스.. : " + fvFocus);
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
                    console.log("상품 상세보기..");
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
        else if(isFullVideo == false && isCart == true) {
            console.log("# 간편 장바구니 팝업 : " + keyCode);
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
        // * 팝업 없을 때
        // *****************************************************************************
        else if(isFullVideo == false && isCart == false) {
            console.log("# 팝업 X : " + keyCode);
            console.log("# 팝업 X : " + VK_PLAY);
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
            if(keyCode === global.VK_BLUE) {
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
            }

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
                if(currentFocusList == 0) {
                    /** 전체 카테고리로 이동 */
                    location.href = "category.html";
                }

                if(currentFocusList == 2) {
                    /** 전체 영상보기 팝업 */
                    // TODO : 타임세일 코드값 넘겨야함
                    isFullVideo = true;
                    $('#popup_fv').show();
                    $('#btn_cart').addClass('focus');

                    // 전체 영상보기 영상 재생
                    this.videoPlay("test", Number(currentFocusMenu+2), 2);
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
                    if(currentFocusList == 1) {
                        if(prevPageYN1 == true) {
                            // 전 페이지 조회
                            console.log("지금 이상품 이가격 : 전 페이지 조회");
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
                                $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                                $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                                currentFocusDtl1 = currentFocusDtl1 - 1;
                                $('a[name="arrow_top"]').addClass('focus');  

                                /*if(histFocus == 1) {*/
                                    // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage == totalOrderedPage) {
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    this.pagingOrderedProduct(currentOrderedProductPage-1);
                                }
                               /* }*/
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                                if(currentOrderedProductPage == totalOrderedPage) {
                                    console.log("##### 더 이상 이동할 페이지 없음.22.");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때.22.2");
                                    this.pagingOrderedProduct(currentOrderedProductPage-1);
                                }
                                /*$('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                                $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();
                                currentFocusDtl1 = currentFocusDtl1 - 1;
                                $('a[name="arrow_top"]').addClass('focus');  */
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
                                $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                                currentFocusDtl2 = currentFocusDtl2 - 1;
                                $('a[name="arrow_top"]').addClass('focus');  
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                                /*$('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                                currentFocusDtl2 = currentFocusDtl2 - 1;
                                $('a[name="arrow_top"]').addClass('focus');  */
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
                                $('li[name="shooperImg"]').removeClass('focus');
                                currentFocusDtl3 = currentFocusDtl3 - 1;
                                $('a[name="arrow_top"]').addClass('focus');  
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                                /*$('li[name="shooperImg"]').removeClass('focus');
                                currentFocusDtl3 = currentFocusDtl3 - 1;
                                $('a[name="arrow_top"]').addClass('focus');  */
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
                                    currentFocusDtl1 = currentFocusDtl1 + 1; 
                                    $('a[name="arrow_bottom"]').addClass('focus'); 
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage+1));
                                }



                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                                // 현재 페이지가 마지막 페이지 일 때
                                if(currentOrderedProductPage == totalOrderedPage) {
                                    console.log("##### currentOrderedProductPage : "+currentOrderedProductPage);
                                    console.log("##### totalOrderedPage : "+totalOrderedPage);
                                    console.log("##### 더 이상 이동할 페이지 없음..");
                                }
                                // 마지막 페이지 아닐 때
                                else {
                                    console.log("##### 마지막 페이지 아닐 때..");
                                    console.log("##### currentOrderedProductPage : "+currentOrderedProductPage);
                                    console.log("##### currentOrderedProductPage+1 : "+Number(currentOrderedProductPage+1));
                                    console.log("##### totalOrderedPage : "+totalOrderedPage);
                                    this.pagingOrderedProduct(Number(currentOrderedProductPage+1));
                                }
                               /* }*/


                                /*$('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                                $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').empty();  
                                currentFocusDtl1 = currentFocusDtl1 + 1;
                                $('a[name="arrow_bottom"]').addClass('focus');  */

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
                                $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty(); 
                                currentFocusDtl2 = currentFocusDtl2 + 1; 
                                $('a[name="arrow_bottom"]').addClass('focus');  

                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                                /*$('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                                $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty(); 
                                currentFocusDtl2 = currentFocusDtl2 + 1; 
                                $('a[name="arrow_bottom"]').addClass('focus');  */

                            }
                        }
                        else if(currentFocusDtl2 == -1) {
                            $('a[name="arrow_top"]').removeClass('focus');
                            currentFocusDtl2 = currentFocusDtl2 + 1; 
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').append(btnokfill);
                        }
                   }

                   // 추천 세트
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
                                $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                                $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty(); 
                                currentFocusDtl3 = currentFocusDtl3 + 1; 
                                $('a[name="arrow_bottom"]').addClass('focus');  

                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                                /*$('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                                $('li[name="li_discount3"]:eq('+ currentFocusDtl3 + ') > .dm_bdr').empty(); 
                                currentFocusDtl3 = currentFocusDtl3 + 1; 
                                $('a[name="arrow_bottom"]').addClass('focus');  */
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
                            videoPlayer.stop();

                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusList = 0;
                            $('#pj_left').addClass('focus');

                        // 지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단)
                        } 
                        else if(currentFocusMenu > 0) {
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusMenu = currentFocusMenu - 1;
                            fvCode = currentFocusMenu; // TODO : 나중에 타임세일 코드 넣어야함
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');

                            this.videoPlay("test", Number(currentFocusMenu+2), 1);
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

                            this.videoPlay("test", Number(currentFocusMenu+2), 1);
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

                        $('#pj_left').removeClass('focus');
                        currentFocusList = 2;
                        currentFocusMenu = 0;
                        fvCode = currentFocusMenu; // TODO : 차후에 상품 코드 넣어야함
                        $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');

                        this.videoPlay("test", Number(currentFocusMenu+2), 1);
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

                            this.videoPlay("test", Number(currentFocusMenu+2), 1);
                        }

                        // 지금 이상품 이가격(하단 오른쪽) -> 저렴한 상품 추천
                        else if(currentFocusMenu == 3) {
                            //this.videoStop();
                            videoPlayer.stop();

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
            // 테스트용 영상
            url = "http://14.52.244.91:8080/video/tv/category/" + (category) + ".mp4";
            // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
            $('#span_videoDiv').empty().append('<img src="../images/sample_01.jpg" />');
            
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
            url = "http://14.52.244.91:8080/video/tv/category/" + (category) + ".mp4";
            // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
            $('#p_videoDiv').empty().append('<img src="../images/sample_01.jpg" />');
            
            videoPlayer2.width = 970;
            videoPlayer2.height = 545;
            $('#p_videoDiv').empty()
            document.getElementById('p_videoDiv').appendChild(videoPlayer2);
            videoPlayer2.data = url;
            videoPlayer2.play(1);
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
                        $('span[name="pd_sales_won"]').eq(index).empty().html(entry['sales_won']+"원");
                        $('li[name="pd_img"]').eq(index).empty().html('<img src="'+cmsServerIp + entry['img']+'"/>');
                        $('li[name="pd_name"]').eq(index).empty().html(entry['name']);
                        $('li[name="pd_cost"]').eq(index).empty().html(entry['cost']); 
                        appendHtml = {
                                        "sales_won" : entry['sales_won'],
                                        "img" : entry['img'],
                                        "name" : entry['name'],
                                        "cost" : entry['cost']
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
                        $('li[name="pd_cost2"]').eq(index).empty().html(entry['cost']);
                        appendHtml = {
                                        "sales_percentage" : entry['sales_percentage'],
                                        "img2" : entry['img'],
                                        "name2" : entry['name'],
                                        "cost2" : entry['cost']
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
        
        if(Math.floor(Math.random() * 2) == 0) {shopperImg = '<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_김미나.jpg" />'; shopperName="김미나 쇼퍼";}
        else  {shopperImg ='<img src="' + cmsServerIp + '/images/shopper/set/쇼퍼_이순자.jpg" />'; shopperName="이순자 쇼퍼";}
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
    // 조회 :
    selectProductEvent: function() {
        var param = '';
        var appendHtml = '';

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
                console.log("########결과 : " + JSON.stringify(result));
                $.each(result['product'], function(index, entry) {
                    //옵션 추가
                        appendHtml = "";
                        appendHtml += '<span class="polygon_l">'+ entry['sales_percentage'] +'%</span>';
                        appendHtml += '<span class="dm_bdr"></span>';
                        appendHtml += '<ul>';
                        appendHtml += '<li class="dlm_img">';
                        appendHtml += '<img src="' + cmsServerIp + entry['img']+'"/>';
                        appendHtml += '</li>';
                        appendHtml += '<li class="dlm_tit">'+entry['name'] +'</li>';
                        appendHtml += '<li class="dlm_price">'+entry['cost'] +'원</li>';
                        appendHtml += '</ul>';
                });
            }
        });
    },
    // 리스트 페이지 이동
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

        //$('#ordered_product').empty().append(productList[page]);
        $('span[name="pd_sales_won"]').eq(0).empty().append(productList[page*2].sales_won);
        $('li[name="pd_img"]').eq(0).empty().append('<img src="' + cmsServerIp + productList[page*2].img + '"/>');
        $('li[name="pd_name"]').eq(0).empty().append(productList[page*2].name);
        $('li[name="pd_cost"]').eq(0).empty().append(productList[page*2].cost);

        $('span[name="pd_sales_won"]').eq(1).empty().append(productList[(page*2)+1].sales_won);
        $('li[name="pd_img"]').eq(1).empty().append(productList[(page*2)+1].img);
        $('li[name="pd_name"]').eq(1).empty().append(productList[(page*2)+1].name);
        $('li[name="pd_cost"]').eq(1).empty().append(productList[(page*2)+1].cost);

        /*0 0,1
        1 2,3
        2 4,5
        3 6,7*/
    },
    menuRefresh: function() {

    }

    /** 지금 이상품 이가격 조회 */
    // 현재 연동 규격서에 없음...

});