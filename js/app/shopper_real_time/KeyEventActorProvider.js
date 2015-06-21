'use strict';

/**
 *  shopper_real_time(공통) Js : KeyEventActorProvider (키 이벤트 처리)
 * 직접 소스에서 불러오는건 아니고 여기서 일단 복사해서 각 소스에 덮어씌울것 
 * 간편 쇼퍼 리얼 타임 관련 소스는 무조건 여기서 수정...
 **/

        // *****************************************************************************
        // * 쇼퍼 리얼타임 팝업
        // *****************************************************************************
        if(isRealTime == true && isRealTimeStart == false && isRealTimeEnd == false && isRealTimeEndComplete == false) {
            console.log("# 쇼퍼 리얼타임 팝업 : " + keyCode);

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
        // * 쇼퍼 리얼타임 시작 팝업
        // *****************************************************************************
        if(isRealTime == false && isRealTimeStart == true && isRealTimeEnd == false && isRealTimeEndComplete == false) {
            console.log("# 쇼퍼 리얼타임 시작 팝업 : " + keyCode);

            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                // 영상요청 버튼
                if(rtStartFocus == 0) {

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
                        $('#popBtn_close').removeClass('focus');
                        rtStartFocus = 0;
                        $('#popBtn_video').addClass('focus');
                    }
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {
                    // 영상요청 -> 닫기
                    if(rtStartFocus == 0) {
                        $('#popBtn_video').removeClass('focus');
                        rtStartFocus = 1;
                        $('#popBtn_close').addClass('focus');
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
        if(isRealTime == false && isRealTimeStart == false && isRealTimeEnd == true && isRealTimeEndComplete == false) {
            console.log("# 쇼퍼 리얼타임 종료 팝업 : " + keyCode);

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
        // * 쇼퍼 리얼타임 종료 완료 팝업
        // *****************************************************************************
        if(isRealTime == false && isRealTimeStart == false && isRealTimeEnd == false && isRealTimeEndComplete == true) {
            console.log("# 쇼퍼 리얼타임 종료 완료 팝업 : " + keyCode);

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
    