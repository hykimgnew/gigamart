//'use strict';


//##############################################################################

// 사용 안하는 스크립트
// index.html과 exhb.html은 공통적으로 js/exhb/KeyEventActorProvider.js를 사용함

//##############################################################################
var appConfiguration = window.oipfObjectFactory.createConfigurationObject();

// 쿠키 생성
function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}
 
// 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

/**
 *  Intro Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.intro.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        //$('#intro_skip').show(); // 인트로 버튼 on

    },

    getKeyEventActor: function (keyCode) {
    	var me = this;

        console.log("* getKeyEventActor : " + keyCode );

        // 확인 버튼
        if (keyCode === global.VK_ENTER) {
            // 로그인..
            this.login();
            // location.href = "/view/exhb.html";  // 메인 화면으로 이동
        } else if (keyCode >= global.VK_LEFT && keyCode <= global.VK_DOWN) {
            if(keyCode === global.VK_UP) {

            }

            if(keyCode === global.VK_DOWN) {
              
            }
        } else if (keyCode === global.VK_BACK) {
            
        } else if (keyCode === global.VK_ESCAPE) {
            
        } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
            
        }
    },  

    addKeyEventActor: function (instance, conditionFunction) {
    	this.actors.push({
    		instance: instance,
    		conditionFunction: conditionFunction
    	});
    },

    // 로그인
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
                    console.log("############ 로그인 되었습니다.");
                    //buyerID = result['id'];
                    //setCookie('buyerID', result['id'], 1); // 로그인 할때 ID 쿠키 저장
                    console.log("############ 로그인 되었습니다. " + buyerID);
                    appConfiguration.localSystem.mute = true; // 음소거 설정
                    location.href = "view/exhb.html?buyerID=" + result['id']+ '&userID'+ userID;  // 메인 화면으로 이동
                }

                else if(result['resultCode'] == '0') {
                    console.log("############ 로그인 실패하였습니다.");
                    appConfiguration.localSystem.mute = true; // 음소거 설정
                    location.href = "view/exhb.html";  // 메인 화면으로 이동
                    
                    //alert("로그인에 실패하였습니다.");
                    // return;
                }
                
                else {
                    console.log("############ 셋탑박스를 확인해주시거나 고객센터로 문의해주세요.");
                    appConfiguration.localSystem.mute = true; // 음소거 설정
                    location.href = "view/exhb.html";  // 메인 화면으로 이동

                    //alert("셋탑박스를 확인해주시거나 고객센터로 문의해주세요.");
                    // return;
                }
            }
        });
    }
});