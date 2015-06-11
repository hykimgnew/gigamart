'use strict';

/**
 *  Exhb Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.exhb.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

    },

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;
        
        // *****************************************************************************
        // * 전체 영상보기 팝업
        // *****************************************************************************
        if(isFullVideo == true && isCart == false) {
            console.log("# 전체 영상보기 팝업 : " + keyCode);
            console.log("왜 안찍히냐.. : " + fvFocus);
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
                    //location.href = "/view/exhb.html"; // 기획전으로 이동
                    isFullVideo = false;
                    fvFocus = 1;
                    $('#popup_fv').hide();
                    $('#btn_close').removeClass('focus');
                    $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
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
            if(keyCode == VK_GREEN) {
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
            // **************************************************
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode == VK_GREEN) {
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
            if(keyCode == VK_RED) {

            }

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                if(currentFocusList == 0) {
                    /** 전체 카테고리로 이동 */
                    location.href = "/view/category.html";
                }

                if(currentFocusList == 2) {
                    /** 전체 영상보기 팝업 */
                    // TO-DO 타임세일 코드값 넘겨야함
                    var code = "";
                    isFullVideo = true;
                    $('#popup_fv').show();
                    $('#btn_cart').addClass('focus');
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
                        if(currentFocusDtl1 == 0) {
                            if(prevPageYN2 == true) {
                                // 전 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 조회");
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                            }
                        }
                        else if(currentFocusDtl1 >= 1) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            currentFocusDtl1 = currentFocusDtl1 - 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                        }
                    }

                    // 할인율 최고
                    else if(currentFocusList == 4) {
                        if(currentFocusDtl2 == 0) {
                            if(prevPageYN2 == true) {
                                // 전 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 조회");
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                            }
                            
                        }
                        else if(currentFocusDtl2 >= 1) {
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            currentFocusDtl2 = currentFocusDtl2 - 1;
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                        }
                    }

                    // 추천 세트
                    else if(currentFocusList == 5) {
                        if(currentFocusDtl3 == 0) {
                            if(prevPageYN2 == true) {
                                // 전 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 조회");
                            }
                            else if(prevPageYN2 == false) {
                                // 전 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 전 페이지 없음");
                            }
                            
                        }
                        if(currentFocusDtl3 >= 1) {
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            currentFocusDtl3 = currentFocusDtl3 - 1;
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
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
                        if(currentFocusDtl1 == 0 || currentFocusDtl1 == 1) {
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                            currentFocusDtl1 = currentFocusDtl1 + 1;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                        }
                        else if(currentFocusDtl1 == 2) {
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                            }
                        }
                   }

                   // 할인율 최고
                   else if(currentFocusList == 4) {
                        if(currentFocusDtl2 == 0 || currentFocusDtl2 == 1) {
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            currentFocusDtl2 = currentFocusDtl2 + 1;
                            $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                        }
                        else if(currentFocusDtl2 == 2) {
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                            }
                        }
                   }

                   // 추천 세트
                   else if(currentFocusList == 5) {
                        if(currentFocusDtl3 == 0 || currentFocusDtl3 == 1) {
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                            currentFocusDtl3 = currentFocusDtl3 + 1;
                            $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
                        }
                        else if(currentFocusDtl3 == 2) {
                            if(nextPageYN2 == true) {
                                // 다음 페이지 조회
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 조회");
                            }
                            else if(nextPageYN2 == false) {
                                // 다음 페이지 없음
                                console.log("내가 늘 사는 상품 지금 얼마? : 다음 페이지 없음");
                            }
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
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusList = 0;
                            $('#pj_left').addClass('focus');
                        // 지금 이상품 이가격(하단)-> 지금 이상품 이가격(하단)
                        } else if(currentFocusMenu > 0) {
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusMenu = currentFocusMenu - 1;
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
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
                            currentFocusList = 2;
                            $('li[name="sl_menu"]').eq(3).addClass('focus');
                        }
                    }

                    // 할인율 최고 -> 저렴한 상품 추천
                    if(currentFocusList == 4) {
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                        currentFocusList = 3;
                        currentFocusDtl1 = currentFocusDtl2; // 할인율 최고 선택 순서가 그대로 저렴한 상품 추천으로 이동
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                    }

                    // 추천 세트 -> 할인율 최고
                    if(currentFocusList == 5) {
                        $('li[name="li_discount3"]').eq(currentFocusDtl3).removeClass('focus');
                        currentFocusList = 4;
                        currentFocusDtl2 = currentFocusDtl3; // 추천 세트 선택 순서가 그대로 할인율 최고로 이동
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                    }
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {

                    // 전체 카테고리 -> 지금 이상품 이가격 (하단)
                    if(currentFocusList == 0) {
                        $('#pj_left').removeClass('focus');
                        currentFocusList = 2;
                        $('li[name="sl_menu"]').eq(0).addClass('focus');
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
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusMenu = currentFocusMenu + 1;
                            $('li[name="sl_menu"]').eq(currentFocusMenu).addClass('focus');
                        }

                        // 지금 이상품 이가격(하단 오른쪽)
                        else if(currentFocusMenu == 3) {
                            $('li[name="sl_menu"]').eq(currentFocusMenu).removeClass('focus');
                            currentFocusList = 3;
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                        }

                    }

                    // 저렴한 상품 추천 -> 할인율 최고
                    else if(currentFocusList == 3) {
                        $('li[name="li_discount1"]').eq(currentFocusDtl1).removeClass('focus');
                        currentFocusList = 4;
                        currentFocusDtl2 = currentFocusDtl1;
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).addClass('focus');
                    }

                    // 할인율 최고 -> 추천 세트
                    else if(currentFocusList == 4) {
                        $('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                        currentFocusList = 5;
                        currentFocusDtl3 = currentFocusDtl2;
                        $('li[name="li_discount3"]').eq(currentFocusDtl3).addClass('focus');
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

    destroyed: function () {
        /** 팝업? 종료 시 호출 */
        window.document.removeEventListener('keydown', keyDownEventReceivedForDetail, false);
        changeWindow(WindowType.main);
        initIndexFocus();
    }

    /** 지금 이상품 이가격 조회 */
    // 현재 연동 규격서에 없음...

});