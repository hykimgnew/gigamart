'use strict';

/**
 * app Common js :  STBService (사용 안함 : 각 화면의 STBService를 각각 정의해서 사용함)
 **/
App.defineClass('Gigamart.app.STBService', { 

	_construct: function () {
		var me = this;

		me.channelConfig = window.oipfObjectFactory.createChannelConfig();

		me.appConfiguration =  window.oipfObjectFactory.createConfigurationObject().configuration;

		me.appManager = window.oipfObjectFactory.createApplicationManagerObject();
			
		me.ownerApp = me.appManager.getOwnerApplication(window.document);

		me.keyEventProvider = Gigamart.app.KeyEventActorProvider.create();

		me._initializeKeySet();
	},

	_initializeKeySet: function () {
		var me = this,
			original = me.ownerApp.privateData.keyset,
			keySet = (original.NAVIGATION + original.VCR);
			
	    original.setValue(original.maximumValue, [global.VK_CHANNEL_UP, global.VK_CHANNEL_DOWN]);

	    document.addEventListener('keydown', function(e) {
	    	me._keyDown(e);
	    });
	},

	_keyDown: function (e) {

		e.preventDefault();
		e.stopPropagation();

		var me = this,
			keyCode = e.keyCode,
			keyEventActor = me.keyEventProvider.getKeyEventActor();

		//keyEventActor.pressedKey(keyCode);
		
		if (keyCode === global.VK_ENTER) {
        	keyEventActor.pressedEnterKey();
        } else if (keyCode >= global.VK_LEFT && keyCode <= global.VK_DOWN) {
        	keyEventActor.pressedNavigationKey(keyCode);
        } else if (keyCode === global.VK_BACK) {
        	keyEventActor.pressedBackKey();
        } else if (keyCode === global.VK_ESCAPE) {
        	keyEventActor.pressedEscapeKey();
        } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
        	keyEventActor.pressedVCRKey(keyCode);
        }


	},

	addKeyEventActor: function (instance, conditionFunction) {
		this.keyEventProvider.addKeyEventActor(instance, conditionFunction);
	}
});