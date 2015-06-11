'use strict';

/**
 *  Category Js : STBService (셋탑박스 서비스 공통)
 **/
App.defineClass('Gigamart.app.category.STBService', { 

	_construct: function () {
		var me = this;

		me.channelConfig = window.oipfObjectFactory.createChannelConfig();

		me.appConfiguration =  window.oipfObjectFactory.createConfigurationObject().configuration;

		me.appManager = window.oipfObjectFactory.createApplicationManagerObject();
			
		me.ownerApp = me.appManager.getOwnerApplication(window.document);

		me.keyEventProvider = Gigamart.app.category.KeyEventActorProvider.create();

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
			keyEventActor = me.keyEventProvider.getKeyEventActor(keyCode);
	},

	addKeyEventActor: function (instance, conditionFunction) {
		this.keyEventProvider.addKeyEventActor(instance, conditionFunction);
	}
});