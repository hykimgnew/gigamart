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
            location.href = "/view/exhb.html";  // 메인 화면으로 이동
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
    }
});