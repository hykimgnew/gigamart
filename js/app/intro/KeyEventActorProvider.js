'use strict';

/**
 *  Intro Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.intro.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

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
                    location.href = "/view/exhb.html";  // 메인 화면으로 이동
                }

                else if(result['resultCode'] == '0') {
                    console.log("############ 로그인 실패하였습니다.");
                    location.href = "/view/exhb.html";  // 메인 화면으로 이동
                    
                    //alert("로그인에 실패하였습니다.");
                    // return;
                }

                else {
                    console.log("############ 셋탑박스를 확인해주시거나 고객센터로 문의해주세요.");
                    location.href = "/view/exhb.html";  // 메인 화면으로 이동

                    //alert("셋탑박스를 확인해주시거나 고객센터로 문의해주세요.");
                    // return;
                }
                

            }
        });
    }
});